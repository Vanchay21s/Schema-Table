const express = require('express')
const { getProductByFilter } = require('../controller/productCon')
const testRouter = express() 

testRouter.get("/", getProductByFilter)

module.exports = testRouter