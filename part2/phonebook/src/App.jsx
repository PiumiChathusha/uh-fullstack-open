import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [nameFilter, setNameFilter] = useState('')

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