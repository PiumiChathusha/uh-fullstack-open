import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification';
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [nameFilter, setNameFilter] = useState('')

  const [notification, setNotification] = useState()

  useEffect(() => {
    personService
      .getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons)
      })
  }, [])

  const addPerson = (newPerson) => {
    const existingUser = persons.find(p => p.name.toLowerCase() === newPerson.name.toLowerCase());

    if (existingUser) {
      if (existingUser.number === newPerson.number) {
        alert(`${newPerson.name} is already added to phonebook`);
        return
      }

      if (window.confirm(`${existingUser.name} already added to phonebook, replace the old phone number with the new one?`)) {
        const { id, ...updateData } = existingUser;
        updateData.number = newPerson.number;
        personService
          .update(id, updateData)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
            createNotification(`Phone number changed to ${returnedPerson.number}`)
          })
        return;
      }
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        createNotification(`Added ${returnedPerson.name}`)
      })
  }

  const deletePerson = (person) => {
    personService
      .delete(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
      .catch((error) => {
        if (error.response.status == 404) {
          setPersons(persons.filter(p => p.id !== person.id))
          createNotification(`Information of ${person.number} has already been removed from the server`, true)
        }
      })
  }

  const createNotification = (message, error = false) => {
    setNotification({ message, error });
    setTimeout(() => {
      setNotification(null);
    }, 2000)
  }

  const personsToShow = nameFilter == ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().search(nameFilter.toLowerCase()) >= 0)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter onNameFilterChange={setNameFilter} />
      <h2>add a new</h2>
      <PersonForm onPersonAdded={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onPersonDeleted={deletePerson} />
    </div>
  )
}

export default App