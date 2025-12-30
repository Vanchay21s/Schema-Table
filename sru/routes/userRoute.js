const express = require('express')
const { getAll, getById } = require('../controller/userController');
const { addbrand, addCategory, getBrand, getCategory } = require('../controller/test');
const userRouter = express.Router()
userRouter.get('/:id/', getById)
userRouter.get('/', getAll);

userRouter.post("/brand", addbrand)
userRouter.post("/category", addCategory)
userRouter.get("/brand", getBrand)
userRouter.get("/category", getCategory)
module.exports = userRouter