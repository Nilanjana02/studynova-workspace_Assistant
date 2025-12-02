import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
},
date: { type: String,
     required: true 
}, // 'YYYY-MM-DD'
tasks: [
    {
      text: { type: String, required: true },
      completed: { type: Boolean, default: false },
      time: { type: String, default: "" },
    },
  ],
});

const Task = mongoose.models.Task || mongoose.model("Task",taskSchema);
export default Task;