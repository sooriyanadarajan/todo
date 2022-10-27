const express = require('express')
const auth = require('../middleware/auth')
const asyncHandler = require('../middleware/async')

const UserController = require('../controller/user')
const usercontroller = new UserController();

const router = express.Router()

router.post('/register', asyncHandler(usercontroller.register))
router.post('/login', asyncHandler(usercontroller.login))
router.get('/getProfile', auth, asyncHandler(usercontroller.getUser))
router.get('/logout', auth, asyncHandler(usercontroller.logout))


module.exports = router