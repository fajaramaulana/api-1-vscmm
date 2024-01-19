const {DataTypes} = require('sequelize');
const sequelize = require('../../configs/sequelize');
const Role = require('./role'); // Import the Role model
const User = require('./user'); // Import the User model

const UserRole = sequelize.define(
    'UserRole',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      role_id: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
        references: {
          model: Role, // Use the imported Role model
          key: 'id', // Assuming 'id' is the primary key of the Role model
        },
        onDelete: 'CASCADE',
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
        references: {
          model: User, // Use the imported User model
          key: 'id', // Assuming 'id' is the primary key of the User model
        },
        onDelete: 'CASCADE',
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'user_roles',
      indexes: [
        {
          name: 'user_roles_role_id_index',
          unique: false,
          fields: ['role_id'],
        },
        {
          name: 'user_roles_user_id_index',
          unique: false,
          fields: ['user_id'],
        },
      ],
    },
);

module.exports = UserRole;
