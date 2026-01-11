
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

module.exports = {checkUser};