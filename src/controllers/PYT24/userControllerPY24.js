// Crear usuario en la base de datos
exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
      await Usuarios.create({
        username: username, email: email, password: password, type_user: 'Administrador'
      });
  
      res.redirect("/boardpresale");
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

// Cerrar sesión
exports.closeSesion = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login24/PYT-24");
  });
};