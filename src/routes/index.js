const router = require('express').Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const authControllerPY4 = require('../controllers/authControllerpy4');
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
    //get
    router.get('/errorpy4/:msg', dashboardControllerPY4.dashboard);
router.get('/py4/:id', dashboardControllerPY4.login);
router.get('/homepy4',authControllerPY4.authenticatedUser, dashboardControllerPY4.dashboard);
router.get('/homepy4/:msg', authControllerPY4.authenticatedUser,dashboardControllerPY4.dashboard);
router.get('/loginpy4', dashboardControllerPY4.login);
router.get('/registerpy4/:id', dashboardControllerPY4.register);

router.get('/delete_pedido/:id', authControllerPY4.authenticatedUser,dashboardControllerPY4.delete_pedido);
router.get('/editar_pedido/:id', authControllerPY4.authenticatedUser,dashboardControllerPY4.editar_pedido);


router.get('/delete_cliente/:id', authControllerPY4.authenticatedUser,dashboardControllerPY4.delete_cliente);

router.get('/usuarios/:msg',authControllerPY4.authenticatedUser, dashboardControllerPY4.usuariosTable);
// Cerrar Sesión
router.get('/logoutpy4', dashboardControllerPY4.closeSesion);

    //post
router.post('/loginpyt4', dashboardControllerPY4.sesionstart);
router.post('/save_cliente_py4', dashboardControllerPY4.save_cliente_py4);
router.post('/reguserPy4', dashboardControllerPY4.reguserPy4);
router.post('/reg_pedido_modal', dashboardControllerPY4.regPedidoPy4);
router.post('/editar_pedido', authControllerPY4.authenticatedUser,dashboardControllerPY4.Save_editPedidoPy4);


//PYT-21
router.get('/py21/:id', dashboardControllerPY21.dashboard);
router.get('/login/:id', dashboardControllerPY21.login);
router.get('/register/:id', dashboardControllerPY21.register);
router.get('/error404/:id', dashboardControllerPY21.error);
router.get('/notauthorized/:id', dashboardControllerPY21.notauthorized);
router.get('/board/:id', dashboardControllerPY21.board);
router.get('/config/:id', dashboardControllerPY21.config);
router.get('/profile/:id', dashboardControllerPY21.profile);
router.get('/contracts/:id', dashboardControllerPY21.contracts);
router.get('/earnings/:id', dashboardControllerPY21.earnings);
router.get('/retreats/:id', dashboardControllerPY21.retreats);
router.get('/users/:id', dashboardControllerPY21.users);
router.get('/seller/:id', dashboardControllerPY21.seller);
router.get('/paymethods/:id', dashboardControllerPY21.paymethods);
router.get('/deposits/:id', dashboardControllerPY21.deposits);
router.get('/duration/:id', dashboardControllerPY21.duration);


//PYT-24
router.get('/py24/:id', dashboardControllerPY24.dashboard);
router.get('/login24/:id', dashboardControllerPY24.login);
router.get('/register24/:id', dashboardControllerPY24.register);
router.get('/error24/:id', dashboardControllerPY24.error);
router.get('/notauthorized24/:id', dashboardControllerPY24.notauthorized);
router.get('/board24/:id', dashboardControllerPY24.board);
router.get('/config24/:id', dashboardControllerPY24.config);
router.get('/profile24/:id', dashboardControllerPY24.profile);
router.get('/contracts24/:id', dashboardControllerPY24.contracts);
router.get('/earnings24/:id', dashboardControllerPY24.earnings);
router.get('/retreats24/:id', dashboardControllerPY24.retreats);
router.get('/users24/:id', dashboardControllerPY24.users);
router.get('/seller24/:id', dashboardControllerPY24.seller);
router.get('/paymethods24/:id', dashboardControllerPY24.paymethods);
router.get('/deposits24/:id', dashboardControllerPY24.deposits);
router.get('/duration24/:id', dashboardControllerPY24.duration);

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