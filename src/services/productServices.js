const { Sequelize } = require("sequelize");
const { Product } = require("../database/models");

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

module.exports = {
    listProductService
}