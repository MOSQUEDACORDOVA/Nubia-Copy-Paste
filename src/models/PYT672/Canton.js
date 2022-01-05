const { DataTypes } = require('sequelize');
const db672 = require('../../config/dbPY672');
const Provincias = require('./Provincias');

// CANTON
const Canton = db672.define('canton', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	nombre: {
		type: DataTypes.STRING(200),
		allowNull: false
	}
}, {
	freezeTableName: true, // Model tableName will be the same as the model name
	timestamps: false,
});

Canton.Provincias = Canton.belongsTo(Provincias);
module.exports = Canton;