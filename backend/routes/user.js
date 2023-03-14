const router = require('express').Router();
const User = require('../models/userSchema');
const Schedule = require('../models/scheduleSchema');
const jwt = require('jsonwebtoken');
const Event = require('../models/eventSchema')

router.post("/register", async (req,res)=>{
    //req.body like userSchema
    try{
    // console.log("this is user req");
    // console.log(req.body);
    // console.log(req.headers);

        const newUser = new User(req.body)

        const alreadyUser = await User.findOne({username: req.body.username})
        if(alreadyUser){
            res.status(400).json("username taken");
        }
        else {
            const savedUser = await newUser.save();
            res.status(200).json(savedUser); 
        }
    }catch(err){
        res.status(500).json("error in server");
    }
})


//showevent WORKS
router.get('/showevents/:username', async(req,res)=>{
    //req.params username
    try{

        console.log("this is params")
        console.log(req.params);

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
        // res.status(200).json(schedule.events);
        console.log("this is schedule doc");
        console.log(schedule);

         const events = schedule.events
        console.log("this is eventIds")
        console.log(events);

         const allEvents = [];

         for(let i=0; i< events.length; i++){

            let eventDoc = await Event.findOne({_id:events[i]});
            
            // console.log("this is eventdocs")
            // console.log(eventDoc);

            allEvents.push(eventDoc);
         }

        console.log(allEvents);

         res.status(200).send(allEvents);
    }
    catch(err){
        console.log(err);
        res.status(500)
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

        //calling userschema method to generate and save token
        const token = await user.generateAuthToken();
        res.cookie("mapgo", token,{
            expires: new Date(Date.now() + 26000000000),
            httpOnly: true
        })
        
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