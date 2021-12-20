const nodemailer = require("nodemailer");
const Usuarios = require("../../models/PYT27/Usuarios");

let fs = require("fs");
// email sender function
exports.sendEmail = function (req, res) {
  const { email } = req.body;
        // Definimos el transporter
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'mail.smtp2go.com',
            auth: {
                user: 'no-reply@aerocoin.aero',
                pass: 's(byC-O;?@4!'
            }
        });
        // Definimos el email
        var mailOptions = {
          from: "Backartist@backartist.com",
          to: email,
          subject: "SuscribciÃ³n",
          text: "Gracias por suscribirte, pronto recibiras noticias nuestras en tu correo.",          
    html: `<html>
    <head>	
    </head>
    <body style="font-family: 'Poppins', sans-serif; font-size: 1.4em;">
    <div style="width: 90%; margin-left: auto; margin-right: auto;">
      <div  style="font-weight: bold;display: inline-block; padding-top: .3125rem;padding-bottom: .3125rem; margin-right: 1rem;font-size: 1.25rem;   line-height: inherit;white-space: nowrap; "> 
        <img src="https://josea.mosquedacordova.com/assets/img/logo-ba.png" style="vertical-align: middle; border-style: none;" alt="..." width="70px" />Backartist
      </div>
        <div style="text-align: center"> 
          <label style="font-size: 1.8rem;font-weight: bold;color: darkgoldenrod;"><i class="fas fa-exclamation-circle"></i> Gracias!!</label><br>
        </div>	
        <div style="text-align: left"> 
          <p style="line-height: 1.5;">Gracias por suscribirte, pronto recibiras noticias nuestras en tu correo. !!</p>
        </div>	
        <div style="text-align: center"> 
          <a style="color: white;border: none; font-size: 1em; border-radius: 15px; padding: 0.5em 1.5em;text-decoration:none; background-color:#dc3545" href="https://www.backartist.com/">Visitar Web</a><br>
        </div>		
      </div>
    </body>
  
  </html>`
        };
        // Enviamos el email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                let msg = "Error al enviar Mensaje";
                res.redirect("/?msg=" + msg);
                // res.send(500, err.message);
            } else {
                console.log("Email sent fine");
                let msg =
                "Gracias por suscribirte, pronto recibiras noticias nuestras en tu correo.";
                res.redirect("/?msg=" + msg);
            }
        })
};

