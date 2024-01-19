const bcrypt = require('bcrypt')
let saltRounds = process.env.SALT || 10 // Number of salt rounds, higher is more secure but slower

// Hashing a password
const hashPassword = async (password) => {
  try {
    saltRounds = parseInt(saltRounds, 10)
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  } catch (error) {
    console.log(error)
    throw new Error('Error hashing password')
  }
}

// Verifying a password
const verifyPassword = async (password, hashedPassword) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword)
    return match
  } catch (error) {
    throw new Error('Error verifying password')
  }
}

module.exports = {
  hashPassword,
  verifyPassword
}
