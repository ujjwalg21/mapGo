const router = require('express').Router();

const Host = require('../models/hostSchema');


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


module.exports = router;