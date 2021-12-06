
const nodemailer = require("nodemailer");
let fs = require("fs");
// email sender function
/*exports.sendEmail = function (req, res) {
  const { email } = req.body;
        // Definimos el transporter
        var transporter = nodemailer.createTransport({
            //host: "mail.smtp2go.com",
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: 'boryslopez1976@gmail.com',
                pass: 'realpasswordforaboveaccount'
            }
        });
        // Definimos el email
        var mailOptions = {
          from: "Backartist@backartist.com",
          to: email,
          subject: "Suscribción",
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
    const resetUrl = `https://${req.headers.host}/login/${token}`;
  
    const usuario = await Usuarios.findOne({ where: { email: mail } });
    console.log(usuario.name)
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
      host: "mail.smtp2go.com",
      port: 465,
      secure: true,
      auth: {
        user: "backartist",
        pass: "MnU3MzQ1Zm5pMjQw",
      },
    });
    // Definimos el email
    var mailOptions = {
      from: "Backartist@backartist.com",
      to: mail,
      subject: "Bienvenido a Backartist",
      text: "Bienvenido a backartist " + resetUrl,
      html: `<html>
      <head>	
      </head>
      <body style="font-family: 'Poppins', sans-serif; font-size: 1.4em;">
      <div style="width: 90%; margin-left: auto; margin-right: auto;">
        <div  style="font-weight: bold;display: inline-block; padding-top: .3125rem;padding-bottom: .3125rem; margin-right: 1rem;font-size: 1.25rem;   line-height: inherit;white-space: nowrap; "> 
          <img src="https://josea.mosquedacordova.com/assets/img/logo-ba.png" style="vertical-align: middle; border-style: none;" alt="..." width="70px" />Backartist
        </div>
              <div style="text-align: center"> 
                  <label style="font-size: 1.8rem;font-weight: bold;color: darkgoldenrod;"><i class="fas fa-exclamation-circle"></i> Hola <span>${usuario.name}<span> </label><br>
              </div>	
              <div style="text-align: left"> 
                  <p style="line-height: 1.5;">Bienvenido a la familia backartist.!</p>
                  <p style="line-height: 1.5;">Para finalizar tu registro, haz click en el siguiente botón, inicia tu sesión y comienza a compartir tus gates.
   </p>
              </div>	
              <div style="text-align: center"> 
                  <a style="color: white;border: none; font-size: 1em; border-radius: 15px; padding: 0.5em 1.5em;text-decoration:none; background-color:#dc3545" href="${resetUrl}">Validar Registro</a><br>
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
          "Se envio un email, para validar y confirmar su cuenta";
        res.redirect("/?msg=" + msg);
  
        //  res.status(200).jsonp(req.body);
      }
    });
};*/