exports.bienvenidaMail = async function (req, res) {
    //const {email} = req.body;
    //var token = req.params.mail;
    var mail = req.params.mail;
    var token = req.params.token;
    const resetUrl = `http://${req.headers.host}/loginverify27/${token}`;
  
    const usuario = await Usuarios.findOne({ where: { email: mail } });
    console.log(usuario.name)
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
      host: 'aerocoin.aero',
      port: 465,
      secure: true,
      auth: {
          user: 'no-reply@aerocoin.aero',
          pass: 's(byC-O;?@4!',
      }
    });
    // Definimos el email
    var mailOptions = {
      from: "no-reply@aerocoin.aero",
      to: mail,
      subject: "Welcome to Aerocoin",
      text: "Welcome to  Aerocoin" + resetUrl,
      html: `
      <html>
        <head>	
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500;1,600" rel="stylesheet">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"  /> 
          <link rel="stylesheet" type="text/css" href="../../../app-assets/vendors/css/vendors.min.css">
          <link rel="stylesheet" type="text/css" href="../../../app-assets/vendors/css/charts/apexcharts.css">
          <link rel="stylesheet" type="text/css" href="../../../app-assets/vendors/css/extensions/toastr.min.css">
          <link rel="stylesheet" type="text/css" href="../../../app-assets/css/bootstrap.css">
          <link rel="stylesheet" type="text/css" href="../../../app-assets/css/bootstrap-extended.css">
          <link rel="stylesheet" type="text/css" href="../../../app-assets/css/colors.css">
          <link rel="stylesheet" type="text/css" href="../../../app-assets/css/components.css">
          <link rel="stylesheet" type="text/css" href="../../../app-assets/css/themes/dark-layout.css">
          <link rel="stylesheet" type="text/css" href="../../../app-assets/css/themes/bordered-layout.css">
          <link rel="stylesheet" type="text/css" href="../../../app-assets/css/themes/semi-dark-layout.css">
          <link rel="stylesheet" type="text/css" href="../../../app-assets/css/core/menu/menu-types/vertical-menu.css">
          <link rel="stylesheet" type="text/css" href="../../../app-assets/css/pages/dashboard-ecommerce.css">
          <link rel="stylesheet" type="text/css" href="../../../app-assets/css/plugins/charts/chart-apex.css">
          <link rel="stylesheet" type="text/css" href="../../../app-assets/css/plugins/extensions/ext-component-toastr.css">
          <link rel="stylesheet" type="text/css" href="../../../assets/css/style.css">
        </head>
        <body style="font-family: 'Poppins', sans-serif; font-size: 1.4em;">

          <div role="article" aria-roledescription="email" aria-label="Verify Email Address" lang="en">
          <table style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tbody><tr>
              <td align="center" style="--bg-opacity: 1; background-color: #eceff1; background-color: rgba(236, 239, 241, var(--bg-opacity)); font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;" bgcolor="rgba(236, 239, 241, var(--bg-opacity))">
                <table class="sm-w-full" style="font-family: 'Montserrat',Arial,sans-serif; width: 600px;" width="600" cellpadding="0" cellspacing="0" role="presentation">
                  <tbody><tr>
                  </tr>
                  <tr>
                    <td align="center" class="sm-px-24" style="font-family: 'Montserrat',Arial,sans-serif;">
                      <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                        <tbody><tr>
                          <td class="sm-px-24" style="--bg-opacity: 1; background-color: #ffffff; background-color: rgba(255, 255, 255, var(--bg-opacity)); border-radius: 4px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 14px; line-height: 24px; padding: 48px; text-align: left; --text-opacity: 1; color: #626262; color: rgba(98, 98, 98, var(--text-opacity));" bgcolor="rgba(255, 255, 255, var(--bg-opacity))" align="left">
                            <h3 style="font-weight: 700; font-size: 20px; margin-top: 0; color: #04246d;">AEROCOIN<br> IT'S NOT JUST ABOUT FLY</h3>
                            <p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">Hey</p>
                            <p class="text-primary" style="font-weight: 700; font-size: 20px; margin-top: 0; color: #04246d;">${usuario.first_name} ${usuario.last_name}</p>
                            <p class="sm-leading-32" style="font-weight: 600; font-size: 20px; margin: 0 0 16px; --text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity));">
                              Thanks for signing up!
                            </p>
                            <p style="margin: 0 0 24px;">
                              Please verify your email address by clicking the below button and join our creative community,
                              start exploring the resources or showcasing your work.
                            </p>
                            <p style="margin: 0 0 24px;">
                              If you did not sign up to Aerocoin, please ignore this email or contact us at
                              <a href="https://www.aerocoin.aero/support" target="_blank" class="hover-underline" style="--text-opacity: 1; color: #04246d; text-decoration: none;">https://www.aerocoin.aero/support.</a>
                            </p>
                            <table style="font-family: 'Montserrat',Arial,sans-serif;" cellpadding="0" cellspacing="0" role="presentation">
                              <tbody><tr>
                                <td style="mso-padding-alt: 16px 24px; --bg-opacity: 1; background-color: #04246d; background-color: #04246d; border-radius: 4px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; ">
                                  <a href="${resetUrl}" style="display: block; font-weight: 600; font-size: 14px; line-height: 100%; padding: 16px 24px; --text-opacity: 1; color: #ffffff; text-decoration: none;">Verify Email Now</a>
                                </td>
                              </tr>
                            </tbody></table>
                            <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                              <tbody><tr>
                                <td style="font-family: 'Montserrat',Arial,sans-serif; padding-top: 32px; padding-bottom: 32px;">
                                  <div style="--bg-opacity: 1; background-color: #eceff1; background-color: rgba(236, 239, 241, var(--bg-opacity)); height: 1px; line-height: 1px;"></div>
                                </td>
                              </tr>
                            </tbody></table>
                            <p style="margin: 0 0 16px;">
                              Not sure why you received this email? Please
                              <a href="mailto:support@example.com" class="hover-underline" style="--text-opacity: 1; color: #04246d; text-decoration: none;">let us know</a>.
                            </p>
                            <p style="margin: 0 0 16px;">Thanks, <br>Aerocoin Team</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="font-family: 'Montserrat',Arial,sans-serif; height: 20px;" height="20"></td>
                        </tr>
                        <tr>
                          <td style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 12px; padding-left: 48px; padding-right: 48px; --text-opacity: 1; color: #eceff1; color: rgba(236, 239, 241, var(--text-opacity));">
                            <p align="center" style="cursor: default; margin-bottom: 16px;">
                              <a href="https://www.facebook.com/aero_coin" target="_blank" style="--text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity)); text-decoration: none;"><img src="https://1.bp.blogspot.com/-oIlDs9G4Hh0/X8ueda_RCwI/AAAAAAAAMtY/TCGqSTU-6nweFgD-lhtQRMgmEdxIqQskACLcBGAsYHQ/s852/facebook%2Blogo%2Bpng%2Bsin%2Bfondo%2B%25282%2529.png" width="17" alt="Facebook" style="border: 0; max-width: 100%; line-height: 100%; vertical-align: middle; margin-right: 12px;"></a>
                              
                              <a href="https://twitter.com/AEROCOIN_" target="_blank" style="--text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity)); text-decoration: none;"><img src="https://logodownload.org/wp-content/uploads/2014/09/twitter-logo-4.png" width="17" alt="Twitter" style="border: 0; max-width: 100%; line-height: 100%; vertical-align: middle; margin-right: 12px;"></a>
                              
                              <a href="https://www.instagram.com/AEROCOIN/" target="_blank" style="--text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity)); text-decoration: none;"><img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" width="17" alt="Instagram" style="border: 0; max-width: 100%; line-height: 100%; vertical-align: middle; margin-right: 12px;"></a>
                            </p>
                            <p style="--text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity));">
                              Use of our service and website is subject to our
                              <a href="https://www.aerocoin.aero/support" target="_blank" class="hover-underline" style="--text-opacity: 1; color: #04246d text-decoration: none;">Terms of Use</a> and
                              <a href="https://www.aerocoin.aero/support" target="_blank" class="hover-underline" style="--text-opacity: 1; color: #04246d; text-decoration: none;">Privacy Policy</a>.
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="font-family: 'Montserrat',Arial,sans-serif; height: 16px;" height="16"></td>
                        </tr>
                      </tbody></table>
                    </td>
                  </tr>
                </tbody></table>
              </td>
            </tr>
          </tbody></table>
        </div>
        </body>
    
      </html>`
    };
    // Enviamos el email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        let msg = "Error al enviar Mensaje";
        console.log(msg)
        res.redirect("/error404/PYT-27");
        // res.send(500, err.message);
      } else {
        console.log("Email sent fine");
        let emailUser = usuario.email;
        let msg =
          "Se envio un email, para validar y confirmar su cuenta";
        res.redirect("/emailregsend/PYT-27/"+emailUser);
  
        //  res.status(200).jsonp(req.body);
      }
    });
};

exports.emailVerificado = async function (req, res) {
  let id = req.params.id, total = req.params.total; 

  const usuario = await Usuarios.findOne({ where: { id: id } });
  console.log(usuario.first_name)
  // Definimos el transporter
  var transporter = nodemailer.createTransport({
    host: 'aerocoin.aero',
    port: 465,
    secure: true,
    auth: {
        user: 'no-reply@aerocoin.aero',
        pass: 's(byC-O;?@4!',
    }
  });
   // Definimos el email
   var mailOptions = {
    from: "no-reply@aerocoin.aero",
    to: usuario.email,
    subject: "Email Verified Successfully - Aerocoin Team",
    text: "Email Verified Successfully - Aerocoin Team",
    html: `
    <html>
      <head>	
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500;1,600" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"  /> 
        <link rel="stylesheet" type="text/css" href="../../../app-assets/vendors/css/vendors.min.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/vendors/css/charts/apexcharts.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/vendors/css/extensions/toastr.min.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/bootstrap.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/bootstrap-extended.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/colors.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/components.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/themes/dark-layout.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/themes/bordered-layout.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/themes/semi-dark-layout.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/core/menu/menu-types/vertical-menu.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/pages/dashboard-ecommerce.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/plugins/charts/chart-apex.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/plugins/extensions/ext-component-toastr.css">
        <link rel="stylesheet" type="text/css" href="../../../assets/css/style.css">
      </head>
      <body style="font-family: 'Poppins', sans-serif; font-size: 1.4em;">

        <div role="article" aria-roledescription="email" aria-label="Verify Email Address" lang="en">
        <table style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tbody><tr>
            <td align="center" style="--bg-opacity: 1; background-color: #eceff1; background-color: rgba(236, 239, 241, var(--bg-opacity)); font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;" bgcolor="rgba(236, 239, 241, var(--bg-opacity))">
              <table class="sm-w-full" style="font-family: 'Montserrat',Arial,sans-serif; width: 600px;" width="600" cellpadding="0" cellspacing="0" role="presentation">
                <tbody><tr>
                </tr>
                <tr>
                  <td align="center" class="sm-px-24" style="font-family: 'Montserrat',Arial,sans-serif;">
                    <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                      <tbody><tr>
                        <td class="sm-px-24" style="--bg-opacity: 1; background-color: #ffffff; background-color: rgba(255, 255, 255, var(--bg-opacity)); border-radius: 4px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 14px; line-height: 24px; padding: 48px; text-align: left; --text-opacity: 1; color: #626262; color: rgba(98, 98, 98, var(--text-opacity));" bgcolor="rgba(255, 255, 255, var(--bg-opacity))" align="left">
                          <h3 style="font-weight: 700; font-size: 20px; margin-top: 0; color: #04246d;">AEROCOIN<br> IT'S NOT JUST ABOUT FLY</h3>
                          <p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">Hey</p>
                          <p class="text-primary" style="font-weight: 700; font-size: 20px; margin-top: 0; color: #04246d;">${usuario.first_name} ${usuario.last_name}</p>
                          <p class="sm-leading-32" style="font-weight: 600; font-size: 20px; margin: 0 0 16px; --text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity));">
                            Your email has been <br> <b style="color: #04246d;">VERIFIED SUCCESSFULLY</b>
                          </p>
                          
                          <p class="card-text">If you don´t recognize this activity , please contact us inmmediately at: <a href="https://www.aerocoin.aero/suppor" class="text-primary">https://www.aerocoin.aero/support</a>.<br><br> Aerocoin Team.</p>
                          <table style="font-family: 'Montserrat',Arial,sans-serif;" cellpadding="0" cellspacing="0" role="presentation">
                              <tbody><tr>
                                <td style="mso-padding-alt: 16px 24px; --bg-opacity: 1; background-color: #04246d; background-color: #04246d; border-radius: 4px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; ">
                                  <a href="https://aerocoin.us/login27/PYT-27" style="display: block; font-weight: 600; font-size: 14px; line-height: 100%; padding: 16px 24px; --text-opacity: 1; color: #ffffff; text-decoration: none;">Sign In</a>
                                </td>
                              </tr>
                          </tbody></table>

                          <table style="font-family: 'Montserrat',Arial,sans-serif;" cellpadding="0" cellspacing="0" role="presentation">
                          <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                            <tbody><tr>
                              <td style="font-family: 'Montserrat',Arial,sans-serif; padding-top: 32px; padding-bottom: 32px;">
                                <div style="--bg-opacity: 1; background-color: #eceff1; background-color: rgba(236, 239, 241, var(--bg-opacity)); height: 1px; line-height: 1px;"></div>
                              </td>
                            </tr>
                          </tbody></table>

                          <p class="text-center mt-2">
                            <span>This is an automated message, please do not reply</span>
                          </p> 

                          <p style="margin: 0 0 16px;">Thanks, <br>Aerocoin Team</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-family: 'Montserrat',Arial,sans-serif; height: 20px;" height="20"></td>
                      </tr>
                      <tr>
                        <td style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 12px; padding-left: 48px; padding-right: 48px; --text-opacity: 1; color: #eceff1; color: rgba(236, 239, 241, var(--text-opacity));">
                          <p align="center" style="cursor: default; margin-bottom: 16px;">
                            <a href="https://www.facebook.com/aero_coin" target="_blank" style="--text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity)); text-decoration: none;"><img src="https://1.bp.blogspot.com/-oIlDs9G4Hh0/X8ueda_RCwI/AAAAAAAAMtY/TCGqSTU-6nweFgD-lhtQRMgmEdxIqQskACLcBGAsYHQ/s852/facebook%2Blogo%2Bpng%2Bsin%2Bfondo%2B%25282%2529.png" width="17" alt="Facebook" style="border: 0; max-width: 100%; line-height: 100%; vertical-align: middle; margin-right: 12px;"></a>
                            
                            <a href="https://twitter.com/AEROCOIN_" target="_blank" style="--text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity)); text-decoration: none;"><img src="https://logodownload.org/wp-content/uploads/2014/09/twitter-logo-4.png" width="17" alt="Twitter" style="border: 0; max-width: 100%; line-height: 100%; vertical-align: middle; margin-right: 12px;"></a>
                            
                            <a href="https://www.instagram.com/AEROCOIN/" target="_blank" style="--text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity)); text-decoration: none;"><img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" width="17" alt="Instagram" style="border: 0; max-width: 100%; line-height: 100%; vertical-align: middle; margin-right: 12px;"></a>
                          </p>
                          <p style="--text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity));">
                            Use of our service and website is subject to our
                            <a href="https://www.aerocoin.aero/support" target="_blank" class="hover-underline" style="--text-opacity: 1; color: #04246d text-decoration: none;">Terms of Use</a> and
                            <a href="https://www.aerocoin.aero/support" target="_blank" class="hover-underline" style="--text-opacity: 1; color: #04246d; text-decoration: none;">Privacy Policy</a>.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-family: 'Montserrat',Arial,sans-serif; height: 16px;" height="16"></td>
                      </tr>
                    </tbody></table>
                  </td>
                </tr>
              </tbody></table>
            </td>
          </tr>
        </tbody></table>
      </div>
      </body>
  
    </html>`
  };
  // Enviamos el email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      let msg = "Error al enviar Mensaje";
      console.log(msg)
      res.redirect("/error404/PYT-27");
      // res.send(500, err.message);
    } else {
      console.log("Email sent fine");
      let msg =
        "Se envio un email, con la informacion del email verificado";
        res.redirect("/login27/PYT-27");
      //  res.status(200).jsonp(req.body);
    }
  });
}

exports.depositoAprovado = async function (req, res) {
  let id = req.params.userid, total = req.params.total; 

  const usuario = await Usuarios.findOne({ where: { id: id } });
  console.log(usuario.first_name)
  // Definimos el transporter
  var transporter = nodemailer.createTransport({
    host: 'aerocoin.aero',
    port: 465,
    secure: true,
    auth: {
        user: 'no-reply@aerocoin.aero',
        pass: 's(byC-O;?@4!',
    }
  });
   // Definimos el email
   var mailOptions = {
    from: "no-reply@aerocoin.aero",
    to: usuario.email,
    subject: "Deposit Approve - Aerocoin Team",
    text: "Deposit Approve - Aerocoin Team",
    html: `
    <html>
      <head>	
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500;1,600" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"  /> 
        <link rel="stylesheet" type="text/css" href="../../../app-assets/vendors/css/vendors.min.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/vendors/css/charts/apexcharts.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/vendors/css/extensions/toastr.min.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/bootstrap.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/bootstrap-extended.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/colors.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/components.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/themes/dark-layout.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/themes/bordered-layout.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/themes/semi-dark-layout.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/core/menu/menu-types/vertical-menu.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/pages/dashboard-ecommerce.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/plugins/charts/chart-apex.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/plugins/extensions/ext-component-toastr.css">
        <link rel="stylesheet" type="text/css" href="../../../assets/css/style.css">
      </head>
      <body style="font-family: 'Poppins', sans-serif; font-size: 1.4em;">

        <div role="article" aria-roledescription="email" aria-label="Verify Email Address" lang="en">
        <table style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tbody><tr>
            <td align="center" style="--bg-opacity: 1; background-color: #eceff1; background-color: rgba(236, 239, 241, var(--bg-opacity)); font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;" bgcolor="rgba(236, 239, 241, var(--bg-opacity))">
              <table class="sm-w-full" style="font-family: 'Montserrat',Arial,sans-serif; width: 600px;" width="600" cellpadding="0" cellspacing="0" role="presentation">
                <tbody><tr>
                </tr>
                <tr>
                  <td align="center" class="sm-px-24" style="font-family: 'Montserrat',Arial,sans-serif;">
                    <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                      <tbody><tr>
                        <td class="sm-px-24" style="--bg-opacity: 1; background-color: #ffffff; background-color: rgba(255, 255, 255, var(--bg-opacity)); border-radius: 4px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 14px; line-height: 24px; padding: 48px; text-align: left; --text-opacity: 1; color: #626262; color: rgba(98, 98, 98, var(--text-opacity));" bgcolor="rgba(255, 255, 255, var(--bg-opacity))" align="left">
                          <h3 style="font-weight: 700; font-size: 20px; margin-top: 0; color: #04246d;">AEROCOIN<br> IT'S NOT JUST ABOUT FLY</h3>
                          <p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">Hey</p>
                          <p class="text-primary" style="font-weight: 700; font-size: 20px; margin-top: 0; color: #04246d;">${usuario.first_name} ${usuario.last_name}</p>
                          <p class="sm-leading-32" style="font-weight: 600; font-size: 20px; margin: 0 0 16px; --text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity));">
                            Deposit Approve! <br> You´ve received ${total} ACN in your Wallet account
                          </p>
                          
                          <p class="card-text">If you don´t recognize this activity , please contact us inmmediately at: <a href="https://www.aerocoin.aero/suppor" class="text-primary">https://www.aerocoin.aero/support</a>.<br><br> Aerocoin Team.</p>

                          <table style="font-family: 'Montserrat',Arial,sans-serif;" cellpadding="0" cellspacing="0" role="presentation">
                          <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                            <tbody><tr>
                              <td style="font-family: 'Montserrat',Arial,sans-serif; padding-top: 32px; padding-bottom: 32px;">
                                <div style="--bg-opacity: 1; background-color: #eceff1; background-color: rgba(236, 239, 241, var(--bg-opacity)); height: 1px; line-height: 1px;"></div>
                              </td>
                            </tr>
                          </tbody></table>

                          <p class="text-center mt-2">
                            <span>This is an automated message, please do not reply</span>
                          </p> 

                          <p style="margin: 0 0 16px;">Thanks, <br>Aerocoin Team</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-family: 'Montserrat',Arial,sans-serif; height: 20px;" height="20"></td>
                      </tr>
                      <tr>
                        <td style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 12px; padding-left: 48px; padding-right: 48px; --text-opacity: 1; color: #eceff1; color: rgba(236, 239, 241, var(--text-opacity));">
                          <p align="center" style="cursor: default; margin-bottom: 16px;">
                            <a href="https://www.facebook.com/aero_coin" target="_blank" style="--text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity)); text-decoration: none;"><img src="https://1.bp.blogspot.com/-oIlDs9G4Hh0/X8ueda_RCwI/AAAAAAAAMtY/TCGqSTU-6nweFgD-lhtQRMgmEdxIqQskACLcBGAsYHQ/s852/facebook%2Blogo%2Bpng%2Bsin%2Bfondo%2B%25282%2529.png" width="17" alt="Facebook" style="border: 0; max-width: 100%; line-height: 100%; vertical-align: middle; margin-right: 12px;"></a>
                            
                            <a href="https://twitter.com/AEROCOIN_" target="_blank" style="--text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity)); text-decoration: none;"><img src="https://logodownload.org/wp-content/uploads/2014/09/twitter-logo-4.png" width="17" alt="Twitter" style="border: 0; max-width: 100%; line-height: 100%; vertical-align: middle; margin-right: 12px;"></a>
                            
                            <a href="https://www.instagram.com/AEROCOIN/" target="_blank" style="--text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity)); text-decoration: none;"><img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" width="17" alt="Instagram" style="border: 0; max-width: 100%; line-height: 100%; vertical-align: middle; margin-right: 12px;"></a>
                          </p>
                          <p style="--text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity));">
                            Use of our service and website is subject to our
                            <a href="https://www.aerocoin.aero/support" target="_blank" class="hover-underline" style="--text-opacity: 1; color: #04246d text-decoration: none;">Terms of Use</a> and
                            <a href="https://www.aerocoin.aero/support" target="_blank" class="hover-underline" style="--text-opacity: 1; color: #04246d; text-decoration: none;">Privacy Policy</a>.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-family: 'Montserrat',Arial,sans-serif; height: 16px;" height="16"></td>
                      </tr>
                    </tbody></table>
                  </td>
                </tr>
              </tbody></table>
            </td>
          </tr>
        </tbody></table>
      </div>
      </body>
  
    </html>`
  };
  // Enviamos el email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      let msg = "Error al enviar Mensaje";
      console.log(msg)
      return res.redirect("/error404/PYT-27");
      // res.send(500, err.message);
    } else {
      console.log("Email sent fine");
      let msg =
        "Se envio un email, con la informacion del deposito aprobado";
        return res.redirect("/depositsPasarelaAdmin/PASARELA");
      //  res.status(200).jsonp(req.body);
    }
  });
}

exports.depositoRechazado = async function (req, res) {
  let id = req.params.iduser; 

  const usuario = await Usuarios.findOne({ where: { id: id } });
  console.log(usuario.first_name)
  console.log("ENCONTRADO")
  // Definimos el transporter
  var transporter = nodemailer.createTransport({
    host: 'aerocoin.aero',
    port: 465,
    secure: true,
    auth: {
        user: 'no-reply@aerocoin.aero',
        pass: 's(byC-O;?@4!',
    }
  });
   // Definimos el email
   var mailOptions = {
    from: "no-reply@aerocoin.aero",
    to: usuario.email,
    subject: "Deposit Rejected - Aerocoin Team",
    text: "Deposit Rejected - Aerocoin Team",
    html: `
    <html>
      <head>	
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500;1,600" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"  /> 
        <link rel="stylesheet" type="text/css" href="../../../app-assets/vendors/css/vendors.min.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/vendors/css/charts/apexcharts.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/vendors/css/extensions/toastr.min.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/bootstrap.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/bootstrap-extended.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/colors.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/components.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/themes/dark-layout.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/themes/bordered-layout.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/themes/semi-dark-layout.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/core/menu/menu-types/vertical-menu.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/pages/dashboard-ecommerce.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/plugins/charts/chart-apex.css">
        <link rel="stylesheet" type="text/css" href="../../../app-assets/css/plugins/extensions/ext-component-toastr.css">
        <link rel="stylesheet" type="text/css" href="../../../assets/css/style.css">
      </head>
      <body style="font-family: 'Poppins', sans-serif; font-size: 1.4em;">

        <div role="article" aria-roledescription="email" aria-label="Verify Email Address" lang="en">
        <table style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tbody><tr>
            <td align="center" style="--bg-opacity: 1; background-color: #eceff1; background-color: rgba(236, 239, 241, var(--bg-opacity)); font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;" bgcolor="rgba(236, 239, 241, var(--bg-opacity))">
              <table class="sm-w-full" style="font-family: 'Montserrat',Arial,sans-serif; width: 600px;" width="600" cellpadding="0" cellspacing="0" role="presentation">
                <tbody><tr>
                </tr>
                <tr>
                  <td align="center" class="sm-px-24" style="font-family: 'Montserrat',Arial,sans-serif;">
                    <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                      <tbody><tr>
                        <td class="sm-px-24" style="--bg-opacity: 1; background-color: #ffffff; background-color: rgba(255, 255, 255, var(--bg-opacity)); border-radius: 4px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 14px; line-height: 24px; padding: 48px; text-align: left; --text-opacity: 1; color: #626262; color: rgba(98, 98, 98, var(--text-opacity));" bgcolor="rgba(255, 255, 255, var(--bg-opacity))" align="left">
                          <h3 style="font-weight: 700; font-size: 20px; margin-top: 0; color: #04246d;">AEROCOIN<br> IT'S NOT JUST ABOUT FLY</h3>
                          <p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">Hey</p>
                          <p class="text-primary" style="font-weight: 700; font-size: 20px; margin-top: 0; color: #04246d;">${usuario.first_name} ${usuario.last_name}</p>
                          <p class="sm-leading-32" style="font-weight: 600; font-size: 20px; margin: 0 0 16px; --text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity));">
                            Deposit Rejected! <br>  
                          </p>
                          
                          <p class="card-text">If you don´t recognize this activity , please contact us inmmediately at: <a href="https://www.aerocoin.aero/suppor" class="text-primary">https://www.aerocoin.aero/support</a>.<br><br> Aerocoin Team.</p>

                          <table style="font-family: 'Montserrat',Arial,sans-serif;" cellpadding="0" cellspacing="0" role="presentation">
                          <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                            <tbody><tr>
                              <td style="font-family: 'Montserrat',Arial,sans-serif; padding-top: 32px; padding-bottom: 32px;">
                                <div style="--bg-opacity: 1; background-color: #eceff1; background-color: rgba(236, 239, 241, var(--bg-opacity)); height: 1px; line-height: 1px;"></div>
                              </td>
                            </tr>
                          </tbody></table>

                          <p class="text-center mt-2">
                            <span>This is an automated message, please do not reply</span>
                          </p> 

                          <p style="margin: 0 0 16px;">Thanks, <br>Aerocoin Team</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-family: 'Montserrat',Arial,sans-serif; height: 20px;" height="20"></td>
                      </tr>
                      <tr>
                        <td style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 12px; padding-left: 48px; padding-right: 48px; --text-opacity: 1; color: #eceff1; color: rgba(236, 239, 241, var(--text-opacity));">
                          <p align="center" style="cursor: default; margin-bottom: 16px;">
                            <a href="https://www.facebook.com/aero_coin" target="_blank" style="--text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity)); text-decoration: none;"><img src="https://1.bp.blogspot.com/-oIlDs9G4Hh0/X8ueda_RCwI/AAAAAAAAMtY/TCGqSTU-6nweFgD-lhtQRMgmEdxIqQskACLcBGAsYHQ/s852/facebook%2Blogo%2Bpng%2Bsin%2Bfondo%2B%25282%2529.png" width="17" alt="Facebook" style="border: 0; max-width: 100%; line-height: 100%; vertical-align: middle; margin-right: 12px;"></a>
                            
                            <a href="https://twitter.com/AEROCOIN_" target="_blank" style="--text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity)); text-decoration: none;"><img src="https://logodownload.org/wp-content/uploads/2014/09/twitter-logo-4.png" width="17" alt="Twitter" style="border: 0; max-width: 100%; line-height: 100%; vertical-align: middle; margin-right: 12px;"></a>
                            
                            <a href="https://www.instagram.com/AEROCOIN/" target="_blank" style="--text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity)); text-decoration: none;"><img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" width="17" alt="Instagram" style="border: 0; max-width: 100%; line-height: 100%; vertical-align: middle; margin-right: 12px;"></a>
                          </p>
                          <p style="--text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity));">
                            Use of our service and website is subject to our
                            <a href="https://www.aerocoin.aero/support" target="_blank" class="hover-underline" style="--text-opacity: 1; color: #04246d text-decoration: none;">Terms of Use</a> and
                            <a href="https://www.aerocoin.aero/support" target="_blank" class="hover-underline" style="--text-opacity: 1; color: #04246d; text-decoration: none;">Privacy Policy</a>.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-family: 'Montserrat',Arial,sans-serif; height: 16px;" height="16"></td>
                      </tr>
                    </tbody></table>
                  </td>
                </tr>
              </tbody></table>
            </td>
          </tr>
        </tbody></table>
      </div>
      </body>
  
    </html>`
  };
  // Enviamos el email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      let msg = "Error al enviar Mensaje";
      console.log(msg)
      return res.redirect("/error404/PYT-27");
      // res.send(500, err.message);
    } else {
      console.log("Email sent fine");
      let msg =
        "Se envio un email, con la informacion del deposito rechazado";
        return res.redirect("/depositsPasarelaAdmin/PASARELA");
      //  res.status(200).jsonp(req.body);
    }
  });
}