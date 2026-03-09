import { FaBell, FaTrash } from 'react-icons/fa';
import non_check from '../Assets/non-check.png';
import check from '../Assets/check.png';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const TaskList = ({selectedDate,taskList,setTaskList,showHeader = true, showDelete = true, minimal = false, showProgress = false}) => {
 
  const [newTask,setNewTask] = useState("");
  const [newTime,setNewTime] = useState("");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  //fatch the tasklist based on the date
  useEffect(()=>{
    const fetchTask= async()=>{
     try{
      const res = await axios.get(`${BACKEND_URL}/api/tasks/${selectedDate}`, {
          withCredentials: true,
        });
        if(res.data.success) setTaskList(res.data.tasks);
     }
     catch {
        toast.error("Failed to fetch tasks");
      }
    };
    if (selectedDate) fetchTask();
  },[selectedDate]);

   // Add task
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/tasks/add`,
        { date: selectedDate, text: newTask, time: newTime },
        { withCredentials: true }
      );
      if (res.data.success) {
        setTaskList([...taskList, { text: newTask, time: newTime, completed: false }]);
        setNewTask("");
        setNewTime("");
      }
    } catch {
      toast.error("Add failed");
    }
  };

  // ✅ Delete task
  const deleteTask = async (index) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/tasks/delete`,
        { date: selectedDate, index },
        { withCredentials: true }
      );
      if (res.data.success) {
        setTaskList(taskList.filter((_, i) => i !== index));
        toast.success("Task deleted");
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  // ✅ Toggle task completion
  const toggleTask = async (index) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/tasks/toggle`,
        { date: selectedDate, index },
        { withCredentials: true }
      );
      if (res.data.success) {
        const updated = [...taskList];
        updated[index].completed = !updated[index].completed;
        setTaskList(updated);
      }
    } catch {
      toast.error("Toggle failed");
    }
  };
  const totalTasks = taskList.length;
const completedTasks = taskList.filter(task => task.completed).length;
const progressPercent =
  totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  
return (
    <div className={minimal ? "" : "glass-card p-5 rounded-xl"}>
      {/* Header */}
      {!minimal && showHeader && (
        <h2 className="section-title">
          <span className="dot yellow" /> ACTIVE MISSIONS ({selectedDate})
        </h2>
      )}

      {/* Task Container */}
      <div className="task-list space-y-4">
        {taskList.length === 0 ? (
          <p className="text-slate-300 text-sm">No missions yet.</p>
        ) : (
          taskList.map((task, index) => (
            <div
              key={index}
              className="w-full flex items-center gap-3"
            >
              <div
                onClick={() => toggleTask(index)}
                className="flex items-center gap-4 flex-grow cursor-pointer"
              >
                <img
                  src={task.completed ? check : non_check}
                  alt="status"
                  className="w-5 h-5"
                />

                <p
                  className={`text-base font-medium ${
                    task.completed
                      ? "line-through text-slate-400"
                      : "text-white"
                  }`}
                >
                  {task.text}
                </p>
              </div>

              {!minimal && showDelete && (
                <FaTrash
                  onClick={() => deleteTask(index)}
                  className="text-red-500 cursor-pointer"
                />
              )}
            </div>
          ))
        )}
      </div>

      {/* Progress Bar (Only if showProgress = true) */}
      {showProgress && totalTasks > 0 && (
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-bold text-lg text-cyan-400">
              {completedTasks} / {totalTasks} Completed
            </span>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
