const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authModel = require('../model/authModel')
const signup = asyncHandler (async (req, res)=>{
    const {username, email, password} = req.body
    console.log(password)
    const passwordHashed = await bcrypt.hash(password, 10)
    console.log(passwordHashed)
    const result = await authModel.signUp({username: username, email: email, passwordHashed: passwordHashed})
    return res.json({
        mesasage: `User: ${email}, Regsiter Successfully!!!`,
        status: 201,
        data: result
    })
})

const login = asyncHandler(async(req, res)=>{
    const {email, password} = req.body
    const result = await authModel.login({email: email})
    if(result.length == 0){
        return res.json({message: "User Not Found...."})
    }
    const passwordMatch = await bcrypt.compare(password, result[0].password)
    if(!passwordMatch){
        return res.json({message: "Username and Password is inconrrect"})
    }
    
    const tokens = jwt.sign({
        id: result[0].id,
        username: result[0].username
    }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    })
     
    return res.json({
        message: 'Login Successfully....',
        status: 200,
        data: tokens
    })
})

module.exports = {signup, login}

