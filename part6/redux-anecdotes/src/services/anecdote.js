import axios from 'axios'

const baseUrl = 'http://localhost:3000/anecdotes'

const create = newAnecdote => {
    const request = axios.post(baseUrl, newAnecdote)
    return request.then((response) => response.data)
}

const update = (id, updateData) => {
    const request = axios.put(`${baseUrl}/${id}`, updateData)
    return request.then((response) => response.data)
}


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default { create, getAll, update }