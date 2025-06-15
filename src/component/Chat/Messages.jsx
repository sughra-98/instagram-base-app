import React, { useEffect, useState } from 'react';
import { database, auth } from '../../firebase';
import { ref as dbRef, onValue } from 'firebase/database';
import Message from './Message';

const Messages = ({ user }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!user) return;

    const currentUserId = auth.currentUser?.uid;
    const selectedUserId = user.uid;

    // Create chatId (combine UIDs in a consistent order)
    const chatId = currentUserId > selectedUserId
      ? currentUserId + selectedUserId
      : selectedUserId + currentUserId;

    const messagesRef = dbRef(database, `messages/${chatId}`);

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedMessages = Object.values(data);
        setMessages(loadedMessages);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe(); // Cleanup on unmount/change
  }, [user]);

  return (
    <div className='messages'>
      {messages.map((msg, index) => (
        <Message key={index} message={msg} />
      ))}
    </div>
  );
};

export default Messages;
