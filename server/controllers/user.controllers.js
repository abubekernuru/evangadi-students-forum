const User = require("../model/user.model");
const { errorHandler } = require("../utils/error");
const bcryptjs=  require('bcryptjs');

const checkUser = async (req, res) => {
    try {
    const { username, id } = req.user; 
    
    res.status(200).json({
        message: "Valid user",
        username,
        id
    });
    } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred" });
    }
};

const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) {
        return next(errorHandler(403, "You can update only your account"));
    }
    try {
        if(req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, {
            $set: {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                avatar: req.body.avatar
            }
        }, { new: true}
        )
        const {password: pass, ...rest} = updatedUser._doc;
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
        if(req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can delete only your account"));
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie("access_token")
            .status(200)
            .json({ message: "User deleted successfully" });
    } catch (error) {
        next(error)
    }
}

module.exports = {checkUser, updateUser, deleteUser};