const { Sequelize } = require("sequelize");
const { Product } = require("../database/models");
const sequelizeCon = require("../configs/sequelize");

const listProductService = async (take, skip, search) => {
    try {
        // Build the options object for Sequelize based on the parameters
        const options = {
            where: {},
            limit: take ? parseInt(take, 10) : undefined,
            offset: skip ? parseInt(skip, 10) : undefined,
        };

        // Add search criteria if provided
        if (search) {
            options.where[Sequelize.Op.or] = [
                {
                    product_name: {
                        [Sequelize.Op.like]: `%${search}%`,
                    },
                },
                {
                    product_price: {
                        [Sequelize.Op.like]: `%${search}%`,
                    }
                }
            ];
        }

        options.where.deletedAt = null;
        options.order = [['createdAt', 'DESC']];

        const products = Product.findAll(options)
        return products;
    } catch (error) {
        console.log(`error on listProductService service: ${error}`)
        throw new Error(error.message)
    }
}

const createProductService = async (name, price, image, user_login) => {
    try {
        const product = await Product.create({
            product_name: name,
            product_price: price,
            product_image: image,
            createdBy: user_login,
            created_by: user_login,
            user_id: user_login
        })
        return product;
    } catch (error) {
        console.log(`error on createProductService service: ${error}`)
        throw new Error(error.message)
    }
}

const updateProductService = async (name, price, image, productId, user_login) => {
    try {
        const updateData = {
            product_name: name,
            product_price: price,
            product_image: image,
            updatedBy: user_login,
            updated_by: user_login,
            user_id: user_login
        }

        const product = await Product.update(updateData, {
            where: {
                product_id: productId
            }
        })
        return product;
    } catch (error) {
        console.log(`error on createProductService service: ${error}`)
        throw new Error(error.message)
    }
}

const softDeleteProductService = async (id, userLoginId) => {
    let transaction
    try {
        transaction = await sequelizeCon.transaction();
        const checkUser = await Product.findOne({
            where: {
                product_id: id
            }
        })

        if (!checkUser) {
            throw new Error('Product not found');
        }

        const updateData = {
            deletedAt: new Date(),
        }

        const softDeleteUser = await Product.update(updateData, {
            where: {
                product_id: id
            }
        })

        // Commit the transaction
        await transaction.commit();

        return softDeleteUser
    } catch (error) {
        console.log(`error on softDeleteProductService service: ${error}`);
        throw new Error(error.message);
    }
}

module.exports = {
    listProductService,
    createProductService,
    updateProductService,
    softDeleteProductService
}