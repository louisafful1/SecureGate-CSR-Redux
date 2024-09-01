import React from 'react'
import './ForgotPassword.css'

const ForgotPassword = () => {
  return (
    <div className="forgot-password-box">
    <h2>Forgot Password</h2>

    <form action="">
        <div className="user-box">
            <input type="email" name="email" required />
            <label for="email">Email</label>
        </div><br /><br />
        <a href="signup.html">
            
            Submit
        </a>
    </form>
</div>
  )
}

export default ForgotPassword
