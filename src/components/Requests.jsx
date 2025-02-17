import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import {addRequest, removeRequest} from "../utils/requestSlice"
const Requests = () => {
    const requests=useSelector((store)=>store.requests);
    const dispatch=useDispatch();

    const requestReview=async(status,reqId)=>{
      try{
          const res=await axios.post(BASE_URL+"/request/review/"+status+"/"+reqId,{},{withCredentials:true});
          console.log("art");
          dispatch(removeRequest(reqId));
      
      }catch(err){
        console.log(err);
      }
    }
    const fetchUsers=async()=>{
        try{
          const res=await axios.get(BASE_URL+"/user/request/received",{withCredentials:true});
       
          dispatch(addRequest(res?.data?.data));
        }
        catch(err){
           console.log(err);
        }

    }
    useEffect(()=>{
        fetchUsers();
    },[])
   
    if (!Array.isArray(requests)) return <div>Loading...</div>;
    if (requests.length === 0) return <h1 className='flex justify-center items-center mt-10'>No requests Found.</h1>;

    
  return (

    <div className="flex items-center justify-center min-h-screen  p-4">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Requests</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requests.map((row,index) => (
                <div key={index} className="bg-gray-200 p-4 rounded-lg shadow-md flex flex-col text-left items-center">
                    {/* Profile Image */}
                    <img src={row?.fromUserId?.photoUrl || "https://via.placeholder.com/100"} 
                         alt={row.fromUserId?.firstName} 
                         className="w-24 h-24 rounded-full border-2 border-gray-300 mb-3" />
                    
                    {/* Name & Email */}
                    <h2 className="text-xl font-semibold text-gray-800">{row.fromUserId?.firstName} {row.fromUserId?.lastName}</h2>
                    <p className="text-gray-500 text-sm">{row.fromUserId?.emailId}</p>

                    {/* Additional Info */}
                    <p className="text-gray-600 mt-2"><span className="font-semibold text-left">Age:</span> {row.fromUserId?.age}</p>
                    <p className="text-gray-600"><span className="font-semibold text-left">Gender:</span> {row.fromUserId?.gender}</p>
                    <p className="text-gray-600"><span className="font-semibold text-left">About:</span> {row.fromUserId?.about}</p>

                    {/* Skills */}
                    <div className="mt-3">
                        <h3 className="text-gray-700 font-medium">Skills:</h3>
                        <div className="flex flex-wrap gap-2 justify-center mt-1">
                            {row.fromUserId?.skills.map((skill, i) => (
                                <span key={i} className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                   
<div className='flex items-center justify-between'>
<button className="btn mx-4 btn-primary" onClick={()=>requestReview("rejected",row._id)}>Reject</button>
<button className="btn btn-secondary" onClick={()=>requestReview("accepted",row._id)}>Accept</button>
</div>

                </div>
            ))}
        </div>
    </div>
</div>

  )
}

export default Requests