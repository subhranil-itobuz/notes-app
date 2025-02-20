import React, { useState } from 'react'
const ChatContext = React.createContext()

const ChatProvider = (props) => {
  const [room, setRoom] = useState()
  const [chatReceiverId, setChatReceiverId] = useState()

  return (
    <ChatContext.Provider value={{
      room,
      setRoom,
      chatReceiverId,
      setChatReceiverId
    }}>
      {props.children}
    </ChatContext.Provider>
  )
}

export { ChatProvider, ChatContext }