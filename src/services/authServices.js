const {hashPassword, verifyPassword} = require('../utils/authHelper');
const {User, Role, UserRole} = require('../database/models');
const sequelizeCon = require('../configs/sequelize');
const {generateJWT} = require('../utils/jwthelper');

const registerUserService = async (userData) => {
  let transaction;
  try {
    // start transaction
    // check if email already exist
    const checkEmail = await User.findOne({
      where: {
        email: userData.email,
      },
      attributes: ['email'],
    });

    if (checkEmail) {
      throw new Error('Email already exist');
    }

    // check if username already exist
    const checkUsername = await User.findOne({
      where: {
        username: userData.username,
      },
      attributes: ['username'],
    });

    if (checkUsername) {
      throw new Error('Username already exist');
    }
    transaction = await sequelizeCon.transaction();
    const insertedData = {
      name: userData.name,
      email: userData.email,
      username: userData.username,
      password: await hashPassword(userData.password),
      createdAt: new Date(),
      updatedBy: 0,
    };

    // insert to database
    const user = await User.create(insertedData);

    const getIdRoleUser = await Role.findOne({
      where: {
        name: 'user',
      },
      attributes: ['role_id'],
    });

    const userRole = {
      role_id: getIdRoleUser.role_id,
      user_id: user.user_id,
      updatedBy: 0,
    };

    await UserRole.create(userRole);

    // Commit the transaction
    await transaction.commit();

    return user;
  } catch (error) {
    // Rollback the transaction if an error occurs
    if (transaction) {
      await transaction.rollback();
    }
    console.log(`error on registerUser service: ${error}`);
    throw new Error(error.message);
  }
};

const loginUserService = async (userData) => {
  try {
    const user = await User.findOne({
      where: {
        email: userData.email,
      },
    });

    if (!user) {
      throw new Error('Email not found or Wrong password-401');
    }

    const passwordMatch = await verifyPassword(userData.password,
        user.password);
    if (!passwordMatch) {
      throw new Error('Email not found or Wrong password-401');
    }

    const userWithRelation = await User.findOne({
      where: {
        email: userData.email,
      },
      include: [
        {
          model: Role,
          as: 'Roles',
          through: {
            attributes: [],
          },
        },
      ],
    });

    const payload = {
      user_id: user.user_id,
      email: user.email,
      username: user.username,
      role: userWithRelation.Roles[0].name,
    };

    const jwtToken = generateJWT(payload);

    const returnData = {
      user: payload,
      token: jwtToken,
    };

    return returnData;
  } catch (error) {
    console.log(`error on loginUserService: ${error}`);
    throw new Error(error.message);
  }
};

module.exports = {
  registerUserService,
  loginUserService,
};
