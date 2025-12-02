
 import { Radar } from 'lucide-react';
const Header = ({ activePage }) => {
 const userName = "Nilanjana";
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

  return (
    <header className="flex justify-between items-center mb-8" >
     
       

<div className="dashboard-header">
   <h3>{getHeading()}</h3>
  <Radar className="icon" />
</div>
      
      <div className="flex items-center space-x-4">
        <div className="user-avatar">{firstInitial}</div>
      
        <span className="hidden md:block">Welcome back, {userName}</span>
      </div>
       
    </header>
  );
};

export default Header;

