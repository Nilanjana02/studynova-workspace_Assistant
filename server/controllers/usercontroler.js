import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import transpoter from "../config/Nodemailer.js";

export const register= async(req,res)=>{
  const{name,email,password} = req.body;
  if(!name || !email ||!password)
  {
    return res.json({success:false,message:"missing details"})
  }
  try {
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.json({success:false,message:"User already exist"});
    }
    const hashedpassword = await bcrypt.hash(password,10);
    const newuser = new User({name,email,password:hashedpassword});
    await newuser.save();

    const token = jwt.sign({id:newuser._id},process.env.JWT_SECRET, {expiresIn:'7d'});
    res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV ==='production',
        sameSite:process.env.NODE_ENV === 'production'?'none':'strict',
        maxAge: 7* 24 * 60 * 60 * 1000
        });
    // sending welcome mail to the user
    const mailOption = {
      from:process.env.SENDER_EMAIL,
      // this email will be taken from the request body
      to:email,
      subject:'Welcome to STUDYNOVA',
      text:`Welcome to STUDYNOVA ${name}.Your account is successfully 
      created with the email id ${email} `
    }
    await transpoter.sendMail(mailOption);

    return res.json({success:true});

  } catch (error) {
    return res.json({success:false,message:error.message})
  }

}

export const login = async (req,res)=>{
    const {email,password } = req.body;
    
    if(!email || !password){
        return res.json({success:false,message:
            'Email and password is required'});        
    }

    try {
        
        const newuser = await User.findOne({email});
        if(!newuser){
            return res.json({success:false,message:'Invalid email'})
        }
        const isMatch = await bcrypt.compare(password, newuser.password)
        if(!isMatch)
        {
           return res.json({success:false,message:'Invalid password'})
        }
      const token = jwt.sign({id:newuser._id},process.env.JWT_SECRET, {expiresIn:'7d'});
      res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV ==='production',
        sameSite:process.env.NODE_ENV === 'production'?'none':'strict',
        maxAge: 7* 24 * 60 * 60 * 1000
        });
        return res.json({success:true});

    } catch (error) {
        return res.json({success:false,message:error.message})
    }
  }

  //there is the logout function
  export const logout = async (req,res)=>{
    try {
      res.clearCookie('token',{
         httpOnly:true,
        secure:process.env.NODE_ENV ==='production',
        sameSite:process.env.NODE_ENV === 'production'?'none':'strict',
      

      })
        return res.json({success:true,message:'Logged out'})
      
    } catch (error) {
       return res.json({success:false,message:error.message});
    }
    
  }

  //for verifying the email account
  export const sendverifyOtp = async(req,res) =>{
    try {
      //const {userId} = req.body;
      const userId = req.user.id;   
      const newuser = await User.findById(userId);
      if (User.isAccountVerified){
        return res.json({success:false,message:"Account is already verified"});
      }
      const otp = String(Math.floor(100000+Math.random()*900000));
      newuser.verifyotp = otp;
      newuser.verifyotpExpireAt = Date.now()+24*60*60*1000;
      await newuser.save();

      const mailOption = {
        from:process.env.SENDER_EMAIL,
        to:newuser.email,
        subject: "Account Verification OTP",
        text:`Your OTP is ${otp}.Verify your account using this otp`
      }
      await transpoter.sendMail(mailOption);
      return res.json({success:true,message:"verification otp send on email "})
      
    } catch (error) {
       return res.json({success:false,message:error.message});
    }
  }
  export const verifyEmail =async(req,res)=>{
    const {otp} = req.body;
    const userId = req.user.id;
    if(!userId || !otp)
    {
      return res.json({success:false,message:"missing details"});
    }
      try {
        const newuser = await User.findById(userId);
        if(!newuser){
          return res.json({success:false,message:"User is not exist"});
        }
        //otp not match
        if(newuser.verifyotp===''||newuser.verifyotp!==otp){
           return res.json({success:false,message:"Invalid OTP"});
        }

        //otp is expired
        if(newuser.verifyotpExpireAt < Date.now()){
          return res.json({success:false,message:"OTP is expired"});
        }
        //if OTP is not expired then we have to verify the user
        newuser.isAccountVerified = true;
        newuser.verifyotp='';
        newuser.verifyotpExpireAt = 0;
        //save the user data
        await newuser.save();
        return res.json({success:true,message:"Email verified successfully"})
        
      } catch (error) {
           return res.json({success:false,message:error.message})
      }
  }

  //user logged in or not
  export const isAuthenticated = (req,res)=>{
    try {
      return res.json({success:true});
    } catch (error) {

      return res.json({success:false,message:error.message});
      
    }
  } 
  //send reset password otp using mail id
  export const resetPasswordOtp = async(req,res)=>{
    const {email} = req.body;

    if(!email){
      return res.json({success:false,message:"email is required"});
    }
    try {
      const newuser = await User.findOne({email})

      if(!newuser){
        return res.json({success:false,messege:"User not found.."});
      }
      //create the otp
       const otp = String(Math.floor(100000+Math.random()*900000));
      newuser.resetOtp = otp;
      newuser.resetOtpExpiredAt = Date.now()+15*60*60*1000;
      await newuser.save();
    //send the otp for reset the password
     const mailOption = {
        from:process.env.SENDER_EMAIL,
        to:newuser.email,
        subject: "Reset password OTP",
        text:`Your password reset OTP is ${otp}.Reset your password using this OTP  `
      }
      await transpoter.sendMail(mailOption);
      return res.json({success:true,message:"OTP send to your register email "})
      
    } catch (error) {
      return res.json({success:false,message:error.message})
    }
  }

  //reset the password
  export const resetPassword = async(req,res)=>{
    const {email,otp,newPassword} = req.body;
    if(!email || !otp || !newPassword){
      return res.json({success:false,message:"All the fields are required."})
    }

    try {
      const newuser = await User.findOne({email});
      if(!newuser){
        return res.json({success:false,message:"user not found"});
      }
      //user exist but OTP not match or empty
      if(newuser.resetOtp ==="" || newuser.resetOtp !== otp)
      {
        return res.json({success:false,message:"Invalid OTP"})
      }
      //If otp is expired
      if(newuser.resetOtpExpiredAt <Date.now()){
        return res.json({success:false,message:'OTP is expired'})
      }

      //reset the password
      const hashedpassword = await bcrypt.hash(newPassword,10);
      newuser.password = hashedpassword;
      newuser.resetOtp = '';
      newuser.resetOtpExpiredAt = 0;

      await newuser.save();
      return res.json({success:true,message:'Password have been reset successfully'});

      
    } catch (error) {
      return res.json({success:false,message:error.message});
    }

  }