
import React, { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleReset = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }
    alert(`Reset link sent to ${email}`);
  };

  return (
    <div className="forgot-container">
      <h2>Forgot Password</h2>
      <p>Enter your email to reset password</p>
      <input 
        type="email" 
        placeholder="Enter your email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleReset}>Send Reset Link</button>
    </div>
  );
}

 
 export default ForgotPassword;