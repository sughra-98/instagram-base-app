import React, { useEffect, useState } from "react";
import { ref, onChildAdded } from "firebase/database";
import { database } from "../firebase";

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsRef = ref(database, "posts");

    onChildAdded(postsRef, (snapshot) => {
      setPosts((prev) => [...prev, { key: snapshot.key, ...snapshot.val() }]);
    });
  }, []);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="post-list">
      <h2>All Posts</h2>
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map((post) => (
        <div className="post-card" key={post.key} style={{ border: "1px solid #ccc", marginBottom: "20px", padding: "10px" }}>
          {post.imageBase64 && (
            <img
              src={post.imageBase64}
              alt="User post"
              style={{ width: "200px", height: "auto" }}
            />
          )}
          <p><strong>{post.email || "Anonymous"}</strong></p>
          <p>{post.text}</p>
          <small>{formatTime(post.timestamp)}</small>
        </div>
      ))}
    </div>
  );
};


export default NewsFeed;