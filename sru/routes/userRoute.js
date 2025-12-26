const express = require('express')
const { getAll, getById } = require('../controller/userController')
const userRouter = express.Router()
userRouter.get('/:id/', getById)
userRouter.get('/', getAll);
module.exports = userRouter