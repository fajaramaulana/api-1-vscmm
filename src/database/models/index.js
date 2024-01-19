// /src/database/models/index.js
const User = require('./user');
const Permission = require('./permission');
const Role = require('./role');
const RolePermission = require('./rolePermission');
const UserRole = require('./userRole');
const Product = require('./product');

User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: 'user_id',
  otherKey: 'role_id',
});

Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: 'role_id',
  otherKey: 'user_id',
});


User.hasMany(Product, {foreignKey: 'created_by', as: 'products'});
Product.belongsTo(User, {foreignKey: 'user_id', as: 'users'});

const models = {
  User,
  Permission,
  Role,
  RolePermission,
  UserRole,
  Product,
};

module.exports = models;
