const {v4: uuidv4} = require('uuid');

const Role = require('../models/role');
const {
  User,
  UserRole,
  Permission,
  RolePermission,
  Product,
} = require('../models');
const {hashPassword} = require('../../utils/authHelper');

const isTableRoleEmpty = async () => {
  try {
    const countRole = await Role.count();
    return countRole === 0;
  } catch (error) {
    console.log(`'Error checking if the table Role is empty: ${error}`);
    return false;
  }
};

const isTableUserEmpty = async () => {
  try {
    const countUser = await User.count();
    return countUser === 0;
  } catch (error) {
    console.log(`'Error checking if the table User is empty: ${error}`);
    return false;
  }
};

const isTableUserRolesEmpty = async () => {
  try {
    const countUserRoles = await UserRole.count();
    return countUserRoles === 0;
  } catch (error) {
    console.log(`'Error checking if the table UserRole is empty: ${error}`);
    return false;
  }
};

const isTablePermissionEmpty = async () => {
  try {
    const countPermission = await Permission.count();
    return countPermission === 0;
  } catch (error) {
    console.log(`'Error checking if the table Permission is empty: ${error}`);
    return false;
  }
};

const isTableRolePermissionEmpty = async () => {
  try {
    const countRolePermission = await RolePermission.count();
    return countRolePermission === 0;
  } catch (error) {
    console.log(`Error checking if the table RolePermissionis empty: ${error}`);
    return false;
  }
};

const isTableProductEmpty = async () => {
  try {
    const countProduct = await Product.count();
    return countProduct === 0;
  } catch (error) {
    console.log(`'Error checking if the table Product is empty: ${error}`);
    return false;
  }
};

const seedDatabase = async () => {
  try {
    console.log('============ START SEEDING DATABASE ============');
    const tableRoleEmpty = await isTableRoleEmpty();
    const uuidAdminRole = uuidv4();
    const uuidUserRole = uuidv4();
    const uuidAdminId = uuidv4();
    const uuidUserId = uuidv4();

    if (tableRoleEmpty) {
      await Role.bulkCreate([
        {
          role_id: uuidAdminRole,
          name: 'admin',
          updatedBy: 1,
        },
        {
          role_id: uuidUserRole,
          name: 'user',
          updatedBy: 1,
        },
      ]);
      console.log('Table Role seeded successfully');
    }

    const tableUserEmpty = await isTableUserEmpty();

    if (tableUserEmpty) {
      try {
        const adminPassword = await hashPassword('admin123');
        const usersPassword = await hashPassword('fajar123');
        await User.bulkCreate([
          {
            user_id: uuidAdminId,
            name: 'Super Admin',
            username: 'superadmin',
            email: 'superadmin@gmail.com',
            password: adminPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
            updatedBy: 1,
          },
          {
            user_id: uuidUserId,
            name: 'Fajar',
            username: 'fajar',
            email: 'user1@gmail.com',
            password: usersPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
            updatedBy: 1,
          },
        ]);
      } catch (error) {
        console.error('Error during bulkCreate:', error);
      }
    }

    const tableUserRolesEmpty = await isTableUserRolesEmpty();
    if (tableUserRolesEmpty) {
      await UserRole.bulkCreate([
        {
          id: uuidv4(),
          role_id: uuidAdminRole,
          user_id: uuidAdminId,
          updatedBy: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          id: uuidv4(),
          role_id: uuidUserRole,
          user_id: uuidUserId,
          updatedBy: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      console.log('Table User Roles seeded successfully');
    }
    const tablePermissionEmpty = await isTablePermissionEmpty();
    const uuidCreateBookPermission = uuidv4();
    const uuidReadBookPermission = uuidv4();
    const uuidUpdateBookPermission = uuidv4();
    const uuidDeleteBookPermission = uuidv4();

    const uuidCreateRolePermission = uuidv4();
    const uuidReadRolePermission = uuidv4();
    const uuidUpdateRolePermission = uuidv4();
    const uuidDeleteRolePermission = uuidv4();

    const uuidReadDashboardPermission = uuidv4();

    const readUserPermission = uuidv4();
    const updateUserPermission = uuidv4();
    const deleteUserPermission = uuidv4();
    const createUserPermission = uuidv4();

    if (tablePermissionEmpty) {
      await Permission.bulkCreate([
        {
          id: uuidCreateBookPermission,
          name: 'create-product',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1,
        },
        {
          id: uuidReadBookPermission,
          name: 'read-product',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1,
        },
        {
          id: uuidUpdateBookPermission,
          name: 'update-product',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1,
        },
        {
          id: uuidDeleteBookPermission,
          name: 'delete-product',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1,
        },
        {
          id: uuidCreateRolePermission,
          name: 'create-role',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1,
        },
        {
          id: uuidReadRolePermission,
          name: 'read-role',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1,
        },
        {
          id: uuidUpdateRolePermission,
          name: 'update-role',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1,
        },
        {
          id: uuidDeleteRolePermission,
          name: 'delete-role',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1,
        },
        {
          id: uuidReadDashboardPermission,
          name: 'read-dashboard',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1,
        },
        {
          id: readUserPermission,
          name: 'read-user',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1,
        },
        {
          id: updateUserPermission,
          name: 'update-user',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1,
        },
        {
          id: deleteUserPermission,
          name: 'delete-user',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1,
        },
        {
          id: createUserPermission,
          name: 'create-user',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1,
        },
      ]);

      console.log('Table Permission seeded successfully');
    }

    const tableRolePermissionEmpty = await isTableRolePermissionEmpty();
    if (tableRolePermissionEmpty) {
      await RolePermission.bulkCreate([
        {
          id: uuidv4(),
          role_id: uuidAdminRole,
          permission_id: uuidCreateBookPermission,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          role_id: uuidAdminRole,
          permission_id: uuidReadBookPermission,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          role_id: uuidAdminRole,
          permission_id: uuidUpdateBookPermission,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          role_id: uuidAdminRole,
          permission_id: uuidDeleteBookPermission,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          role_id: uuidAdminRole,
          permission_id: uuidCreateRolePermission,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          role_id: uuidAdminRole,
          permission_id: uuidReadRolePermission,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          role_id: uuidAdminRole,
          permission_id: uuidUpdateRolePermission,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          role_id: uuidAdminRole,
          permission_id: uuidDeleteRolePermission,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          role_id: uuidUserRole,
          permission_id: uuidReadBookPermission,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          role_id: uuidUserRole,
          permission_id: uuidReadDashboardPermission,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          role_id: uuidUserRole,
          permission_id: readUserPermission,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
      console.log('Table Role Permission seeded successfully');
    }

    const tableProductEmpty = await isTableProductEmpty();
    if (tableProductEmpty) {
      await Product.bulkCreate([
        {
          product_id: uuidv4(),
          product_name: 'Chiffon Cake',
          product_price: 80000,
          product_image: 'chiffon-cake.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1,
          createdBy: 1,
        },
        {
          product_id: uuidv4(),
          product_name: 'Rainbow Cake',
          product_price: 120000,
          product_image: 'rainbow-cake.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1,
          createdBy: 1,
        },
        {
          product_id: uuidv4(),
          product_name: 'Ginger Bread',
          product_price: 40000,
          product_image: 'gingger-bread.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 1,
          createdBy: 1,
        },
      ]);
      console.log('Table Product seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    console.log('============ END SEEDING DATABASE ============');
  }
};

module.exports = seedDatabase;
