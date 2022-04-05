const path = require('path');
class FileController
{
  subirArchivo = async (req, res, next) =>
  {
    const archivo = req.files.archivo;
    const fileName = archivo.name;
    var ubicacion = path.join(__dirname, '../../public/assets/uploads/' + fileName);
  
    try {
      archivo.mv(ubicacion, (error) => {
        if (error) {
          console.error(error);
          res.writeHead(500, {
            'Content-Type': 'application/json'
          });
          res.end(JSON.stringify({ status: 'error', message: error }));
            return;
          }
          return res.status(200).send({ status: 'bien', path: ubicacion, fileName: fileName });
       });
     } catch (e) {
       res.status(500).json({
         error: true,
         message: e.toString()
       });
     }
  }
}

module.exports = FileController;
