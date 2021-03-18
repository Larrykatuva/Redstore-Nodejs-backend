const express = require('express');
const bp = require('body-parser');
const createError = require('http-errors');
const dotenv = require('dotenv').config();
const { Sequelize } = require('sequelize');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./src/middleware/auth');
const { JsonWebTokenError } = require('jsonwebtoken');


const app = express();
app.use(bp.json());


//Importing routes
const AuthRoutes = require('./src/routes/auth.routes');
const ShopRoutes = require('./src/routes/shop.routes');
app.use('/auth', AuthRoutes);
app.use('/user/shop', ShopRoutes);


// app.get('/test',  authenticateToken, (req, res, next) => {
//     jwt.verify(req.token, process.env.PRIVATE_KEY, (err, user) => {
//         if(err){
//             next(createError(
//                 err.status,
//                 err.message
//             ));
//         }
//         res.send({
//             user: user
//         });
//     });
// });


app.use((req, res, next) => {
    next(createError(404, 'Not found'));
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}



/**
 * Running the server
 */
 const PORT = process.env.PORT || 3000;

 app.listen(PORT, () => {
     console.log('Server started on port '+PORT+'...');
 })