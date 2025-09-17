const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Employer, Government, University } = require('../models/User')
router.post('/', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({message: 'No user found with this email'})
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({message: 'Invalid credentials'})
        const accessToken = jwt.sign(
            { email: user.email, userType: user.userType }, 
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '1h'}
        )
        res.cookie('accessToken', accessToken, {
            httpOnly:true,
            sameSite:"strict",
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000 // 1 hour
        })
        res.status(201).json({message: 'Login successful', userType: user.userType})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})
module.exports= router