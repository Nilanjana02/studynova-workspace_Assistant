import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    verifyotp:{
        type:String,
        default:''
    },
    verifyotpExpireAt:{
        type:Number,
        default:0
    },
    isAccountVerified:{
        type:Boolean,
        default:false
    },
    resetOtp:{
        type:String,
        default:0

    },
    resetOtpExpiredAt:{
        type:Number,
        default:0
    }
});
const User = mongoose.models.User || mongoose.model("User",userSchema);
export default User;