const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({
        email: req.user.email,
        userType: req.user.userType,
    })
})
module.exports = router;