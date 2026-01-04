const sequelize = require('../config/database');
const User = require('./User');
const Category = require('./Category');

const db = {
    sequelize,
    User,
    Category
};

module.exports = db;
