const response = require("../utils/response")
const { listProductService } = require("../services/productServices")

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
module.exports = {
    getListProductController
}