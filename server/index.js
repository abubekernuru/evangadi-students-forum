const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// deployment error fix code
const FRONTEND_URL = (process.env.FRONTEND_URL || '').replace(/\/$/, '');
const allowedOrigins = (process.env.ALLOWED_ORIGINS || FRONTEND_URL || 'http://localhost:5173')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
    // allow non-browser (curl, mobile) requests
    if (!origin) return callback(null, true);

    const isWhitelisted = allowedOrigins.includes(origin);
    const isVercelPreview = origin && origin.endsWith('.vercel.app'); // optional

    if (isWhitelisted || isVercelPreview) return callback(null, true);

    console.warn('[CORS] Blocked origin:', origin);
    return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET','POST','PUT','DELETE','PATCH','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization'],
    credentials: true
}));
// app.use(cors({
//     origin: process.env.Frontend_URL,
//     credentials: true,
// }))


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