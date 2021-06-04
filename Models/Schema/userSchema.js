const mongoose = require("mongoose");

const userSchma = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:Number
    },
    password:{
        type:String
    }
})
const userData = new mongoose.model("userRegistration",userSchma);
module.exports=userData;