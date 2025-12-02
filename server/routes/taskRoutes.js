import express from "express";
import userAuth from "../middleware/userAuth.js";
import { addTask, getTaskByDate, deleteTask,toggleTaskCompletion,getTasksFromDate } 
from "../controllers/taskcontroler.js";


const taskRouter = express.Router();
// taskRouter.post("/add", userAuth, addTask);
// taskRouter.get("/:date", userAuth, getTaskByDate);
// taskRouter.post("/delete", userAuth, deleteTask);
// taskRouter.post("/toggle", userAuth, toggleTaskCompletion);
// taskRouter.get('/from', userAuth, getTasksFromDate);

taskRouter.post("/add", userAuth, addTask);
taskRouter.get("/from", userAuth, getTasksFromDate); // ⬅️ move this line UP
taskRouter.get("/:date", userAuth, getTaskByDate);
taskRouter.post("/delete", userAuth, deleteTask);
taskRouter.post("/toggle", userAuth, toggleTaskCompletion);


export default taskRouter;
