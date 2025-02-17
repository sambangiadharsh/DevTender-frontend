import React, { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {
    const dispatch=useDispatch();
    const connections=useSelector((store)=>store.connections);
    const fetchUser=async()=>{
        try{
            const res=await axios.get(BASE_URL+"/user/connections",{withCredentials:true});
        console.log(res);
        dispatch(addConnections(res?.data?.data));
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        fetchUser();
    },[])
    if(!connections)return ;
    if(connections.length==0) return <h1 className='flex justify-between items-center'> No connections Found.</h1>
  return (
  
    <div className="min-h-screen p-6 flex items-center justify-center bg-gray-100">
    <div className="w-full max-w-5xl bg-white p-8 rounded-xl shadow-2xl">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
        Connections
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {connections.map((row, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            {/* Profile Section */}
            <div className="flex flex-col items-center">
              <img
                src={row.photoUrl || "https://images.unsplash.com/photo-1542702937-506268e68902?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                alt={`${row.firstName} ${row.lastName}`}
                className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
              />
              <h2 className="mt-4 text-2xl font-bold text-gray-800">
                {row.firstName} {row.lastName}
              </h2>
              <p className="text-gray-600">{row.emailId}</p>
            </div>
  
            {/* Details Section */}
            <div className="mt-6 space-y-3">
              <div className="flex justify-between border-b pb-1">
                <span className="font-semibold text-gray-700">Age:</span>
                <span className="text-gray-600">{row.age}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-semibold text-gray-700">Gender:</span>
                <span className="text-gray-600">{row.gender}</span>
              </div>
              <p className="text-gray-600">
                <span className="font-semibold">About:</span> {row.about}
              </p>
            </div>
  
            {/* Skills Section */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700">Skills</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {row.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-medium shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  

  )
}

export default Connections;