import { createSlice } from '@reduxjs/toolkit'

const NotificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        notify(state, action) {
            console.log(action)
            return action.payload
        }
    },
})

export const { notify } = NotificationSlice.actions

export const setNotification = (notification) => {
    return async dispatch => {
        dispatch(notify(notification))
        setTimeout(() => {
            dispatch(notify(null))
        }, 5000)
    }
}

export default NotificationSlice.reducer



