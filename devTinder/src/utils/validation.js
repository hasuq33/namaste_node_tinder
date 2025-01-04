const validator = require('validator');

const validateSignUpData = (req) =>{
    const { firstName , lastName , emailId , password } = req.body;

    if(!firstName || !lastName){
        throw new Error("Please Procide both firstName and lastName!");
    }else if(!validator.isEmail(emailId)){
        throw new Error("Please Provide a valid email");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please Provide a strong password! ");
    }
}

module.exports = {
    validateSignUpData
}