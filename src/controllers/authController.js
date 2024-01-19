// const { registerUserService } = require('../services/authServices')
const response = require('../utils/response')
const { registerUserService, loginUserService } = require('../services/authServices')

const registerController = async (req, res, next) => {
  try {
    const user = await registerUserService(req.body)
    // return res.status(201).json(response.success('User successfully registered', user))
    res.status(201).json(response.success(user, 'User successfully registered'))
  } catch (error) {
    console.log(`error on registerController: ${error}`)
    if (process.env.NODE_ENV === 'development') {
      return res.status(500).json(response.error(error.message, 500, error))
    } else {
      return res.status(500).json(response.error('Internal server error', 500, error.message))
    }
  }
}

const loginController = async (req, res, next) => {
  try {
    const user = await loginUserService(req.body)
    res.status(200).json(response.success(user, 'User successfully logged in'))
  } catch (error) {
    console.log(`error on loginController: ${error}`)
    const errorMessage = error.message.split('-')

    if (process.env.NODE_ENV === 'development') {
      if (errorMessage[1] === '401') {
        return res.status(401).json(response.error(errorMessage[0], 401, error))
      }
      return res.status(500).json(response.error(error.message, 500, error))
    } else {
      return res.status(500).json(response.error('Internal server error', 500, error.message))
    }
  }
}

module.exports = {
  registerController,
  loginController
}
