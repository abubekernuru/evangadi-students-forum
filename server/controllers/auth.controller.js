const User = require('../model/user.model.js')
const bcryptjs = require('bcryptjs');
const {errorHandler} = require('../utils/error.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const signup = async (req, res, next) => {


    try {
        const {username, email, password, firstName, lastName} = req.body;
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(404).json("User already exists!")
        }
        const hashedPassword = await bcryptjs.hash(password, 10)
        const newUser = new User({username, email, password: hashedPassword, firstName, lastName});
        await newUser.save();
        // res.status(201).json("User created successfully!")
        const token = jwt.sign({id: newUser._id, username: newUser.username}, process.env.JWT_SECRET);
        const {password: pass, ...rest} = newUser._doc;
        const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
        res
            .cookie('access_token', token, {
                httpOnly: true,
                expires: expiryDate
            })
            .status(200)
            .json(rest);
        
    } catch (error) {
        next(error)
    }
}

const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const validUser = await User.findOne({ email });
        if(!validUser){
            return res.status(404).json({message: "User not found!"})
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
            return res.status(401).json({message: "Wrong Credential!"})
        }
        const token = jwt.sign({id: validUser._id, username: validUser.username}, process.env.JWT_SECRET);
        const {password: pass, ...rest} = validUser._doc;
        const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
        res
            .cookie('access_token', token, {
                httpOnly: true,
                secure: true,    // added for deployment cors failure
                sameSite: 'none', // added for deployment cors failure
                expires: expiryDate
            })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error)
    }
}

const google = async (req, res, next) => {
    const {email, firstName, lastName, name, photoURL} = req.body;
    try {
        const user = await User.findOne({email: req.body.email});
        if(user){
            const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET);
            const {password: pass, ...rest} = user._doc;
            const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
            res
                .cookie('access_token', token, { httpOnly: true, expires: expiryDate})
                .status(200)
                .json(rest);
        }else {
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = await bcryptjs.hash(generatedPassword, 10);
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(36).slice(-4),
                email, 
                password: hashedPassword, 
                firstName, 
                lastName,
                avatar: photoURL
            });
            await newUser.save();
            const token = jwt.sign({id: newUser._id, username: newUser.username}, process.env.JWT_SECRET);
            const {password: pass, ...rest} = newUser._doc;
            const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
            res
                .cookie('access_token', token, { httpOnly: true, 
                    secure: true,    // added for deployment cors failure
                    sameSite: 'none', // added for deployment cors failure
                    expires: expiryDate})
                .status(201)
                .json(rest);
        }
    } catch (error) {
        next(error)
    }
}

const signout = async (req, res, next) => {try {
        res
        .clearCookie("access_token")
        .status(200)
        .json("User logged out succefully!")
    } catch (error) {
        next(error)
    }
}

module.exports = {signup, signin, google, signout}