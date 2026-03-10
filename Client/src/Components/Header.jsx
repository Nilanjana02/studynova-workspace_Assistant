
 import { Radar } from 'lucide-react';
 import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";
const Header = ({ activePage, userName })  => {

  //this help to get the firstname
   const firstName = userName?.split(" ")[0] || "Guest";
  // You can replace this with a dynamic name later
  const firstInitial = userName?.charAt(0).toUpperCase()||'?';
  //for changing the heading of the UI
   const getHeading = () => {
    switch (activePage) {
      case "dashboard":
        return "Mission Overview";
      case "myplan":
        return "Start Your Journey";
      case "newtask":
        return "Add New Mission";
      default:
        return "Mission Overview";
    }
  };
  const navigate = useNavigate();
const { BackendUrl, setIsLoggedin } = useContext(AppContext);

const handleLogout = async () => {
  try {
    const { data } = await axios.post(`${BackendUrl}/api/auth/logout`);

    if (data.success) {
      setIsLoggedin(false);
      toast.success("Logged out successfully");
      navigate("/");
    }

  } catch (error) {
    console.error(error);
    toast.error("Logout failed");
  }
};

  return (
    <header className="flex justify-between items-center mb-8 "id='upper-header' >
     
       

<div className="dashboard-header">
   <h3>{getHeading()}</h3>
  <Radar className="icon" />
</div>
      <div className='user-details'>
      <div className="flex items-center space-x-4">
        <div className="user-avatar">{firstInitial}</div>
      
        <span className="hidden md:block">Welcome back, {firstName}</span>
      </div>
      <button className='log-out' onClick={handleLogout}>Log Out</button>
      </div>
       
    </header>
  );
};

export default Header;

