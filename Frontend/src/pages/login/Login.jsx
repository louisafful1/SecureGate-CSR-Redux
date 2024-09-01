import React from 'react'
import './login.css'

const Login = () => {
  return (
<div className="login-box">
    <h2>Login</h2>
    <form action="">
        <div className="user-box">
            <input type="text" name="username" required />
            <label htmlFor="username">Username</label>
        </div>
        <div className="user-box">
            <input type="password" name="password" required />
            <label htmlFor="password">Password</label>
        </div>
        <a href="forgotPassword.html">
            
            Login
        </a>
    </form>
</div>
  )
}

export default Login
