import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userdata = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userdata && Object.keys(userdata).length > 0) return; // Don't refetch if user exists
  
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true, // Sends cookies to backend
      });
       console.log(res.data);
      dispatch(addUser(res.data)); // Store user in Redux
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login"); // If token is invalid, redirect to login
      }
      console.error(err);
    }
  };
  

  useEffect(() => {
    fetchUser();
  },[]); // Empty dependency array means it runs only once

  return (
    <div>
      <Navbar />
      <main className="flex-grow p-4 pb-16">
        <Outlet/>
      </main>
      <Footer />
    </div>
  );
};

export default Body;
