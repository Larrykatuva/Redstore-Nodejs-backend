const express = require('express');
const bp = require('body-parser');
const createError = require('http-errors');
const dotenv = require('dotenv').config();
const { Sequelize } = require('sequelize');


const app = express();
app.use(bp.json());





//Importing routes
const AuthRoute = require('./src/routes/auth.routes');
 app.use('/auth', AuthRoute);


app.get('/test', (req, res, next) => {
    res.send("request received");
});


app.use((req, res, next) => {
    next(createError(404, 'Not found'));
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: true,
        errorMessage: {
            status: err.status || 500,
            message: err.message
        }
    })
})




/**
 * Running the server
 */
 const PORT = process.env.PORT || 3000;

 app.listen(PORT, () => {
     console.log('Server started on port '+PORT+'...');
 })