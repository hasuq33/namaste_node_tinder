const express = require('express');
const connectDB =require("./config/database"); 
const {userAuth} = require("./middlewares/auth");
const app = express(); 
const User = require("./models/user.model"); 
const {validateSignUpData} = require("./utils/validation")
const cookieParser =require("cookie-parser");
const bcrypt = require("bcrypt");

// Here we use express.json middleware to parse the json Data
app.use(express.json());
app.use(cookieParser());


app.get("/profile",userAuth,async (req, res)=>{

    try {   
        const user = req.user;
        res.send(user);
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
})

app.post("/signup",async (req, res)=>{
    try {
        // Validate the Data through Helper Functions 
        validateSignUpData(req);

        const { firstName , lastName , emailId , gender , password } = req.body;
        // Encrypt Password 
        const HashPassword = await bcrypt.hash(password,10);
        // Creating a new instance of the User Model
        const user = await User.create({
            firstName,
            lastName,            
            emailId, 
            gender, 
            password:HashPassword,
        });
    res.send("User added successfully!");
} catch (error) {
    res.status(400).send("Error saving the User: "+ error.message);
} 
});

// Login API
app.post("/login",async (req , res)=>{
    try {
        const { emailId , password } = req.body; 
        const user = await User.findOne({emailId:emailId});
        if(!user) throw new Error("Email is not Found in DB!");
        
        const isPasswodValid = await user.validatePassword(password);
        if(isPasswodValid){
            // create a jwt token here
            const token =  user.getJWT();
            // Add the Token to cookie and send the response back to the user
            res.cookie("token",token,{expires: new Date(Date.now()+8*3600000)});
            res.send("USer Login SccessFully !");
        }else{
            throw new Error("Invalid Credentials!")
        }
    } catch (error) {
        res.status(400).send("Error: "+ error.message);
    }
})

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
app.patch("/user/:userId",async (req , res)=>{
    const userID = req.params?.userId;
    const data = req.body;
    if(!userID) res.status(404).send("Please enter a user ID");
    try {
        const ALLOWER_UPDATES = ['photoUrl',"about","gender","age"]; 
        const isUpdateAlllowed = Object.keys(data).every((k)=> !ALLOWER_UPDATES.includes(k)); 
        if(!isUpdateAlllowed) throw new Error("Fields are not Allowed to Update!");
        
        if(data?.skills.length > 10){
            throw new Error("Skills Can not be more than 10")
        }
        
        const user = await User.findByIdAndUpdate(userID,req.body,{runValidators:true});
        res.send("User updated successfully updated");
        
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(404).send("User Update Failed: "+error.message);
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