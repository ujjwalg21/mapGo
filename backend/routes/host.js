const router = require('express').Router();

const Host = require('../models/hostSchema');
const Event = require('../models/eventSchema');


router.post("/register", async (req,res)=>{
    try{
    //add conditions on input req.body


    const newHost = new Host(req.body)

        const savedHost = await newHost.save();
        res.status(200).json(savedHost);        

    }catch(err){
        res.status(500).json(err);
    }
})

router.post('/login', async(req,res)=>{
    try{
        //find host with unique hostname
        //req.body = {username, password}
        //username is unique
        const host = await Host.findOne({hostname:req.body.hostname});

        if(!host){
            res.status(400).json("wrong username or password");
        }

        //validate password
        const validPassword = (req.body.hostpassword == host.hostpassword);

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


//updating password
router.put('/password/:id', async(req,res)=>{
    try{
        User.findOneAndUpdate(
            {_id: req.params.id},
            {hostpassword: req.body.newHostPassword},
            (error,data)=>{
                if(error){
                    //data is the old data
                    console.log(error);
                }
                else{
                    console.log(data);
                }
            }
         )
    }catch(err){

    }
})


//showevents works
router.get('/showevents/:hostname', async(req,res)=>{
    try{
        const hostname = req.params.hostname;
        const hostDoc = await Host.findOne({hostname:hostname});

        const hostId = hostDoc._id;

        const allEvents = await Event.find({host: hostId});
         
        // console.log(allEvents);
        res.status(200).json(allEvents);
    }
    catch(err){
        console.log(err);
    }
})


module.exports = router;