// Comprobar si el usuario esta logueado
exports.authenticatedUser = (req, res, next) => {

	// Autenticado
	if(req.isAuthenticated()) {
		console.log(res.locals.user)
		res.locals.user = req.user;
		return next();
	}

	// Si no esta autenticado
	return res.redirect('/loginpy4');

}

exports.authenticatedCliente = (req, res, next) => {

	// Autenticado
	if(req.isAuthenticated()) {
		console.log(res.locals.user)
		res.locals.user = req.user;
		return next();
	}

	// Si no esta autenticado
	return res.redirect('/intro_cuponera');

}