
exports.showLandingPage = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  
    res.render("home", {
          pageName: "Inicio",
          landingPage: true,
          home:true,
          msg,
          layout: false,
          modal_home:true
        });
         
};
