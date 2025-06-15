import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'
const Sidebar = ({ onSelectUser }) => {
  
  return (
    
    <div className='sidebar'>
      <Navbar />
      <Search />
      <Chats onSelectUser={onSelectUser} />
    </div>
  )
}

export default Sidebar