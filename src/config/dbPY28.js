const { Sequelize } = require('sequelize');

DB_NAME="minner2";
DB_USER="root";
DB_PASS=null;
DB_HOST="localhost";
DB_PORT=3306;


const db28 = new Sequelize(DB_NAME, DB_USER, DB_PASS,
	{
		host: DB_HOST,
		port: DB_PORT,
		dialect: 'mysql'
	});

module.exports = db28;


