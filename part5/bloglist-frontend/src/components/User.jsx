import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const User = ({ user, setUser }) => {

  const onLogout = (event) => {
    event.preventDefault()
    setUser(null)
    blogService.setToken(null)
    localStorage.removeItem('loggedBlogappUser')
  }

  return (
    <div>
      <p style={{ display: 'inline-block', margin: '2px' }}>{user.name} logged in</p>
      <button onClick={onLogout}>logout</button>
    </div>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired
}

export default User