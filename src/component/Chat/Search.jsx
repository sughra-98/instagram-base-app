import React, { useState, useEffect } from 'react';
import { auth, database } from '../../firebase';
import { ref as dbRef, get, child } from 'firebase/database';

const Search = () => {
  const [userName, setUserName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = async () => {
    try {
      const snapshot = await get(dbRef(database, 'users'));

      if (snapshot.exists()) {
        const usersData = snapshot.val();
        console.log('Users data:', usersData);
        const results = Object.entries(usersData)
         .filter(([uid, user]) =>
    user.name?.toLowerCase().includes(userName.toLowerCase()) &&
    uid !== currentUser?.uid
  )
  .map(([uid, user]) => ({ uid, ...user }));


        setSearchResults(results);
        setError(results.length === 0 ? 'No user found' : '');
      } else {
        setError('No users in database');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong while searching');
    }
  };

  return (
    <div className='search'>
      <div className='searchForm'>
        <input
          type='text'
          placeholder='Find a user'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
      </div>

      {error && <span style={{ color: 'red' }}>{error}</span>}

      {searchResults.map((user) => (
        <div className='userChat' key={user.uid}>
          <img
            src={user.imageBase64 }
            alt='User'
          />
          <div className='userChatInfo'>
            <span>{user.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Search;
