const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(cors({
    origin: process.env.Frontend_URL,
    credentials: true,
}))


mongoose.connect(process.env.MongoURI)
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

// test api route
app.get('/', (req, res)=> {
    res.json({msg: "Hello Abuki"})
})
// router
const userRoute = require('./routes/user.routes.js');
const authRoute = require('./routes/auth.routes.js');
const questionRoute = require('./routes/question.routes.js');
const answerRoute = require('./routes/answer.routes.js');

app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/question', questionRoute)
app.use('/api/answer', answerRoute)

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