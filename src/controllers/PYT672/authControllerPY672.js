// Comprobar si el usuario esta logueado
exports.authenticatedUser = (req, res, next) => {
	// Autenticado
	if(req.isAuthenticated()) {
		res.locals.user = req.user || {};
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