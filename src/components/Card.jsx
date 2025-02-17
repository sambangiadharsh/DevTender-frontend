import React from 'react';
import { removeFeed } from '../utils/feedSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constants';

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
    <div className="flex justify-center items-center min-h-screen p-4 my-8 bg-neutral">
      {/* Increase width with max-w-xl for a wider card */}
      <div className="rounded-xl shadow-lg w-96 max-w-l  bg-br-gray-3">
        <div className="flex flex-col items-center p-6">
          {/* User Photo */}
          <img 
            src={user?.photoUrl || "https://via.placeholder.com/150"}
            alt={`${user?.firstName || "Unknown"} ${user?.lastName || "User"}`}
            className="w-32 h-32 object-cover rounded-full border"
          />

          {/* User Name */}
          <h2 className="mt-4 text-2xl font-semibold text-white">
            {user?.firstName || "Unknown"} {user?.lastName || ""}
          </h2>

          {/* Aligned Fields */}
          <div className="mt-4 w-full">
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium text-white">Gender:</span>
              <span className="text-white">{user?.gender || "Not specified"}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium text-white">Age:</span>
              <span className="text-white">{user?.age || "Not specified"}</span>
            </div>
          </div>

          {/* About Section */}
          <p className="mt-4 text-white text-center px-2">
            {user?.about || "No description available."}
          </p>

          {/* Action Buttons */}
          <div className="flex justify-around w-full mt-6">
            <button 
              className="btn btn-error"
              onClick={() => handleFeed("ignore", user._id)}
            >
              Ignore
            </button>
            <button 
              className="btn btn-success"
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
