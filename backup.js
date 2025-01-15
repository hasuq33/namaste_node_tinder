app.get("/profile",userAuth,async (req, res)=>{

    try {   
        const user = req.user;
        res.send(user);
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
})


// Get User by email
app.get("/user", async (req, res)=>{
    const userID = req.body.id; 
    try {
        const user = await User.findById(userID);
        console.log(user)
        if (user) res.send(user);
        else res.status(404).send("User not Found!")
    } catch (error) {
        res.status(400).send("Something went wrong!")
    }
})


// Delete User By it's ID
app.delete("/user",async (req , res)=>{
    const userID = req.body.id;
    console.log(userID);
    if(!userID) res.status(404).send("Please enter a user ID");
    try {
        const user = await  User.findById(userID);
        if(user){
            await User.findByIdAndDelete(userID);
            res.status(200).send("User deleted successfully")
        }else{
            res.status(404).send("User not found");
        }
        
    } catch (error) {
        console.log("Error: " + error.message);
    }
})

// Update User Documents
app.patch("/user/:userId",async (req , res)=>{
    const userID = req.params?.userId;
    const data = req.body;
    if(!userID) res.status(404).send("Please enter a user ID");
    try {
        const ALLOWER_UPDATES = ['photoUrl',"about","gender","age"]; 
        const isUpdateAlllowed = Object.keys(data).every((k)=> !ALLOWER_UPDATES.includes(k)); 
        if(!isUpdateAlllowed) throw new Error("Fields are not Allowed to Update!");
        
        if(data?.skills.length > 10){
            throw new Error("Skills Can not be more than 10")
        }
        
        const user = await User.findByIdAndUpdate(userID,req.body,{runValidators:true});
        res.send("User updated successfully updated");
        
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(404).send("User Update Failed: "+error.message);
    }
})