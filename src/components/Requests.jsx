import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const requestReview = async (status, reqId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${reqId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(reqId));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/request/received`, {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (!Array.isArray(requests)) return <div>Loading...</div>;
  if (requests.length === 0)
    return (
      <h1 className="flex justify-center items-center mt-10 text-2xl text-gray-700">
        No Requests Found.
      </h1>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
          Incoming Requests 📩
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {requests.map((row, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
            >
              {/* Profile Image */}
              <div className="flex flex-col items-center mb-4">
                <img
                  src={
                    row?.fromUserId?.photoUrl ||
                    "https://via.placeholder.com/100"
                  }
                  alt={row.fromUserId?.firstName}
                  className="w-24 h-24 rounded-full border-4 border-blue-500"
                />
                <h2 className="text-2xl font-bold text-gray-800 mt-3">
                  {row.fromUserId?.firstName} {row.fromUserId?.lastName}
                </h2>
                <p className="text-gray-500">{row.fromUserId?.emailId}</p>
              </div>

              {/* Additional Info */}
              <div className="text-center text-gray-600 mb-4">
                <p>
                  <span className="font-semibold">Age:</span>{" "}
                  {row.fromUserId?.age}
                </p>
                <p>
                  <span className="font-semibold">Gender:</span>{" "}
                  {row.fromUserId?.gender}
                </p>
                <p>
                  <span className="font-semibold">About:</span>{" "}
                  {row.fromUserId?.about}
                </p>
              </div>

              {/* Skills */}
              {row.fromUserId?.skills?.length > 0 && (
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Skills 🛠️
                  </h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {row.fromUserId?.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xs px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 mt-4">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none"
                  onClick={() => requestReview("rejected", row._id)}
                >
                  ❌ Reject
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none"
                  onClick={() => requestReview("accepted", row._id)}
                >
                  ✅ Accept
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Requests;
