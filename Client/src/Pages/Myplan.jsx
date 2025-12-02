import React, { useEffect, useState } from 'react'
import TemporalTools from '../Components/TemporalTools';
import AnalogClock from '../Components/AnalogClock';
import './Myplan.css';
import axios from 'axios';
import TaskList from '../Components/Tasklist.jsx';
import {localYMD} from '../Components/Date.js';
import AIChatAssistant from '../Components/AIChatAssistant.jsx';

function Myplan() {
  const [tasksByDate,setTasksByDate] = useState([]);
  const [selectedPlanDate,setSelectedPlanDate] = useState(null);

   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

useEffect(() => {
  const fetch = async () => {
    try {
      const from = localYMD();
      console.log("📅 localYMD() from:", from);
      console.log("📆 Fetching from:", from);

      const res = await axios.get(`${BACKEND_URL}/api/tasks/from?from=${from}`, {
        withCredentials: true,
      });
       console.log("🗓️ Tasks returned from backend:", res.data.tasksByDate);

      console.log("📦 Full response:", res.data);

      if (res.data.success) {
        const docs = res.data.tasksByDate || [];
        console.log("✅ Fetched docs:", docs);

        setTasksByDate(docs);

        if (docs.length === 0) {
          console.log("❌ No docs found");
          setSelectedPlanDate(null);
        } else {
          const today = from;
          const todaysDoc = docs.find((d) => d.date === today);
          console.log("🔍 todaysDoc:", todaysDoc);

          if (todaysDoc) {
            console.log("✅ Found today's plan:", today);
            setSelectedPlanDate(today);
          } else {
            console.log("➡️ Setting first upcoming plan:", docs[0].date);
            setSelectedPlanDate(docs[0].date);
          }
        }
      } else {
        console.log("❌ API success false");
      }
    } catch (err) {
      console.error("💥 Fetch error:", err);
    }
  };
  fetch();
}, []);

  const tasksForSelected = 
  tasksByDate.find(d=>d.date === selectedPlanDate)?.tasks || [];



  return (
    <div className='Myplan_UI '>
    <div className='Left_content'>
        <TemporalTools/>
        <AnalogClock/>
    </div>
    <div className='Right_content'>
      <div className="glass-card">
        <h2 className='section-title'>
          My plan {selectedPlanDate ? `(${selectedPlanDate})` : '(No upcoming plans)'}
        </h2>

        {selectedPlanDate ? (
            <TaskList
              selectedDate={selectedPlanDate}
              taskList={tasksForSelected}
              minimal={true}  
              showHeader={false}
              showDelete={false}
              setTaskList={(updated) => {
                // optional: update local tasks array when user toggles/deletes
                setTasksByDate(prev => prev.map(d =>
                   d.date === selectedPlanDate ? {...d, tasks: updated} : d));
              }}
            /> 
        ):(
         <p className="text-slate-300">No upcoming plan available</p> 
        )}
      </div>
      <AIChatAssistant />

    </div>
    </div>
  );
}

export default Myplan