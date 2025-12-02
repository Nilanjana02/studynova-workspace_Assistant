import React, { useRef, useState } from 'react';
import { FaRocket } from 'react-icons/fa';
import {toast} from 'react-toastify';
import axios from 'axios';
import Calendar from './Calendar.jsx';

const NewTask = ({selectedDate,setSelectedDate,taskList,setTaskList}) => {
  const [task,setTask] = useState();
  // const [selectedDate,setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  // const inputRef = useRef();
   const handleSubmit = async(e) => {
    e.preventDefault();
    if (!task.trim()) return toast.error('Please enter a task');
    // const inputTask = inputRef.current.value.trim();
    try{
      const res = await axios.post('http://localhost:8000/api/tasks/add', {
        text: task,
        date: selectedDate,
      }, { withCredentials: true });

 
      if (res.data.success) 
      {
      toast.success('Task added!');
      // this below line help to update the UI when the task is added
      setTaskList(prev => [...prev,{text:task,date:selectedDate,completed:false}]);
    
      setTask('');
      }
      else {
      toast.error(res.data.message);}
    }
     catch (err) {
      toast.error('Error adding task');
    }
  };


  return (
<>
  <div className="glass-card gap-6 p-5">
    
      {/* 🚀 Task input form */}
      <div>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input 
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="What's your next plan?"
        className="task-input"/>
        <button type="submit" className="launch-btn flex items-center gap-2">
          <FaRocket /> LAUNCH
        </button>
      </form>
      </div>

     
    </div>
     {/* 🗓️ Calendar section below form */}
      <div className="calendar-container mt-4">
        <h3 className="text-white text-sm mb-2">
          Select Date (Current: <span className="text-cyan-400">{selectedDate}</span>)
        </h3>
        <Calendar onDateSelect={setSelectedDate} />
      </div>
      </>
  );
};

export default NewTask;
