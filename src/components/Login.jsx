import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser,removeUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

    const [emailId,setEmailId]=useState("");
    const [password,setPassword]=useState("");
    const [firstName,setfirstName]=useState("");
    const [lastName,setlastName]=useState("");
    const [error,setError]=useState("");
    const [isLoginForm,setisLoginForm]=useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleSignup=async()=>{
      try{
        const res=await axios.post(BASE_URL+"/signup",{firstName,lastName,emailId,password},{withCredentials:true});
        dispatch(addUser(res?.data?.data));
        navigate("/profile");
      }
      catch(err){
         console.log(err);
      }
    }
    const handleLogin=async()=>{

        try{
            const res=await axios.post(BASE_URL+"/login",{
                emailId,
                password
            },{withCredentials:true});
         
            dispatch(addUser(res.data));
            return navigate("/feed");
        }
        catch(err){
          setError(err?.response?.data|| "something went wrong");
            console.log(err);
        }
    }
  
  return (
    <div className="flex justify-center">
  <div className="card bg-neutral text-neutral-content w-96 my-3">
    <div className="card-body items-center text-center">
      <h2 className="card-title text-center">
        {isLoginForm ? "Login" : "SignUp"}
      </h2>

      {/* Signup Fields */}
      {!isLoginForm && (
        <>
          <div className="w-full text-left">
            <label className="block text-sm font-medium">First Name:</label>
            <input
              type="text"
              className="input input-bordered w-full mt-1"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
            />
          </div>
          <div className="w-full text-left">
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              className="input input-bordered w-full mt-1"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
            />
          </div>
        </>
      )}

      {/* Email Input */}
      <label className="input input-bordered flex items-center gap-2 mt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-5 w-8 opacity-70"
        >
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input
          type="text"
          className="grow"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          placeholder="Email"
        />
      </label>

      {/* Password Input */}
      <label className="input input-bordered flex items-center gap-2 mt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-5 w-8 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="password"
          className="grow"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </label>

      {/* Error Message */}
      {error && <p className="text-red-800 mt-2">{error}</p>}

      {/* Action Button and Form Toggle */}
      <div className="card-actions justify-end mt-4">
        <button
          className="btn btn-primary"
          onClick={isLoginForm ? handleLogin : handleSignup}
        >
          {isLoginForm ? "Login" : "Signup"}
        </button>
      </div>
      <div className="mt-2">
        <p
          className="cursor-pointer hover:underline"
          onClick={() => setisLoginForm(!isLoginForm)}
        >
          {isLoginForm ? "New user? Sign up" : "Already registered? Login"}
        </p>
      </div>
    </div>
  </div>
</div>
  )
}

export default Login