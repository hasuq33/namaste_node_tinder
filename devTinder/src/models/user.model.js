const mongoose = require('mongoose'); 
const validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        minLength:4,
        maxLength:50
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        required: true,
        unique:true,
        lowercase:true,
        trim:true, 
        validate(value){
            if(!validator.isEmail(value)) throw new Error("Please enter a valid email");
        }
    },
    password:{
        type:String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)) throw new Error("Please enter a strong password! ");
        }
    },
    age:{
        type: String, 
        min:18,
    },
    gender:{
        type:String,
        validate(value){
            if(!['male','female','other'].includes(value)) throw new Error("Invalid Gender Value !")
        }
    }, 
    photoUrl:{
        type:String, 
        default:"https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        validate(value){
            if(!validator.isURL(value)) throw new Error("Invalid URL: " + value);
        }
    },
    about:{
        type:String, 
        default:"This is my About us!"
    },
    skills:{
        type:Array,
    }
},{ timestamps: true })

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id}, "test@1234",{expiresIn:"30d"})
    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this; 
    const passowrdHash = user.password;
    const isValidePassword = await bcrypt.compare(passwordInputByUser,passowrdHash);
    return isValidePassword;
}

module.exports = mongoose.model('User',userSchema); 