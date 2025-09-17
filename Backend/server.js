const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConenct')
const verifyJWT = require('./middleware/verifyJWT')
require('dotenv').config()

connectDB()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "https://authenticity-validator-for-academia-e7po.onrender.com",  // frontend URL
    credentials: true                 // allow cookies
}))


app.use('/register', require('./route/register'))
app.use('/login', require('./route/login'))
app.use('/dashboard', verifyJWT, require('./route/dashboard'))
app.use('/logout', require('./route/logout'))
const PORT = process.env.PORT || 5000
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on ${PORT}`))
})