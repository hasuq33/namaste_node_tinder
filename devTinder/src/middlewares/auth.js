const adminAuth = (req,res,next) =>{
    const token = "harshiv"; 
    const isAdmin = token === "harshiv";

    if(!isAdmin){
        res.status(403).send("Unauthorized Token");
    }else{
        next();
    }
}

const userAuth = (req, res, next) =>{
    const token = "user";
    const user = token === "user"; 

    if(!user){
        res.status(403).send("User not found");
    }else{
        next();
    }
}

module.exports = {adminAuth,userAuth};