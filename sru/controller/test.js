const asyncHandler = require('express-async-handler')
const pool = require('../config/db')
const { get } = require('../routes/authRoute')

const addbrand = asyncHandler(async(req, res) => {
    const {name} = req.body
    const result = await pool.query("insert into brands(name) Values($1) Returning *", [name])
    return res.json({
        message: "Ok brands",
        data: result.rows
    })
})
const addCategory = asyncHandler(async(req, res) => {
    const {name} = req.body
    const result = await pool.query("insert into categories(name) Values($1) Returning *", [name])
    return res.json({
        message: "Ok categories",
        data: result.rows
    })
})

const getBrand = asyncHandler(async(req, res) => {
    const result = await pool.query(" Select * from brands")
    return res.json({
        message: "get brands",
        data: result.rows
    })
})
const getCategory = asyncHandler(async(req, res) => {
    const result = await pool.query("Select * from categories")
    return res.json({
        message: "get categories",
        data: result.rows
    })
})

module.exports = {
    addCategory,
    addbrand,
    getBrand,
    getCategory
}