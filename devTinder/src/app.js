const express = require('express');
const connectDB =require("./config/database"); 
const app = express(); 
const cookieParser =require("cookie-parser");

// Here we use express.json middleware to parse the json Data
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth"); 
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");

app.use("/",authRouter); 
app.use("/",profileRouter); 
app.use("/",requestRouter); 


connectDB().then(()=>{
    console.log("Db is connected!");
    app.listen(3000,()=>{
        console.log("Server is Listening");
    });
}).catch((error)=>{
    console.log("Error: " + error.message);
})