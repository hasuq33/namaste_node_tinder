const mongoose = require("mongoose"); 

const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://Harshiv:Harshi10@namstenode.71ppd.mongodb.net/devTinder"); 
}

module.exports = connectDB;
