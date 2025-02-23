import axios from 'axios';
import { useEffect } from 'react';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const result = await axios.get(BASE_URL + "/user/connnections", { withCredentials: true });
      dispatch(addConnection(result.data.data));
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    fetchConnections();
  }, [])
  if (!connections) return;

  if (connections.length === 0) return <h1>No Connection Request Found !</h1>
  return (
    <div className='text-center my-10'>
      <h1 className='text-bold text-2xl'>Connections</h1>
      <div className='flex justify-center flex-col items-center'>
      {connections && connections.map((connection) => {
        const { firstName, lastName, photoUrl, age, gender, about } = connection;
        return (<div className='m-4 p-4 flex w-1/3  rounded shadow-sm bg-base-300' key={connection._id}>
          <div>
            <img alt='Photo' className='w-20 h-20 rounded-full object-cover' src={photoUrl} />
          </div>
          <div className='text-left mx-4'>
            <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
            {age&&gender&&<p>{age+" , "+gender}</p>}
            <p>{about}</p>
          </div>
        </div>
        )
      })}
      </div>
    </div>
  )
}

export default Connections