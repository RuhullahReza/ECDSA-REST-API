const router = require('express').Router()
const {register,login,protected} = require('../controllers/user.controller')
const authHeader = require("../utils/auth");

router.post('/register',register)
router.post('/login',login)
router.get('/protected',authHeader,protected)

module.exports = router