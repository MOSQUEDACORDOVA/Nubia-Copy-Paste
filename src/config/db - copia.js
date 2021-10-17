const { Sequelize } = require('sequelize');

// Variables desde variables.env
require('dotenv').config({path: 'variables.env'});

DB_NAME="javierg_bwater";
DB_USER="javierg_bwater";
DB_PASS="eaf1qbU6T6LV";
DB_HOST="localhost";
DB_PORT=3306;



const db = new Sequelize(DB_NAME, DB_USER, DB_PASS,
	{
		host: DB_HOST,
		port: DB_PORT,
		dialect: 'mysql'
	});

module.exports = db;


