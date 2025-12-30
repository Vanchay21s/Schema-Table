const asyncHandler = require('express-async-handler')
const productModel = require('../model/productModel')
const getProductByFilter = asyncHandler(async(req, res)=>{

    const brand = req.query.brand;
    const category = req.query.category
    const result = await productModel.filter({brand: brand, category: category})
    if(result.length == 0)
    {
        return res.json({
            message: "Not Found products",
        })
    }
    return res.json({
        message: "Alright",
        data: result
    })
})


module.exports = {getProductByFilter}