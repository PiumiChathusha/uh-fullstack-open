const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const testHelper = require('./test_helper');
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('/api/login', () => {
    let testUser;

    beforeEach(async () => {
        await User.deleteMany({})
        const { password, ...singleUserDb } = testHelper.singleUser
        singleUserDb.passwordHash = await bcrypt.hash(password, 10)
        testUser = await User.create(singleUserDb);
    })

    describe('POST', () => {
        test('correct password', async () => {
            const request = {
                username: testHelper.singleUser.username,
                password: testHelper.singleUser.password
            }

            const response = await api
                .post('/api/login')
                .send(request)
                .expect(200)

            const loginResponse = response.body
            assert(Object.keys(loginResponse).includes('token'), 'token missing in response')
        })

        test('incorrect password', async () => {
            const request = {
                username: testHelper.singleUser.username,
                password: 'incorrect_password'
            }

            await api
                .post('/api/login')
                .send(request)
                .expect(401)
        })

        test('incorrect username', async () => {
            const request = {
                username: 'incorrect_username',
                password: 'incorrect_password'
            }

            await api
                .post('/api/login')
                .send(request)
                .expect(401)
        })
    })

    after(async () => {
        await mongoose.connection.close()
    })
})