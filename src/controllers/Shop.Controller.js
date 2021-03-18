const Shop = require("../sequelize/models").Shop;
const User = require("../sequelize/models").User;
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const handleShopErrors =  require('../errors/shop');


module.exports = {

    createNewShop: async (req, res, next) => {
        const{ body: { name, desc, location } } = req
        if(!name){
            return res
                .status(400)
                .send({error: handleShopErrors('SAR_01', 400, 'Shop name')});
        }
        if(!desc){
            return res
                .status(400)
                .send({error: handleShopErrors('SAR_02', 400, 'Description')});
        }
        if(!location){
            return res
                .status(400)
                .send({error: handleShopErrors('SAR_03', 400, 'Location')});
        }
        try {
            const shop = await Shop.findOne({
                where: { 
                    shopName: req.body.name 
                } 
            });
            console.log(shop);
            if(shop){
                return res
                    .status(409)
                    .send({error: handleShopErrors('SAR_04', 409, 'Shop')});
            }
            jwt.verify(req.token, process.env.PRIVATE_KEY, (err, user) => {
                if(err){
                    next(createError(
                        err.status,
                        err.message
                    ));
                }
                if(user){
                    const newShop = Shop.create({
                        shopName: req.body.name,
                        shopDesc: req.body.desc,
                        shopLocation: req.body.location,
                        userId: user.user.id
                    });
                    if(newShop){
                        res.status(200).send({
                            error: false,
                            message: "Shop Created successfully",
                            shop: newShop
                        });
                    }
                }
            });
            
        } catch (error) {
            console.log(error);
            next(createError(
                error.status,
                error.message
            ));
        }
        
    },

    updateShop: async (req, res, next) => {
        const id = req.body.id;
        if(!id){
            return res
                .status(400)
                .send({error: handleShopErrors('SAR_05', 400, 'ID')});
        }
        const shop = await Shop.findOne({
            where: {
                userId: id
            },
            attributes: [
                'shopName',
                'shopDesc',
                'shopLocation',
            ],
        });

        if(req.body.name == undefined) req.body.name = shop.shopName;
        if(req.body.desc == undefined) req.body.desc = shop.shopDesc;
        if(req.body.location == undefined) req.body.location = shop.shopLocation;

        const updatedShop = await Shop.update({
            "shopName": req.body.name,
            "shopDesc": req.body.desc,
            "shopLocation": req.body.shopLocation
        },
        {
            where: {
                userId: id
            },
        });
        if(updatedShop){
            return res
            .status(200)
            .send({
                error: false,
                message: "Shop updated successfully"
            });
        }
    }
}