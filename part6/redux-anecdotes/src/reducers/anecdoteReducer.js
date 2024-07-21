import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const id = action.payload.id
      const updatedAnecdote = action.payload.updatedAnecdote;
      return state.map((anecdote) => anecdote.id !== id ? anecdote : updatedAnecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { addAnecdote, updateAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch(setAnecdotes(notes))
  }
}

export const createAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create({
      content: anecdote,
      votes: 0
    })
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes;
    const votedAnecdote = { ...anecdotes.find((anc) => anc.id == id) }
    votedAnecdote.votes++
    const updatedAnecdote = await anecdoteService.update(id, votedAnecdote)
    dispatch(updateAnecdote({ id, updatedAnecdote }))
  }
}

export default anecdoteSlice.reducer