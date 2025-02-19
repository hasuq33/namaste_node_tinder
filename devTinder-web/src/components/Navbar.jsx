import { useSelector , useDispatch } from "react-redux";
import { Link } from "react-router";
import { BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router";
import axios from "axios";
import { removeUser } from "../utils/userSlicer";

export const Navbar = () => {
    const user = useSelector((store)=>store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () =>{
        try {
            await axios.post(BASE_URL+"/logout",{},{withCredentials:true});
            dispatch(removeUser());
            navigate("/login");
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <div className="navbar bg-base-300">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
            </div>
           {user && (<div className="flex-none gap-2">
            <div>Welecome ,{user.firstName}</div>
                <div className="dropdown dropdown-end mx-5">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={user.photoUrl} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to="/profile" className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><a>Settings</a></li>
                        <li onClick={handleLogout}><a>Logout</a></li>
                    </ul>
                </div>
            </div>)}
        </div>
    )
}
