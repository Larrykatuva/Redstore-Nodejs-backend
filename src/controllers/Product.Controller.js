const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const handleProductErrors =  require('../errors/product');
const db = require('../sequelize/models/index');
const { Op } = require("sequelize");

module.exports = {
    getAllProducts: async (req, res, next) => {
        try{
            const products = await db.Product.findAll();
            if(!product){
                return res
                    .status(404)
                    .send({error: handleProductErrors('PAR_01', 4040, 'product')});
            }
            return res.status(200).send(products);
        } catch (error){
            next(createError(
                error.status,
                error.message,
            ));
        }
    },

    getProductById: async (req, res, next) => {
        const id = req.body.id;
        if(!id){
            return res
                .status(400)
                .send({error: handleProductErrors('PAR_04', 400, 'product')});
        }
        try {
            const product = await db.Product.findById(id);
            if(!product){
                return res
                    .status(404)
                    .send({error: handleProductErrors('PAR_02', 404, 'product')});
            }
            return res.status(200).send(product);
        } catch (error) {
            next(createError(
                error.status,
                error.message
            ));
            
        }
    },

    getProductByName: async (req, res, next) => {
        const name = req.body.name;
        if(!name){
            return res
                .status(400)
                .send({error: handleProductErrors('PAR_05', 400, 'product')});
        }
        try {
            const products = await db.Product.findAll({
                where: {
                    name: {
                        [Op.substring]: name,
                    }
                }
            });

            return res
                .status(200)
                .send(products);
            if(!products){
                return res
                    .status(404)
                    .send({error: handleProductErrors('PAR_01', 404, 'product')})
            }
        } catch (error) {
            next(createError(
                error.status,
                error.message
            ))
        }
    }, 
    updateProductById: async (req, res, next) => {
        const {
            body: {
                id,
                name,
                url,
                price,
                quantity,
                desc,
                specification
            }
        } = req;
        if(!id){
            return res
                .status(400)
                .send({error: handleProductErrors('PAR_04', 400, 'product')});
        }
        try {
            const product = await db.Product.findOne({
                where: {
                    id: id,
                },
                attributes: [
                    'name',
                    'url',
                    'price',
                    'quantity',
                    'desc',
                    'specification',
                ],
            });

            if(name == undefined) name = product.name;
            if(url == undefined) url = product.url;
            if(price == undefined) price = product.price;
            if(quantity == undefined) quantity = product.quantity;
            if(desc == undefined) desc = product.desc;
            if(specification == undefined) specification = product.specification;

            const updatedProduct = await db.Product.update({
                'name': name,
                'url': url,
                'price': price,
                'quantity': quantity,
                'desc': desc,
                'specification': specification,
            },{
                where: {
                    id: id
                },
            });
            if(updatedProduct){
                return res
                    .status(200)
                    .send({updatedProduct});
            }

        } catch (error) {
            next(createError(
                error.status,
                error.message
            ))
        }
    }

}

