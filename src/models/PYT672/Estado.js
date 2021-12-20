const { DataTypes } = require('sequelize');
const db672 = require('../../config/dbPY672');

// ESTUDIANTES
const Estados = db672.define('estados', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	estado: {
		type: DataTypes.STRING(200),
		allowNull: false
	}
});

module.exports = Estados;