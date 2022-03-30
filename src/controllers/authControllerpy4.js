// Comprobar si el usuario esta logueado
exports.authenticatedUser = (req, res, next) => {

	// Autenticado
	if(req.isAuthenticated()) {
		res.locals.user = req.user;
		return next();
	}

	// Si no esta autenticado
	return res.redirect('/loginpy4');

}

exports.authenticatedCliente = (req, res, next) => {

	// Autenticado
	if(req.isAuthenticated()) {
		res.locals.user = req.user;
		return next();
	}

	// Si no esta autenticado
	return res.redirect('/intro_cuponera');
}
exports.authenticatedClienteReferido = (req, res, next) => {
	// Autenticado
	if(req.isAuthenticated()) {
		res.locals.user = req.user;
		return next();
	}
	// Si no esta autenticado
	return res.redirect('http://google.com');
}

exports.authenticatedQR = (req, res, next) => {

	// Autenticado
	if(req.isAuthenticated()) {
		res.locals.user = req.user;
		return next();
	}

	// Si no esta autenticado
	return res.redirect('http://google.com');

}