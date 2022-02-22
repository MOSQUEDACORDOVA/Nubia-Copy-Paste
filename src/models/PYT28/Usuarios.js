const { DataTypes } = require('sequelize');
const db28 = require('../../config/dbPY28');
const bcrypt = require('bcrypt-nodejs');
const DepositosAero = require('../PYT28/DepositosAero');

// USUARIOS
const Usuarios = db28.define('usuarios', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	first_name: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	last_name: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	date_of_birth: {
		type: DataTypes.STRING(200),
		allowNull: false,
	},
	gender: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	doc_type: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	num_document: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	nationality: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	country: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	city: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	phone: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	address: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	username: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING(100),
		allowNull: false,
		validate: {
			isEmail: {
				msg: 'Agrega un correo válido'
			},
			notEmpty: {
				msg: 'El email es obligatorio'
			}
		},
		unique: {
			args: true,
			msg: 'Usuario ya registrado'
		}
	},
	password: {
		type: DataTypes.STRING(60),
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'La contraseña es obligatoria'
			}
		}
	},
    type_user: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
	avalible_balance: {
		type: DataTypes.INTEGER(100),
        allowNull: true,
		defaultValue: 0
	},
	earnings: {
		type: DataTypes.INTEGER(100),
		allowNull: true,
		defaultValue: 0
	},
	front_img_dni: {
		type: DataTypes.STRING(100),
		allowNull: true,
	},
	back_img_dni: {
		type: DataTypes.STRING(100),
		allowNull: true,
	},
	account_verified: {
		type: DataTypes.STRING(50),
		allowNull: false,
		defaultValue: 'No verificado'
	},
	refer_code: {
		type: DataTypes.STRING(100),
		allowNull: true,
		unique: {
			args: true,
			msg: 'El código ya existe'
		}
	},
	token: {
		type: DataTypes.STRING(100)
	},
	expiration: {
		type: DataTypes.DATE
	},
	validation: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	status: {
		type: DataTypes.STRING(50),
		allowNull: false,
		defaultValue: 'activo'
	}
}, {
	hooks: {
		beforeCreate(usuario) {
			usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
		}
	}
});

// Métodos personalizados
Usuarios.prototype.verifyPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

Usuarios.DepositosAero = Usuarios.hasMany(DepositosAero);
module.exports = Usuarios;