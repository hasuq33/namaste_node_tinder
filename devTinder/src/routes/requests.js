const express = require("express"); 
const {userAuth} = require("../middlewares/auth");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest.model");
const User = require("../models/user.model"); 

Object.defineProperty(String.prototype, 'capitalize',{
    value:function(){
        return this.charAt(0).toUpperCase() + this.slice(1);
    }, 
    enumerable:false,
})

requestRouter.post("/request/send/:status/:toUserId",userAuth,async (req, res)=>{
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "intrested"];

        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"Invalid Status Type: "+status});
        }

        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(404).json({message:"User not found!"})
        }

        // If there is an existing ConnectionRequest
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                {fromUserId , toUserId},
                {fromUserId:toUserId,toUserId:fromUserId},
            ]
        })
        
        if(existingConnectionRequest){
            return res.status(400).send({message:"Connection Request Already Exists!"})
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId, 
            toUserId, 
            status
        });

        const data = await connectionRequest.save();
        res.json({
            message: req.user.firstName+" is "+status.capitalize() +" in "+ toUser.firstName,
            data,
        })
    } catch (error) {
        res.status(400).send("ERROR: "+ error.message);
    }

})

module.exports = requestRouter;