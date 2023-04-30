const mongoose = require("mongoose")
mongoose.set('strictQuery', true)
require('dotenv').config();
const DBconn= async()=>{
    
    try
    {
        await mongoose.connect(process.env.mongodblink)
    }
    catch(err)
    {
        console.log(err)
    }
}

module.exports = DBconn