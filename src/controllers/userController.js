const { listUserService, createUserService, updateUserService, softDeleteUserService } = require("../services/userServices")
const response = require("../utils/response")

const getListUserController = async (req, res, next) => {
    try {

        const { take, skip, search } = req.query

        

        const users = await listUserService(take, skip, search)

        const countData = users.length

        return res
            .status(200)
            .json(response.pagination(users, countData, take, skip, search))

    } catch (error) {
        console.log(`error on getListUserController: ${error}`)
        if (process.env.NODE_ENV === 'development') {
            return res.status(500).json(response.error(error.message, 500, error))
        } else {
            return res.status(500).json(response.error('Internal server error', 500, error.message))
        }
    }

}

const createUserController = async (req, res, next) => {
    try {
        const {name, username, email, password} = req.body
        const userLogin = req.user.user_id
        const user = await createUserService(name, username, email, password, userLogin)

        return res
        .status(201)
        .json(response.success(user, 'User created successfully'))
    }catch (error) {
        console.log(`error on createUserController: ${error}`)
        if (process.env.NODE_ENV === 'development') {
            return res.status(500).json(response.error(error.message, 500, error))
        } else {
            return res.status(500).json(response.error('Internal server error', 500, error.message))
        }
    }
}

const updateUserController = async (req, res, next) => {
    try {
        const {name, password} = req.body
        const {id} = req.params
        const userLogin = req.user.user_id

        const user = await updateUserService(name, password, id, userLogin)

        return res.status(200).json(response.success(user, 'User updated successfully'))
    } catch (error) {
        console.log(`error on updateUserController: ${error}`)
        if (process.env.NODE_ENV === 'development') {
            return res.status(500).json(response.error(error.message, 500, error))
        } else {
            return res.status(500).json(response.error('Internal server error', 500, error.message))
        }
    }
}

const softDeleteUserController = async (req, res, next) => {
    try {
        const {id} = req.params
        const userLogin = req.user.user_id

        const user = await softDeleteUserService(id, userLogin)

        return res
        .status(200)
        .json(response.success(user, 'User deleted successfully'))
    } catch (error) {
        console.log(`error on softDeleteUserController: ${error}`)
        if (process.env.NODE_ENV === 'development') {
            return res.status(500).json(response.error(error.message, 500, error))
        } else {
            return res.status(500).json(response.error('Internal server error', 500, error.message))
        }
    }
}

module.exports = {
    getListUserController,
    createUserController,
    updateUserController,
    softDeleteUserController
}