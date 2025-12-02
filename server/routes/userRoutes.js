import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getUserData } from "../controllers/userDetails.js";

const userRoutes = express.Router();

userRoutes.get('/data',userAuth,getUserData);

export default userRoutes;