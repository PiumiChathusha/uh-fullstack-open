const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const testHelper = require('./test_helper');
const bcrypt = require('bcrypt')
const jwtHelper = require('../utils/jwt')

const api = supertest(app)

describe('/api/blogs', () => {
    let testUser;
    let token;

    beforeEach(async () => {
        await User.deleteMany({})
        await Blog.deleteMany({})
        const { password, ...singleUserDb } = testHelper.singleUser
        singleUserDb.passwordHash = await bcrypt.hash(password, 10)
        testUser = await User.create(singleUserDb);
        await Blog.insertMany(testHelper.initialBlogs.map((b) => new Blog({ ...b, user: String(testUser._id) })));

        token = jwtHelper.jwtSign(testUser._id, singleUserDb.username)
    })

    describe('GET', () => {
        test(`blogs are returned as json with ${testHelper.initialBlogs.length} initial blogs`, async () => {
            const response = await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)

            assert.strictEqual(response.body.length, testHelper.initialBlogs.length)
        })

        test('all blogs have property id', async () => {
            const response = await api
                .get('/api/blogs')
                .expect(200)

            response.body.forEach(blog => {
                assert(Object.keys(blog).includes('id'), `${JSON.stringify(blog)} does not have property id`)
            });
        })
    })

    describe('POST', () => {
        test('blog added', async () => {
            const request = {
                ...testHelper.singleBlog,
                userId: String(testUser._id)
            }

            const response = await api
                .post('/api/blogs')
                .set({
                    authorization: `Bearer ${token}`
                })
                .send(request)
                .expect(201)

            const blogsAfterCreate = await testHelper.blogsInDb()
            assert.strictEqual(testHelper.initialBlogs.length + 1, blogsAfterCreate.length)
            const { id, ...rest } = response.body;

            const expectedResponse = {
                ...testHelper.singleBlog,
                user: String(testUser._id)
            }

            assert.deepStrictEqual(rest, expectedResponse)
        })

        test('fails without token', async () => {
            const request = {
                ...testHelper.singleBlog,
                userId: String(testUser._id)
            }

            const response = await api
                .post('/api/blogs')
                .send(request)
                .expect(401)
        })

        test('success without like property', async () => {
            const { likes, ...blogWithoutLikes } = testHelper.singleBlog;

            const request = {
                ...blogWithoutLikes,
                userId: String(testUser._id)
            }

            const response = await api
                .post('/api/blogs')
                .set({
                    authorization: `Bearer ${token}`
                })
                .send(request)
                .expect(201)

            const blogsAfterCreate = await testHelper.blogsInDb()
            assert.strictEqual(testHelper.initialBlogs.length + 1, blogsAfterCreate.length)
            const { likes: respLikes, ...rest } = response.body;
            assert.strictEqual(0, respLikes)
        })

        test('fails without title property', async () => {
            const { title, ...blogWithoutTitle } = testHelper.singleBlog;

            const request = {
                ...blogWithoutTitle,
                userId: String(testUser._id)
            }

            await api
                .post('/api/blogs')
                .set({
                    authorization: `Bearer ${token}`
                })
                .send(request)
                .expect(400)
        })

        test('fails without url property', async () => {
            const { url, ...blogWithoutUrl } = testHelper.singleBlog;

            const request = {
                ...blogWithoutUrl,
                userId: String(testUser._id)
            }

            await api
                .post('/api/blogs')
                .set({
                    authorization: `Bearer ${token}`
                })
                .send(request)
                .expect(400)
        })
    })

    describe('DELETE', () => {
        test('blog deleted', async () => {
            const blogsInDb = await testHelper.blogsInDb();
            const blogToDelete = blogsInDb[blogsInDb.length - 1];

            const response = await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .set({
                    authorization: `Bearer ${token}`
                })
                .expect(204)

            const blogsInDbAfterDelete = await testHelper.blogsInDb();
            assert.strictEqual(blogsInDb.length - 1, blogsInDbAfterDelete.length)
        })
    })

    describe('UPDATE', () => {
        test('likes updated', async () => {
            const blogsInDb = await testHelper.blogsInDb();
            const blogBeforeUpdate = blogsInDb[blogsInDb.length - 1];

            const updateRequest = {
                likes: blogBeforeUpdate.likes + 1
            };

            const response = await api
                .put(`/api/blogs/${blogBeforeUpdate.id}`)
                .send(updateRequest)
                .expect(200)

            const blogsInDbAfterUpdate = await testHelper.blogsInDb();
            const blogAfterUpdate = blogsInDbAfterUpdate.find((b) => b.id == blogBeforeUpdate.id);
            assert.strictEqual(blogBeforeUpdate.likes + 1, blogAfterUpdate.likes)
            assert.strictEqual(blogBeforeUpdate.likes + 1, response.body.likes)
        })
    })

    after(async () => {
        await mongoose.connection.close()
    })
})