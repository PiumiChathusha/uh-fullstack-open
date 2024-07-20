const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const testHelper = require('./test_helper');

const api = supertest(app)

describe('/api/users', () => {

    beforeEach(async () => {
        await User.deleteMany({})
        await User.insertMany(testHelper.initialUsers);
    })

    describe('POST', () => {
        test('user added', async () => {
            const response = await api
                .post('/api/users')
                .send(testHelper.singleUser)
                .expect(201)

            const usersAfterCreate = await testHelper.usersInDb()
            assert.strictEqual(testHelper.initialUsers.length + 1, usersAfterCreate.length)
            const { id, ...rest } = response.body;
            const { password, ...userWithoutPassword } = testHelper.singleUser;

            // set empty blog array
            userWithoutPassword.blogs = [];

            assert.deepStrictEqual(userWithoutPassword, rest)
        })

        test('fails without required length - username', async () => {
            const request = { ...testHelper.singleUser };
            request.username = 'te'

            await api
                .post('/api/users')
                .send(request)
                .expect(400)
        })

        test('fails without required length - password', async () => {
            const request = { ...testHelper.singleUser };
            request.password = 'te'

            await api
                .post('/api/users')
                .send(request)
                .expect(400)
        })
    })

    after(async () => {
        await mongoose.connection.close()
    })
})