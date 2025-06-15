import React from 'react'
import { SidebarData } from './SidebarData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'
import { auth } from "../firebase";
import {  signOut } from "firebase/auth";


const sidebar = () => {
  return (
    <div className='siderbar'>
        <ul className='sidebarList'>

       { SidebarData.map((val,key)=>{
        return val.title === "Logout" ? 
        ( 
        <li className='row' key={key} onClick={() =>
                  signOut(auth).then(() => {
                    console.log("signed out");
                  })
                }
        >
                      <div>
                <FontAwesomeIcon id = 'icon'className='icon' icon= {val.icon} />
            </div>
            <div id='title'>
                {val.title}
            </div>
            </li>) : 
        <Link to={val.link} key={key} className='row'>

            <div>
                <FontAwesomeIcon id = 'icon'className='icon' icon= {val.icon} />
            </div>
            <div id='title'>
                {val.title}
            </div>
        </Link>

       }) }
       </ul>
    </div>
  )
}

export default sidebar