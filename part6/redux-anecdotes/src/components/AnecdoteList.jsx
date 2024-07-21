import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter === '') {
            return state.anecdotes
        } else {
            return state.anecdotes.filter(anc => anc.content.toLowerCase().search(state.filter.toLowerCase()) >= 0)
        }
    })

    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote.id))
        dispatch(setNotification(`you voted '${anecdote.content}'`))
    }

    return (
        <div>
            {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList