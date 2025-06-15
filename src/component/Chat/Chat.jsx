import React from 'react'
import Messages from './Messages'
import Input from './Input'

const Chat = ({ user }) => {
  if (!user) {
    return (
      <div className='chat'>
        <div className='chatInfo'>
          <span>Select a user to chat</span>
        </div>
      </div>
    );
  }

  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>{user.name}</span>
      </div>
      <Messages user={user} />
      <Input user={user} />
    </div>
  )
}

export default Chat
