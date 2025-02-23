import React, { useState } from 'react'
import { chatInstance } from '../utils/axiosSetup'
const ChatContext = React.createContext()

const ChatProvider = (props) => {
  const [room, setRoom] = useState()


  const sendChat = async (receiverId, data) => {
    try {
      const res = await chatInstance.post(`/sendMessage/${receiverId}`, { message: data })

      if (res.data.success) {
        return res
      }

    } catch (error) {
      console.error(error)
    }
  }

  const getChat = async () => {
    try {
      const res = await chatInstance.get(`/getMessage/${room}`)

      if (res.data.success) {
        return res
      }

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ChatContext.Provider value={{
      room,
      setRoom,
      sendChat,
      getChat
    }}>
      {props.children}
    </ChatContext.Provider>
  )
}

export { ChatProvider, ChatContext }