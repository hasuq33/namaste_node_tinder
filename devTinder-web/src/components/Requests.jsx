import axios from 'axios';
import { useEffect } from 'react';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from '../utils/requestSlice';
import { ToastContainer, toast } from 'react-toastify';

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests)
    const fetchRequest = async () => {
        try {
            const result = await axios.get(BASE_URL + "/users/requests/received", { withCredentials: true });
            dispatch(addRequest(result?.data?.data));
        } catch (error) {
            console.error(error.message);
        }
    }

    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true });
            toast.success(status);
            dispatch(removeRequest(_id));
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        fetchRequest();
    }, [])
    if (!requests) return;

    if (requests.length === 0) return <h1 className='text-center my-3'>No Connection Request Found !</h1>
    return (
        <div className='text-center my-10'>
            <h1 className='text-bold text-2xl'>Connection Requests</h1>
            <div className='flex justify-center flex-col items-center'>
                {requests && requests.map((connection) => {
                    const { firstName, lastName, photoUrl, age, gender, about } = connection?.fromUserId;
                    return (<div className='m-4 p-4 flex w-1/3 justify-betweenflex-row items-center rounded shadow-sm bg-base-300' key={connection._id}>
                        <div>
                            <img alt='Photo' className='w-20 h-20 rounded-full object-cover' src={photoUrl} />
                        </div>
                        <div className='text-left mx-4'>
                            <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
                            {age && gender && <p>{age + " , " + gender}</p>}
                            <p>{about}</p>
                        </div>
                        <div className='mx-2'>
                            <button className="btn mx-2 btn-primary text-white" onClick={() => reviewRequest("rejected", connection._id)}>
                                Reject</button>
                            <button className="btn mx-2 btn-secondary text-white" onClick={() => reviewRequest("accepted", connection._id)}>Accept</button>
                        </div>
                    </div>
                    )
                })}
            </div>
            <ToastContainer />
        </div>
    )
}

export default Requests