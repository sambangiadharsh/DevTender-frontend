import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import { useEffect } from 'react'
import axios from "axios"
import Card from './Card'

const Feed = () => {
  const dispatch=useDispatch();
  const feed=useSelector((store)=>store.feed);
  const feedUser=async()=>{
    
    try{
     const res=await axios.get(BASE_URL+"/feed",{withCredentials:true});
     dispatch(addFeed(res?.data?.data));
    

    }
    catch(err){
       console.error(err);
    }
  }

  useEffect(()=>{
    feedUser();
  },[]);
  if(!feed)return ;
  if(feed.length==0)return <h1 className='flex justify-center my-10 items-center'>No Profile to Connect.</h1>
  return (
    <div>
      <Card user={feed[0]}/>
    </div>
  )
}

export default Feed;