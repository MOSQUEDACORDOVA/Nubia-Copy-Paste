const router = require('express').Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const dashboardController = require('../controllers/dashboardController');
const dashboardControllerPY4 = require('../controllers/dashboardControllerPY4');
const dashboardControllerPY21 = require('../controllers/dashboardControllerPY21');
const dashboardControllerPY24 = require('../controllers/dashboardControllerPY24');
const dashboardControllerPY27 = require('../controllers/dashboardControllerPY27');
const landingController = require('../controllers/landingController');
const passport = require('passport');

// Landing Page
router.get('/', landingController.showLandingPage);
// Landing Page

//router.get('//:msg', landingController.showLandingPage);

// Iniciar sesión
router.get('/login', userController.formLogin);
router.post('/login',passport.authenticate('local',{ failureRedirect: '/login',failureFlash: 'Usuario o clave invalido.' }), userController.logintemp);

// Cerrar Sesión
router.get('/close-session', userController.closeSesion);


// Dashboard
router.get('/dashboard', dashboardController.dashboard);
router.get('/home/:id', dashboardController.dashboard);



//PYT-4
router.get('/py4/:id', dashboardControllerPY4.login);
router.get('/login/:id', dashboardControllerPY4.login);
router.get('/register/:id', dashboardControllerPY4.register);


//PYT-21
router.get('/py21/:id', dashboardControllerPY21.dashboard);

//PYT-24
router.get('/py24/:id', dashboardControllerPY24.dashboard);

//PYT-27
router.get('/py27/:id', dashboardControllerPY27.dashboard);





//router.get('/micuenta',authController.authenticatedUser, dashboardController.micuenta);
//router.get('/minegocio',authController.authenticatedUser, dashboardController.minegocio);
//router.get('/minegocio/:msg',authController.authenticatedUser, dashboardController.minegocio);


// Inicio de sesión con Facebook
router.get('/auth/facebook', 
  passport.authenticate('facebook', { scope : 'email' }
));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect : '/dashboard',
    failureRedirect : '/'
  })
);
 
//incio sesion con google
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }), function(req, res) {
    console.log("aqui")
  });

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/callback', 
  passport.authenticate('google', {
    successRedirect : '/dashboard',
   failureRedirect: '/login',
  failureFlash: 'Invalid Google credentials.' }),
  function(req, res) {
    res.redirect('/dashboard');
  });


module.exports = router;