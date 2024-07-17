import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Anecdote = ({ anecdote, votes }) => (
  <>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </>
)

const AnecdoteMostVotes = ({ anecdote, votes }) => {
  if (votes == 0) {
    return (
      <p>Voting yet to begin</p>
    )
  }

  return (
    <Anecdote anecdote={anecdote} votes={votes} />
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  // Generate number with max limit
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }

  const handleNextAnecdote = () => {
    const randomNum = getRandomInt(anecdotes.length);

    // Retry if new index is equal to old index
    if (randomNum == selected) return handleNextAnecdote();

    setSelected(randomNum)
  }

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected]++;
    setVotes(newVotes)
  }

  // Index of max value of an index
  // https://www.geeksforgeeks.org/how-to-get-index-of-greatest-value-in-an-array-in-javascript/
  function indexOfMax(arr) {
    return arr.reduce((maxIndex, elem, i, arr) =>
      elem > arr[maxIndex] ? i : maxIndex, 0);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button text="vote" onClick={handleVote} />
      <Button text="next anecdote" onClick={handleNextAnecdote} />
      <h1>Anecdote with most votes</h1>
      <AnecdoteMostVotes anecdote={anecdotes[indexOfMax(votes)]} votes={votes[indexOfMax(votes)]} />
    </div>
  )
}

export default App