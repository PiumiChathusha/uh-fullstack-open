import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext' 

const Anecdote = ({ anecdote }) => {
    const queryClient = useQueryClient()
    const notificationDispatch = useNotificationDispatch()

    const voteAnecdoteeMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries('anecdotes')
            notificationDispatch({
                type: 'NOTIFY',
                payload: `you voted '${anecdote.content}'`,
            })
        },
    })

    const handleVote = () => {
        voteAnecdoteeMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    }

    return (
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = ({ anecdotes }) => {
    return (
        anecdotes.map(anecdote => <Anecdote anecdote={anecdote} key={anecdote.id} />)
    )
}

export default AnecdoteList;
