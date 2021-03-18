const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const handleAuthErrors = require('../errors/auth');

const authenticateToken = (req, res, next) => {
    const secretKey = process.env.PRIVATE_KEY;
    const bearerHeader = req.headers['authorization'];
    if(bearerHeader){
        if(typeof bearerHeader !== 'undefined'){
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        }else{
            return res
                .status(401)
                .send({error: handleAuthErrors('AUR_01', 401, 'Token')});
        }
    }else{
        return res
                .status(401)
                .send({error: handleAuthErrors('AUR_04', 401, 'NoAuth')});
    }
}

module.exports = authenticateToken;