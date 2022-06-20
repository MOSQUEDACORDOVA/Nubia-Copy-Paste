const DataBase = require("../../models/PYT672/data");
// Comprobar si el usuario esta logueado
exports.authenticatedUser = async (req, res, next) => {
	// Autenticado
	if(req.isAuthenticated()) {
		let idUser = res.locals.user.id;
  		const usuario = JSON.parse(await DataBase.ObtenerUsuario(idUser))[0];
		res.locals.user = usuario || {};
		return next();
	} 
	// Si no esta autenticado
	return res.redirect('/loginpy672/PYT-672');
}

exports.authenticatedAdmin = (req, res, next) => {
	// Autenticado
	if(req.isAuthenticated() && req.user.puesto === 'Administrador') {
		res.locals.user = req.user || {};
		return next();
	}
	// Si no esta autenticado
	return res.redirect('/loginpy672/PYT-672');
}