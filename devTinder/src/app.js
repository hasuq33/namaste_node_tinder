const express = require('express');
const { adminAuth , userAuth} = require("./middlewares/auth")

const app = express(); 

app.get("/admin", adminAuth);

app.get("/admin/getAllData",adminAuth,(req,res)=>{
    // Logic of checking if the request is authorized

    const token = "harshiv"; 
    const isAuthorized = token === "harshi";
    if(isAuthorized){
        res.send("All Data Send"); 
    }else{
        res.status(401).send("Unauthorized request");
    }
})

app.get("/user_test",userAuth,(req , res, upnext)=>{
    console.log("User Login Test Sucessfully");
    upnext();
},(req, res)=>{
    res.send({"status":"Yes Your Data Was Successful"});
})


app.use("/user",userAuth,(req, res,next)=>{
    next();
    res.send("First Response"); 
},(req, res)=>{
    res.send("Second Response");
})

app.get("/hello/:userID",userAuth,(req, res)=>{
    console.log(req.params)
    console.log(req.query)
    res.send("Hello from the Server Get Request");
})

app.post("/hello",userAuth,(req, res)=>{
    res.send("Hello from the Server Post Request");
})

app.delete("/hello",userAuth,(req, res)=>{
    res.send("Hello from the Server Delete Request");
});

app.patch("/hello",(req, res)=>{
    res.send("Hello from the Server Patch Request");
});

app.get(/a/,(req, res)=>{
    res.send({'data':"A is Exists!"});
})

app.use("/",(req,res)=>{
    res.send("Hello From the server");
})
app.listen(3000,()=>{
    console.log("Server is Listening");
});