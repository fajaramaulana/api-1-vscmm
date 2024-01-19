const { listUserService } = require("../services/userServices")
const response = require("../utils/response")

const getListUserController = async (req, res, next) => {
    try {

        const { take, skip, search } = req.query

        const users = await listUserService(take, skip, search)

        const countData = users.length

        return res
            .status(200).json(response.pagination(users, countData, take, skip, search))

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
    getListUserController
}