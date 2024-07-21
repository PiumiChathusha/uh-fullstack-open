import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        update(state, action) {
            return action.payload.filter
        }
    },
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer