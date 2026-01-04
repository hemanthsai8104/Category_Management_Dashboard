const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        // Can be a URL or a local path. 
        // Requirement says "Upload Image (stored in cloud or locally)"
        // We will store the path/url string here.
        allowNull: true
    },
    itemCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Active' // Just in case we want to show active/inactive
    }
});

module.exports = Category;
