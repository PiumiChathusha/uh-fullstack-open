import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const newAnecdoteeMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries('anecdotes')
      notificationDispatch({
        type: 'NOTIFY',
        payload: `you added '${anecdote.content}'`,
      })
    },
    onError: (error) => {
      notificationDispatch({
        type: 'NOTIFY',
        payload: error.response.data.error,
      })
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteeMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
