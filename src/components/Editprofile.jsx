import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ProfileCard from './ProfileCrad';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import axios from 'axios';

const Editprofile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, age, gender, photoUrl, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    user && (
      <>
        <div className="flex flex-col md:flex-row items-start justify-center min-h-screen p-4 bg-gradient-to-r from-gray-900 to-gray-800">
          {/* Edit Form */}
          <div className="w-full max-w-lg bg-gray-900 text-white shadow-xl rounded-2xl p-6 mx-4 mb-6 md:mb-0">
            <h2 className="text-3xl font-semibold mb-6 text-center">Edit Profile</h2>

            <div className="space-y-4">
              {/* Input Field */}
              {[
                { label: 'First Name', value: firstName, setter: setFirstName },
                { label: 'Last Name', value: lastName, setter: setLastName },
                { label: 'Photo URL', value: photoUrl, setter: setPhotoUrl },
                { label: 'Age', value: age, setter: setAge },
                { label: 'Gender', value: gender, setter: setGender },
                { label: 'About', value: about, setter: setAbout },
              ].map((field, index) => (
                <div key={index} className="w-full">
                  <label className="block text-sm font-medium mb-1">{field.label}</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg bg-gray-800 border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                  />
                </div>
              ))}

              {/* Save Button */}
              <div className="mt-4 text-right">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow-lg transition-all duration-300"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>

          {/* Profile Preview */}
          <div className="w-full max-w-sm">
            <ProfileCard
              user={{
                firstName,
                lastName,
                about,
                age,
                gender,
                photoUrl,
              }}
            />
          </div>
        </div>

        {/* Success Toast */}
        {showToast && (
          <div className="fixed top-5 right-5 z-50">
            <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg animate-fadeInOut">
              ✅ Profile updated successfully!
            </div>
          </div>
        )}
      </>
    )
  );
};

export default Editprofile;
