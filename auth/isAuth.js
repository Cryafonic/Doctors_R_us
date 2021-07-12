const { verify } = require('jsonwebtoken');

// Authenticates a user
const isAuth = (req, res) => {
    const authorization = req.headers['authorization']
    if (!authorization) { 
        res.status(201).json({ "message": "Please login"}) 
    } else {
       const token = authorization.split(' ')[1];
       const { userId } = verify(token, process.env.ACCESS_TOKEN_SECRET);
       return userId
    }
}

module.exports = isAuth;