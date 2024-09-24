
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncError = require('../middleware/catchAsyncError');

//Create Product -- Admin
exports.createProduct = catchAsyncError(async (req,res,next)=>{
    console.log(req.body);
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
});

// Get ALL Product
exports.getAllProducts = catchAsyncError(async (req,res)=>{
    const products = await Product.find();
    res.status(200).json({
    success : true,
        message:"All Products Has been Fetched",
        products
    })
});


//get Product Details
exports.getProductDetails = catchAsyncError(async (req,res)=>{
    const products = await Product.find();
    res.status(200).json({
    success : true,
        message:"All Products Has been Fetched",
        products
    })
});

// Update Product
exports.updateProduct = catchAsyncError(async (req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler('Product Not Found',404));
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.json(200).json({
        success: true,
        product
    })
});

exports.deleteProduct = catchAsyncError(async (req,res,next)=>{
    const product  = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler('Product Not Found',404));
    }
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success :true,
        message : "Product Deleted Successfully"
    })
});