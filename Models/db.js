const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/shailuApi",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("successfully connected");
}).catch(()=>{
    console.log("connection failed");
})