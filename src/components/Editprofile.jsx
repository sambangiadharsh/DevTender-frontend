
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import ProfileCard from "./ProfileCrad";
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import axios from 'axios';
const Editprofile = ({user}) => {
    
    const [firstName,setfirstName]=useState(user.firstName);
    const [lastName,setlastName]=useState(user.lastName);
    const [age,setAge]=useState(user.age);
    const [gender,setGender]=useState(user.gender || "");
    const [about,setAbout]=useState(user.about);
    const [photoUrl,setPhotoUrl]=useState(user.photoUrl);
    const [showToast,setShowtoast]=useState(false);
    const dispatch=useDispatch();
    const saveProfile=async()=>{
        const res=await axios.patch(BASE_URL+"/profile/edit",{firstName,lastName,age,gender,photoUrl,about},{withCredentials:true});
        dispatch(addUser(res?.data?.data));
        setShowtoast(true);
        setTimeout(()=>{
           setShowtoast(false);
        },3000)
    }
  return (
    user && (
    <>
   
<div className='flex justify-center'>
  <div className="card bg-neutral mx-7 text-neutral-content w-96 my-3">
    <div className="card-body items-center text-center">
      <h2 className="card-title text-center">Edit Profile</h2>

      <div className="w-full text-left">
        <label className="block text-sm font-medium">Firstname</label>
        <input 
          type="text" 
          className="input input-bordered w-full mt-1" 
          value={firstName} 
          onChange={(e) => setfirstName(e.target.value)} 
         
        />
      </div>

      <div className="w-full text-left mt-3">
        <label className="block text-sm font-medium">Lastname</label>
        <input 
          
          className="input input-bordered w-full mt-1" 
          value={lastName} 
          onChange={(e) => setlastName(e.target.value)} 
          
        />
      </div>
      <div className="w-full text-left">
        <label className="block text-sm font-medium">photoUrl</label>
        <input 
          type="text" 
          className="input input-bordered w-full mt-1" 
          value={photoUrl} 
          onChange={(e) => setPhotoUrl(e.target.value)} 
         
        />
      </div>
      <div className="w-full text-left">
        <label className="block text-sm font-medium">Age</label>
        <input 
          type="text" 
          className="input input-bordered w-full mt-1" 
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
         
        />
      </div>
      <div className="w-full text-left">
        <label className="block text-sm font-medium">Gender</label>
        <input 
          type="text" 
          className="input input-bordered w-full mt-1" 
          value={gender} 
          onChange={(e) => setGender(e.target.value)} 
         
        />
      </div>
      <div className="w-full text-left">
        <label className="block text-sm font-medium">About</label>
        <input 
          type="text" 
          className="input input-bordered w-full mt-1" 
          value={about} 
          onChange={(e) => setAbout(e.target.value)} 
         
        />
      </div>
      <p className='text-red-800'></p>

      <div className="card-actions justify-end mt-2">
        <button className="btn btn-primary" onClick={saveProfile} >Save profile</button>
      </div>
    </div>
  </div>
  <div>
    <ProfileCard user={{firstName,lastName,about,age,gender,photoUrl}}/>
  </div>

</div>

 {showToast &&(
    <div className="toast toast-top toast-center">
    
    <div className="alert alert-success">
      <span>Message sent successfully.</span>
    </div>
  </div>
 )}
    </>

  ))
}

export default Editprofile;