const express = require('express')
const { getCategory } = require('../controller/test')
const testRouter = express() 

testRouter.get("/", getCategory)

module.exports = testRouter