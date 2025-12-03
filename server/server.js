import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongoDB.js";
import authRouter from "./routes/authenticationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";

import aiRoutes from "./routes/chatAIRoutes.js";

const app = express();
const port = process.env.PORT || 8000;
connectDB();

const allowedOrigins = ["https://studynova.onrender.com",
  "http://localhost:5173",
  "http://localhost:8000"];

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:  function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ✅ Remove this or replace with app.options(/.*/, cors());
// app.options('*', cors());

app.get('/', (req, res) => res.send(`API is working`));
app.use('/api/auth', authRouter);
app.use('/api/user', userRoutes);
app.use('/api/tasks', taskRouter);
app.use("/api/ai", aiRoutes);

app.listen(port, () => console.log(`✅ Server listening on port ${port}`));
