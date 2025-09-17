import { Link, useNavigate } from "react-router-dom"
import React from "react"
export default function Login() {
    const navigate = useNavigate();
    async function handleForm(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        try {
            const response = await fetch('https://authenticity-validator-for-academia-1.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Object.fromEntries(formData)),
                credentials:"include"
            })
            const data = await response.json()
            if (response.status === 201) {
                if (data.userType == 'employer') {
                    navigate('/employer/dashboard')
                } else if (data.userType == 'university') {
                    navigate('/university/dashboard')
                } else {
                    navigate('/government/dashboard')
                }
                return;
            }
            else {
                alert(data.message)
            }
        } catch (err) {
            console.error('Error during registration:', err);
        }
    }
    return (
        <div className="login">
            <form onSubmit={handleForm}>
                <label htmlFor="email">Email</label>
                    <input type="text" placeholder="abc@gmail.com" name="email" id="email"/>
                
                <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password"/>
                 
                <button>Login</button>
                <span>Not Have an Account? <Link to="/register" >Register here</Link></span>
            </form>
        </div>
    )
}