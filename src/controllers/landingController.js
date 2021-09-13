
exports.showLandingPage = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let hostname = req.headers.host
  console.log(hostname)
  let spliter = hostname.split('.')
  console.log(spliter)
  if (spliter[0]== "bwater") {
    res.redirect('/loginpy4')
  }else{
    res.render("home", {
          pageName: "Inicio",
          landingPage: true,
          home:true,
          msg,
          layout: false,
          modal_home:true
        });
  }
    
         
};
