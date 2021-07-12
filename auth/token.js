const { sign } = require('jsonwebtoken');

// create a access token when signed in.
const createAccessToken = userId => {
    return sign({userId}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '30m',
    });
}

// send access token when needed.
const sendAccessToken = (res, accesstoken , id , role) => {
    res.json({
        accesstoken,
        _id: id,
        role
    });
};

module.exports = {
    createAccessToken,
    sendAccessToken
}