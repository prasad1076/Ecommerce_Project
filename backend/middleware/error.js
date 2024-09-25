const ErrorHandler = require('../utils/errorhandler')

module.exports = (err,req,res,next)=>{
    statusCode  = err.statusCode || 500;
    message = err.message || "Internal Sever Error";

    if(err.name === "CastError"){
        const message  = `Resource not found. Invalid  ${err.path}`;
        err = new ErrorHandler(message,400)
    }

    res.status(statusCode).json({
        success : false,
        error : err.message
    })
}