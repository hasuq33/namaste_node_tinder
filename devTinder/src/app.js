const express = require('express'); 

const app = express(); 

app.use("/",(req,res)=>{
    res.send("Hello From the server");
})

app.listen(3000,()=>{
    console.log("Server is Listening");
});