import { useState } from "react";
import { FaHome, FaBullseye } from "react-icons/fa";

function Sidebar({setActivePage,setAction,action}) {
    const [open,setopen] = useState(true);
    const HandleNewtask = ()=>
    {
      if(action ==='newtask' )
      {
        setAction('');
      }
      else{
        setAction('newtask');
        setActivePage('newtask');
      }
    }
    const HandelMyPlan=()=>{
     
        setAction('myplan');
         setActivePage('myplan');
      
    }
    const HandleDashboard = () => {
    setAction("dashboard");
    setActivePage('dashboard');
    };

    
  return (
    <nav className="sidebar">
        <div className="App-name">
        <h1 className="text-4xl font-bold gradient-text " id="home-AppName">STUDYNOVA</h1>
        <p className="text-slate-400">Ignite Your Learning Journey</p>
      </div>
      <div className="underline">

      </div>
      <div className="sidebar-btn">
        <button 
            onClick={HandleDashboard}
          className={`side-btn ${action === "dashboard" ? "active-btn" : ""}`}
        >
            <FaHome className="mr-5" />
            <span>Dashboard</span>
            </button>
          <button onClick={HandelMyPlan}  className={`side-btn 
            ${action === "myplan" ? "active-btn" : ""}`}>
          <FaBullseye className="mr-5" />
          <span>My Plan</span>
        </button>
      </div>
      <div className="underline">

      </div>
      <div>
        <button type="submit" className="launch-btn " id="newtask" onClick={HandleNewtask}>
          + New Task</button>
      </div>
    </nav>
  )
}

export default Sidebar