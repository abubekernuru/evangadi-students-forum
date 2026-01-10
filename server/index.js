const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')

const MongoURI = "mongodb://localhost:27017/student_forum"
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

app.use(express.json());
app.use(cors())

// test api route
app.get('/', (req, res)=> {
    res.json({msg: "Hello Abuki"})
})
// router
// const userRoute = require('./routes/user.routes.js');
const authRoute = require('./routes/auth.routes.js');

// app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)

// error handler middleware
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})