import { useEffect } from 'react'
import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "NOTIFY":
      return action.payload
    case "CLEAR":
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  useEffect(() => {
    if (notification !== null) {
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
    }
  }, [notification])

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext
