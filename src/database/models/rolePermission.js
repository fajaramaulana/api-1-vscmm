const {DataTypes} = require('sequelize');
const sequelize = require('../../configs/sequelize');
const Role = require('./role'); // Import the Role model
const Permission = require('./permission'); // Import the Permission model

const RolePermission = sequelize.define(
    'RolePermission',
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
          key: 'role_id', // Assuming 'id' is the primary key of the Role model
        },
        onDelete: 'CASCADE',
      },
      permission_id: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
        references: {
          model: Permission, // Use the imported Permission model
          key: 'id', // Assuming 'id' is the primary key of the Permission model
        },
        onDelete: 'CASCADE',
      },
    },
    {
      tableName: 'role_permissions',
      indexes: [
        {
          name: 'role_permissions_role_id_index',
          fields: ['role_id'],
        },
        {
          name: 'role_permissions_permission_id_index',
          fields: ['permission_id'],
        },
      ],
    },
);

module.exports = RolePermission;
