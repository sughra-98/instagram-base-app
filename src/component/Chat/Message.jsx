import React from 'react';
import { auth } from '../../firebase';

const Message = ({ message }) => {
  const isOwner = message.senderId === auth.currentUser?.uid;

  return (
    <div className={`message ${isOwner ? 'owner' : ''}`}>
      <div className="messageInfo">
        <img
          src="https://uobhomesiteprod.s3.me-south-1.amazonaws.com/2021/06/News-18-11-2019-1TH.jpg"
          alt=""
        />
        <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
      </div>

      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="attachment" />}
      </div>
    </div>
  );
};

export default Message;
