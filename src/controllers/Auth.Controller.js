const dotenv = require('dotenv').config();
const User = require("../sequelize/models").User;
const Bcrypt = require("bcryptjs");
const handleUserErrors = require('../errors/user');
const handleAuthErrors = require('../errors/auth');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

module.exports = {

    createNewUser: async(req, res, next) => {
        const{
            body: {
                username,
                email,
                password
            },
        } = req;

        if(!username){
            return res
                .status(400)
                .send({ error: handleUserErrors('USR_07', 400, 'username') });
        }

        if(!email){
            return res
                .status(400)
                .send({ error: handleUserErrors('USR_01', 400, 'email')});
            }
        if(!password){
            return res
                .status(400)
                .send({ error: handleUserErrors('USR_02', 400, 'password')});
        }

        try {
            const user = await User.findOne({where: { email }});
            if(user){
                return res 
                    .status(400)
                    .send({ error: handleUserErrors('USR_04', 400, 'email')})
            }
            const salt = Bcrypt.genSaltSync(10);
            const hashPassword = Bcrypt.hashSync(req.body.password, salt);

            const newUser = await User.create({
                username,
                email,
                password: hashPassword,
                is_verified: false,
                is_active: false
            });

            const access_token = await jwt.sign(
                {user: newUser},
                 process.env.PRIVATE_KEY
            );

            const myURL = new URL(
                'http://localhost:3000/auth/activate/'
                +newUser.id+
                '/'
                +access_token
            );
            
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASS,
                }
            });

            var mailOptions = {
                from: process.env.EMAIL,
                to: newUser.email,
                subject: 'Account Activation',
                html: `
                    <h2>Please click on given link to activate account</h2>
                    <p>${myURL.href}</p>`
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    next(createError(
                        409, 
                        "Error when sending the email")
                    ); 
                } else {
                    res.status(200).send({
                        error: false,
                        message: "Email send successfully"
                    });
                }
            });

        } catch (error) {
            next(createError(
                error.status,
                error.message
            ))
        }
    },

    activateUser: async(req, res, next) => {
        const id = req.params.id;
        const token = req.params.token;
        jwt.verify(token, process.env.PRIVATE_KEY, (err, verifiedJwt) => {
            if(err){
                return res
                    .status(401)
                    .send({ error: handleAuthErrors('AUR_01', 401, 'token') });
            }else{
                try{
                    User.update({"is_verified": true},{
                        where: {
                            id: id
                        }
                    });
                    return res
                        .status(200)
                        .send({
                            message: "Account activated successfully"
                        });
                } catch (error) {
                    next(createError(error.status, error.message));
                }
            }
        });
    },

    loginUser: async (req, res, next) => {
        const {
            body: { email, password }
        } = req;

        if(!email){
            return res
                .status(400)
                .send({ error: handleUserErrors('USR_01', 400, 'email')});
        }
        if(!password){
            return res
                .status(400)
                .send({ error: handleUserErrors('USR_02', 400, 'password')});
        }

        try {
            const user = await User.findOne({
                where: {
                    email: email
                }
            });
            if(!user){
                return res
                    .status(400)
                    .send({ error: handleUserErrors('USR_05', 400, 'email')});
            }
            if(!user.is_verified){
                return res
                    .status(401)
                    .send({error: handleAuthErrors('AUR_02', 401, 'email')});
            }
            if(user && Bcrypt.compareSync(
                password, 
                user.password
                )){
                const access_token = await jwt.sign(
                    {user: user}, 
                    process.env.PRIVATE_KEY
                );
                res.status(200).send({
                    error: false,
                    message: "Login successful",
                    access_token: access_token,
                    user: user,
                });
                return;
            }
            return res
                .status(401)
                .send(handleAuthErrors('AUR_03', 401, 'password'));
        } catch (error) {
            next(createError(error.status, error.message));
        }
    }
}
