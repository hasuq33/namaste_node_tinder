const jwt = require("jsonwebtoken"); 
const User = require("../models/user.model");

const userAuth = async (req, res, next) =>{
    try {
        const { token } = req.cookies;
        if(!token){
            res.status(401).send("Unuthorized User");
            return;
        }
        const decodeObj =  jwt.verify(token,"test@1234"); 
        const {_id} = decodeObj;

        const user = await User.findById(_id);
        if(!user){
            throw new Error("User is not Found");
        }
        req.user = user;
        next();

    } catch (error) {
        res.status(400).send("Error: "+ error.message);
    }
}

module.exports = {userAuth};