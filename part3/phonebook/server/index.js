require('dotenv').config()
const express = require('express')
const morgan = require('morgan');
const cors = require('cors')

const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', (request, response) => {
    response.send(
        `<div>
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${new Date().toString()}</p>
        </div>`
    )
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!(body.name && body.number)) {
        return response.status(400).json({
            error: 'name or number is missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;
    const body = request.body

    if (!(body.name && body.number)) {
        return response.status(400).json({
            error: 'name or number is missing'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(id, person)
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))
})

app.get('/api/persons', (request, response, next) => {
    Person.find({})
        .then(persons => {
            response.json(persons)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;
    Person.findById(id)
        .then(person => {
            response.json(person)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findByIdAndDelete(id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}
app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})