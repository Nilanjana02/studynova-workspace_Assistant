
import React, {useState} from 'react';

import './Home.css';
import Sidebar from '../Components/Sidebar.jsx';
import Header from '../Components/Header';
import NewTask from '../Components/NewTask';
import TaskList from '../Components/Tasklist';
//import Calendar from '../Components/Calendar';
import { useLocation } from 'react-router-dom';
import Myplan from './Myplan';
import Dashboard from './Dashboard.jsx';


function Home () {
  
  const location = useLocation();
const name = location.state?.name || "Guest";

const [activePage, setActivePage] = useState(
  location.state?.activePage || "dashboard"
);
 
//<Header userName={name} activePage={activePage}/>

  //  const [action , setAction] = useState('');
 
   const [taskList,setTaskList] = useState([]);//have to store the task list and then pass it 
   const [selectedDate,setSelectedDate] = 
   useState(new Date().toISOString().split("T")[0]);

  //  const location = useLocation();
  //  const name  = location.state?.name || 'Guest';
   
   
   //delete funtion
   const deleteTask=(id)=>{
    setTaskList((prevTask)=>prevTask.filter((task)=>task.id !== id))
   }
   //check the task is complete or not 
   const toggle=(id)=>{
    setTaskList((prevTask)=>{
      return prevTask.map((task)=>{
        if(task.id===id){
          return {...task,isComplete:!task.isComplete}
        }
        return task
      })
    })
   }
  return (
    <div className="container">
      <div className='sidebar-area'>
     <Sidebar setActivePage={setActivePage} activePage={activePage}/>
     </div>
     <div className='content-area'>
      <Header userName = {name} activePage={activePage}/>
      {/* <div className="main-layout">
        <div className="left-column">
          {activePage ==='newtask' && 
          <>
           <NewTask 
           selectedDate={selectedDate}
           setSelectedDate={setSelectedDate}
           taskList={taskList}
           setTaskList={setTaskList}/>
          <TaskList 
          selectedDate={selectedDate}
          taskList={taskList} 
          setTaskList={setTaskList}
          deleteTask={deleteTask} 
          toggle={toggle}  />
          
         
          </>
}
         
        </div>
        <div className="right-column">
         {activePage ==='myplan'&&
         <>
         <Myplan/>
         </>
}
         

        
 {activePage === "dashboard" && (
  <Dashboard goToNewTask={() => setActivePage("newtask")} />
)}

        </div>
      </div> */}

<div className="main-layout">

  {activePage === "dashboard" && (
    <Dashboard goToNewTask={() => setActivePage("newtask")} />
  )}

  {activePage === "newtask" && (
    <>
      <NewTask
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        taskList={taskList}
        setTaskList={setTaskList}
      />

      <TaskList
        selectedDate={selectedDate}
        taskList={taskList}
        setTaskList={setTaskList}
        deleteTask={deleteTask}
        toggle={toggle}
      />
    </>
  )}

  {activePage === "myplan" && <Myplan />}

</div>

      </div>
    </div>
  );
};

export default Home