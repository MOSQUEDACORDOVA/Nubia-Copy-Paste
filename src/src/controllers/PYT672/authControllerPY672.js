// Comprobar si el usuario esta logueado
exports.authenticatedUser = (req, res, next) => {
	// Autenticado
	if(req.isAuthenticated()) {
		res.locals.user = req.user || {};
		return next();
	} 
	// Si no esta autenticado
	return res.redirect('/login27/PYT-27');
}

exports.authenticatedAdminOrSeller = (req, res, next) => {
	// Autenticado
	if(req.isAuthenticated() && req.user.type_user === 'Administrador' || req.user.type_user === 'Vendedor') {
		res.locals.user = req.user || {};
		return next();
	}  
	// Si no esta autenticado
	return res.redirect('/login27/PYT-27');
}

exports.authenticatedAdmin = (req, res, next) => {
	// Autenticado
	if(req.isAuthenticated() && req.user.type_user === 'Administrador') {
		res.locals.user = req.user || {};
		return next();
	}
	// Si no esta autenticado
	return res.redirect('/login27/PYT-27');
}