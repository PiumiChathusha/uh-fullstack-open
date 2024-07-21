import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogCreateForm = ({ onBlogAdd }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogCreate = async (event) => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }
    await onBlogAdd(newBlog)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogCreate}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="title"
            data-testid='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="author"
            data-testid='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="url"
            data-testid='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const NewBlog = ({ onBlogAdd }) => {
  const [newBlog, setNewBlog] = useState(false)

  const onBlogAddList = (newBlog) => {
    setNewBlog(false)
    onBlogAdd(newBlog)
  }

  const newBlogCancel = () => {
    setNewBlog(false)
  }

  if (newBlog) {
    return (
      <div>
        <BlogCreateForm onBlogAdd={onBlogAddList} />
        <button onClick={() => newBlogCancel()}>cancel</button>
      </div>
    )
  } else {
    return (<button onClick={() => setNewBlog(true)}>new blog</button>)
  }
}

NewBlog.propTypes = {
  onBlogAdd: PropTypes.func.isRequired
}

export default NewBlog