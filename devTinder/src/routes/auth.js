const express = require('express');
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user.model"); 
const bcrypt = require("bcrypt");

const authRouter = express.Router(); 

authRouter.post("/signup", async (req ,res)=>{
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
})

authRouter.post("/login", async (req , res)=>{
     try {
            const { emailId , password } = req.body; 
            console.log(emailId);
            const user = await User.findOne({emailId:emailId});
            if(!user) throw new Error("Email is not Found in DB!");
            
            const isPasswodValid = await user.validatePassword(password);
            if(isPasswodValid){
                // create a jwt token here
                const token = await user.getJWT();
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

authRouter.post("/logout",async (req,res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now())
    }).send("Logout SuccessFully!"); 
})

module.exports = authRouter;