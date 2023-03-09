const router = require('express').Router();

const Event = require('../models/eventSchema');


router.post("/new", async (req,res)=>{
    const newEvent = new Event(req.body)

    try{
        const savedEvent = await newEvent.save();
        res.status(200).json(savedEvent);   
        console.log("event created successfully");     

    }catch(err){
        res.status(500).json(err);
    }
})

router.get('/show', async(req,res)=>{
    try{
        const allEvents = await Event.find();

        res.status(200).send(allEvents);
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.get('/eventdetail/:id', async (req,res)=>{
    Event.findOne(
        {_id: req.params.id}
    )
    .then(doc =>{
        if(!doc){
            console.log("no such event")
            return res.status(404).end();
        }
        return res.status(200).json(doc)
    })
    .catch(err => console.log(err));
})

module.exports = router; 