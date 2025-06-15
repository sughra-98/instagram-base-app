import React, { useState } from "react";
import { push, ref, set } from "firebase/database";
import { database, auth } from "../firebase";
import './Createpost.css'
const Createpost = () => {

  const [text, setText] = useState("");
  const [imageData, setImageData] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageData(reader.result); // Base64 string
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!text || !imageData) {
      setMessage("Please add both image and text.");
      return;
    }

    const user = auth.currentUser;

    const postRef = push(ref(database, "posts"));
    await set(postRef, {
      uid: user.uid ,
      email: user.email ,
      text: text,
      imageBase64: imageData,
      timestamp: Date.now(),
    });

    setMessage("Post saved successfully!");
    setText("");
    setImageData(null);
  };



  return (
    
         <div className='container'>
      <div className='header'>
        <div className='text'>Create a Post</div>
        <div className='underline'></div>

      </div>

      <form  className="form-input" onSubmit={handleUpload}>
        <div className='input'>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        </div>
        <br />
        <div className='input'>

        <textarea
          placeholder="Write a caption..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
                </div>

        <br />
        <div className='submit-form'>

        <button className='submit' type="submit">Upload</button>
        </div>
      </form>
            {message && (
        <div className='error-message'>
          <p>{message}</p>
        </div>
      )}
      {imageData && <img src={imageData} alt="Preview" style={{ width: "200px" }} />}
    </div>
  );
};

export default Createpost;