import React, { useState } from 'react';
import './Authform.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faEnvelope, faLock ,faImage} from '@fortawesome/free-solid-svg-icons';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword , updateProfile} from 'firebase/auth';
import { auth,database ,firestore} from "../firebase";
import { ref as dbRef, set as dbSet } from "firebase/database";


library.add(faUser, faEnvelope, faLock, faImage);

const Authform  = ({ action: propAction }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [errorCode, setErrorCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [action, setAction] = useState(propAction || "Sign Up");  // fallback to "Sign Up"
  const [imageData, setImageData] = useState(null);

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
  const setErrorState = (error) => {
    setErrorCode(error.code);
    setErrorMessage(error.message);
  };

  const closeAuthForm = () => {
    setEmail("");
    setPass("");
    setName("");
    setErrorCode("");
    setErrorMessage("");
    setImageData(null);
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (action === "Sign Up") {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await dbSet(dbRef(database, `users/${user.uid}`), {
        name: name,
        email: email,
        imageBase64: imageData,
      });

      console.log("User signed up successfully");

      // Optionally show success UI or redirect
      alert("Sign Up Successful!");

      // Reset the form
      setEmail("");
      setPass("");
      setName("");
      setImageData(null);
    } else {
      await signInWithEmailAndPassword(auth, email, pass);
      alert("Login Successful!");
    }

    closeAuthForm();
  } catch (error) {
    setErrorState(error);
  }
};


  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>

        {/* <div className='submit-form'>
          <div className={action === "Login" ? "submit grey" : "submit"} onClick={() => setAction("Sign Up")}>Sign Up</div>
          <div className={action === "Sign Up" ? "submit grey" : "submit"} onClick={() => setAction("Login")}>Login</div>
        </div> */}
      </div>

      <form className='form-input' onSubmit={handleSubmit}>
        {action === "Login" ? null :
          <div className='input'>
            <FontAwesomeIcon className='icon' icon="user" />
            <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        }

        <div className='input'>
          <FontAwesomeIcon className='icon' icon="envelope" />
          <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className='input'>
          <FontAwesomeIcon className='icon' icon="lock" />
          <input type='password' placeholder='Password' value={pass} onChange={(e) => setPass(e.target.value)} />
        </div>
                {action === "Login" ? null :

        <div className='input'>
          <FontAwesomeIcon className='icon' icon="image" />
          <input type="file" accept="image/*" placeholder='upload your image'  onChange={handleFileChange} />

        </div>
}
        {action === "Sign Up" ? null :
          <div className='forgot-password'>Lost Password? <span>Click Here!</span></div>
        }

        <div className='submit-form'>
          <button className='submit' type="submit">{action === "Sign Up" ? "Sign Up" : "Login"}</button>
        </div>
      </form>

      {errorMessage && (
        <div className='error-message'>
          <p>{errorCode}</p>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Authform;
