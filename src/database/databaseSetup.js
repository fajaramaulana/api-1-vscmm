const {sequelizeCon} = require('../configs/');
const {User, Permission, Role, RolePermission, UserRole, Product} =
    require('./models');
const seedDatabase = require('./seeder/seeder');

/**
 * Sets up the database connection and synchronizes Sequelize models.
 * @return {Promise<void>} A promise that resolves when the setup is complete.
 */
async function setupDatabase() {
  try {
    console.log('============= START PROCESS SETUP DATABASE =============');
    // Authenticate with the database
    await sequelizeCon.authenticate();
    const isUserTableExists = await tableExists('users');

    if (!isUserTableExists) {
      // create table if not exists
      await User.sync();
      await Role.sync();
      await Permission.sync();
      await UserRole.sync();
      await RolePermission.sync();

      await Product.sync();
    }

    // alter add column

    console.log('Connection has been established successfully.');

    // Synchronize Sequelize models with the database
    await sequelizeCon.sync();
    console.log('Models synchronized with the database.');
    const checkIsEmpty = await User.count();
    if (checkIsEmpty === 0) {
      await seedDatabase();
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  } finally {
    console.log('============= FINISH PROCESS SETUP DATABASE =============');
  }
}

/**
 * Checks if a table exists in the database.
 * @param {string} tableName - The name of the table to check.
 * @return {Promise<boolean>} A promise that resolves to true if the table
 * exists, false otherwise.
 */
async function tableExists(tableName) {
  try {
    const [result] = await sequelizeCon.query(
        `SELECT table_name 
        FROM information_schema.tables
        WHERE table_name = '${tableName}' LIMIT 1;`,
    );

    return result.length > 0;
  } catch (error) {
    console.error('Error checking table existence:', error);
    return false;
  }
}

module.exports = setupDatabase;
