import React from 'react';
import { removeFeed } from '../utils/feedSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { FaVenusMars, FaUserAlt, FaRegCalendarAlt, FaInfoCircle } from 'react-icons/fa';

const Card = ({ user }) => {
  if (!user) return null;
  const dispatch = useDispatch();

  const handleFeed = async (status, toId) => {
    try {
      await axios.post(`${BASE_URL}/request/send/${status}/${toId}`, {}, { withCredentials: true });
      dispatch(removeFeed(toId));
    } catch (err) {
      console.error("Error sending request:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gradient-to-br from-blue-500 to-purple-600">
      {/* Enhanced card with glassmorphism effect */}
      <div className="rounded-2xl shadow-2xl w-96 max-w-lg bg-white bg-opacity-10 backdrop-blur-lg border border-gray-200 p-6 transition-all transform hover:scale-105 hover:shadow-xl">
        <div className="flex flex-col items-center text-white">
          {/* User Photo with border glow */}
          <img
            src={user?.photoUrl || "https://via.placeholder.com/150"}
            alt={`${user?.firstName || "Unknown"} ${user?.lastName || "User"}`}
            className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg"
          />

          {/* User Name */}
          <h2 className="mt-4 text-3xl font-bold text-white">
            {user?.firstName || "Unknown"} {user?.lastName || ""}
          </h2>

          {/* User Info Fields with Icons */}
          <div className="mt-4 w-full space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-white/20">
              <FaVenusMars className="text-lg text-gray-300" />
              <span className="text-gray-100">{user?.gender || "Not specified"}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/20">
              <FaRegCalendarAlt className="text-lg text-gray-300" />
              <span className="text-gray-100">{user?.age || "Not specified"}</span>
            </div>
          </div>

          {/* About Section */}
          <p className="mt-4 text-sm text-center text-gray-200 px-4">
            <FaInfoCircle className="inline mr-1 text-yellow-400" />
            {user?.about || "No description available."}
          </p>

          {/* Action Buttons */}
          <div className="flex justify-around w-full mt-6 space-x-4">
            <button
              className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
              onClick={() => handleFeed("ignore", user._id)}
            >
              Ignore
            </button>
            <button
              className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
              onClick={() => handleFeed("interested", user._id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
