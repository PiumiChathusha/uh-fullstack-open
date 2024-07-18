const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.xv1y5rv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const name = process.argv[3]
const number = process.argv[4]

const main = async () => {
  mongoose.connect(url)

  if (name && number) {
    const newPerson = new Person({
      name,
      number
    })
    newPerson.save().then(() => {
      console.log(`added ${name} ${number} to phonebook`)
      mongoose.connection.close()
    })
  } else {
    Person.find({})
      .then((persons) => {
        console.log('phonebook:')
        persons.forEach((person) => console.log(`${person.name} ${person.number}`))
        mongoose.connection.close()
      })
  }
}

main()