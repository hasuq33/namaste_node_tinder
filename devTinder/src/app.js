const express = require('express');
const connectDB =require("./config/database"); 
const { adminAuth , userAuth} = require("./middlewares/auth")
const app = express(); 
const User = require("./models/user.model"); 

app.post("/signup",async (req, res)=>{

    // Creating a new instance of the User Model
    const user = new User({
        firstName: "Harshiv", 
        lastName: "Joshi",
        emailId: "harshivjoshi1234@gamil.com",
        password:"Harshi10",
    })
try {
    await user.save();
    res.send("User added successfully!");
} catch (error) {
    res.status(400).send("Error saving the User: "+ error.message);
}
    
})

connectDB().then(()=>{
    console.log("Db is connected!");
    app.listen(3000,()=>{
        console.log("Server is Listening");
    });
}).catch((error)=>{
    console.log("Error: " + error.message);
})