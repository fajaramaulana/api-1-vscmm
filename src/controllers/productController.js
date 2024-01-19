const response = require("../utils/response")
const { listProductService, createProductService, updateProductService, softDeleteProductService } = require("../services/productServices")
const sequelizeCon = require("../configs/sequelize")
const { Product } = require("../database/models")
const { softDeleteUserService } = require("../services/userServices")

const getListProductController = async (req, res, next) => {
    try {
        const { take, skip, search } = req.query

        const products = await listProductService(take, skip, search)

        const countData = products.length

        return res
            .status(200)
            .json(response.pagination(products, countData, take, skip, search))

    } catch (error) {
        console.log(`error on getListUserController: ${error}`)
        if (process.env.NODE_ENV === 'development') {
            return res.status(500).json(response.error(error.message, 500, error))
        } else {
            return res.status(500).json(response.error('Internal server error', 500, error.message))
        }
    }
}

const createProductController = async (req, res, next) => {
    try {
        if (req.user.Roles[0].name !== 'admin') {
            return res
            .status(403)
            .json(response.error('You are not authorized to access this resource', 403))
        }
        const { product_name, product_price, product_image } = req.body
        const userLogin = req.user.user_id
        const product = await createProductService(product_name, product_price, product_image, userLogin)

        return res
            .status(201)
            .json(response.success(product, 201, 'Product created successfully'))

    } catch (error) {
        console.log(`error on createProductController: ${error}`)
        if (process.env.NODE_ENV === 'development') {
            return res.status(500).json(response.error(error.message, 500, error))
        } else {
            return res.status(500).json(response.error('Internal server error', 500, error.message))
        }
    }
}

const updateProductController = async (req, res, next) => {
    try {
        if (req.user.Roles[0].name !== 'admin') {
            return res
            .status(403)
            .json(response.error('You are not authorized to access this resource', 403))
        }

        const { id } = req.params
        
        const { product_name, product_price, product_image } = req.body
        const userLogin = req.user.user_id
        const product = await updateProductService(product_name, product_price, product_image, id,  userLogin)

        return res
            .status(200)
            .json(response.success(product, 'Product Update successfully'))


    } catch (error) {
        console.log(`error on createProductController: ${error}`)
        if (process.env.NODE_ENV === 'development') {
            return res.status(500).json(response.error(error.message, 500, error))
        } else {
            return res.status(500).json(response.error('Internal server error', 500, error.message))
        }
    }
}

const softDeleteProductController = async (req, res, next) => {
    try {
        // if (req.user.Roles[0].name !== 'admin') {
        //     return res
        //     .status(403)
        //     .json(response.error('You are not authorized to access this resource', 403))
        // }
        const { id } = req.params
        const product = await softDeleteProductService(id, req.user.user_id)
        return res
        .status(200)
        .json(response.success(product, 'Soft Delete Product successfully'))
    } catch (error) {
        console.log(`error on createProductController: ${error}`)
        if (process.env.NODE_ENV === 'development') {
            return res.status(500).json(response.error(error.message, 500, error))
        } else {
            return res.status(500).json(response.error('Internal server error', 500, error.message))
        }
    }
}

module.exports = {
    getListProductController,
    createProductController,
    updateProductController,
    softDeleteProductController
}