const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const testHelper = require('./test_helper');

const api = supertest(app)

describe('blog api', () => {

    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(testHelper.initialBlogs);
    })

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

    describe('create new blog', () => {
        test('blog added', async () => {
            const response = await api
                .post('/api/blogs')
                .send(testHelper.singleBlog)
                .expect(201)

            const blogsAfterCreate = await testHelper.blogsInDb()
            assert.strictEqual(testHelper.initialBlogs.length + 1, blogsAfterCreate.length)
            const { id, ...rest } = response.body;
            assert.deepStrictEqual(testHelper.singleBlog, rest)
        })

        test('success without like property', async () => {
            const { likes, ...blogWithoutLikes } = testHelper.singleBlog;

            const response = await api
                .post('/api/blogs')
                .send(blogWithoutLikes)
                .expect(201)

            const blogsAfterCreate = await testHelper.blogsInDb()
            assert.strictEqual(testHelper.initialBlogs.length + 1, blogsAfterCreate.length)
            const { id, ...rest } = response.body;
            assert.deepStrictEqual({ ...blogWithoutLikes, likes: 0 }, rest)
        })

        test('fails without title property', async () => {
            const { title, ...blogWithoutLikes } = testHelper.singleBlog;

            await api
                .post('/api/blogs')
                .send(blogWithoutLikes)
                .expect(400)
        })

        test('fails without url property', async () => {
            const { url, ...blogWithoutLikes } = testHelper.singleBlog;

            await api
                .post('/api/blogs')
                .send(blogWithoutLikes)
                .expect(400)
        })
    })


    after(async () => {
        await mongoose.connection.close()
    })
})