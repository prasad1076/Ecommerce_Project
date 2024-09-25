const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required:[true,"Please Enter Your Name"],
        maxLength:[30,"Name Should Not Exceed 30 Character"],
        minLength:[4,"Nmae Should Have More Than 4 Characters"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a Valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[8,"Password Should Be Greater Than 8 Characters"],
        select:false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role:{
        type:String,
        default:"user",
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,

})

userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
         next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

// JWT Token

//we are generatig token and storing it to the coockie so that server will understan  that user is same we can give access to him

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};

//Compare Password

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}



module.exports = mongoose.model("User",userSchema)