const express = require('express')
const router = express.Router()
router.post('/', (req, res) => {
    res.clearCookie('accessToken', {
        httpOnly:true,
        sameSite:"strict",
        secure: process.env.NODE_ENV === 'development'
    })
    res.status(200).json({message: 'Logged out successfully'})
})

module.exports = router