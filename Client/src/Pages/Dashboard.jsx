import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "../Components/Tasklist";
import { localYMD } from "../Components/Date.js";
//import "./Dashboard.css"; // optional, for custom layout if needed

function Dashboard() {
  const [tasksByDate, setTasksByDate] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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
        console.error("💥 Dashboard fetch error:", err);
      }
    };

    fetch();
  }, []);

  return (
    <div className="Dashboard_UI glass-card p-6">
      <h2 className="section-title">
        <span className="dot yellow" /> Upcoming Missions
      </h2>

      {tasksByDate.length === 0 ? (
        <p className="text-slate-300">No upcoming tasks.</p>
      ) : (
        tasksByDate.map((d, idx) => (
          <div key={idx} className="mb-6">
            <h3 className="text-cyan-400 text-sm mb-2">{d.date}</h3>
            <TaskList
              selectedDate={d.date}
              taskList={d.tasks}
              showHeader={false}
              showDelete={true}
              minimal={false} // full UI look
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
        ))
      )}
    </div>
  );
}

export default Dashboard;
