import React, { useEffect, useState } from 'react';
import { auth, database } from '../firebase';
import { ref as dbRef, get } from 'firebase/database';

const Profile = () => {
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
    <div className="profile-container">
      <h2>User Profile</h2>
      {userData?.imageBase64 && (
        <img
          src={userData.imageBase64}
          alt="User"
          className="profile-image"
          style={{ width: "150px", height: "150px", borderRadius: "50%" }}
        />
      )}
      <p><strong>Name:</strong> {currentUser?.displayName}</p>
      <p><strong>Email:</strong> {currentUser?.email}</p>
    </div>
  );
};

export default Profile;
