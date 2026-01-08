const express = require('express');
const app = express();
const mongoose = require('mongoose');

const MongoURI = "mongodb://localhost:27017/"
mongoose.connect(MongoURI)
    .then(()=>{
        console.log("Connected to MongoDb!")
        app.listen(3000, ()=> {
            console.log("app is listening on port 3000")
        })
    })
    .catch((err)=>{
        console.log("❌mongodb connection error", err)
    })


// router
const userRoute = require('./routes/user.routes.js');

app.use('/api/user', userRoute)