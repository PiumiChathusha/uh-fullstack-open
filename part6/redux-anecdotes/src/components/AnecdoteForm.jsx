import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const [anecdote, setAnecdote] = useState('');

    const add = async (event) => {
        event.preventDefault()
        dispatch(createAnecdote(anecdote))
        dispatch(setNotification(`you added '${anecdote}'`))
        setAnecdote('')
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={add}>
                <div><input value={anecdote} name="anecdote" onChange={({ target }) => setAnecdote(target.value)} /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm;
