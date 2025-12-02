import Task from "../models/task.model.js";
//add task in the database
export const addTask=async(req,res)=>{
   const userId = req.user.id;
  
   let { date, text, time } = req.body;
if (!date) date = new Date().toLocaleDateString('en-CA'); // ensure local format

   try{
       let userTasks = await Task.findOne({userId,date});
       if(!userTasks){
        userTasks = new Task({userId,date,tasks:[{text,time}]});
       }
       else{
        userTasks.tasks.push({text,time});
       }
       await userTasks.save();
       res.json({success:true,message:"Task added successfully"});
   }
   catch(error){
       res.json({success:false,message:error.message});
   }
};

//get all task for a selected date 
export const getTaskByDate = async(req,res)=>{
    const userId =  req.user.id;
  const { date } = req.params;

  try {
    const tasks = await Task.findOne({ userId, date });
    res.json({ success: true, tasks: tasks ? tasks.tasks : [] });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

  // get tasks from a starting date (default today) - returns all Task docs for user with date >= from
export const getTasksFromDate = async (req, res) => {
  const userId = req.user.id;
  const from = req.query.from || new Date().toLocaleDateString('en-CA');

  console.log("🧩 [getTasksFromDate] userId:", userId);
  console.log("🧭 [getTasksFromDate] from date:", from);

  try {
    const docs = await Task.find({ userId, date: { $gte: from } }).sort({ date: 1 }).lean();
    console.log("📦 [getTasksFromDate] found docs:", docs);

    res.json({ success: true, tasksByDate: docs });
  } catch (err) {
    console.error("💥 [getTasksFromDate] Error:", err.message);
    res.json({ success: false, message: err.message });
  }
};




//delete task
export const deleteTask = async (req, res) => {
  const userId = req.user.id;
  const { date, index } = req.body;

  try {
    const taskDoc = await Task.findOne({ userId, date });
    if (!taskDoc) return res.json({ success: false, message: "No task found" });

    taskDoc.tasks.splice(index, 1);
    await taskDoc.save();

    res.json({ success: true, message: "Task deleted" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
 export const toggleTaskCompletion = async (req, res) => {
  const userId = req.user.id;
  const { date, index } = req.body;

  try {
    const taskDoc = await Task.findOne({ userId, date });
    if (!taskDoc) return res.json({ success: false, message: "No tasks found" });

    taskDoc.tasks[index].completed = !taskDoc.tasks[index].completed;
    await taskDoc.save();

    res.json({ success: true, message: "Task status updated" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};