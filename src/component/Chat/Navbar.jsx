import React, { useEffect, useState } from 'react';
import { auth, database } from '../../firebase';
import { ref as dbRef, get } from 'firebase/database';

const Navbar = () => {
    const [userData, setUserData] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          setCurrentUser(user); // Set state for user
          console.log("User is authenticated:", user);
  
          try {
            const snapshot = await get(dbRef(database, `users/${user.uid}`));
            console.log("Snapshot data:", snapshot.val());
  
            if (snapshot.exists()) {
              setUserData(snapshot.val());
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      });
  
      return () => unsubscribe();
    }, []);
  
  return (
    <div className='navbar'>
      <span className='logo'></span>
      <div className='user'>
        {userData?.imageBase64 && (
          <img
            src={userData.imageBase64}
            alt="User"
          />
        )}
        <span>{currentUser?.displayName} </span>
      </div>
    </div>
  )
}

export default Navbar