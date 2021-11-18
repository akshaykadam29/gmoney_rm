const mongoose = require('mongoose');
const dotenv = require("dotenv");

//Environment Variable
dotenv.config();

// Db connect 
mongoose.connect(process.env.DB_Connect,{
    useUnifiedTopology : true, useNewUrlParser :true }, (err) => {
    if(!err)
        console.log("MongoDB connection Succeeded.");
    else
        console.log("Error in DB Connection : " + JSON.stringify(err, undefined,2));
});

module.exports = mongoose;