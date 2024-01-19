const { Sequelize } = require("sequelize");
const { User } = require("../database/models");
const { hashPassword } = require("../utils/authHelper");
const sequelizeCon = require("../configs/sequelize");

const listUserService = async (take, skip, search) => {
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
                    username: {
                        [Sequelize.Op.like]: `%${search}%`,
                    },
                },
                {
                    name: {
                        [Sequelize.Op.like]: `%${search}%`,
                    },
                },
                {
                    email: {
                        [Sequelize.Op.like]: `%${search}%`,
                    },
                },
            ];
        }

        options.where.deletedAt = null;
        options.attributes = ['user_id', 'username', 'name', 'email'];
        options.order = [['createdAt', 'DESC']];

        // Fetch users from the database based on the options
        const users = await User.findAll(options);

        return users;
    } catch (error) {
        console.log(`error on listUserService service: ${error}`);
        throw new Error(error.message);
    }
}

const createUserService = async (name, username, email, password, userLoginId) => {
    let transaction
    try {
        transaction = await sequelizeCon.transaction();
        // check username
        const checkUsername = await User.findOne({
            where: {
                username: username
            }
        });

        if (checkUsername) {
            throw new Error('Username already exists');
        }

        const checkEmail = await User.findOne({
            where: {
                email: email
            }
        })

        if (checkEmail) {
            throw new Error('Email already exists');
        }

        const hashPasswordInsert = await hashPassword(password);
        const dataInsert = {
            name: name,
            username: username,
            email: email,
            password: hashPasswordInsert,
            createdAt: new Date(),
            updatedBy: 1,
        }

        const insertUser = await User.create(dataInsert)

        // Commit the transaction
        await transaction.commit();

        return insertUser
    } catch (error) {
        if (transaction)
        {
            await transaction.rollback();
        }
        console.log(`error on createUserService service: ${error}`);
        throw new Error(error.message);
    }
}

const updateUserService = async (name, password, id, userLoginId) => {
    let transaction
    try {
        const checkUser = await User.findOne({
            where: {
                user_id: id
            }
        })

        if (!checkUser) {
            throw new Error('User not found');
        }

        transaction = await sequelizeCon.transaction();
        let updateField = {
            name: name,
            updatedAt: new Date(),
            updatedBy: 1
        }

        if (password) {
            const hashPasswordUpdate = await hashPassword(password);
            updateField.password = hashPasswordUpdate
        }

        const updateUser = await User.update(updateField, {
            where: {
                user_id: id
            }
        })

        // Commit the transaction
        await transaction.commit();

        return updateUser
        
    } catch (error) {
        console.log(`error on updateUserService service: ${error}`);
        throw new Error(error.message);
    }

}

const softDeleteUserService = async (id, userLoginId) => {
    let transaction
    try {
        transaction = await sequelizeCon.transaction();
        const checkUser = await User.findOne({
            where: {
                user_id: id
            }
        })

        if (!checkUser) {
            throw new Error('User not found');
        }

        const updateData = {
            deletedAt: new Date(),
        }

        const softDeleteUser = await User.update(updateData, {
            where: {
                user_id: id
            }
        })

        // Commit the transaction
        await transaction.commit();

        return softDeleteUser
    } catch (error) {
        console.log(`error on softDeleteUserService service: ${error}`);
        throw new Error(error.message);
    }
}

module.exports = {
    listUserService,
    createUserService,
    updateUserService,
    softDeleteUserService
}