const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Product Name"]
    },
    description:{
        type:String,
        required:[true,"Please Enter Product Description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter Price Product"],
        maxLength:[8,"Price Cannot exceed 8 character"]
    },
    rating:{
        type:Number,
        default:0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please Enter Product Category"]
    },
    stock:{
        type:String,
        required:[true,"Please Enter Product Stock"],
        maxLength:[4,"Stock vannot exceed 4 character"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Product",productSchema);