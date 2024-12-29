const express = require('express');
const connectDB =require("./config/database"); 
const { adminAuth , userAuth} = require("./middlewares/auth")
const app = express(); 
const User = require("./models/user.model"); 

// Here we use express.json middleware to parse the json Data
app.use(express.json());

app.post("/signup",async (req, res)=>{
    // Creating a new instance of the User Model
    const user = new User(req.body)
try {
    await user.save();
    res.send("User added successfully!");
} catch (error) {
    res.status(400).send("Error saving the User: "+ error.message);
}
    
}); 

// Get User by email
app.get("/user", async (req, res)=>{
    const userID = req.body.id; 
    try {
        const user = await User.findById(userID);
        console.log(user)
        if (user) res.send(user);
        else res.status(404).send("User not Found!")
    } catch (error) {
        res.status(400).send("Something went wrong!")
    }
})

// Get all Data from DB
app.get("/feed",async (req, res)=>{
    try {
        const users = await User.find({}); 
        if (users.length > 0) res.send(users);
        else res.status(404).send("User not Found!")
    } catch (error) {
        res.status(400).send("Something went wrong!");
    }
})

// Delete User By it's ID
app.delete("/user",async (req , res)=>{
    const userID = req.body.id;
    console.log(userID);
    if(!userID) res.status(404).send("Please enter a user ID");
    try {
        const user = await  User.findById(userID);
        if(user){
            await User.findByIdAndDelete(userID);
            res.status(200).send("User deleted successfully")
        }else{
            res.status(404).send("User not found");
        }
        
    } catch (error) {
        console.log("Error: " + error.message);
    }
})

// Update User Documents
app.patch("/user",async (req , res)=>{
    const userID = req.body.id;
    console.log(userID);
    if(!userID) res.status(404).send("Please enter a user ID");
    try {
        const user = await User.findByIdAndUpdate(userID,req.body);
        res.send("User updated successfully updated");
        
    } catch (error) {
        console.log("Error: " + error.message);
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