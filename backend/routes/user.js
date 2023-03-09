const router = require('express').Router();
const User = require('../models/userSchema');
const Schedule = require('../models/scheduleSchema');

router.post("/register", async (req,res)=>{
    const newUser = new User(req.body)

    try{
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);        

    }catch(err){
        res.status(500).json(err);
    }
})

router.get('/showevents/:username', async(req,res)=>{
    //req.params username
    try{
        const doc = await User.findOne(
            {username:req.params.username}
        );

        if(!doc){
            console.log("no user exists");
            res.send(404).end();
        }
        console.log("this is scheduleId of object")
        console.log(doc.schedule);

        let schedule = await Schedule.findOne(
            {_id:doc.schedule}
        );

        if(!schedule){
            console.log("this user has no schedule");
            res.send(401).end();
        }
        res.status(200).json(schedule.events);
    }
    catch(err){
        console.log(err);
    }
        
    
})


router.post('/login', async(req,res)=>{
    try{
        //find user with unique username
        //req.body = {username, password}
        //username is unique
        const user = await User.findOne({username:req.body.username});

        if(!user){
            res.status(400).json("wrong username or password");
        }

        //validate password
        const validPassword = (req.body.password == user.password);

        if(!validPassword){
            res.status(400).json("wrong username or password");
          
        }

        //send response ok
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json(err);
    }
})



router.put('/password/:username', async(req,res)=>{
    
        //req.params username, newpassword

       User.findOneAndUpdate(
        {username: req.params.username},
        {password:req.body.newpassword}
       )
       .then( doc=>{
            if(!doc){return res.status(404).end();}
            return res.status(200).json(doc);
       })
       .catch(err => console.log(err))
})

module.exports = router; 