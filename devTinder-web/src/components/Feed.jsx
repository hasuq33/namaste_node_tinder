import axios from 'axios'
import {useEffect} from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const dispatch = useDispatch();

  const feed = useSelector((store)=>store.feed);

  const getFeed = async () =>{
    try {
      const res = await axios.get(BASE_URL + "/feed",{withCredentials:true});
      dispatch(addFeed(res?.data?.feed));
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(()=>{
    getFeed();
  },[])
  if(!feed) return;

  if(feed.length <= 0) return <h1 className='text-center mt-3'>No Feed is available!</h1>

  return (
    <div className='flex justify-center my-10'>

      {feed&&feed.length > 0 && (<UserCard user={feed[0]}/>)}
    </div>
  )
}

export default Feed