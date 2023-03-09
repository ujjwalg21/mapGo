const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const userRouter = require('./routes/user');
const hostRouter = require('./routes/host');
const eventRouter = require('./routes/event');
const scheduleRouter = require('./routes/schedule');

const PORT = process.env.PORT;

const app = express();


mongoose.connect(process.env.DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
    })
    .then(()=>{
        console.log("db connected successfully");
    })
    .catch((err)=>{
        console.log("db connection failed");
        console.log(err);
    })

//only parses json req body
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/host", hostRouter);
app.use("/api/event", eventRouter);
app.use("/api/schedule", scheduleRouter);

app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`);
});