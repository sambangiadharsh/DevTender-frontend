import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import axios from 'axios';

const Navbar = () => {
  const user=useSelector((store)=>store.user);
  
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());  // Remove user from state
      navigate("/login");  // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error.response?.data?.message || error.message);
    }
  };
  return (
    <div>
        <div className="navbar bg-base-300">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-26 md:w-auto" />
    </div>
    
    <div className="dropdown dropdown-end flex items-center">
    
    {user?.firstName && <p className="px-4">Welcome {user.firstName}</p>}
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
        <img
  className="w-12 h-12 rounded-full object-cover"
  alt="User Profile"
  src={user && user.photoUrl ? user.photoUrl : "https://raymetrics.com/wp-content/uploads/2016/08/dummy-prod-1.jpg"}
/>

        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-12 w-52 p-2 shadow">
          <li className='mt-12'>
          <Link to="/feed" >
            Home
          </Link>
        </li>
        <li>
          <Link to="/profile" >
            Profile
          </Link>
        </li>
        <li><Link to="/connections">Connections</Link></li>
        <li><Link to="/requests">Requests</Link></li>
        <li><a>Settings</a></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
 
  </div>
    
</div>
    </div>
  )
}

export default Navbar
