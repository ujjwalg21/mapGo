const router = require('express').Router();
const User = require('../models/userSchema');
const Schedule = require('../models/scheduleSchema');
const jwt = require('jsonwebtoken');
const Event = require('../models/eventSchema');
const {authenticateUser} = require('../middleware/authenticate');
const Host = require('../models/hostSchema');

//OK
router.post("/register", async (req,res)=>{
    //req.body like userSchema
    try{
        // console.log("this is user req");
        console.log(req.body);

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

//OK
router.post('/login', async(req,res)=>{
    try{
        const userDoc = await User.findOne({username:req.body.username});

        if(!userDoc){
            res.status(401).json("wrong username or password").end();
        }

        //validate password
        const validPassword = (req.body.password == userDoc.password);

        if(!validPassword){
            res.status(401).json("wrong username or password").end();
          
        }

        //calling userschema method to generate and save token
        let token = await userDoc.generateAuthToken();
        
        console.log(token);

        //store token in cookie
        res.cookie("MAPGOdevUSER", token,
        {
            expires: new Date(Date.now() + 26000000000),
            httpOnly: true
        }
        );
        // console.log("cookie stored");
        // console.log(req.cookies);
        
        // console.log(res.cookies);
        
        // console.log("login done");
        // // console.log(res);
        res.status(200).json("login successful");
    }
    catch(err){
        // res.status(500).json(err);
        console.log(err);
    }
})

//OK
router.get('/showevents', authenticateUser , async(req,res)=>{
    try{
        const doc = await User.findOne(
            {username:req.rootUser.username}
        );

        if(!doc){
            console.log("no user exists");
            res.status(404).end();
        }
        const allEvents = [];
   
        for(let i=0; i< req.rootUser.schedule.length; i++){
            let eventDoc = await Event.findOne({_id : req.rootUser.schedule[i]});    
            allEvents.push(eventDoc);
        }
        
        res.status(200).send(allEvents).end();
    }
    catch(err){
        console.log(err);
        res.status(500)
    }  
});

//OK
router.put('/password/:username/:newpassword', async(req,res)=>{
    
        //req.params username, newpassword

       User.findOneAndUpdate(
        {username: req.params.username},
        {password:req.params.newpassword}
       )
       .then( doc=>{
            if(!doc){return res.status(404).end();}
            return res.status(200).json(doc);
       })
       .catch(err => console.log(err))
})

//OK
router.put('/subscribe/:hostname', authenticateUser , async(req,res)=>{
    try{

        const user = await User.findOneAndUpdate(
            {username: req.rootUser.username},
            { $push: { subscribed: req.params.hostname }}
        )
        
        if(!user){return res.status(404).end();}
    
        const host = await Host.findOneAndUpdate(
            {hostname: req.params.hostname},
            { $push: { subscribers: req.rootUser.username }}
        )
        if(!host){
            console.log("no such host");
            return res.status(404).end();
        }

        const hostEvents = await Event.find(
            {hostname:req.params.hostname}
        );
        
        console.log("this is host new events");
        // console.log(hostEvents.length);
        for(let i=0; i< hostEvents.length; i++){

            const user = await User.findOneAndUpdate(
                {username: req.rootUser.username},
                { $addToSet: { schedule: hostEvents[i]._id }}
            );
        }       

        res.status(200).json(user); 
    }
    catch(err){
        console.log(err);
    }
});

//OK
router.get('/showhosts', authenticateUser, async(req,res)=>{
    try{
        const doc = await User.findOne(
        {username: req.rootUser.username}
        );

        if(!doc){
            console.log("no user exists");
            res.status(404).end();
        }
        console.log("this is subscribed hosts")
        console.log(doc.subscribed);

        const allHosts = [];

         for(let i=0; i< doc.subscribed.length; i++){

            let hostDoc = await Host.findOne({hostname:doc.subscribed[i]}, '-hostpassword');

            if(!hostDoc){
                continue
            }

            allHosts.push(hostDoc);
         }
        // console.log(allHosts);
        res.status(200).send(allHosts).end();
    }
    catch(err){
        console.log(err);
    }

})

//OK
router.get('/logout', (req, res)=>{
    console.log("from the logout page");
    res.clearCookie('MAPGOdevUSER', {path: '/'})
    res.status(200).send("logged out successfully");
});


////////miscellaneous routes

router.get('/private', authenticateUser, (req,res)=>{
    console.log("this is private");
    res.send(req.rootUser);
});


router.get('/test', (req,res)=>{
    console.log("this is res header");
    console.log(req.cookies)
    res.send("done")
})

module.exports = router; 