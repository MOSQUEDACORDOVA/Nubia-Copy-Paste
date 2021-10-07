// Comprobar si el usuario esta logueado
exports.authenticatedUser = (req, res, next) => {
	// Autenticado
	if(req.isAuthenticated()) {
		res.locals.user = req.user || {};
		return next();
	}
	// Si no esta autenticado
	return res.redirect('/login/PYT-21');
}

exports.authenticatedAdmin = (req, res, next) => {
	// Autenticado
	if(req.isAuthenticated()) {
		res.locals.user = req.user || {};
		return next();
	}
	// Si no esta autenticado
	return res.redirect('/login/PYT-21');
}