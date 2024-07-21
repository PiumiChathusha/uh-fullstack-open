const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const testHelper = require('../tests/test_helper');
const bcrypt = require('bcrypt')

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

router.post('/data', async (request, response) => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  const { password, ...singleUserDb } = testHelper.singleUser
  singleUserDb.passwordHash = await bcrypt.hash(password, 10)
  const testUser = await User.create(singleUserDb);
  const blogs = await Blog.insertMany(testHelper.initialBlogs.map((b) => new Blog({ ...b, user: String(testUser._id) })));
  testUser.blogs = blogs.map((b)=> b._id)
  testUser.save()

  response.status(200).end()
})

module.exports = router