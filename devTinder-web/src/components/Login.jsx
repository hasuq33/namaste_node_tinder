import { useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux'
import { addUser } from "../utils/userSlicer";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constant";

const Login = () => {
    const [emailId, setEmialId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin= async (ev) => {
        ev.preventDefault();
        try {
            const res = await axios.post(BASE_URL + "/login", {
                emailId,
                password
            }, { withCredentials: true });
            dispatch(addUser(res.data));
            navigate("/");
        } catch (error) {
            setError(error?.response?.data||"Something went wrong!");
            console.error(error);
        }
    }

    const handleSignUp = async (ev)=>{
        ev.preventDefault();
        try {
            const res = await axios.post(BASE_URL+"/signup",{firstName,lastName,emailId,password},{withCredentials:true});
            dispatch(addUser(res.data.data));
            navigate("/profile");

        } catch (error) {
            setError(error?.response?.data||"Something went wrong!");
            console.error(error);
        }
    }
    return (
        <div className="flex justify-center items-center">
            <div className="card bg-base-300 w-96 shadow-xl my-5">
                <div className="card-body">
                    <h2 className="card-title justify-center">{isLoginForm ? "Login" : "SignUp"}</h2>
                    <form className="flex flex-col gap-4" onSubmit={isLoginForm? handleLogin:handleSignUp}>
                        {!isLoginForm && (<><label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">First Name</span>
                            </div>
                            <input onChange={(e) => setFirstName(e.target.value)} value={firstName}
                                type="text" placeholder="Enter You First Name..." className="input input-bordered w-full max-w-xs" />
                        </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Email</span>
                                </div>
                                <input onChange={(e) => setLastName(e.target.value)} value={lastName} type="text"
                                    placeholder="Enter You Last Name..." className="input input-bordered w-full max-w-xs" />
                            </label></>)}
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                            <input onChange={(e) => setEmialId(e.target.value)} value={emailId} type="text" placeholder="Enter You Email..." className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input autoComplete="false" onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Enter Your Password..." className="input input-bordered w-full max-w-xs" />
                        </label>
                        <p className="text-red-500">{error}</p>
                        <div className="card-actions justify-start items-center">
                            <button className="btn btn-primary" type="submit"  value="Submit" >
                                {isLoginForm ? "Login" : "SignUP"}</button>
                        </div>
                        <p className="cursor-pointer" onClick={()=>{
                            setIsLoginForm(!isLoginForm);
                        }} >{isLoginForm ? "New User? Signup Here" : "Existing User? Login Here"}</p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;