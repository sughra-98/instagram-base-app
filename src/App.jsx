// src/App.jsx

import "./App.css";
import { useState, useEffect } from "react";
import { onChildAdded, push, ref, set } from "firebase/database";
import { database, auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Outlet, Link  } from "react-router-dom";
import Authform from "./component/AuthForm";
import Createpost from "./component/Createpost";
import NewsFeed from "./component/NewsFeed";
import { useNavigate } from "react-router-dom";
import Sidebar from "./component/Sidebar"
import Chat from "./component/Chat";
import Profile from "./component/Profile";



function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [action, setAction] = useState("Sign Up");
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedInUser(user ?? null);
    });
    return () => unsubscribe();
  }, []);

const Layout = ({ action, setAction }) => {
  const [showForm, setShowForm] = useState(true);

  const handleNavigate = (newAction) => {
    setAction(newAction);
    setShowForm(true);
  };

  return (
    <div className="raw">
      <div className="align-items">
        <div className='text'>Welcome</div>
      <div className='underline'></div>

      <div className="submit-form">
        <div
          className={`submit ${action === "Sign Up" ? "submit grey" : "submit"}`}
          onClick={() => handleNavigate("Sign Up")}
        >
          Sign Up
        </div>
        <div
          className={`submit ${action === "Login" ? "submit grey" : "submit"}`}
          onClick={() => handleNavigate("Login")}
        >
          Login
        </div>
      </div>
      </div>
      {showForm && <Authform action={action} />}
    </div>
  );
};


const MainLayout = ({ loggedInUser }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

  

  
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout loggedInUser={loggedInUser} />}>

      <Route path="/" element={
        loggedInUser ? <NewsFeed /> : <Layout action={action} setAction={setAction} />
      } />

      <Route path="/createpost" element={
        loggedInUser ? <Createpost /> : <Layout action={action} setAction={setAction} />
      } />

   <Route path="/chat" element={
        loggedInUser ? <Chat /> : <Layout action={action} setAction={setAction} />
      } />
   
   <Route path="/profile" element={
        loggedInUser ? <Profile /> : <Layout action={action} setAction={setAction} />
      } />
   

    
    </Route>
  )
);



  return (
    <>
      <div className="app">
        <div>
        <RouterProvider router={router} /></div>
      </div>

    </>
  );
}

export default App;
