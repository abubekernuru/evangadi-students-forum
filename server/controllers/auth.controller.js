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
        res.status(201).json("User created successfully!")
        
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
        const token = jwt.sign({id: validUser._id,}, process.env.JWT_SECRET);
        const {password: pass, ...rest} = validUser._doc;
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

module.exports = {signup, signin}