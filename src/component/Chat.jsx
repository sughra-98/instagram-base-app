import React, { useState } from 'react'; // ✅ make sure useState is imported
import Sidebar from './Chat/Sidebar';
import Chat from './Chat/Chat';
import "./Chat.css";

const chat = () => {
  const [selectedUser, setSelectedUser] = useState(null); // ✅ define the state

  return (
    <div className='home-chat'>
      <div className='container-chat'>
        <Sidebar onSelectUser={setSelectedUser} />
        <Chat user={selectedUser} />
      </div>
    </div>
  );
};

export default chat;
