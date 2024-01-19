const DataTypes = require('sequelize');
const sequelize = require('../../configs/sequelize');

const Role = sequelize.define(
    'Role',
    {
      role_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          len: [2, 100],
        },
        unique: true,
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: 'roles',
      indexes: [
        {
          unique: true,
          fields: ['name'],
        },
      ],
    },
);

module.exports = Role;
