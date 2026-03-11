import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './Login.css';
import { Routes ,Route} from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
axios.defaults.withCredentials = true;

function Login() {
    const navigate = useNavigate();
    const {BackendUrl,isLoggedin,setIsLoggedin} = useContext(AppContext)
     console.log("Backend URL:", BackendUrl); //check the backend url
  
   
    const [action,setAction] = useState("Login");
    const [name, setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const [otp,setOtp] = useState('');
    const [subHeading, setSubheading] = useState('Login with Email');
    useEffect(()=>{
        if(action === 'Login'){
            setSubheading("Login With Email");
        }
        else if (action === 'forgot')
        {
            setSubheading("Enter Your Email Id");
        }
        else if(action ==='resetOtp'){
            setSubheading("Enter the OTP");
        }
        else if(action === 'resetPassword'){
            setSubheading("Reset Password");
        }
        else if(action === 'register')
        {
            setSubheading("Create Your Account")
        }
        else if(action === 'verifyEmail'){
    setSubheading("Enter the OTP sent to your email");
}
    },[action]);
     const handelLogin = async(e)=>{
        e.preventDefault(); 
        setError('');
       
        try {
            if(action ==="register"){
               if(!name || !email || !password)
               {
                setError("please fill all the fields");
            return;
        }

        const {data} = await axios.post(`${BackendUrl}/api/auth/register`,{name,email,password});
    if(data.success){
    toast.success("OTP sent to your email");
    setAction('verifyEmail');
}
    //     
    else{
        toast.error(data.message);
    }
}
else if(action === "verifyEmail"){
    if(!otp){
        setError("Please enter OTP");
        return;
    }

    const {data} = await axios.post(
        `${BackendUrl}/api/auth/verify-account`,
        {email, otp}
    );

    if(data.success){
        toast.success("Email verified successfully");
        setAction("Login");
    }else{
        toast.error(data.message);
    }
}


// ---login---
  else if (action === "Login")
        {
            if(!email || !password)
            {
              setError("Please enter valid email and password");
              return ;
            }
            const {data} = await axios.post(`${BackendUrl}/api/auth/login`,{email,password});
            if(data.success){
                toast("your are successfully loggedin");
                setIsLoggedin(true);
                setSubheading("Login With Email");
                // navigate('/dashboard');
               
                navigate('/dashboard', { 
               state: { 
               activePage: "dashboard", 
               name: data.user?.name 
                  } 
                 });
   }else{
                toast.error(data.message);
            }
        }
           
            
    else if(action === "forgot"){
        if(!email){
            setError("Enter your email to receive OTP");
            return;
        }
        const {data} = await axios.post(`${BackendUrl}/api/auth/send-reset-otp`,{email});
        if(data.success){
            alert(`Reset OTP sent to ${email}`);
            setAction('resetPassword');
        }else{
            alert(data.message);
        }
      
    }

    // reset password
    else if (action === "resetPassword") {
        if (!password || !otp) {
        setError("Please enter new password and OTP");
        return;
        }
    const {data} = await axios.post(`${BackendUrl}/api/auth/reset-password`,{email,otp,newPassword : password})    
    if(data.success){
        alert("Password reset successfully");
        setAction("Login");
        setPassword('');
        setOtp('');
    }else{
        alert(data.message);
    }  
}

}
     
            
  catch (error) {
  console.error(error);
  toast.error(error.response?.data?.message || "Something went wrong!");
  setError("Something went wrong. Try again!");
}
    };

        // that is my end code   
  

    //for the button text change
    const buttonText={
    Login: "Login",
    forgot: "Send OTP",
    register: "Register",
    resetPassword: "Reset",
     verifyEmail: "Verify Email",
    }[action] || "Login";
   const resetFields = () => {
    setName('');
    setPassword('');
    setOtp('');
    setError('');
};
useEffect(() => {
  resetFields();
}, [action]);
         
  return (
    <div className='Login-content'>
         <div className="App-name">
        <p className="font-bold gradient-text " id='login-AppName'>STUDYNOVA</p>
    </div>
    <div className='Login-page'>
        <div className="left-side">
            <img src="./images/Login.jpg" alt="Login visual" className='Login-image'/>
        </div>
        <div className="right-side">
            <p className='heading-login'>Welcome</p>

            <p className='sub-heading'>{subHeading}</p>
             {/* start the form tag */}
            <form onSubmit={handelLogin}>   
                {/* // your existing function */}
            <div className='info'>
                {action ==="register" &&(
                    <input type = "text" placeholder='Name' className='login-input'
                    value = {name}
                    onChange={(e)=>setName(e.target.value)}/>
                )}

                <input type="text" placeholder='Email' className='login-input'
                value = {email}
                onChange={(e)=>setEmail(e.target.value)}/>
                {action === 'verifyEmail' && (
    <input 
        type="text" 
        placeholder='Enter OTP' 
        className='login-input'
        value={otp}
        onChange={(e)=>setOtp(e.target.value)}
    />
)}


                {/* for password field */}
                {(action === 'Login' || action === 'register') &&(
                        <input type="password" placeholder='Password' className='login-input'
                value = {password}
                onChange={(e)=>
                {const val = e.target.value;
                setPassword(val);
                if (val.length > 0 && val.length < 6) {
                  setError("Password must have at least 6 characters");
                  } 
                else {
                 setError('');
                 }
                 }
             }/>

                )}

            {/* new Password */}
            {(action === 'resetPassword') &&(
                <>
                <input type="text" placeholder='OTP' className='login-input'
                value = {otp}
                onChange={(e)=>
                {const val = e.target.value;
                setOtp(val);
                // if (!otp){
                //   setError("Enter the otp");
                //   } 
                // else {
                //  setError('');
                //  }
                 }
             }/>
                <input type="password" placeholder='New Password' className='login-input'
                value = {password}
                onChange={(e)=>
                {const val = e.target.value;
                setPassword(val);
                if (val.length > 0 && val.length < 6) {
                  setError("Password must have at least 6 characters");
                  } 
                else {
                 setError('');
                 }
                 }
             }/>
             </>

                )}
           
                <div>
                {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
                </div>
            </div>
           <div className='forgot-password'>
  {action === 'Login' && (
    <button 
      type="button"
      className="forgot-btn" 
     onClick={() => {

  setAction('forgot');
}}
    >
      Forgot Password?
    </button>
  )}
</div>

            <button type="submit" className='login-btn launch-btn'>
              {buttonText}
            </button>
            </form>

        {/* the form tage end here */}
            <div className='Register-logic'>
                {action === 'Login' &&(
                  <div> 
                  <p className='or'>OR</p>
            <div className='register-content'>
                <p className='register-text'>Don't have account?</p>
                <button 
  type="button"
  className="register-btn"
onClick={() => { 
  setAction('register');}}
>
  Register Now
</button>

            </div>
            </div> 
                )}
           
            </div>
          
        </div>
    
    </div>
    </div>
  )
};

export default Login;
