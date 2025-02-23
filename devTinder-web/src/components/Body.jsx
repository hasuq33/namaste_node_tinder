import { Navbar } from "./Navbar"
import { Outlet, useNavigate } from "react-router";
import Footer from "./Footer";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlicer";
import { useSelector } from "react-redux";

const Body = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const userData = useSelector((store)=>store.user);
  const fetchData = async () =>{
    try {
      const res = await axios.get(BASE_URL+"/profile",{withCredentials:true});
      dispatch(addUser(res.data));
    } catch (error) {
      if(error.status === 401) navigate("/login"); 
      console.error(error);
    }
  }
  useEffect(()=>{
      fetchData();
  },[])
  return (
    <div>
        <Navbar/>
        <div className="min-h-[90vh]">
          <Outlet/>
        </div>
        <Footer />
    </div>
  )
}

export default Body;