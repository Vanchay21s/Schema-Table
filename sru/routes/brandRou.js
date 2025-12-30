const express = require('express')
const { getBrand } = require('../controller/test')
const brandRouter = express() 

brandRouter.get("/", getBrand)

module.exports = brandRouter