const { Sequelize } = require('sequelize');

DB_NAME="bwater";
DB_USER="root";
DB_PASS=null;
DB_HOST="localhost";
DB_PORT=3306;


const db = new Sequelize(DB_NAME, DB_USER, DB_PASS,
	{
		host: DB_HOST,
		port: DB_PORT,
		dialect: 'mysql',
		//timezone: 'America/Lima'
	});

module.exports = db;


