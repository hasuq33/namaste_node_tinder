const express = require('express');
const userRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest.model");
const User = require("../models/user.model"); 

const USER_SAFE_DATA = "firstName lastName skills age gender photoUrl about"

// Getall the pending connections Request for logged in users
userRouter.get("/users/requests/received",userAuth,async (req,res)=>{
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status:"intrested"
        }).populate('fromUserId',USER_SAFE_DATA);
        // .populate("fromUserId",['firstName','lastName'])

        res.json({
            message: "Data Fetched Sucessfully",
            data: connectionRequest
        })
    } catch (error) {
        req.statusCode(404).send("ERROR: "+error.message);
    }
})

userRouter.get("/user/connnections",userAuth, async (req , res) =>{
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id,status:"accepted"}, 
                {fromUserId: loggedInUser._id,status:"accepted"},
            ]
        }).populate("fromUserId",USER_SAFE_DATA)
        .populate("toUserId",USER_SAFE_DATA); 

        const data = connectionRequests.map((row)=>{
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()) return row.toUserId;

            return row.fromUserId;
        });

        res.json({data: data}); 
    } catch (error) {
        res.status(400).send({message: error.message});
    }
})

userRouter.get("/feed",userAuth , async (req, res)=>{
    try {
        // User should see all the user cards except
        // 0. his own cards
        // 1. his connections
        // 2. ignored people 
        // 3. alredy sent the connections request 

        const loggedInUser = req.user ;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page-1)*limit;

        // Find the all connetions requests (send + received)
        const connectionRequests = await ConnectionRequest.find({
            $or:[
                {toUserId: loggedInUser._id}, 
                {fromUserId: loggedInUser._id},
            ]
        }).select("fromUserId toUserId").populate("fromUserId","firstName").populate("toUserId","firstName");

        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((req)=>{
            hideUsersFromFeed.add(req.fromUserId._id.toString());
            hideUsersFromFeed.add(req.toUserId._id.toString());
        });
        const users = await User.find({
            $and:[
                {_id:{$nin: Array.from(hideUsersFromFeed)}},
                {_id:{$ne:loggedInUser._id}}
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);
        res.json({feed:users });
    } catch (error) {
        res.status(400).send({message:error.message});
    }
})
module.exports = userRouter;