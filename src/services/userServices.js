const { Sequelize } = require("sequelize");
const { User } = require("../database/models");

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

        // Fetch users from the database based on the options
        const users = await User.findAll(options);

        return users;
    } catch (error) {
        console.log(`error on listUserService service: ${error}`);
        throw new Error(error.message);
    }
}

module.exports = {
    listUserService,
}