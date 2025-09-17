const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Employer, Government, University } = require('../models/User')
function getDomainFromEmail(email) {
  if (!email || typeof email !== "string") return null;
  const parts = email.trim().toLowerCase().split("@");
  return parts.length === 2 ? parts[1] : null;
}
router.post('/', async (req, res) => {
    const { nameDep, email, password, userType } = req.body
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.findOne({email})
        if (user) {
            return res.status(400).json({message: 'User already exists with this email'})
        }
        if (userType === 'employer') {
            const { person, number, domain, designation, industry, location } = req.body
                if (domain !== getDomainFromEmail(email)) {
                    return res.status(400).json({ message: 'Email domain does not match company domain' });
                }
                const newEmployer = await Employer.create({ name:nameDep, email, password: hashedPassword, userType, contactPerson:person, contactNumber:number, companyDomain:domain, designation, industry, location })
                console.log(newEmployer)
        } else if (userType === 'government') {
            const  { govtId, departmentType, state  } = req.body
                const newDepartment = await Government.create({ name:nameDep, email, password: hashedPassword, userType, govtId, departmentType, state })
                console.log(newDepartment)
        } else if (userType === 'university') {
            const { uid, contactNumber, location } = req.body
                const newUniversity = await University.create({ name:nameDep, email, password: hashedPassword, userType, universityId: uid, contactNumber, location })
                console.log(newUniversity)
        }
        else {
            return res.status(400).json({message: 'Invalid user type'})
        }
        const accessToken = jwt.sign(
            { email, userType }, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: '1h' }
        )

        // Send token as HttpOnly cookie
        res.cookie('accessToken', accessToken, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
            maxAge: 60 * 60 * 1000
        }) // 1 hour
        res.status(201).json({message: 'User registered successfully', userType})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router