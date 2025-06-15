import React, { useEffect, useState } from 'react';
import { ref as dbRef, get } from 'firebase/database';
import { database } from "../../firebase";

const Chats = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await get(dbRef(database, 'users'));
        if (snapshot.exists()) {
          const data = snapshot.val();
          const usersArray = Object.entries(data).map(([uid, userData]) => ({
            uid,
            ...userData
          }));
          setUsers(usersArray);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='Chats'>
      {users.map(user => (
        <div className='userChat' key={user.uid} onClick={() => onSelectUser(user)}>
          <img src={user.imageBase64 || "https://default-image.jpg"} alt="User" />
          <div className="userChatInfo">
            <span>{user.name}</span>
            <p></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
