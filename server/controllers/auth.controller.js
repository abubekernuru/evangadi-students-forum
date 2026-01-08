const User = require('../model/user.model.js')
const bcryptjs = require('bcryptjs');


const signup = async (req, res) => {


    try {
        const {username, email, password} = req.body;
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(404).json("User already exists!")
        }
        const hashedPassword = await bcryptjs.hash(password, 10)
        const newUser = new User({username, email, password: hashedPassword});
        await newUser.save();
        res.status(201).json("User created successfully!")
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {signup}