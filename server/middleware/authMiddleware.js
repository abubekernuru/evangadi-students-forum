const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    // 1. Look for the cookie by the name you gave it ('access_token')
    const token = req.cookies.access_token;

    // 2. If no cookie exists, they aren't logged in
    if (!token) {
        return res.status(401).json({ message: "Authentication invalid" });
    }

    try {
        // 3. Decrypt the token
        const data = jwt.verify(token, process.env.JWT_SECRET);
        
        // 4. Attach to req.user (matching what you put in the token)
        req.user = { 
            username: data.username, 
            id: data.id 
        }; 

        next(); 
    } catch (error) {
        return res.status(401).json({ message: "Authentication invalid" });
    }
};

module.exports = { authMiddleware };