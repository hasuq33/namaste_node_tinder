import { useState } from "react";
import axios from "axios";

const Login = () => {
    const [emailId , setEmialId ] = useState("");
    const [password , setPassword] = useState("");
    const handleSubmit = async (ev)=>{
        ev.preventDefault();
          try {
            const res = await axios.post("http://localhost:3000/login",{
                emailId, 
                password
            },{withCredentials:true});
          } catch (error) {
            console.error(error);
          }
    }
    return (
        <div className="flex justify-center items-center">
            <div className="card bg-base-300 w-96 shadow-xl my-5">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                            <input onChange={(e)=>setEmialId(e.target.value)} value={emailId} type="text" placeholder="Enter You Email..." className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input autoComplete="false" onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="Enter Your Password..." className="input input-bordered w-full max-w-xs" />
                        </label>
                    <div className="card-actions justify-start items-center">
                        <button className="btn btn-primary" type="submit" value="Submit" >Login</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;