import { Link, useNavigate } from "react-router-dom"
import React from "react"
export default function Register() {
    const [user, setUser] = React.useState("")
    const navigate = useNavigate();
    async function handleForm(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        try {
            const response = await fetch('http://localhost:5000/register', {
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
        // console.log(formData)
    }

    function handleUser(event) {
        const {value} = event.currentTarget;
        setUser(value)
    }
    return (
        <div className="register">
            <form onSubmit={handleForm}>
                <label htmlFor="org">Name</label>
                    <input type="text" placeholder="org/dept/university" name="nameDep" id="org"/>
                <label htmlFor="email"> Email</label>
                    <input type="text" placeholder="abc@domain" name="email" id="email"/>
                <label htmlFor="password"> Password</label>
                    <input type="password" name="password" id="password"/>
                <label htmlFor="type">Who are you</label>
                <select name="userType" id="type" onChange={handleUser}>
                    <option value="">Select a option</option>
                    <option value="university">University/Institution</option>
                    <option value="government">Government</option>
                    <option value="employer">Employer/Recruiter</option>
                </select>
                {user === 'employer' ? <div className="userType">
                    <label htmlFor="person">Contact Person Name</label>
                        <input type="text" placeholder="e.g. Jack" name="person" id="person"/>
                    <label htmlFor="number">Contact Number</label>
                        <input type="text" placeholder="e.g. 1234567890" name="number" id="number"/>
                    <label htmlFor="domain">Company Domain</label>
                        <input type="text" placeholder="e.g. company.com" name="domain" id="domain"/>
                    <label htmlFor="role">Designation</label>
                        <input type="text" placeholder="e.g. HR, etc.," name="designation" id="role"/>
                    <label htmlFor="sector">Industry</label>
                        <input type="text" placeholder="e.g. IT, Finance" name="industry" id="sector"/>
                    <label htmlFor="loc">Location</label>
                        <input type="text" placeholder="City, State" name="location" id="loc"/>
                </div>: null}
                {user === 'government' ? <div className="userType">
                    <label htmlFor="departmentType">Department Type</label>
                        <input type="text" placeholder="e.g. Jack" name="departmentType" id="departmentType"/>
                    <label htmlFor="govtId">Govt Registration Id</label>
                        <input type="text" placeholder="e.g. HRD-JH-2025" name="govtId" id="govtId"/>
                    <label htmlFor="loc">State</label>
                        <input type="text" placeholder="State" name="state" id="loc"/>
                </div>: null}
                {user === 'university' ? <div className="userType">
                    <label htmlFor="university">University Id</label>
                        <input type="text" placeholder="e.g. 50211" name="uid" id="university"/>
                    <label htmlFor="person">Contact Number</label>
                        <input type="number" placeholder="e.g. 1234567890" name="contactNumber" id="person"/>
                    <label htmlFor="loc">Location</label>
                        <input type="text" placeholder="City, State" />
                </div>: null}
                <button>Register</button>
                <span>Already Have an account? <Link to='/login' >Login Here</Link></span>
            </form>
        </div>
    )
}