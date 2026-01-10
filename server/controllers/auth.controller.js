const User = require('../model/user.model.js')
const bcryptjs = require('bcryptjs');
const {errorHandler} = require('../utils/error.js')


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

module.exports = {signup}