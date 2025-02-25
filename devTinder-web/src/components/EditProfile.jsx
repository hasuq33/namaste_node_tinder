import { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlicer';
import { ToastContainer, toast } from 'react-toastify';

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [age, setAge] = useState(user?.age || "");
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
    const [gender, setGender] = useState(user?.gender);
    const [about, setAbout] = useState(user?.about | "");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const saveProfile = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", { firstName, lastName, age, photoUrl, about, gender }, { withCredentials:true });
            dispatch(addUser(res.data.date));
            setError("");
            toast.success("Profile updated successfully!");
        } catch (error) {
            setError(error?.response?.data);
            console.error(error.message)
        }
    }
    return (
        <>
            <div className="flex justify-center items-start gap-4 my-5 ">
                <div className="card bg-base-300 w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title justify-center">Edit Profile</h2>
                        <form className="flex flex-col gap-4" onSubmit={saveProfile} >
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">First Name</span>
                                </div>
                                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" className="input input-bordered w-full max-w-xs" />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Last Name</span>
                                </div>
                                <input onChange={(e) => setLastName(e.target.value)} value={lastName} type="text" placeholder="Last Name" className="input input-bordered w-full max-w-xs" />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Photo URL:</span>
                                </div>
                                <input onChange={(e) => setPhotoUrl(e.target.value)} value={photoUrl} type="text" placeholder="Photo URL" className="input input-bordered w-full max-w-xs" />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Age</span>
                                </div>
                                <input onChange={(e) => setAge(e.target.value)} value={age} type="text" placeholder="Age" className="input input-bordered w-full max-w-xs" />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Gender</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span>Male:</span>
                                    <input type="radio" name="radio-8" className="radio radio-accent" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} />
                                    <span>Female:</span>
                                    <input type="radio" name="radio-8" className="radio radio-accent" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} />
                                    <span>Other</span>
                                    <input type="radio" name="radio-8" className="radio radio-accent" value="other" checked={gender === 'other'} onChange={(e) => setGender(e.target.value)} />
                                </div>
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">About</span>
                                </div>
                                <textarea onChange={(e) => setAbout(e.target.value)} value={about} type="text" placeholder="About " className="input input-bordered w-full max-w-xs" />
                            </label>
                            <p className="text-red-500">{error}</p>
                            <div className="card-actions justify-start items-center">
                                <button className="btn btn-primary" type="submit" value="Submit" >Save Profile</button>
                            </div>
                        </form>
                    </div>
                </div>
                <UserCard user={{ firstName, lastName, age, photoUrl, about, gender }} />
            </div>
            <ToastContainer />
        </>
    )
}

export default EditProfile