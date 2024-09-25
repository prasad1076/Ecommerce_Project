const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const ApiFeatures = require('../utils/apiFeatures');
const sendToken = require('../utils/jwtToken');


exports.registerUser = catchAsyncError(async (req,res,next)=>{
    const {name,email,password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id : "this is sample id",
            url:"profilePicUrl"
        },
    });

    sendToken(user,201,res);
});


//Login User 


exports.loginUser = catchAsyncError(async (req,res,next)=>{
    const {email,password} = req.body;
    //checkng if user has given password and email both

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password",400))
    }
    const user = await User.findOne({email:email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Error Or Password"));
    }
    const isPasswordMatched = user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Error Or Password"),401);
    }
    sendToken(user,200,res);
})