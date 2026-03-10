import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { FaRocket } from "react-icons/fa";
import axios from "axios";
import TaskList from "../Components/Tasklist";
import { localYMD } from "../Components/Date.js";
//import "./Dashboard.css"; // optional, for custom layout if needed

function Dashboard({goToNewTask}) {
  const [tasksByDate, setTasksByDate] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  // const navigate = useNavigate();

// const goToNewTask = () => {
//   navigate("/new-task"); // change route if your page name is different
// };
  useEffect(() => {
    const fetch = async () => {
      try {
        const from = localYMD(); // today's date
        console.log("📆 Dashboard fetching from:", from);

        const res = await axios.get(`${BACKEND_URL}/api/tasks/from?from=${from}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          const docs = res.data.tasksByDate || [];
          console.log("✅ Dashboard docs:", docs);

          // Filter only today & future tasks (no past)
          const futureDocs = docs.filter(d => d.date >= from);
          setTasksByDate(futureDocs);
        } else {
          console.log("❌ Dashboard fetch failed");
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };

    fetch();
  }, []);
  const totalTasks = tasksByDate.reduce(
   (acc, d) => acc + d.tasks.length,
  0
);

const completedTasks = tasksByDate.reduce(
  (acc, d) =>
    acc + d.tasks.filter(task => task.completed).length,
  0
);

const progressPercent =
  totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
 console.log("progressPercent",progressPercent);
  return (
//     <div className="Dashboard_UI glass-card p-6 ">
//       <h2 className="section-title">
//         <span className="dot yellow" /> Upcoming Missions
//       </h2>
//       {totalTasks > 0 && (
//   <div className="mb-6 p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">

//     <div className="flex justify-between items-center mb-2">
//       <span className="text-slate-300 text-sm">
//         Overall Progress
//       </span>
//       <span className="text-cyan-400 font-semibold">
//         {completedTasks} / {totalTasks}
//       </span>
//     </div>
 
//     {/* <div className="w-full bg-slate-700 h-4 rounded-full overflow-hidden relative">
     
//       <div
//   className="h-full rounded-full transition-all duration-500 ease-in-out"
//   style={{
//     width: `${progressPercent}%`,
//     background:
//       progressPercent === 100
//         ? "#facc15"
//         : "linear-gradient(to right, #4ade80, #22d3ee, #a855f7)",
//     boxShadow:
//       progressPercent === 100
//         ? "0 0 15px #facc15"
//         : "none"
//   }}
// ></div>
//     </div> */}

//   </div>
// )}

      
//       {tasksByDate.length === 0 ? (
//   // <div className="empty-mission-card glass-card flex-center flex-col p-6 text-center">

//   //   <div className="rocket-icon mb-4">
//   //     <FaRocket size={40} />
//   //   </div>

//   //   <h3 className="text-xl font-semibold mb-2">
//   //     Create your first mission 🚀
//   //   </h3>

//   //   <p className="text-slate-400 mb-4">
//   //     You haven't planned any missions yet.  
//   //     Start by creating your first task and begin your learning journey.
//   //   </p>

//   //   <button 
//   //   className="launch-btn px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600
//   //    text-white font-semibold flex items-center gap-2"
//   //     onClick={goToNewTask}
//   //     className="launch-btn flex items-center gap-2"
//   //   >
//   //     <FaRocket size={40} className="text-cyan-400 animate-bounce" />Create Mission
//   //   </button>

//   // </div>
//   // EMPTY STATE
//   <div className="Dashboard_UI p-6 min-h-[60vh] flex flex-col items-center justify-center">

//     <FaRocket size={60} className="text-cyan-400 mb-6 animate-bounce" />

//     <h3 className="text-3xl font-semibold mb-4">
//       Create your first mission 🚀
//     </h3>

//     <p className="text-slate-400 max-w-md mb-8">
//       You haven't planned any missions yet. Start by creating your first
//       task and begin your learning journey.
//     </p>

//     <button
//       onClick={goToNewTask}
//       className="px-8 py-3 rounded-lg bg-gradient-to-r
//       from-purple-500 to-pink-500 text-white font-semibold
//       flex items-center gap-2 hover:scale-105 transition"
//     >
//       <FaRocket /> Create Mission
//     </button>

//   </div>
// ) : (
//         tasksByDate.map((d, idx) => (
//           <div key={idx} className="mb-6">
//             <h3 className="text-cyan-400 text-sm mb-2">{d.date}</h3>
//             <TaskList
//               selectedDate={d.date}
//               taskList={d.tasks}
//               showHeader={false}
//               showDelete={true}
//               minimal={false} 
//               showProgress={true}
//               // full UI look
//               setTaskList={(updated) =>
//                 setTasksByDate(prev =>
//                   prev.map(dateBlock =>
//                     dateBlock.date === d.date
//                       ? { ...dateBlock, tasks: updated }
//                       : dateBlock
//                   )
//                 )
//               }
//             />
//           </div>
//         ))
//       )}
//     </div>
//   );


  <>
    {tasksByDate.length === 0 ? (

      // EMPTY STATE
     <div className="Dashboard_UI empty-dashboard">

  <FaRocket size={60} className="text-cyan-400 rocket-bounce" />

  <h3 className="text-3xl font-semibold">
    Create your first mission 🚀
  </h3>

  <p className="text-slate-400 max-w-md">
    You haven't planned any missions yet. Start by creating your first
    task and begin your learning journey.
  </p>

  <button
    onClick={goToNewTask}
    className="launch-btn"
  >
    Create Mission
  </button>

</div>
    

    ) : (

      // NORMAL DASHBOARD
      <div className="Dashboard_UI glass-card p-6">

        <h2 className="section-title">
          <span className="dot yellow" /> Upcoming Missions
        </h2>

        {totalTasks > 0 && (
          <div className="mb-6 p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-300 text-sm">Overall Progress</span>

              <span className="text-cyan-400 font-semibold">
                {completedTasks} / {totalTasks}
              </span>
            </div>
          </div>
        )}

        {tasksByDate.map((d, idx) => (
          <div key={idx} className="mb-6">
            <h3 className="text-cyan-400 text-sm mb-2">{d.date}</h3>

            <TaskList
              selectedDate={d.date}
              taskList={d.tasks}
              showHeader={false}
              showDelete={true}
              minimal={false}
              showProgress={true}
              setTaskList={(updated) =>
                setTasksByDate(prev =>
                  prev.map(dateBlock =>
                    dateBlock.date === d.date
                      ? { ...dateBlock, tasks: updated }
                      : dateBlock
                  )
                )
              }
            />
          </div>
        ))}

      </div>

    )}
  </>
);
}


export default Dashboard;
