import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { removeUserFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
    const dispatch = useDispatch();
    const handleUserFeed = async (status, id) => {
        try {
            const result = await axios.post(BASE_URL + "/request/send/" + status + "/" + id, {},
                { withCredentials: true });
            dispatch(removeUserFeed(id));
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <div className="card card-compact bg-base-300 w-96 shadow-xl">
            <figure>
                <img className='w-full '
                    src={user?.photoUrl}
                    alt="User" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{user?.firstName + user?.lastName}</h2>
                {user?.age && user?.gender && (<p>{user?.age + ", " + user?.gender}</p>)}
                <p>{user?.about}</p>
                <div className="card-actions justify-center my-4 ">
                    <button className="btn btn-primary text-white" onClick={() => handleUserFeed("ignored",
                        user._id)}>Ignore</button>
                    <button className="btn btn-secondary text-white" onClick={() => handleUserFeed("intrested", user._id)
                    }>Intrested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard