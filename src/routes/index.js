const router = require('express').Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const authControllerPY4 = require('../controllers/authControllerpy4');
const dashboardController = require('../controllers/dashboardController');
const dashboardControllerPY4 = require('../controllers/dashboardControllerPY4');
const dashboardControllerPY27 = require('../controllers/dashboardControllerPY27');
const landingController = require('../controllers/landingController');
const passport = require('passport');

/*------------- PYT21 -------------*/
const userControllerPY21 = require('../controllers/PYT21/userControllerPY21');
const authControllerPY21 = require('../controllers/PYT21/authControllerPY21');
const dashboardControllerPY21 = require('../controllers/PYT21/dashboardControllerPY21');

/*------------- PYT24 -------------*/
const userControllerPY24 = require('../controllers/PYT24/userControllerPY24');
const authControllerPY24 = require('../controllers/PYT24/authControllerPY24');
const dashboardControllerPY24 = require('../controllers/PYT24/dashboardControllerPY24');
/*---------------------------------*/

const FileController = require('../models/PYT24/upload');
const fileController = new FileController();


// Landing Page
router.get('/', landingController.showLandingPage);

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
router.get('/errorpy4/:msg', dashboardControllerPY4.dashboard);
router.get('/py4/:id', dashboardControllerPY4.login);
router.get('/homepy4',authControllerPY4.authenticatedUser, dashboardControllerPY4.dashboard);
router.get('/homepy4/:msg', authControllerPY4.authenticatedUser,dashboardControllerPY4.dashboard);
router.get('/prestados/:day', authControllerPY4.authenticatedUser,dashboardControllerPY4.dashboard);
router.get('/loginpy4', dashboardControllerPY4.login);
router.get('/registerpy4/:id', dashboardControllerPY4.register);
router.post('/cambiar_sucursal', dashboardControllerPY4.change_sucursal);
//personal
router.get('/personal_py4',authControllerPY4.authenticatedUser, dashboardControllerPY4.personal_table);
router.get('/personal_py4/:msg', authControllerPY4.authenticatedUser,dashboardControllerPY4.personal_table);
router.post('/save_personal_py4', dashboardControllerPY4.save_personal);
router.get('/delete_personal/:id', authControllerPY4.authenticatedUser,dashboardControllerPY4.delete_personal);
router.get('/editar_personal/:id', authControllerPY4.authenticatedUser,dashboardControllerPY4.editar_personal);
router.post('/save_personal_py4_edit', authControllerPY4.authenticatedUser,dashboardControllerPY4.save_personal_py4);


router.get('/editar_usuario/:id', authControllerPY4.authenticatedUser,dashboardControllerPY4.editar_usuarios);
router.post('/save_usuarios_py4_edit', authControllerPY4.authenticatedUser,dashboardControllerPY4.save_usuarios_py4);
//sucursales
router.get('/sucursales_py4',authControllerPY4.authenticatedUser, dashboardControllerPY4.sucursales);
router.get('/sucursales_py4/:msg', authControllerPY4.authenticatedUser,dashboardControllerPY4.sucursales);
router.post('/save_sucursal_py4', authControllerPY4.authenticatedUser,dashboardControllerPY4.save_sucursal);
router.get('/delete_sucursales/:id', authControllerPY4.authenticatedUser,dashboardControllerPY4.delete_sucursales);
router.get('/editar_sucursales/:id', authControllerPY4.authenticatedUser,dashboardControllerPY4.editar_sucursales);
router.post('/editar_sucursales', authControllerPY4.authenticatedUser,dashboardControllerPY4.editar_sucursales_save);

//carga inicial
router.get('/carga_inicial_py4',authControllerPY4.authenticatedUser, dashboardControllerPY4.carga_inicial);
router.get('/carga_inicial_py4/:msg', authControllerPY4.authenticatedUser,dashboardControllerPY4.carga_inicial);
router.post('/save_carga_init_py4', authControllerPY4.authenticatedUser,dashboardControllerPY4.save_carga_inicial);


//vehiculos
router.get('/vehiculos_py4',authControllerPY4.authenticatedUser, dashboardControllerPY4.vehiculos_table);
router.get('/vehiculos_py4/:msg', authControllerPY4.authenticatedUser,dashboardControllerPY4.vehiculos_table);
router.post('/save_vehiculo_py4', dashboardControllerPY4.save_vehiculos);
router.get('/delete_vehiculos/:id', authControllerPY4.authenticatedUser,dashboardControllerPY4.delete_vehiculos);
router.get('/editar_vehiculos/:id', authControllerPY4.authenticatedUser,dashboardControllerPY4.editar_vehiculos);
router.post('/save_vehiculos_py4_edit', authControllerPY4.authenticatedUser,dashboardControllerPY4.save_vehiculos_py4);


//CP
router.post('/consultaCP',authControllerPY4.authenticatedUser, dashboardControllerPY4.consultaCP);
//corte
router.get('/corte_py4',authControllerPY4.authenticatedUser, dashboardControllerPY4.corte_table);
router.get('/corteday_py4/:day',authControllerPY4.authenticatedUser, dashboardControllerPY4.corte_table);
router.get('/corte_py4/:msg', authControllerPY4.authenticatedUser,dashboardControllerPY4.corte_table);

//pedido
router.get('/delete_pedido/:id', authControllerPY4.authenticatedUser,dashboardControllerPY4.delete_pedido);
router.get('/editar_pedido/:id', authControllerPY4.authenticatedUser,dashboardControllerPY4.editar_pedido);
router.get('/ver_pedido/:id', dashboardControllerPY4.ver_pedido);
router.get('/delete_cliente/:id', authControllerPY4.authenticatedUser,dashboardControllerPY4.delete_cliente);
router.get('/editar_cliente/:id', authControllerPY4.authenticatedUser,dashboardControllerPY4.editar_cliente);
router.get('/cambiaS_pedido/:id/:status', authControllerPY4.authenticatedUser,dashboardControllerPY4.cambiaS_pedido);
router.get('/cambia_S_pago/:id/:status', authControllerPY4.authenticatedUser,dashboardControllerPY4.cambia_S_pago);
router.post('/verificar_deuda', authControllerPY4.authenticatedUser,dashboardControllerPY4.verifica_deuda_pedido);


router.get('/usuarios/:mensaje',authControllerPY4.authenticatedUser, dashboardControllerPY4.usuariosTable);

router.get('/actualizar_devueltos/:id_chofer/:cantidad/:id_cliente/:fecha', authControllerPY4.authenticatedUser,dashboardControllerPY4.corte_prestados_table);

// Cerrar Sesión
router.get('/logoutpy4', dashboardControllerPY4.closeSesion);

//post
router.post('/loginpyt4', dashboardControllerPY4.sesionstart);
router.post('/save_cliente_py4', dashboardControllerPY4.save_cliente_py4);
router.post('/reguserPy4', dashboardControllerPY4.reguserPy4);
router.post('/reg_pedido_modal', dashboardControllerPY4.regPedidoPy4);
router.post('/editar_pedido', authControllerPY4.authenticatedUser,dashboardControllerPY4.Save_editPedidoPy4);
router.post('/editar_cliente', authControllerPY4.authenticatedUser,dashboardControllerPY4.save_cliente_edit);






/*--------------------- PYT-21 ---------------------*/
router.get('/login/:id', dashboardControllerPY21.login);
router.get('/register/:id', dashboardControllerPY21.register);
router.get('/error404/:id', dashboardControllerPY21.error);
router.get('/notauthorized/:id', dashboardControllerPY21.notauthorized);
// Auth user
router.get('/py21/:id', authControllerPY21.authenticatedUser, dashboardControllerPY21.dashboard);
router.get('/config/:id', authControllerPY21.authenticatedUser, dashboardControllerPY21.config);
router.get('/contracts/:id', authControllerPY21.authenticatedUser, dashboardControllerPY21.contracts);
router.get('/retreats/:id', authControllerPY21.authenticatedUser, dashboardControllerPY21.retreats);
router.get('/deposits/:id', authControllerPY21.authenticatedUser, dashboardControllerPY21.deposits);
// router.get('/earnings/:id', authControllerPY21.authenticatedUser, dashboardControllerPY21.earnings);
// router.get('/profile/:id', authControllerPY21.authenticatedUser, dashboardControllerPY21.profile);

// Auth admin
router.get('/seller/:id', authControllerPY21.authenticatedAdminOrSeller, dashboardControllerPY21.seller);
router.get('/users/:id', authControllerPY21.authenticatedAdmin, dashboardControllerPY21.users);
router.get('/pay/:id', authControllerPY21.authenticatedAdmin, dashboardControllerPY21.pay);
router.get('/paymethods/:id', authControllerPY21.authenticatedAdmin, dashboardControllerPY21.paymethods);
router.get('/duration/:id', authControllerPY21.authenticatedAdmin, dashboardControllerPY21.duration);

//POST
router.post('/loginpy21', dashboardControllerPY21.sesionstart);
router.post('/reguserpy21', dashboardControllerPY21.reguserpy21);

// Cerrar Sesión
router.get('/logout/PYT-21', userControllerPY21.closeSesion);




/*--------------------------------------------------*/

// PYT-24
// PRESALE
router.get('/controlroles/:id', authControllerPY24.authenticatedUser, dashboardControllerPY24.controlroles);
router.get('/boardpresale/:id', authControllerPY24.authenticatedUser, dashboardControllerPY24.boardpresale);
router.get('/presale/:id', authControllerPY24.authenticatedUser, dashboardControllerPY24.presale);
router.get('/depositpresale/:id', authControllerPY24.authenticatedUser, dashboardControllerPY24.depositpresale);

router.get('/web/:id', dashboardControllerPY24.web);
router.get('/register24/:id', dashboardControllerPY24.register);
router.get('/login24/:id', dashboardControllerPY24.login);
router.get('/error24/:id', dashboardControllerPY24.error);

// Auth user
router.get('/py24/:id', authControllerPY24.authenticatedUser, dashboardControllerPY24.dashboard);
router.get('/notauthorized24/:id', dashboardControllerPY24.notauthorized);
router.get('/config24/:id', authControllerPY24.authenticatedUser, dashboardControllerPY24.config);
router.get('/retreats24/:id', authControllerPY24.authenticatedUser, dashboardControllerPY24.retreats);
router.get('/deposits24/:id', authControllerPY24.authenticatedAdmin,  dashboardControllerPY24.depositsadmin);
router.get('/plans/:id', authControllerPY24.authenticatedUser, dashboardControllerPY24.plans);

// Auth Admin
router.get('/seller24/:id', authControllerPY24.authenticatedAdminOrSeller, dashboardControllerPY24.seller);
router.get('/users24/:id', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.users);
router.get('/paymethods24/:id', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.paymethods);
router.get('/th/:id', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.th);
router.get('/paym/:id', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.paymanag);

// router.get('/profile24/:id', authControllerPY24.authenticatedUser, dashboardControllerPY24.profile);
// router.get('/contracts24/:id', dashboardControllerPY24.contracts);
// router.get('/earnings24/:id', dashboardControllerPY24.earnings);
// router.get('/duration24/:id', dashboardControllerPY24.duration);

//POST
router.post('/loginpy24', dashboardControllerPY24.sesionstart);
router.post('/reguserpy24', dashboardControllerPY24.reguserpy24);

// AÑADIR MAQUINA DE MINADO 
router.post('/addth', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.addth);
// CONTROL DE TH PRECIO, % DE MANTENIMIENTO, % DE ERROR, GANANCIAS POR REFERIDOS, SALDO MINIMO DE RETIRO
router.post('/th', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.controlth);
// ACTUALIZAR PRECIO TH
router.post('/updateth', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.updateth);
// ACTUALIZAR PORCENTAJE DE MANTENIMIENTO
router.post('/updatemaintance', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.updatemaintance);
// ACTUALIZAR PORCENTAJE DE ERROR
router.post('/updateerror', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.updateerror);
// ACTUALIZAR GANANCIAS POR REFERIDOS
router.post('/updateearnings', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.updateearnings);
// ACTUALIZAR MINIMO DE RETIRO
router.post('/minwithd', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.updateminwithd);

// CREAR PAQUETES
router.post('/createpackages', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.createpackages);
// CREAR PAQUETES PERSONALIZADOS
router.post('/createpackagespers', authControllerPY24.authenticatedUser, dashboardControllerPY24.createpackagespers);
// ACTUALIZAR PAQUETES
router.post('/updatepackages', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.updatepackages);
// ELIMINAR PAQUETES
router.post('/deletepackages', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.deletepackages);

// METODOS DE PAGO, TRANSFERENCIA BANCARIA
router.post('/addbank', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.addbank);
// METODOS DE PAGO, PAGO MOVIL
router.post('/addpaym', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.addpaym);
// METODOS DE PAGO, RETIRO EN BTC
router.post('/addbtc', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.addbtc);
// METODOS DE PAGO, BILLETERA DIGITAL
router.post('/addwallet', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.addwallet);
// HABILITAR / DESHABILITAR METODOS DE PAGO
router.post('/updatestatuspaymethod', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.updatestatuspaymethod);
// ACTUALIZAR METODOS DE PAGO TRANSFERENCIAS
router.post('/updatepaymethod', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.updatepaymethod);
// ELIMINAR METODOS DE PAGO
router.post('/deletepaymethod', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.deletepaymethod);


// COMPRAR DE PAQUETE
router.post('/deposits', authControllerPY24.authenticatedUser, dashboardControllerPY24.createdeposits);

// APROBAR
router.post('/startdeposit', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.startdeposit);
// SUBIR IMAGEN
router.post('/upload', fileController.subirArchivo);


// Cerrar Sesión
router.get('/logout/PYT-24', userControllerPY24.closeSesion);

// 404


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