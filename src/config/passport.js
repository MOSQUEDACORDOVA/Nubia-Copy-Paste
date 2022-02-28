const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook');
//var GoogleStrategy = require('passport-google-oauth20').Strategy;
var MixCloudStrategy = require('passport-mixcloud').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;



// Loca strategy - Login con credenciales propios
passport.use('local',
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback : true
		},
		async (req,email, password, done) => {
			console.log(req.body.proyect)
// Modelo a auntenticar
var Usuarios = "";
switch (req.body.proyect) {
	case 'PYT4':
		console.log("q")
		Usuarios = require('../models/PYT4/Usuarios');	
		break;
	case 'PYT21':
		console.log("21")
		Usuarios = require('../models/PYT21/Usuarios');	
		break;
	case 'PYT24':
		console.log("24")
		Usuarios = require('../models/PYT24/Usuarios');	
		break;
	case 'PYT27':
		console.log("27")
		Usuarios = require('../models/PYT27/Usuarios');	
		break;
	case 'PYT672':
		console.log("672")
		Usuarios = require('../models/PYT672/Usuarios');	
		break;
	case 'PASARELA':
		console.log("PASARELA")
		Usuarios = require('../models/PYT27/Usuarios');	
		break;
	default:
		break;
}
			try {
				const usuario = await Usuarios.findOne({
					where: {email}
				});
				if(!usuario.verifyPassword(password)) {
					return done(null, false, {
						message: 'Contraseña incorrecta'
					});
				}
				return done(null, usuario);
			}catch(err) {
				console.log(err)
				return done(null, false, {
					message: 'Esa cuenta no existe'
				});
			}
		}
	)
);

passport.use('cuponera',
	new LocalStrategy({
		usernameField: 'telefono',
		passwordField: 'pass',
		passReqToCallback : true
	},
		async (req,telefono, password, done) => {
			console.log(req.body)
// Modelo a auntenticar
var Clientes = "";
switch (req.body.proyect) {
	case 'PYT4':
		console.log("q")
		Clientes = require('../models/PYT4/Clientes');	
		break;
	default:
		break;
}
			try {
				const cliente = await Clientes.findOne({
					where: {telefono:telefono}
				});
				return done(null, cliente);
			}catch(err) {
				console.log(err)
				return done(null, false, {
					message: 'Esa cuenta no existe'
				});
			}
		}
	)
);
passport.use('referido',
	new LocalStrategy({
		usernameField: 'telefono',
		passwordField: 'ref',
		passReqToCallback : true
	},
		async (req,telefono, password, done) => {
			console.log(req.body)
// Modelo a auntenticar
		var Clientes = "";
		Clientes = require('../models/PYT4/Clientes');	
			try {
				const cliente = await Clientes.findOne({
					where: {telefono:telefono, referido_de: req.body.ref}
				});
				return done(null, cliente);
			}catch(err) {
				console.log(err)
				return done(null, false, {
					message: 'Esa cuenta no existe'
				});
			}
		}
	)
);
/* Código 100% funcional */
passport.use('facebook',
	new FacebookStrategy({
		clientID: 217632516619360,
 		clientSecret: '182fa6d95a67dcd3545f447b48dbd85e',
 		callbackURL: "http://localhost:3000/auth/facebook/callback"
 },
 	async (accessToken, refreshToken, profile, done) => {
 console.log(profile._json);
 const {id, name}=profile._json
 	const usuario = await Usuarios.findOne({where: {email: profile.id+"@algo.com"}});
		if (!usuario) {
			console.log("No hay:"+ usuario);
			await Usuarios.create({
				name: name,
				lastName: name,
				email: id+"@algo.com",
				password: id,
			});	
		}
 	return done(null, usuario);
 	}
 ));


 //inicio con google
 passport.use('google',new GoogleStrategy({
    clientID: '425427803550-5hcacf2hmbmj1k2nm1o1a5c6cg5kgk8j.apps.googleusercontent.com',
    clientSecret: 'RPmihfCgf5iuIugPX-pe_xSH',
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async (token, tokenSecret, profile, done) =>{
	  console.log(profile._json);
	  console.log(token);
	  const {sub, email, name, given_name, family_name}=profile._json
	  const usuario = await Usuarios.findOne({where: {email: email}});
	  if (!usuario) {
		  console.log("No hay:"+ usuario);
		  await Usuarios.create({
			  name: given_name,
			  lastName: family_name,
			  email: email,
			  password: sub,
		  });	
	  }
   return done(null, usuario);
  }
));




passport.use('mixcloud',new MixCloudStrategy({
    clientID: 'KEwRCR3zB6jE9fGKgK',
    clientSecret: 'm5YKEAFC4sB5wNehuCrTYcYhCWTbm2NG',
	callbackURL: "http://localhost:3000/auth/mixcloud/callback"
  },
 async function(accessToken, refreshToken, profile, done) {
	console.log(profile._json);
	const {name, username,key, pictures}=profile._json
	console.log(pictures.medium)
	const usuario = await Usuarios.findOne({where: {email: username+"@algo.com"}});
	if (!usuario) {
		console.log("No hay:"+ usuario);
		await Usuarios.create({
			name: name,
			lastName: key,
			email: username+"@algo.com",
			password: username,
			photo: pictures.medium
		});	
	}

     return done(null, usuario);
  }
));
// Serializar el usuario
passport.serializeUser((usuario, callback) => {
	callback(null, usuario);
});

// Deserializar el usuario
passport.deserializeUser((usuario, callback) => {
	callback(null, usuario);
});

module.exports = passport;