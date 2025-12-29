const express = require('express')
const { signup, login } = require('../controller/authController')
const { signUpSchame } = require('../common/validate')
const { handleValidation } = require('../middleware/middleware')
const authRouter = express()
authRouter.post('/signup', signUpSchame, handleValidation, signup)
authRouter.post('/login', login)
module.exports = authRouter