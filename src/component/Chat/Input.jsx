import React, { useState } from 'react';
import { auth, database } from '../../firebase';
import { ref as dbRef, push, serverTimestamp } from 'firebase/database';

const Input = ({ user }) => {
  const [text, setText] = useState('');

  const handleSend = async () => {
    if (!text.trim()) return;

    const currentUserId = auth.currentUser?.uid;
    const selectedUserId = user?.uid;

    if (!currentUserId || !selectedUserId) return;

    // Generate consistent chatId
    const chatId =
      currentUserId > selectedUserId
        ? currentUserId + selectedUserId
        : selectedUserId + currentUserId;

    const messageData = {
      text,
      senderId: currentUserId,
      timestamp: Date.now(),
    };

    // Push message to Firebase
    await push(dbRef(database, `messages/${chatId}`), messageData);

    // Clear input field
    setText('');
  };

  return (
    <div className='input-info'>
      <input
        type='text'
        placeholder='Type something...'
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <div className='send'>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
