import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import NewBlog from './components/NewBlog'
import User from './components/User'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    })
  }, [])

  const onBlogAdd = async (newBlog) => {
    try {
      const addedBlog = await blogService.create({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url
      })
      setBlogs([...blogs, addedBlog])
      createNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (exception) {
      createNotification('Error creating blog', true)
    }
  }

  const onBlogRemove = async (blog) => {
    try {
      await blogService.remove(blog.id)
      createNotification(`Removed blog ${blog.title} by ${blog.author}`)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    } catch {
      createNotification('Error removing blog', true)
    }
  }

  const onBlogLike = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        likes: blog.likes + 1
      })
      setBlogs(blogs.map(b => b.id !== blog.id ? b : updatedBlog))
    } catch {
      if (createNotification) createNotification('Error incrementing likes', true)
    }
  }

  const createNotification = (message, error = false) => {
    setNotification({ message, error })
    setTimeout(() => {
      setNotification(null)
    }, 2000)
  }

  const authContent = () => {
    return (
      <>
        <User user={user} setUser={setUser} />
        <NewBlog onBlogAdd={onBlogAdd} />
        <BlogList user={user} blogs={blogs} onBlogRemove={onBlogRemove} onBlogLike={onBlogLike} />
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      {!user && <LoginForm setUser={setUser} createNotification={createNotification} />}
      {user && authContent()}
    </div>
  )
}

export default App