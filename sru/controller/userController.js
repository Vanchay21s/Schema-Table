const userModel = require('../model/userModel')
const asyncHandler = require('express-async-handler')

const getAll = asyncHandler(async(req, res)=>{
    const page = req.query.page || 1 ;
    const limit = req.query.limit || 10;
    const result = await userModel.findAll({page: page, limit: limit})
    if(result.users == 0){
        return res.json({
            message: "Not found user...."
        })
    }
    const totalUser = result.totalUser
    const totalPage = Math.ceil(result.totalUser/limit)

    return res.json({
        totalPage,
        totalUser,
        data: result.users
    })
})

const getById = asyncHandler(async(req, res)=>{
    const id = req.params.id
    const result = await userModel.findByOne(id)
    if(result == 0){
        return res.json({
            message: "Not Founn User by Id..!!",
            status: 404
        })
    }
    return res.json({
        message: "Get User By Id.....",
        status:  200,
        data: result
    })
})
 module.exports = {
    getAll,
    getById
 }