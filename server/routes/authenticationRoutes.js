import express from "express";
import { isAuthenticated, login, logout, register, resetPassword, resetPasswordOtp, sendverifyOtp, verifyEmail } from "../controllers/usercontroler.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();
// we use post method so that we can send the request 
// to the server from the user."/register" help to run
// the resister controler logic when register will open
authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',logout);
// here is the three end point that I added
authRouter.post('/send-verify-otp',userAuth,sendverifyOtp);
authRouter.post('/verify-account',verifyEmail);
authRouter.post('/is-auth',userAuth,isAuthenticated);
authRouter.post('/send-reset-otp',resetPasswordOtp);
authRouter.post('/reset-password',resetPassword);


export default authRouter;

