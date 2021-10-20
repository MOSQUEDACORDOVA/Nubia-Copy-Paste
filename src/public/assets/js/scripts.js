(function (window, undefined) {
  'use strict';
  /*
  NOTE:
  ------
  PLACE HERE YOUR OWN JAVASCRIPT CODE IF NEEDED
  WE WILL RELEASE FUTURE UPDATES SO IN ORDER TO NOT OVERWRITE YOUR JAVASCRIPT CODE PLEASE CONSIDER WRITING YOUR SCRIPT HERE.  */
  const subirImagen = (event) => {
    const archivos = event.target.files;
    const data = new FormData();
console.log(archivos)
    data.append("archivo", archivos[0]);
    $("#loading").show()
    $("#info-drop").hide()
    
    $.ajax({
      url: '/create-file-gate/archivo',
      type: 'POST',
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      xhr: function () {        
          var xhr = $.ajaxSettings.xhr();
          xhr.upload.onprogress = function (event) {
              var perc = Math.round((event.loaded / event.total) * 100);
             // $("#nombreArchivoCalendario1").text(inputFile.name);
             
              $("#progressBar1").text(perc + '%');
              $("#progressBar1").css('width', perc + '%');
          };
          return xhr;
      },
      beforeSend: function (xhr) {
        //displayLoading()
          $("#progressBar1").text('0%');
          $("#progressBar1").css('width', '0%');
      },
      success: function (data, textStatus, jqXHR)
      {      
        $("#loading").hide()
          $("#progressBar1").addClass("progress-bar-success");
          $("#progressBar1").text('100% - Carga realizada');
          document.getElementById("resultado").innerHTML =
          "El archivo " + archivos[0].name + " se ha subido correctamente.";
        document.getElementById("profile_img_").value = archivos[0].name;
      },
      error: function (jqXHR, textStatus) { 
          $("#progressBar1").text('100% - Error al cargar el archivo');
          $("#progressBar1").removeClass("progress-bar-success");
          $("#progressBar1").addClass("progress-bar-danger");
      }
  });

  };
  const profileImg = document.getElementById("profile-img");
profileImg.addEventListener("change", (event) => {
      const file = profileImg.files[0];

      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/jpg"
      ) {
        alert("Elige un archivo válido (.png, .jpg, .jpeg)");
        return;
      }

      const reader = new FileReader();
     // reader.addEventListener("load", displayFileInfo);
      reader.readAsDataURL(file);
      console.log(file);
      subirImagen(event);
    });
})(window);
