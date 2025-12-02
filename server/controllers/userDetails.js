import User from "../models/user.model.js";

export const getUserData =async(req,res)=>{
  

    try {
       
        const userId = req.user.id;  
        const newuser = await User.findById(userId); 
        if(!newuser){
              return res.json({success:false,message:"User not found"});
        }

        res.json({
            success:true,
            userData:{
                name:newuser.name,
                isAccountVerified: newuser.isAccountVerified
            }
        })

    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}