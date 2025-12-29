const { validationResult } = require("express-validator");

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);  
  next();
};

const errorHandler = (err, req, res, next) => {
    console.log({
        message: "=====>500 Internal Server Error<=====",
        status: 500,
        error: err.message
    })
    return res.json({
        message: "=====>500 Internal Server Error<=====",
        status: 500,
        error: err.message
    })
}

const handleValidation = (req, res, next) => {
    const result = validationResult(req)
    if(result.isEmpty){
        next()
    }
    return res.status(401).json({ error: result.array() });
}

module.exports = {
    logger,
    errorHandler,
    handleValidation
}