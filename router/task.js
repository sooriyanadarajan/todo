const express = require('express')
const Auth = require('../middleware/auth')
const asyncHandler = require('../middleware/async')

const TaskController = require('../controller/task')

const taskController = new TaskController();

const router = express.Router()

router.post('/create', Auth, asyncHandler(taskController.create))
router.post('/list', Auth, asyncHandler(taskController.list))
router.post('/expirylist', Auth, asyncHandler(taskController.expirylist))
router.patch('/update', Auth, asyncHandler(taskController.update))

module.exports = router