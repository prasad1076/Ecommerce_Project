const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');

//Create Product -- Admin
exports.createProduct = async (req,res,next)=>{
    const product = await Product.create(req.body);
    res.status(200).json({
        success: true,
        product
    })
}

// Get ALL Product
exports.getAllProducts = async (req,res)=>{
    const products = await Product.find();
    res.status(200).json({
    success : true,
        message:"All Products Has been Fetched",
        products
    })
};


//get Product Details
exports.getProductDetails = async (req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Ptoduct Not Found 123',404));
    }

    res.status(200).json({
        success : true,
        product
    });
};

// Update Product
exports.updateProduct = async (req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            meessage: "Product Not Found",
            success : false
        })
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
}

exports.deleteProduct = async (req,res,next)=>{
    const product  = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Deleted",500))
    }
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success :true,
        message : "Product Deleted Successfully"
    })
}