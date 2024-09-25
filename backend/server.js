const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database')

dotenv.config({path:"backend/config/config.env"});
connectDatabase()

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is working on this server http://localhost:${process.env.PORT}`);
});


//unhandles promise rejection

process.on("unhandledRejecion",err=>{
    console.log(`Errr : ${err.message}`);
    server.close(()=>{
        process.exit(1);
    });
})