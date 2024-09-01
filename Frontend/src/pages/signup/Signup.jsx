import React from 'react'
import './signup.css'

const Signup = () => {
  return (
    <div className="signup-box">
        <h2>Signup</h2>
        <form action="">
            <div className="user-box">
                <input type="text" name="firstName" required />
                <label for="firstName">First Name</label>
            </div>
               <div className="user-box">
                <input type="text" name="lastName" required />
                <label for="lastName">Last Name</label>
            </div> 
            <div className="user-box">
                <input type="email" name="email" required />
                <label for="email">Email</label>
            </div>
            <div className="user-box">
                <input type="tel" name="phone" required />
                <label for="phone">Phone</label>
            </div>
            <div className="user-box">
                <input type="password" name="password" required />
                <label for="password">Password</label>
            </div>
            <div className="user-box">
                <input type="password" name="confirmPassword" required />
                <label for="confirmPassword">Confirm Password</label>
            </div>
            <a href="login.html">
               
                Signup
            </a>
        </form>
    </div>
  )
}

export default Signup
