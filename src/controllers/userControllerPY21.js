// Crear usuario en la base de datos
exports.createUser = async (req, res) => {
    const { name_, email_, password, confirmPassword } = req.body;
    
    // La contraseña y cofirmar contraseña no son iguales
    if (password !== confirmPassword) {
      req.flash("error", "Las contraseñas no son iguales");
  
      return res.render("reg_admin", {
        pageName: "Registrate",
        dashboardPage: true,
        logo:true, 
        crea_usuario:true,
        messages: req.flash(),
      });
    }
    try {
      await Usuarios.create({
        name: name_, email: email_, password: password, tipo: 'Administrador'
      });
  
      res.redirect("/usuarios_a");
    } catch (err) {
      console.log(err);
      if (err.errors) {
        req.flash(
          "error",
          err.errors.map((error) => error.message)
        );
      } else {
        req.flash("error", "Error desconocido");
      }
      res.render("register", {
        dashboardPage: true,
        logo:true, 
        crea_usuario:true,
        messages: req.flash(),
      });
    }
  };