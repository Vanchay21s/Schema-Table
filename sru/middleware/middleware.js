
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

module.exports = {
    logger,
    errorHandler
}