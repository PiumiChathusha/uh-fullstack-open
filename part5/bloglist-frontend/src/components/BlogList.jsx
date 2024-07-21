import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, onBlogRemove, onBlogLike, user }) => {
  const [blogDetailView, setBlogDetailView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const onBlogView = () => {
    setBlogDetailView(!blogDetailView)
  }

  const onBlogLikeHandler = async () => {
    onBlogLike(blog)
  }

  const onBlogRemoveHandler = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      onBlogRemove(blog)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        <p style={{ display: 'inline-block', margin: '2px' }} data-testid="blog-title"> {blog.title} {blog.author}</p>
        <button onClick={onBlogView}>{blogDetailView ? 'Hide' : 'View'}</button>
      </div>
      {
        blogDetailView &&
        <div>
          <a href={blog.url}>{blog.url}</a>
          <div>
            <p style={{ display: 'inline-block', margin: '2px' }}>likes : <span data-testid="likecount">{blog.likes}</span></p>
            <button onClick={onBlogLikeHandler}>like</button>
          </div>
          <p>{blog.author}</p>
          {(user.id === blog.user.id) && <button onClick={onBlogRemoveHandler}>remove</button>}
        </div>
      }
    </div>
  )
}

const BlogList = ({ blogs, onBlogRemove, onBlogLike, user }) => {
  return (
    <div>
      {
        blogs.map(blog =>
          <Blog key={blog.id} user={user} blog={blog} onBlogRemove={onBlogRemove} onBlogLike={onBlogLike} />
        )
      }
    </div>

  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  onBlogRemove: PropTypes.func,
  onBlogLike: PropTypes.func
}

export default BlogList