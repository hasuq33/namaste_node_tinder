const validator = require('validator');

const validateSignUpData = (req) =>{
    const { firstName , lastName , emailId , password } = req.body;

    if(!firstName || !lastName){
        throw new Error("Please Provide both firstName and lastName!");
    }else if(!validator.isEmail(emailId)){
        throw new Error("Please Provide a valid email");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please Provide a strong password! ");
    }
}

const validateProfileEditData = (req) =>{
    const allowedEditFields = ["firstName","lastName","emailId","age","gender","photoUrl","about","skills"];
    const isEditAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field));

    return isEditAllowed;
}

module.exports = {
    validateSignUpData,
    validateProfileEditData
}