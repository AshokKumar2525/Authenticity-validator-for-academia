const jwt = require('jsonwebtoken')
const { User } = require('../models/User')
const verifyJWT = (req, res, next) => {
    const token = req.cookies.accessToken
    if (!token) return res.status(401).json({message: 'No token provided'})
    const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({message:'Invalid Token'})
        req.user = decoded
        next();
    })
}
module.exports = verifyJWT;