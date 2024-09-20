const mongoose  = require('mongoose');


const connectDatabase = ()=>{
    mongoose.connect("mongodb+srv://prasadjagtap70:wtg4yg5UjUBJBZ3k@ecommerce.4s0kk.mongodb.net/?retryWrites=true&w=majority&appName=Ecommerce").then((data)=>{
        console.log('mongodb connected with node');
    }).catch((err)=>{
        console.log(err);
    })
}
    
module.exports = connectDatabase;
    
