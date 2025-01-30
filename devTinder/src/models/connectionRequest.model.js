const mongoose = require("mongoose"); 

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status:{
        type: String,
        required: true,
        enum:{
            values: ['ignored', 'intrested' , 'accepted' , 'rejected'],
            message: '{VALUES} is incorrect status type.'
        }
    }
},{
    timestamps:true,
});

// Creating the compount Index 
connectionRequestSchema.index({fromUserId:1,toUserId:1})

connectionRequestSchema.pre("save",function(next){
    const connectionRequest = this;
    // Check if the fromUserId as same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send the connection request to yourself!");
    }
    next();
})

const ConnectionRequest = new mongoose.model(
    'ConnectionRequest',
    connectionRequestSchema,
)

module.exports = ConnectionRequest;