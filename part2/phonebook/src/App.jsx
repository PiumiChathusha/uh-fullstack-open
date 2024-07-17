import { useState, useEffect } from 'react'
import axios from 'axios';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (newPerson) => {
    const existing = persons.find(p => p.name.toLowerCase() === newPerson.name.toLowerCase());
    if (existing) {
      alert(`${newPerson.name} is already added to phonebook`);
      return
    }

    setPersons(persons.concat(newPerson))
    return true;
  }

  const personsToShow = nameFilter == ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().search(nameFilter.toLowerCase()) >= 0)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onNameFilterChange={setNameFilter} />
      <h2>add a new</h2>
      <PersonForm onPersonAdded={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App