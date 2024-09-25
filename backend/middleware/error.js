const ErrorHandler = require('../utils/errorhandler')

module.exports = (err,req,res,next)=>{
    statusCode  = err.statusCode || 500;
    message = err.message || "Internal Sever Error";

    res.status(statusCode).json({
        success : false,
        error : err.message
    })
}