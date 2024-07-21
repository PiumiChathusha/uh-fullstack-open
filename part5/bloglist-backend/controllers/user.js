const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (!(username && name && password)) {
        return response.status(400).send({ error: 'username, name, password required' })
    }

    if (password.length < 3) {
        return response.status(400).send({ error: 'password should be aleast 3 characters' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const blogs = await User.find({})
        .populate('blogs', { url: 1, title: 1, author: 1, id: 1 })

    response.json(blogs)
})

module.exports = usersRouter