/*function SepararGrupos(arr) {
    let gruposSeparados = [], desde0 = [], intensivos = [], kids = [];

    arr.forEach(item => {
        switch (item.nombre) {
            case "Desde cero":
                desde0.push(item);
                break;
            case "Intensivo":
                intensivos.push(item);
                break;
            case "Kids":
                kids.push(item);
                break;
        }
    });

    gruposSeparados.push(desde0)
    gruposSeparados.push(intensivos)
    gruposSeparados.push(kids)

    return gruposSeparados
}*/

/*function IdentificadorGrupos(arr, type) {
    let grupos = arr, tipoGrupo = type

    // * VARIABLES GENERALES
    let identificador, numGrupo = 1, numId = 100, numAño, inicio,  nivelCode, count = 0;

    if (tipoGrupo === "Desde cero") {
        for (let i = 0; i < grupos.length; i++) {
            const elemento = grupos[i];
            
            grupos.forEach(grupo => {
                let añoGrupo = moment(grupo.fecha_inicio, "DD-MM-YYYY").format('YY'),
                numAño = moment(grupo.fecha_inicio, 'DD-MM-YYYY').format('YY');
    
                if (numAño === añoGrupo) {
                    count++;
                }
            }); 
    
            numGrupo += count;
            
            nivelCode = NivelGrupos(elemento.name, elemento.fecha_inicio);
            numId += numGrupo;
            identificador += `${numId}-${nivelCode}`;
            Object.assign(elemento, identificador)
        }
        
    } else if (tipoGrupo === "Intensivo") {
        for (let i = 0; i < grupos.length; i++) {
            const elemento = grupos[i];
            
            grupos.forEach(grupo => {
                let añoGrupo = moment(grupo.fecha_inicio, "DD-MM-YYYY").format('YY'),
                numAño = moment(grupo.fecha_inicio, 'DD-MM-YYYY').format('YY');
    
                if (numAño === añoGrupo) {
                    count++;
                }
            }); 
    
            numGrupo += count;
            
            nivelCode = NivelGrupos(elemento.name, elemento.fecha_inicio);
            numId += numGrupo;
            identificador += `${numId}-${nivelCode}`;
            Object.assign(elemento, identificador)
        }
        
    } else {
        for (let i = 0; i < grupos.length; i++) {
            const elemento = grupos[i];
            
            grupos.forEach(grupo => {
                let añoGrupo = moment(grupo.fecha_inicio, "DD-MM-YYYY").format('YY'),
                numAño = moment(grupo.fecha_inicio, 'DD-MM-YYYY').format('YY');
    
                if (numAño === añoGrupo) {
                    count++;
                }
            }); 
    
            numGrupo += count;
            
            nivelCode = NivelGrupos(elemento.name, elemento.fecha_inicio);
            numId += numGrupo;
            identificador += `${numId}-${nivelCode}`;
            Object.assign(elemento, identificador)
        }
    }

    return grupos;
}*/

/*function NivelGrupos(nombre, fecha) {
    let inicioGrupo = fecha;
    let iniciado = moment(inicioGrupo, "DD-MM-YYYY").format('YYYY-MM-DD');

    let nivelActual, nivel2, nivel3, nivel4;
    switch (nombre) {
      case 'Desde cero':
        nivel2 = moment(iniciado).add(32, 'w').format('YYYY-MM-DD')
        nivel3 = moment(iniciado).add(64, 'w').format('YYYY-MM-DD')
        nivel4 = moment(iniciado).add(96, 'w').format('YYYY-MM-DD')
    
        console.log("DESDE CERO")
        
        if (moment().isBefore(nivel2)) {
            console.log("Estas en nivel 1")
            nivelActual = 1
        
        } else if (moment().isSameOrAfter(nivel2) && moment().isBefore(nivel3)) {
            console.log("Estas en nivel 2")
            nivelActual = 2
        
        } else if(moment().isSameOrAfter(nivel3) && moment().isBefore(nivel4)) {
            console.log("Estas en nivel 3")
            nivelActual = 3
        
        } else {
            console.log("Estas en nivel 4")
            nivelActual = 4
        }
        break;
        
        case 'Intensivo':
            nivel2 = moment(iniciado).add(16, 'w').format('YYYY-MM-DD')
            nivel3 = moment(iniciado).add(32, 'w').format('YYYY-MM-DD')
            nivel4 = moment(iniciado).add(48, 'w').format('YYYY-MM-DD')
            console.log("INTENSIVO")
            
            if (moment().isBefore(nivel2)) {
                console.log("Estas en nivel 1")
                nivelActual = 1
            
            } else if (moment().isSameOrAfter(nivel2) && moment().isBefore(nivel3)) {
                console.log("Estas en nivel 2")
                nivelActual = 2
            
            } else if(moment().isSameOrAfter(nivel3) && moment().isBefore(nivel4)) {
                console.log("Estas en nivel 3")
                nivelActual = 3
            
            } else {
                console.log("Estas en nivel 4")
                nivelActual = 4
            }
            
            case 'Kids':
                nivel2 = moment(iniciado).add(16, 'w').format('YYYY-MM-DD')
                nivel3 = moment(iniciado).add(32, 'w').format('YYYY-MM-DD')
                
                console.log("KIDS")
                
                if (moment().isBefore(nivel2)) {
                    console.log("Estas en nivel 1")
                    nivelActual = 1
                
                } else if (moment().isSameOrAfter(nivel2) && moment().isBefore(nivel3)) {
                    console.log("Estas en nivel 2")
                    nivelActual = 2
                
                } else if(moment().isSameOrAfter(nivel3)) {
                    console.log("Estas en nivel 3")
                    nivelActual = 3
                } 
      break;
    }
    
    return nivelActual;
}*/

// * CONTROL GRUPOS RES
$(document).ready(function () {
    let gruposTodos, usuarios, gruposDesde0, gruposIntensivo, gruposKids, gruposControl, lecc
  
    let matriculaGrupo = document.getElementById("matriculaGrupo").value;
    
    if (matriculaGrupo != "") {
      matriculaGrupo = JSON.parse(document.getElementById("matriculaGrupo").value);
  
    } else {
      matriculaGrupo = "";
    }
  
    function FetchData (num) {
      gruposTodos = fetch('/obtenerGruposAll')
          .then(response => response.json())
          .then(data => {
              gruposTodos = data;
  
              moment.locale('es');
              gruposTodos.forEach(item => {
                  let format = moment(item.fecha_inicio, "DD-MM-YYYY").format("D MMM YYYY");
                  $('#gruposMenu').append(`<option value="${item.id}">${item.identificador} - ${item.dia_horario} - ${format}</option>`);
                });
                $('#gruposMenu').trigger("change");
  
              return gruposTodos
          });
          
      gruposControl = fetch('/gruposControl')
          .then(response => response.json())
          .then(data => {
              gruposControl = data
              
              gruposControl.forEach(grupo => {
                let find = gruposTodos.filter(item => item.id === grupo.grupoId)
                //let format = moment(find[0].fecha_inicio, "DD-MM-YYYY").format("D MMM YYYY");
  
                if (find[0].nombre == "Desde cero") {
                  $('#gruposDesde0select').append(`<option value="${find[0].id}">${find[0].identificador}</option>`);
                  $('#gruposDesde0select').trigger("change");
                  
                } else if (find[0].nombre == "Intensivo") {
                  $('#gruposIntensivoSelect').append(`<option value="${find[0].id}">${find[0].identificador}</option>`);
                  $('#gruposIntensivoSelect').trigger("change");
                  
                } else if (find[0].nombre == "Kids") {
                  $('#gruposKidsSelect').append(`<option value="${find[0].id}">${find[0].identificador}</option>`);
                  $('#gruposKidsSelect').trigger("change");
                  
                }
  
              });
  
              return gruposControl
          });
  
  
      if (num === 1) {
          usuarios = fetch('/obtenerusuariospy672')
              .then(response => response.json())
              .then(data => {
                  usuarios = data.usuarios
                  DetectarGrupo();
                  return usuarios
              });
      }
    }
  
    FetchData(1)
  
    const EstablecerMatriculaPorLeccion = () => {
      let fragment = new DocumentFragment(),
      esContainer = document.getElementById("estudiantes");
      esContainer.innerHTML = "";
  
      matriculaGrupo.forEach((matricula) => {
        let div = document.createElement("div");
        div.classList.add("col-12");
        div.classList.add("item");
        let idAusentes = null;
  
        // * DETECTAR FILTRO DE GRUPOS
        if ($("#filtrosDesdeCero .select2.grupo").val() != "-" && $("#filtrosDesdeCero .select2.grupo").val() != NaN) {
          lecc = parseInt($("#filtrosDesdeCero .select2.leccion").val());
          
          $("#ausenteNumLeccion").val(parseInt($("#filtrosDesdeCero .select2.leccion").val()));
  
          $("#ausenteGrupoId").val(parseInt($("#filtrosDesdeCero .select2.grupo").val()));
  
        } else if ($("#filtrosIntensivo .select2.grupo").val() != "-" && $("#filtrosIntensivo .select2.grupo").val() != NaN) {
          lecc = parseInt($("#filtrosIntensivo .select2.leccion").val());
  
          $("#ausenteNumLeccion").val(parseInt($("#filtrosIntensivo .select2.leccion").val()));
  
          $("#ausenteGrupoId").val(parseInt($("#filtrosIntensivo .select2.grupo").val()));
  
        } else if($("#filtrosKids .select2.grupo").val() != "-" && $("#filtrosKids .select2.grupo").val() != NaN) {
          lecc = parseInt($("#filtrosKids .select2.leccion").val());
  
          $("#ausenteNumLeccion").val(parseInt($("#filtrosKids .select2.leccion").val()));
  
          $("#ausenteGrupoId").val(parseInt($("#filtrosKids .select2.grupo").val()));
  
        }
        console.log(lecc)
  
        $("#ausenteMatriculaId").val(matricula.id);
        let form = new FormData(document.getElementById("procesarAusente"));
        form.append("arr", $("#matriculaGrupo").val());
        form.append("nivel", $("#nivelActual").val());
  
        fetch("/obtenerMatriculaAusente", {
          method: "POST",
          body: form,
        })
          .then((response) => response.json())
          .then(async (data) => {
  
            console.log(data);
            console.log("DATA AUSENTE");
  
            let response = data.resp;
            let response2 = data.matricula;
            //console.log(response2)
  
            if (response.length) {
              idAusentes = response[0].matriculaId;
            }
            //console.log(idAusentes);
  
            let result = matriculaGrupo.filter(item => item.id === idAusentes);
  
            let calif = "",
              participacion = "",
              notas = 0,
              participacionPorcentaje = 0,
              usuarioCongelado = "",
              commentarioP = "",
              GcommentProfForm="",
              GcommentAdminForm="";
  
  
            if (response2.length) {
              response2.sort()
              /*console.log(response2)*/
              for (let i = 0; i < response2.length; i++) { 
                if (matricula.id === response2[i].id) {
                  /*GcommentProfForm = 'hi'
                  GcommentAdminForm = 'hi'*/
                 GcommentProfForm = response2[i].commentProfForm;
                  GcommentAdminForm = response2[i].commentAdminForm;
                }              
              }
              let nivelSeleccioando = $('#nivelActual').val()
              
              /*console.log(GcommentProfForm)*/
              let found;
              found = response2.filter(item => item.id === matricula.id)
  
              if (found) {
                let num = found[0].notas;
                notas = num;
                /*console.log(response2);
                console.log(notas);
                console.log("NOTAS");*/
              }
  
              participacionPorcentaje = response2[0].participacion;
              
            }
  
            let readonlyUse = "readonly"
            let disabledUse = "disabled"
            let readonlyUse0 = `style="pointer-events: none;"`
            
            if (
              lecc === 9 ||
              lecc === 17 ||
              lecc === 18 ||
              lecc === 25 ||
              lecc === 31 ||
              lecc === 32
            ) 
            {
              if (result.length) {
  
                /**OBTENER HISTORIAL DE CAJA */
                let historial = await fetch("/historia-caja-academy/" + matricula.id )
                  .then((response) => response.json())
                  .then((data) => {
                    /*console.log(data);*/
                    return data.obtener_historia;
                  });
                /*console.log(historial);*/
                for (let i = 0; i < historial.length; i++) {
                    let split_hist = historial[i]['concepto'].split(',')
                  if (split_hist.length > 1 && split_hist[0]=="Reposicion" && split_hist[1]==lecc) {
                      readonlyUse =""
                      readonlyUse0  = ""
                      disabledUse = ""
                  }
                }
                
                commentarioP = `<textarea class="form-control commentProf" id="comentP${matricula.id}" rows="1" placeholder="" data-id="${matricula.id}">${GcommentProfForm}</textarea>`
  
                if (matricula.estadoId != 5) {
                  calif = `
                        <div class="d-flex flex-column mb-1 me-1">
                            <p class="text-success"><b>Calificación</b></p>
                            <div class="d-flex align-items-center">
                                <button class="btn btn-icon btn-sm btn-primary bootstrap-touchspin-down btnCalificacionMenos caliMenos${matricula.id}" data-id="${matricula.id}" type="button" ${disabledUse}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus btnCalificacionMenos caliMenos${matricula.id}" ${readonlyUse0} data-id="${matricula.id}"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
    
                                <p class="h3 mb-0 mx-1"><input type="number" class="calificacion calific${matricula.id}" value="${notas}" min="0" max="100" ${readonlyUse}>%</p>
    
                                <button class="btn btn-icon btn-sm btn-primary bootstrap-touchspin-up btnCalificacionMas caliMas${matricula.id}" data-id="${matricula.id}" type="button" ${disabledUse}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus btnCalificacionMas caliMas${matricula.id}" data-id="${matricula.id}" ${readonlyUse0}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                            </div>
                        </div>`;
                } 
  
                // * CONGELADO
                /*if (matricula.estadoId === 5) {
                  calif = `
                        <div class="d-flex flex-column mb-1 me-1">
                            <p class="text-success"><b>Calificación</b></p>
                            <div class="d-flex align-items-center">
                                <button class="btn btn-icon btn-sm btn-primary bootstrap-touchspin-down btnCalificacionMenos caliMenos${matricula.id}" data-id="${matricula.id}" type="button" disabled><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus btnCalificacionMenos caliMenos${matricula.id}" ${readonlyUse0} data-id="${matricula.id}"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
    
                                <p class="h3 mb-0 mx-1"><input type="number" class="calificacion calific${matricula.id}" value="${notas}" min="0" max="100" ${readonlyUse}>%</p>
    
                                <button class="btn btn-icon btn-sm btn-primary bootstrap-touchspin-up btnCalificacionMas caliMas${matricula.id}" data-id="${matricula.id}" type="button" ${disabledUse} disabled><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus btnCalificacionMas caliMas${matricula.id}" data-id="${matricula.id}" ${readonlyUse0}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                            </div>
                        </div>`;
                  
                } else {
                  calif = `
                        <div class="d-flex flex-column mb-1 me-1">
                            <p class="text-success"><b>Calificación</b></p>
                            <div class="d-flex align-items-center">
                                <button class="btn btn-icon btn-sm btn-primary bootstrap-touchspin-down btnCalificacionMenos caliMenos${matricula.id}" data-id="${matricula.id}" type="button" ${disabledUse}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus btnCalificacionMenos caliMenos${matricula.id}" ${readonlyUse0} data-id="${matricula.id}"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
    
                                <p class="h3 mb-0 mx-1"><input type="number" class="calificacion calific${matricula.id}" value="${notas}" min="0" max="100" ${readonlyUse}>%</p>
    
                                <button class="btn btn-icon btn-sm btn-primary bootstrap-touchspin-up btnCalificacionMas caliMas${matricula.id}" data-id="${matricula.id}" type="button" ${disabledUse}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus btnCalificacionMas caliMas${matricula.id}" data-id="${matricula.id}" ${readonlyUse0}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                            </div>
                        </div>`;
                }*/
              
              } else {
                commentarioP = `<textarea class="form-control commentProf" id="comentP${matricula.id}" rows="1" placeholder="" data-id="${matricula.id}">${GcommentProfForm}</textarea>`
              
                if (matricula.estadoId != 5) {
                  calif = `
                        <div class="d-flex flex-column mb-1 me-1">
                            <p class="text-success"><b>Calificación</b></p>
                            <div class="d-flex align-items-center">
                                <button class="btn btn-icon btn-sm btn-primary bootstrap-touchspin-down btnCalificacionMenos caliMenos${matricula.id}" data-id="${matricula.id}" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus btnCalificacionMenos caliMenos${matricula.id}" data-id="${matricula.id}" style="pointer-events: none;"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
    
                                <p class="h3 mb-0 mx-1"><input type="number" class="calificacion calific${matricula.id}" value="${notas}" min="0" max="100">%</p>
    
                                <button class="btn btn-icon btn-sm btn-primary bootstrap-touchspin-up btnCalificacionMas caliMas${matricula.id}" data-id="${matricula.id}" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus btnCalificacionMas caliMas${matricula.id}" data-id="${matricula.id}" style="pointer-events: none;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                            </div>
                        </div>`;
                } 
  
              
                // * CONGELADO
                /*if (matricula.estadoId === 5) {
                  calif = `
                  <div class="d-flex flex-column mb-1 me-1">
                      <p class="text-success"><b>Calificación</b></p>
                      <div class="d-flex align-items-center">
                          <button class="btn btn-icon btn-sm btn-primary bootstrap-touchspin-down btnCalificacionMenos caliMenos${matricula.id}" data-id="${matricula.id}" type="button" disabled><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus btnCalificacionMenos caliMenos${matricula.id}" ${readonlyUse0} data-id="${matricula.id}"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
  
                          <p class="h3 mb-0 mx-1"><input type="number" class="calificacion calific${matricula.id}" value="${notas}" min="0" max="100" ${readonlyUse}>%</p>
  
                          <button class="btn btn-icon btn-sm btn-primary bootstrap-touchspin-up btnCalificacionMas caliMas${matricula.id}" data-id="${matricula.id}" type="button" ${disabledUse} disabled><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus btnCalificacionMas caliMas${matricula.id}" data-id="${matricula.id}" ${readonlyUse0}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                      </div>
                  </div>`;
                } else {
                  calif = `
                        <div class="d-flex flex-column mb-1 me-1">
                            <p class="text-success"><b>Calificación</b></p>
                            <div class="d-flex align-items-center">
                                <button class="btn btn-icon btn-sm btn-primary bootstrap-touchspin-down btnCalificacionMenos caliMenos${matricula.id}" data-id="${matricula.id}" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus btnCalificacionMenos caliMenos${matricula.id}" data-id="${matricula.id}" style="pointer-events: none;"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
    
                                <p class="h3 mb-0 mx-1"><input type="number" class="calificacion calific${matricula.id}" value="${notas}" min="0" max="100">%</p>
    
                                <button class="btn btn-icon btn-sm btn-primary bootstrap-touchspin-up btnCalificacionMas caliMas${matricula.id}" data-id="${matricula.id}" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus btnCalificacionMas caliMas${matricula.id}" data-id="${matricula.id}" style="pointer-events: none;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                            </div>
                        </div>`;
                  
                }*/
                
              }
  
              if (lecc === 32) {
                if (matricula.estadoId != 5) {
                  participacion = `
                            <div class="d-flex flex-column me-1">
                                <p class="text-success"><b>Participación</b></p>
                                <div class="d-flex align-items-center">
                                    <button class="btn btn-sm btn-icon btn-primary bootstrap-touchspin-down btnParticipacionMenos" data-id="${matricula.id}" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus" style="pointer-events: none;"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
  
                                    <p class="h3 mb-0 mx-1"><input type="number" class="participacion" value="${participacionPorcentaje}" min="0" max="100">%</p>
  
                                    <button class="btn btn-sm btn-icon btn-primary bootstrap-touchspin-up btnParticipacionMas" data-id="${matricula.id}" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus" style="pointer-events: none;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                                </div>
                            </div>
                            `;
                }
  
                // * CONGELADO
                /*if (matricula.estadoId === 5) {
                  participacion = `
                            <div class="d-flex flex-column me-1">
                                <p class="text-success"><b>Participación</b></p>
                                <div class="d-flex align-items-center">
                                    <button class="btn btn-sm btn-icon btn-primary bootstrap-touchspin-down btnParticipacionMenos" data-id="${matricula.id}" type="button" disabled><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus" style="pointer-events: none;"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
  
                                    <p class="h3 mb-0 mx-1"><input type="number" class="participacion" value="${participacionPorcentaje}" min="0" max="100" readonly>%</p>
  
                                    <button class="btn btn-sm btn-icon btn-primary bootstrap-touchspin-up btnParticipacionMas" data-id="${matricula.id}" type="button" disabled><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus" style="pointer-events: none;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                                </div>
                            </div>
                            `;
                  
                } else {
                  participacion = `
                            <div class="d-flex flex-column me-1">
                                <p class="text-success"><b>Participación</b></p>
                                <div class="d-flex align-items-center">
                                    <button class="btn btn-sm btn-icon btn-primary bootstrap-touchspin-down btnParticipacionMenos" data-id="${matricula.id}" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus" style="pointer-events: none;"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
  
                                    <p class="h3 mb-0 mx-1"><input type="number" class="participacion" value="${participacionPorcentaje}" min="0" max="100">%</p>
  
                                    <button class="btn btn-sm btn-icon btn-primary bootstrap-touchspin-up btnParticipacionMas" data-id="${matricula.id}" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus" style="pointer-events: none;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                                </div>
                            </div>
                            `;
                }*/
  
              }
            }
  
            if (result.length) { // * SI ESTA AUSENTE
              if (matricula.estadoId != 5) {
                div.innerHTML = `
                        <label class="card-title estudiante" hidden>${
                          matricula.nombre
                        }</label>
                            <div class="card card-statistics border-secondary" id="estudiante${
                              matricula.id
                            }">
                                <div class="row m-0 p-0">
                                    <div class="col-10 col-xl-11">
                                        <div class="row card-header p-1">
                                            <div class="col-12">
                                                <div class="d-flex flex-column flex-md-row justify-content-sm-between">
    
                                                    <div class="d-flex flex-row mb-1 mb-md-0 align-items-center">
                                                        <h1 class="me-1"><b>${
                                                          matricula.nombre
                                                        }</b></h1>
                                                        <h5><span class="badge badge-light-secondary">Ausente</span></h5>
                                                    </div>
                                                    <div class="d-flex flex-row">
                                                        ${calif}
    
                                                        ${participacion}
                                                    </div>
                                                </div>
                                            </div>
    
                                            <!--Area de comentarios-->
                                            <div class="row">
                                                <div class="col-6">
                                                    <div class="mb-1">
                                                        <label class="form-label" for="exampleFormControlTextarea1">Comentarios Profesor</label>
                                                        ${commentarioP}
                                                    </div>
                                                </div>
                                           
                                      
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div class="col-2 col-xl-1 p-0">
                                        <div class="box icon d-flex align-items-center justify-content-center h-100 btnAsistencia" role="button" data-id="${
                                          matricula.id
                                        }">
                                            ${feather.icons["user-check"].toSvg({
                                              class: "feather text-secondary check",
                                              style: "pointer-events: none;",
                                            })}
                                            ${feather.icons["user-minus"].toSvg({
                                              class:
                                                "feather text-success d-none uncheck",
                                              style: "pointer-events: none;",
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
              } 
              // * CONGELADO
              /*if (matricula.estadoId === 5) {
                div.innerHTML = `
                        <label class="card-title estudiante" hidden>${
                          matricula.nombre
                        }</label>
                            <div class="card card-statistics border-secondary" id="estudiante${
                              matricula.id
                            }">
                                <div class="row m-0 p-0">
                                    <div class="col-10 col-xl-11">
                                        <div class="row card-header p-1">
                                            <div class="col-12">
                                                <div class="d-flex flex-column flex-md-row justify-content-sm-between">
    
                                                    <div class="d-flex flex-row mb-1 mb-md-0 align-items-center">
                                                        <h1 class="me-1"><b>${
                                                          matricula.nombre
                                                        }</b></h1>
                                                        <h5><span class="badge badge-light-secondary">Ausente</span><span class="badge bg-dark">Congelado</span></h5>
                                                    </div>
                                                    <div class="d-flex flex-row">
                                                        ${calif}
    
                                                        ${participacion}
                                                    </div>
                                                </div>
                                            </div>
    
                                            <!--Area de comentarios-->
                                            <div class="row">
                                                <div class="col-6">
                                                    <div class="mb-1">
                                                        <label class="form-label" for="exampleFormControlTextarea1">Comentarios Profesor</label>
                                                        ${commentarioP}
                                                    </div>
                                                </div>
                                           
                                      
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div class="col-2 col-xl-1 p-0 d-none">
                                        <div class="box icon d-flex align-items-center justify-content-center h-100 btnAsistencia" style="pointer-events: none;" data-id="${
                                          matricula.id
                                        }">
                                            ${feather.icons["user-check"].toSvg({
                                              class: "feather text-secondary check",
                                              style: "pointer-events: none;",
                                            })}
                                            ${feather.icons["user-minus"].toSvg({
                                              class:
                                                "feather text-success d-none uncheck",
                                              style: "pointer-events: none;",
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                
              } else {
                div.innerHTML = `
                        <label class="card-title estudiante" hidden>${
                          matricula.nombre
                        }</label>
                            <div class="card card-statistics border-secondary" id="estudiante${
                              matricula.id
                            }">
                                <div class="row m-0 p-0">
                                    <div class="col-10 col-xl-11">
                                        <div class="row card-header p-1">
                                            <div class="col-12">
                                                <div class="d-flex flex-column flex-md-row justify-content-sm-between">
    
                                                    <div class="d-flex flex-row mb-1 mb-md-0 align-items-center">
                                                        <h1 class="me-1"><b>${
                                                          matricula.nombre
                                                        }</b></h1>
                                                        <h5><span class="badge badge-light-secondary">Ausente</span></h5>
                                                    </div>
                                                    <div class="d-flex flex-row">
                                                        ${calif}
    
                                                        ${participacion}
                                                    </div>
                                                </div>
                                            </div>
    
                                            <!--Area de comentarios-->
                                            <div class="row">
                                                <div class="col-6">
                                                    <div class="mb-1">
                                                        <label class="form-label" for="exampleFormControlTextarea1">Comentarios Profesor</label>
                                                        ${commentarioP}
                                                    </div>
                                                </div>
                                           
                                      
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div class="col-2 col-xl-1 p-0">
                                        <div class="box icon d-flex align-items-center justify-content-center h-100 btnAsistencia" role="button" data-id="${
                                          matricula.id
                                        }">
                                            ${feather.icons["user-check"].toSvg({
                                              class: "feather text-secondary check",
                                              style: "pointer-events: none;",
                                            })}
                                            ${feather.icons["user-minus"].toSvg({
                                              class:
                                                "feather text-success d-none uncheck",
                                              style: "pointer-events: none;",
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
  
              }*/
  
            } else { // * SI ESTA PRESENTE
              commentarioP = `<textarea class="form-control commentProf" id="comentP${matricula.id}" rows="1" placeholder="" data-id="${matricula.id}">${GcommentProfForm}</textarea>`
              
              if (matricula.estadoId != 5) {
                div.innerHTML = `
                        <label class="card-title estudiante" hidden>${
                          matricula.nombre
                        }</label>
                            <div class="card card-statistics border-success" id="estudiante${
                              matricula.id
                            }">
                                <div class="row m-0 p-0">
                                    <div class="col-10 col-xl-11">
                                        <div class="row card-header p-1">
                                            <div class="col-12">
                                                <div class="d-flex flex-column flex-md-row justify-content-sm-between">
                                                    
                                                    <div class="d-flex flex-row mb-1 mb-md-0 align-items-center">
                                                        <h1 class="me-1"><b>${
                                                          matricula.nombre
                                                        }</b></h1>
                                                        <h5><span class="badge badge-light-success">Presente</span></h5>
                                                    </div>
    
                                                    <div class="d-flex flex-row">
                                                        ${calif}
    
                                                        ${participacion}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <!--Area de comentarios-->
                                            <div class="row">
                                                <div class="col-6">
                                                    <div class="mb-1">
                                                        <label class="form-label" for="exampleFormControlTextarea1">Comentarios Profesor</label>
                                                        ${commentarioP}
                                                    </div>
                                                </div>
                                           
                                      
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div class="col-2 col-xl-1 p-0">
                                        <div class="box icon d-flex align-items-center justify-content-center h-100 btnAsistencia" role="button" data-id="${
                                          matricula.id
                                        }">
                                            ${feather.icons["user-check"].toSvg({
                                              class:
                                                "feather text-secondary d-none check",
                                              style: "pointer-events: none;",
                                            })}
                                            ${feather.icons["user-minus"].toSvg({
                                              class: "feather text-success uncheck",
                                              style: "pointer-events: none;",
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
              }
              
              // * CONGELADO
              /*if (matricula.estadoId === 5) {
                commentarioP = `<textarea class="form-control commentProf" id="comentP${matricula.id}" rows="1" placeholder="" data-id="${matricula.id}" disabled>${GcommentProfForm}</textarea>`
  
                div.innerHTML = `
                        <label class="card-title estudiante" hidden>${
                          matricula.nombre
                        }</label>
                            <div class="card card-statistics border-secondary" id="estudiante${
                              matricula.id
                            }">
                                <div class="row m-0 p-0">
                                    <div class="col-10 col-xl-11">
                                        <div class="row card-header p-1">
                                            <div class="col-12">
                                                <div class="d-flex flex-column flex-md-row justify-content-sm-between">
                                                    
                                                    <div class="d-flex flex-row mb-1 mb-md-0 align-items-center">
                                                        <h1 class="me-1"><b>${
                                                          matricula.nombre
                                                        }</b></h1>
                                                        <h5><span class="badge badge-light-success">Presente</span><span class="badge bg-dark">Congelado</span></h5>
                                                    </div>
    
                                                    <div class="d-flex flex-row">
                                                        ${calif}
    
                                                        ${participacion}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <!--Area de comentarios-->
                                            <div class="row">
                                                <div class="col-6">
                                                    <div class="mb-1">
                                                        <label class="form-label" for="exampleFormControlTextarea1">Comentarios Profesor</label>
                                                        ${commentarioP}
                                                    </div>
                                                </div>
                                           
                                      
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div class="col-2 col-xl-1 p-0 d-none">
                                        <div class="box icon d-flex align-items-center justify-content-center h-100 btnAsistencia" style: "pointer-events: none;">
                                            ${feather.icons["user-check"].toSvg({
                                              class:
                                                "feather text-secondary d-none check",
                                              style: "pointer-events: none;",
                                            })}
                                            ${feather.icons["user-minus"].toSvg({
                                              class: "feather text-success uncheck",
                                              style: "pointer-events: none;",
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
  
              } else {
                div.innerHTML = `
                        <label class="card-title estudiante" hidden>${
                          matricula.nombre
                        }</label>
                            <div class="card card-statistics border-success" id="estudiante${
                              matricula.id
                            }">
                                <div class="row m-0 p-0">
                                    <div class="col-10 col-xl-11">
                                        <div class="row card-header p-1">
                                            <div class="col-12">
                                                <div class="d-flex flex-column flex-md-row justify-content-sm-between">
                                                    
                                                    <div class="d-flex flex-row mb-1 mb-md-0 align-items-center">
                                                        <h1 class="me-1"><b>${
                                                          matricula.nombre
                                                        }</b></h1>
                                                        <h5><span class="badge badge-light-success">Presente</span></h5>
                                                    </div>
    
                                                    <div class="d-flex flex-row">
                                                        ${calif}
    
                                                        ${participacion}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <!--Area de comentarios-->
                                            <div class="row">
                                                <div class="col-6">
                                                    <div class="mb-1">
                                                        <label class="form-label" for="exampleFormControlTextarea1">Comentarios Profesor</label>
                                                        ${commentarioP}
                                                    </div>
                                                </div>
                                           
                                      
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div class="col-2 col-xl-1 p-0">
                                        <div class="box icon d-flex align-items-center justify-content-center h-100 btnAsistencia" role="button" data-id="${
                                          matricula.id
                                        }">
                                            ${feather.icons["user-check"].toSvg({
                                              class:
                                                "feather text-secondary d-none check",
                                              style: "pointer-events: none;",
                                            })}
                                            ${feather.icons["user-minus"].toSvg({
                                              class: "feather text-success uncheck",
                                              style: "pointer-events: none;",
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
  
              }*/
            }
          });
  
        fragment.appendChild(div);
      });
  
      esContainer.appendChild(fragment);
    };
  
    let checkDesde0 = document.getElementById("inlineRadio3"),
    checkIntensivo = document.getElementById("inlineRadio4"),
    checkKids = document.getElementById("inlineRadio5"),
    filtrosDesdeCero = document.getElementById("filtrosDesdeCero"),
    selectDesdeCero = document.querySelector("#filtrosDesdeCero select.grupo"),
    filtrosIntensivo = document.getElementById("filtrosIntensivo"),
    selectIntensivo = document.querySelector("#filtrosIntensivo select.grupo"),
    filtrosKids = document.getElementById("filtrosKids"),
    selectKids = document.querySelector("#filtrosKids select.grupo"),
    grupoForm = document.getElementById("grupoForm"),
    grupoFormInput = document.querySelector("#grupoForm input.grupoId");
  
    checkDesde0.addEventListener("change", (e) => {
      if (checkDesde0.checked === true) {
        filtrosDesdeCero.classList.remove("d-none");
        filtrosKids.classList.add("d-none");
        filtrosIntensivo.classList.add("d-none");
      }
    });
  
    function DetectarGrupo() {
      if ($("#grupoId").val() != "") {
        let arr = Object.values(selectDesdeCero.options),
        arr2 = Object.values(selectIntensivo.options),
        arr3 = Object.values(selectKids.options);
    
        let nivel;
          
        arr.forEach((item) => {
          if (item.value === $("#grupoId").val()) {
            $("#filtrosDesdeCero select.grupo").val($("#grupoId").val());
            $("#filtrosDesdeCero select.grupo").trigger("change");
    
            $("#filtrosDesdeCero select.leccion").val($("#numeroLeccion").val());
            $("#filtrosDesdeCero select.leccion").trigger("change");
    
            let numLecciones = parseInt($("#numeroLeccion").val());
            for (i = 0; i <= numLecciones; i++) {
              $("#filtrosDesdeCero select.leccion")[0].options[i].disabled = false;
            }
    
            // * DETECTAR NIVEL
            nivel = parseInt($("#nivelActual").val())
            for (let index = 0; index < nivel; index++) {
              $("#filtrosDesdeCero select.nivel")[0].options[index].disabled = false;
            }
            
            $("#filtrosDesdeCero select.nivel").val($("#nivelActual").val());
            $("#filtrosDesdeCero select.nivel").trigger("change");
          }
        });
    
        arr2.forEach((item) => {
          if (item.value === $("#grupoId").val()) {
            $("#filtrosIntensivo select.grupo").val($("#grupoId").val());
            $("#filtrosIntensivo select.grupo").trigger("change");
    
            $("#filtrosIntensivo select.leccion").val($("#numeroLeccion").val());
            $("#filtrosIntensivo select.leccion").trigger("change");
            
            let numLecciones = parseInt($("#numeroLeccion").val());
            for (i = 0; i <= numLecciones; i++) {
              $("#filtrosIntensivo select.leccion")[0].options[i].disabled = false;
            }
            
            // * DETECTAR NIVEL
            nivel = parseInt($("#nivelActual").val())
            for (let index = 0; index < nivel; index++) {
              $("#filtrosIntensivo select.nivel")[0].options[index].disabled = false;
            }
    
            $("#filtrosIntensivo select.nivel").val($("#nivelActual").val());
            $("#filtrosIntensivo select.nivel").trigger("change");
    
            checkDesde0.checked = false;
            checkIntensivo.checked = true;
            checkKids.checked = false;
            filtrosIntensivo.classList.remove("d-none");
            filtrosKids.classList.add("d-none");
            filtrosDesdeCero.classList.add("d-none");
          }
        });
    
        arr3.forEach((item) => {
          if (item.value === $("#grupoId").val()) {
            $("#filtrosKids select.grupo").val($("#grupoId").val());
            $("#filtrosKids select.grupo").trigger("change");
            
            $("#filtrosKids select.leccion").val($("#numeroLeccion").val());
            $("#filtrosKids select.leccion").trigger("change");
    
            let numLecciones = parseInt($("#numeroLeccion").val());
            for (i = 0; i <= numLecciones; i++) {
              $("#filtrosKids select.leccion")[0].options[i].disabled = false;
            }
            // * DETECTAR NIVEL
            nivel = parseInt($("#nivelActual").val())
            for (let index = 0; index < nivel; index++) {
              $("#filtrosKids select.nivel")[0].options[index].disabled = false;
            }
    
            $("#filtrosKids select.nivel").val($("#nivelActual").val());
            $("#filtrosKids select.nivel").trigger("change");
    
            checkDesde0.checked = false;
            checkIntensivo.checked = false;
            checkKids.checked = true;
            filtrosIntensivo.classList.add("d-none");
            filtrosDesdeCero.classList.add("d-none");
            filtrosKids.classList.remove("d-none");
          }
        });
  
        // * DETECTAR FILTRO DE GRUPOS
        if ($("#filtrosDesdeCero .select2.grupo").val() != "-" && parseInt($("#filtrosDesdeCero .select2.grupo").val())) {
          lecc = $("#filtrosDesdeCero .select2.leccion").val();
          $("#filtrosDesdeCero .select2.leccion").trigger('change');
          
          $("#ausenteNumLeccion").val($("#filtrosDesdeCero .select2.leccion").val());
  
          $("#ausenteGrupoId").val($("#filtrosDesdeCero .select2.grupo").val());
  
        } else if ($("#filtrosIntensivo .select2.grupo").val() != "-" && parseInt($("#filtrosIntensivo .select2.grupo").val())) {
          lecc = $("#filtrosIntensivo .select2.leccion").val();
          $("#filtrosIntensivo .select2.leccion").trigger('change');
  
          $("#ausenteNumLeccion").val($("#filtrosIntensivo .select2.leccion").val());
  
          $("#ausenteGrupoId").val($("#filtrosIntensivo .select2.grupo").val());
  
        } else if($("#filtrosKids .select2.grupo").val() != "-" && parseInt($("#filtrosKids .select2.grupo").val())) {
          lecc = $("#filtrosKids .select2.leccion").val();
  
          $("#ausenteNumLeccion").val($("#filtrosKids .select2.leccion").val());
          $("#filtrosKids .select2.leccion").trigger('change');
  
          $("#ausenteGrupoId").val($("#filtrosKids .select2.grupo").val());
  
        }
  
        if (matriculaGrupo != "") {
          let docListo = setInterval(() => {
            if (document.readyState === "complete") {
              EstablecerMatriculaPorLeccion();
              clearInterval(docListo);
            }
          }, 1000);
        }
      }  
    }
    
    $("#filtrosDesdeCero .select2.grupo").on("select2:select", function (e) {
      let select = selectDesdeCero.options[selectDesdeCero.selectedIndex].value;
      let data = e.params.data;
      let id = data.id;
      //console.log(data);
  
      grupoFormInput.value = select;
      grupoForm.action = `/controlgrupo/PYT-672/${id}`;
      grupoForm.submit();
    });
  
    checkIntensivo.addEventListener("change", (e) => {
      if (checkIntensivo.checked === true) {
        filtrosIntensivo.classList.remove("d-none");
        filtrosKids.classList.add("d-none");
        filtrosDesdeCero.classList.add("d-none");
      }
    });
  
    $("#filtrosIntensivo .select2.grupo").on("select2:select", function (e) {
      let select = selectDesdeCero.options[selectDesdeCero.selectedIndex].value;
      let data = e.params.data;
      let id = data.id;
  
      grupoFormInput.value = select;
      grupoForm.action = `/controlgrupo/PYT-672/${id}`;
      grupoForm.submit();
    });
  
    checkKids.addEventListener("change", (e) => {
      if (checkKids.checked === true) {
        filtrosDesdeCero.classList.add("d-none");
        filtrosIntensivo.classList.add("d-none");
        filtrosKids.classList.remove("d-none");
      }
    });
  
    $("#filtrosKids .select2.grupo").on("select2:select", function (e) {
      let select = selectKids.options[selectKids.selectedIndex].value;
      let data = e.params.data;
      let id = data.id;
      //console.log(data);
  
      grupoFormInput.value = select;
      grupoForm.action = `/controlgrupo/PYT-672/${id}`;
      grupoForm.submit();
    });
  
    let guardarNota;
  
    function guardarNotas(id, calif) {
      guardarNota = setTimeout(() => {
        let nota = document.querySelector("#procesarNotas .nota"),
        leccion = document.querySelector("#procesarNotas .leccion"),
        grupo = document.querySelector("#procesarNotas .grupo"),
        matricula = document.querySelector("#procesarNotas .matricula"),
        nivel = document.querySelector('#procesarNotas .nivel');
  
        nota.value = calif;
        leccion.value = $("#numeroLeccion").val();
        grupo.value = $("#grupoId").val();
        matricula.value = id;
  
        if ($("#filtrosDesdeCero .select2.grupo").val() != "-") {
          leccion.value = parseInt($("#filtrosDesdeCero .select2.leccion").val());
          nivel.value = parseInt($("#filtrosDesdeCero .select2.nivel").val());
          
        } else if ($("#filtrosIntensivo .select2.leccion").val() != "-") {
          leccion.value = parseInt($("#filtrosIntensivo .select2.leccion").val());
          nivel.value = parseInt($("#filtrosIntensivo .select2.nivel").val());
          
        } else {
          leccion.value = parseInt($("#filtrosKids .select2.leccion").val());
          nivel.value = parseInt($("#filtrosKids .select2.nivel").val());
  
        }
  
        let form = new FormData(document.getElementById("procesarNotas"));
  
        fetch("/registrarNotas", {
          method: "POST",
          body: form,
        })
          .then((response) => {
            if (response.ok) {
              Toast("Nota");
            } else {
              Toast("Error");
            }
            console.log(response)
          })
          .then((data) => console.log(data));
  
        clearTimeout(guardarNota);
      }, 2000);
    }
    let guardaCommentProf;
  
    function guardaCommentProfs(id, comentP, calif) {
      guardaCommentProf = setTimeout(() => {
        let nota = document.querySelector("#procesarNotas .nota"),
          leccion = document.querySelector("#procesarNotas .leccion"),
          grupo = document.querySelector("#procesarNotas .grupo"),
          commentProfForm = document.querySelector("#procesarNotas .commentProfForm")
          commentAdminForm = document.querySelector("#procesarNotas .commentAdminForm"),
          matricula = document.querySelector("#procesarNotas .matricula");
  
        nota.value = calif
        commentProfForm.value = comentP;
        commentAdminForm.value = $(`#comentA${id}`).val()
        leccion.value = $("#numeroLeccion").val();
        grupo.value = $("#grupoId").val();
        matricula.value = id;
  
        if ($("#filtrosDesdeCero .select2.grupo").val() != "-") {
          leccion.value = parseInt($("#filtrosDesdeCero .select2.leccion").val());
        } else if ($("#filtrosIntensivo .select2.grupo").val() != "-") {
          leccion.value = parseInt($("#filtrosIntensivo .select2.leccion").val());
        } else {
          leccion.value = parseInt($("#filtrosKids .select2.leccion").val());
        }
  
        let form = new FormData(document.getElementById("procesarNotas"));
  
        fetch("/registrarNotas", {
          method: "POST",
          body: form,
        })
          .then((response) => {
            response.json();
            if (response.ok) {
              Toast("ComentarioProf");
            } else {
              Toast("Error");
            }
            console.log(response)
          })
          .then((data) => console.log(data));
  
        clearTimeout(guardaCommentProf);
      }, 2000);
    }
  
    let guardaCommentAdmin;
  
    function guardaCommentAdmins(id, comentA, calif) {
      guardaCommentAdmin = setTimeout(() => {
        let nota = document.querySelector("#procesarNotas .nota"),
          leccion = document.querySelector("#procesarNotas .leccion"),
          grupo = document.querySelector("#procesarNotas .grupo"),
          commentAdminForm = document.querySelector("#procesarNotas .commentAdminForm"),
          commentProfForm = document.querySelector("#procesarNotas .commentProfForm"),
          matricula = document.querySelector("#procesarNotas .matricula");
  
        nota.value = calif;
        commentAdminForm.value = comentA;
        commentProfForm.value=$(`#comentP${id}`).val()
        leccion.value = $("#numeroLeccion").val();
        grupo.value = $("#grupoId").val();
        matricula.value = id;
  
        if ($("#filtrosDesdeCero .select2.grupo").val() != "-") {
          leccion.value = parseInt($("#filtrosDesdeCero .select2.leccion").val());
        } else if ($("#filtrosIntensivo .select2.grupo").val() != "-") {
          leccion.value = parseInt($("#filtrosIntensivo .select2.leccion").val());
        } else {
          leccion.value = parseInt($("#filtrosKids .select2.leccion").val());
        }
  
        let form = new FormData(document.getElementById("procesarNotas"));
  
        fetch("/registrarNotas", {
          method: "POST",
          body: form,
        })
          .then((response) => {
            response.json();
            if (response.ok) {
              Toast("Nota");
            } else {
              Toast("Error");
            }
            console.log(response)
          })
          .then((data) => console.log(data));
  
        clearTimeout(guardaCommentAdmin);
      }, 2000);
    }
  
    let guardarParticip;
  
    function guardarParticipacion(id, part) {
      guardarParticip = setTimeout(() => {
        let porcentaje = document.querySelector(
            "#procesarParticipacion .porcentaje"
          ),
          leccion = document.querySelector("#procesarParticipacion .leccion"),
          grupo = document.querySelector("#procesarParticipacion .grupo"),
          matricula = document.querySelector("#procesarParticipacion .matricula");
  
        porcentaje.value = part;
        leccion.value = $("#numeroLeccion").val();
        grupo.value = $("#grupoId").val();
        matricula.value = id;
  
        if ($("#filtrosDesdeCero .select2.grupo").val() != "-") {
          leccion.value = parseInt($("#filtrosDesdeCero .select2.leccion").val());
        } else if ($("#filtrosIntensivo .select2.grupo").val() != "-") {
          leccion.value = parseInt($("#filtrosIntensivo .select2.leccion").val());
        } else {
          leccion.value = parseInt($("#filtrosKids .select2.leccion").val());
        }
  
        let form = new FormData(document.getElementById("procesarParticipacion"));
  
        fetch("/registrarParticipacion", {
          method: "POST",
          body: form,
        })
          .then((response) => {
            response.json();
            if (response.ok) {
              Toast("Participacion");
            } else {
              Toast("Error");
            }
          })
          .then((data) => {
            //console.log(data)
          });
  
        clearTimeout(guardarParticip);
      }, 2000);
    }
  
    let controlEstudiantes = document.getElementById("estudiantes");
  
    controlEstudiantes.addEventListener("click", (e) => {
      if (e.target.classList.contains("btnAsistencia")) {
        let target = e.target.getAttribute("data-id");
        let est = document.getElementById(`estudiante${target}`);
        let checkBtn = document.querySelector(`#estudiante${target} .check`),
          unCheckBtn = document.querySelector(`#estudiante${target} .uncheck`),
          badge = document.querySelector(`#estudiante${target} .badge`);
  
        est.classList.toggle("border-success");
        est.classList.toggle("border-secondary");
        checkBtn.classList.toggle("d-none");
        unCheckBtn.classList.toggle("d-none");
        badge.classList.toggle("badge-light-success");
        badge.classList.toggle("badge-light-secondary");
        if (badge.classList.contains("badge-light-success")) {
          badge.innerText = "Presente";
          $(`.caliMenos${target}`).removeAttr("disabled");
          $(`.calific${target}`).removeAttr("readonly");
          $(`.caliMas${target}`).removeAttr("disabled");
          EliminarMatriculaAusente(target);
        } else {
          badge.innerText = "Ausente";
          //caliMenos
          //calific
          //caliMas
          console.log($(`.calific${target}`).val());
          $(`.caliMenos${target}`).attr("disabled", true);
          $(`.calific${target}`).val(0);
          $(`.calific${target}`).attr("readonly", true);
          $(`.caliMas${target}`).attr("disabled", true);
          clearTimeout(guardarNota);
          guardarNotas(target, $(`.calific${target}`).val());
          GuardarMatriculaAusente(target);
        }
      } else if (e.target.classList.contains("btnCalificacionMas")) {
        let target = e.target.getAttribute("data-id");
        let calificacion = document.querySelector(
          `#estudiante${target} .calificacion`
        );
        if (parseInt(calificacion.value) >= 15) {
          calificacion.value = 15;
        } else {
          calificacion.value++;
        }
        clearTimeout(guardarNota);
        guardarNotas(target, calificacion.value);
      } else if (e.target.classList.contains("btnCalificacionMenos")) {
        let target = e.target.getAttribute("data-id");
        let calificacion = document.querySelector(
          `#estudiante${target} .calificacion`
        );
        if (parseInt(calificacion.value) <= 0) {
          calificacion.value = 0;
        } else {
          calificacion.value--;
        }
        clearTimeout(guardarNota);
        guardarNotas(target, calificacion.value);
      } else if (e.target.classList.contains("btnParticipacionMas")) {
        let target = e.target.getAttribute("data-id");
        let participacion = document.querySelector(
          `#estudiante${target} .participacion`
        );
        if (parseInt(participacion.value) >= 10) {
          participacion.value = 10;
        } else {
          participacion.value++;
        }
        clearTimeout(guardarParticip);
        guardarParticipacion(target, participacion.value);
      } else if (e.target.classList.contains("btnParticipacionMenos")) {
        let target = e.target.getAttribute("data-id");
        let participacion = document.querySelector(
          `#estudiante${target} .participacion`
        );
        if (parseInt(participacion.value) <= 0) {
          participacion.value = 0;
        } else {
          participacion.value--;
        }
        clearTimeout(guardarParticip);
        guardarParticipacion(target, participacion.value);
      }
    });
  
    controlEstudiantes.addEventListener("change", (e) => {
        console.log(e.target.classList)
      if (e.target.classList.contains("commentProf")) {
        let target = e.target.getAttribute("data-id");
        let valor = e.target.value
        let calificacion = document.querySelector(
          `#estudiante${target} .calificacion`
        );
       console.log(target)
       console.log(calificacion)
       clearTimeout(guardaCommentProf);
       if (calificacion == null) {
         guardaCommentProfs(target, valor,'0');
       }else{
         guardaCommentProfs(target, valor,calificacion.value);
       }
       
    }else  if (e.target.classList.contains("commentAdmin")) {
      let target = e.target.getAttribute("data-id");
      let valor = e.target.value
      let calificacion = document.querySelector(
        `#estudiante${target} .calificacion`
      );
     console.log(target)
     console.log(valor)
     clearTimeout(guardaCommentAdmin);
     if (calificacion == null) {
       guardaCommentAdmins(target, valor,'0');
     }else{
       guardaCommentAdmins(target, valor,calificacion.value);
     }
  }
    });
  
    // * ACTIVAR FILTROS POR LECCION
    $("#filtrosDesdeCero select.leccion").on("change", (e) => {
      EstablecerMatriculaPorLeccion();
    });
  
    $("#filtrosIntensivo select.leccion").on("change", (e) => {
      EstablecerMatriculaPorLeccion();
    });
  
    $("#filtrosKids select.leccion").on("change", (e) => {
      EstablecerMatriculaPorLeccion();
    });
  
    const GuardarMatriculaAusente = (id) => {
      if ($("#filtrosDesdeCero .select2.grupo").val() != "-") {
        $("#ausenteNumLeccion").val(
          $("#filtrosDesdeCero .select2.leccion").val()
        );
        $("#ausenteGrupoId").val($("#filtrosDesdeCero .select2.grupo").val());
  
      } else if ($("#filtrosIntensivo .select2.grupo").val() != "-") {
        $("#ausenteNumLeccion").val(
          $("#filtrosIntensivo .select2.leccion").val()
        );
        $("#ausenteGrupoId").val($("#filtrosIntensivo .select2.grupo").val());
        
      } else {
        $("#ausenteNumLeccion").val(
          $("#filtrosKids .select2.leccion").val()
        );
        $("#ausenteGrupoId").val($("#filtrosKids .select2.grupo").val());
  
      }
      $("#ausenteMatriculaId").val(id);
      /*console.log($('#filtrosDesdeCero .select2.grupo').val())
          console.log($('#filtrosIntensivo .select2.grupo').val())*/
  
      let form = new FormData(document.getElementById("procesarAusente"));
  
      fetch("/registrarMatriculaAusente", {
        method: "POST",
        body: form,
      })
        .then((response) => {
          response.json();
          if (response.ok) {
            Toast("Asistencia");
          } else {
            Toast("Error");
          }
        })
        .then((data) => console.log(data));
    };
  
    const EliminarMatriculaAusente = (id) => {
      if ($("#filtrosDesdeCero .select2.grupo").val() != "-") {
        $("#ausenteNumLeccion").val(
          $("#filtrosDesdeCero .select2.leccion").val()
        );
        $("#ausenteGrupoId").val($("#filtrosDesdeCero .select2.grupo").val());
  
      } else if ($("#filtrosIntensivo .select2.grupo").val() != "-") {
        $("#ausenteNumLeccion").val(
          $("#filtrosIntensivo .select2.leccion").val()
        );
        $("#ausenteGrupoId").val($("#filtrosIntensivo .select2.grupo").val());
  
      } else {
        $("#ausenteNumLeccion").val(
          $("#filtrosKids .select2.leccion").val()
        );
        $("#ausenteGrupoId").val($("#filtrosKids .select2.grupo").val());
      }
      $("#ausenteMatriculaId").val(id);
  
      /*console.log($('#filtrosDesdeCero .select2.grupo').val())
          console.log($('#filtrosIntensivo .select2.grupo').val())*/
  
      let form = new FormData(document.getElementById("procesarAusente"));
      //console.log(form)
  
      fetch("/eliminarMatriculaAusente", {
        method: "POST",
        body: form,
      })
        .then((response) => {
          response.json();
          if (response.ok) {
            Toast("Asistencia");
          } else {
            Toast("Error");
          }
        })
        .then((data) => console.log(data));
    };
  
    //BUSCADOR
    jQuery(".buscar-matricula").on("keyup", function (e) {
      console.log(e.target.value);
      // $(".select_cat").removeClass("active");
      $(e.target).addClass("active");
      //this.attr("class", "nav-link select_cat active");
      var estudiante = $(".estudiante");
      var buscando = e.target.value.toLowerCase();
      var item = "";
      for (var i = 0; i < estudiante.length; i++) {
        item = $(estudiante[i]).html().toLowerCase();
        for (var x = 0; x < item.length; x++) {
          if (buscando == "") {
            $(estudiante[i]).parents(".item").show();
          } else if (buscando.length == 0 || item.indexOf(buscando) > -1) {
            console.log(item.indexOf(buscando));
            $(estudiante[i]).parents(".item").show();
            $(estudiante[i]).parents(".item").attr("active");
          } else {
            $(estudiante[i]).parents(".item").hide();
          }
        }
      }
    });
  
  });
  

// * CONTROL HBS 
<div class="app-content content py672">
    <div class="content-wrapper container-xxl p-0">
        <div class="content-body">
            <section class="asistencias">
                <div class="row">
                    <div class="toast-container" id="toast">
                        <div class="toast basic-toast position-fixed top-0 end-0 m-2 fade" role="alert">
                            <div class="toast-header">
                                <strong class="me-auto"></strong>
                                <button type="button" class="ms-1 btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                            <div class="toast-body"></div>
                        </div>
                    </div>

                    <button class="btn btn-outline-primary toast-basic-toggler mt-2 waves-effect d-none" id="btnToast">Toast</button>

                    {{!--<div class="col-12 my-1">
                        <p class="lead">grupo: {{grupo.identificador}}</p>
                        <p class="lead">numero leccion: {{numLeccion}}</p>
                        <p class="lead">diferencia de dias: {{diff}}</p>
                        <p class="lead">calculo: {{rest}}</p>
                        <p class="lead">fecha actual: {{fechaActual}}</p>
                        <p class="lead">fecha inicio: {{fechaInicio}}</p>
                    </div>--}}

                    <input type="text" class="d-none" value="{{grupoId}}" id="grupoId">
                    <input type="text" class="d-none" value="{{numLeccion}}" id="numeroLeccion">
                    <input type="text" class="d-none" value="{{nivelActual}}" id="nivelActual">
                    <input type="text" class="d-none" value="{{matri}}" id="matriculaGrupo">
                    <input type="text" class="d-none" value="{{fechaNiveles}}" id="fechaNiveles">

                    <div class="col-12 mb-1">
                        <div class="demo-inline-spacing">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="tipo" id="inlineRadio3" value="1" checked="">
                                <label class="form-check-label" for="inlineRadio3">Desde Cero</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input danger" type="radio" id="inlineRadio4" name="tipo" value="2">
                                <label class="form-check-label" for="inlineRadio4">Intensivo</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input success" type="radio" id="inlineRadio5" name="tipo" value="3">
                                <label class="form-check-label" for="inlineRadio5">Niños</label>
                            </div>
                        </div>
                    </div>        

                    <div class="col-12 p-0" id="filtrosDesdeCero">
                        <div class="row m-0 p-0">

                            <div class="col-12 col-md-3 mb-1">
                                <label for="" class="form-label">Seleccionar Grupo</label>
                                <select name="" class="form-select select2 grupo" id="gruposDesde0select">
                                    <option value="-">Seleccionar Grupo</option>
                                </select>
                            </div>

                            <div class="col col-md-3 mb-1">
                                <label for="" class="form-label">Seleccionar Lección</label>
                                <select name="" id="" class="form-select select2 leccion">
                                    <option value="-">Seleccionar Lección</option>
                                    <option value="1" disabled>1</option>
                                    <option value="2" disabled>2</option>
                                    <option value="3" disabled>3</option>
                                    <option value="4" disabled>4</option>
                                    <option value="5" disabled>5</option>
                                    <option value="6" disabled>6</option>
                                    <option value="7" disabled>7</option>
                                    <option value="8" disabled>8</option>
                                    <option value="9" disabled>9</option>
                                    <option value="10" disabled>10</option>
                                    <option value="11" disabled>11</option>
                                    <option value="12" disabled>12</option>
                                    <option value="13" disabled>13</option>
                                    <option value="14" disabled>14</option>
                                    <option value="15" disabled>15</option>
                                    <option value="16" disabled>16</option>
                                    <option value="17" disabled>17</option>
                                    <option value="18" disabled>18</option>
                                    <option value="19" disabled>19</option>
                                    <option value="20" disabled>20</option>
                                    <option value="21" disabled>21</option>
                                    <option value="22" disabled>22</option>
                                    <option value="23" disabled>23</option>
                                    <option value="24" disabled>24</option>
                                    <option value="25" disabled>25</option>
                                    <option value="26" disabled>26</option>
                                    <option value="27" disabled>27</option>
                                    <option value="28" disabled>28</option>
                                    <option value="29" disabled>29</option>
                                    <option value="30" disabled>30</option>
                                    <option value="31" disabled>31</option>
                                    <option value="32" disabled>32</option>
                                </select>
                            </div>

                            <div class="col col-md-3 mb-1">
                                <label for="" class="form-label">Nivel </label>
                                <select name="" id="" class="form-select select2 nivel">
                                    {{#if matri}}
                                    <option value="1">1</option>
                                    <option value="2" disabled>2</option>
                                    <option value="3" disabled>3</option>
                                    <option value="4" disabled>4</option>
                                    {{else}}
                                    <option value="1" disabled>1</option>
                                    <option value="2" disabled>2</option>
                                    <option value="3" disabled>3</option>
                                    <option value="4" disabled>4</option>
                                    {{/if}}
                                </select>
                            </div>

                            <div class="col-12 col-md-3 mb-1">
                                <label for="" class="form-label">Buscar</label>
                                <div class="input-group mb-2">
                                    <span class="input-group-text" id="basic-addon-search1"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></span>
                                    <input type="text" class="form-control buscar-matricula" placeholder="Buscar Alumno" aria-label="Search..." aria-describedby="basic-addon-search1">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 p-0 d-none" id="filtrosIntensivo">
                        <div class="row m-0 p-0">
                            <div class="col-12 col-md-3 mb-1">
                                <label for="" class="form-label">Seleccionar Grupo</label>
                                <select name="" class="form-select select2 grupo" id="gruposIntensivoSelect">
                                    <option value="-">Seleccionar Grupo</option>
                                </select>
                            </div>

                            <div class="col col-md-3 mb-1">
                                <label for="" class="form-label">Seleccionar Lección</label>
                                <select name="" id="" class="form-select select2 leccion">
                                    <option value="-">Seleccionar Lección</option>
                                    <option value="1" disabled>1</option>
                                    <option value="2" disabled>2</option>
                                    <option value="3" disabled>3</option>
                                    <option value="4" disabled>4</option>
                                    <option value="5" disabled>5</option>
                                    <option value="6" disabled>6</option>
                                    <option value="7" disabled>7</option>
                                    <option value="8" disabled>8</option>
                                    <option value="9" disabled>9</option>
                                    <option value="10" disabled>10</option>
                                    <option value="11" disabled>11</option>
                                    <option value="12" disabled>12</option>
                                    <option value="13" disabled>13</option>
                                    <option value="14" disabled>14</option>
                                    <option value="15" disabled>15</option>
                                    <option value="16" disabled>16</option>
                                    <option value="17" disabled>17</option>
                                    <option value="18" disabled>18</option>
                                    <option value="19" disabled>19</option>
                                    <option value="20" disabled>20</option>
                                    <option value="21" disabled>21</option>
                                    <option value="22" disabled>22</option>
                                    <option value="23" disabled>23</option>
                                    <option value="24" disabled>24</option>
                                    <option value="25" disabled>25</option>
                                    <option value="26" disabled>26</option>
                                    <option value="27" disabled>27</option>
                                    <option value="28" disabled>28</option>
                                    <option value="29" disabled>29</option>
                                    <option value="30" disabled>30</option>
                                    <option value="31" disabled>31</option>
                                    <option value="32" disabled>32</option>
                                </select>
                            </div>

                            <div class="col col-md-3 mb-1">
                                <label for="" class="form-label">Nivel</label>
                                <select name="" id="" class="form-select select2 nivel">
                                    {{#if matri}}
                                    <option value="1">1</option>
                                    <option value="2" disabled>2</option>
                                    <option value="3" disabled>3</option>
                                    <option value="4" disabled>4</option>
                                    {{else}}
                                    <option value="1" disabled>1</option>
                                    <option value="2" disabled>2</option>
                                    <option value="3" disabled>3</option>
                                    <option value="4" disabled>4</option>
                                    {{/if}}
                                </select>
                            </div>

                            <div class="col-12 col-md-3 mb-1">
                                <label for="" class="form-label">Buscar</label>
                                <div class="input-group mb-2">
                                    <span class="input-group-text" id="basic-addon-search1"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></span>
                                    <input type="text" class="form-control buscar-matricula" placeholder="Buscar Alumno" aria-label="Search..." aria-describedby="basic-addon-search1">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-12 p-0 d-none" id="filtrosKids">
                        <div class="row m-0 p-0">
                            <div class="col-12 col-md-3 mb-1">
                                <label for="" class="form-label">Seleccionar Grupo</label>
                                <select name="" class="form-select select2 grupo" id="gruposKidsSelect">
                                    <option value="-">Seleccionar Grupo</option>
                                </select>
                            </div>

                            <div class="col col-md-3 mb-1">
                                <label for="" class="form-label">Seleccionar Lección</label>
                                <select name="" id="" class="form-select select2 leccion">
                                    <option value="-">Seleccionar Lección</option>
                                    <option value="1" disabled>1</option>
                                    <option value="2" disabled>2</option>
                                    <option value="3" disabled>3</option>
                                    <option value="4" disabled>4</option>
                                    <option value="5" disabled>5</option>
                                    <option value="6" disabled>6</option>
                                    <option value="7" disabled>7</option>
                                    <option value="8" disabled>8</option>
                                    <option value="9" disabled>9</option>
                                    <option value="10" disabled>10</option>
                                    <option value="11" disabled>11</option>
                                    <option value="12" disabled>12</option>
                                    <option value="13" disabled>13</option>
                                    <option value="14" disabled>14</option>
                                    <option value="15" disabled>15</option>
                                    <option value="16" disabled>16</option>
                                </select>
                            </div>

                            <div class="col col-md-3 mb-1">
                                <label for="" class="form-label">Nivel</label>
                                <select name="" id="" class="form-select select2 nivel">
                                    {{#if matri}}
                                    <option value="1">1</option>
                                    <option value="2" disabled>2</option>
                                    <option value="3" disabled>3</option>
                                    {{else}}
                                    <option value="1" disabled>1</option>
                                    <option value="2" disabled>2</option>
                                    <option value="3" disabled>3</option>
                                    {{/if}}
                                </select>
                            </div>

                            <div class="col-12 col-md-3 mb-1">
                                <label for="" class="form-label">Buscar</label>
                                <div class="input-group mb-2">
                                    <span class="input-group-text" id="basic-addon-search1"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></span>
                                    <input type="text" class="form-control buscar-matricula" placeholder="Buscar Alumno" aria-label="Search..." aria-describedby="basic-addon-search1">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <section class="row m-0 p-0" id="estudiantes"></section>

                    <template id="template">
                        <div class="col-12">
                            <div class="card card-statistics border-success" id="estudiante{{id}}">
                                <div class="row m-0 p-0">
                                    <div class="col-10 col-xl-11">
                                        <div class="row card-header">
                                            <div class="col-12">
                                                <div class="d-flex flex-column flex-sm-row justify-content-sm-between mb-1">
                                                    <div class="d-flex flex-column mb-1 mb-md-0">
                                                        <h5><span class="badge badge-light-success">Presente</span></h5>
                                                        <h1 class="mb-0"><b>{{nombre}}</b></h1>
                                                    </div>

                                                    <div class="d-flex flex-column flex-md-row">
                                                        <div class="d-flex flex-column mb-1 me-md-1">
                                                            <p class="text-success"><b>Calificación</b></p>
                                                            <div class="d-flex align-items-center">
                                                                <button class="btn btn-sm btn-primary bootstrap-touchspin-down btnCalificacionMenos caliMenos{{id}}" data-id="{{id}}" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus" style="pointer-events: none;"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>

                                                                <p class="h3 mb-0 mx-1"><input type="number" name="" class="calificacion calific{{id}}" value="0" min="0" max="100">%</p>


                                                                <button class="btn btn-sm btn-primary bootstrap-touchspin-up btnCalificacionMas caliMas{{id}}" data-id="{{id}}" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus" style="pointer-events: none;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                                                            </div>
                                                        </div>

                                                        <div class="d-flex flex-column">
                                                            <p class="text-success"><b>Participación</b></p>
                                                            <div class="d-flex align-items-center">
                                                                <button class="btn btn-sm btn-primary bootstrap-touchspin-down btnCalificacionMenos" data-id="{{id}}" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus" style="pointer-events: none;"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>

                                                                <p class="h3 mb-0 mx-1"><input type="number" name="" class="calificacion" value="0" min="0" max="100">%</p>


                                                                <button class="btn btn-sm btn-primary bootstrap-touchspin-up btnCalificacionMas" data-id="{{id}}" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus" style="pointer-events: none;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-2 col-xl-1 p-0">
                                        <div class="box icon d-flex align-items-center justify-content-center h-100 btnAsistencia" role="button" data-id="{{id}}">
                                            <i data-feather='user-check' class="feather text-secondary d-none check" style="pointer-events: none;"></i>
                                            <i data-feather='user-minus' class="feather text-success uncheck" style="pointer-events: none;"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>

                    <form action="" method="GET" id="grupoForm" class="d-none">
                        <input type="text" name="id" value="PYT-672">
                        <input type="text" name="grupoid" class="grupoId">
                    </form>

                    <form action="" id="procesarAusente" class="d-none">
                        <input type="number" name="leccion" id="ausenteNumLeccion">
                        <input type="number" name="grupoId" id="ausenteGrupoId">
                        <input type="number" name="matriculaId" id="ausenteMatriculaId">
                    </form>

                    <form action="" class="d-none" id="procesarNotas">
                        <input type="text" name="nota" class="nota">
                        <input type="text" name="leccion" class="leccion">
                        <input type="text" name="nivel" class="nivel">
                        <input type="text" name="grupoId" class="grupo">
                        <input type="text" name="matriculaId" class="matricula">
                        <input type="text" name="commentProfForm" class="commentProfForm">
                        <input type="text" name="commentAdminForm" class="commentAdminForm">
                    </form>

                    <form action="" class="d-none" id="procesarParticipacion">
                        <input type="text" name="porcentaje" class="porcentaje">
                        <input type="text" name="leccion" class="leccion">
                        <input type="text" name="grupoId" class="grupo">
                        <input type="text" name="matriculaId" class="matricula">
                    </form>
                </div>
            </section>
        </div>
    </div>
</div>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="../../assets/js/PYT672/control.js"></script>


// * --------- MATRICULA FOR EACH CONTROL ---------- * //


matriculaGrupo.forEach((matricula) => {
      let div = document.createElement("div");
      div.classList.add("col-12");
      div.classList.add("item");
      let lecc = null, idAusentes = null;

      $("#ausenteMatriculaId").val(matricula.id);
      let form = new FormData(document.getElementById("procesarAusente"));
      $("#nivel").val(parseInt(nivelSelec));
      form.append("arr", $("#matriculaGrupo").val());

      fetch("/obtenerMatriculaAusente", {
        method: "POST",
        body: form,
      })
        .then((response) => response.json())
        .then(async (data) => {

          //console.log(data);
          //console.log("DATA AUSENTE");

          let response = data.resp;
          let response2 = data.matricula;

          console.log(response)
          console.log(response2)
          console.log("AUSENCIAS")

          if (response.length && response) {
            idAusentes = response[0].matriculaId;
          }
          console.log(idAusentes);

          let result = matriculaGrupo.filter(item => item.id === idAusentes);
          console.log(result)
          console.log("USUARIO AUSENTE")
          
          let calif = "",
            participacion = "",
            notas = 0,
            participacionPorcentaje = 0,
            usuarioCongelado = "",
            commentarioP = "",
            GcommentProfForm="",
            GcommentAdminForm="";

          if (response2 && response2.length) {
            response2.sort()
            console.log(response2)
            for (let i = 0; i < response2.length; i++) { 
              if (matricula.id === response2[i].id) {
                /*GcommentProfForm = 'hi'
                GcommentAdminForm = 'hi'*/
                GcommentProfForm = response2[i].commentProfForm;
                GcommentAdminForm = response2[i].commentAdminForm;
              }              
            }
            let nivelSeleccioando = $('#nivelActual').val()
            
            /*console.log(GcommentProfForm)*/
            let found;
            found = response2.filter(item => item.id === matricula.id)

            if (found && found.length) {
              let num = found[0].notas;
              notas = num;
              console.log(response2);
              console.log(notas);
              console.log("NOTAS");
            }

            participacionPorcentaje = response2[0].participacion;
            
          }

          let readonlyUse = "readonly"
          let disabledUse = "disabled"
          let readonlyUse0 = `style="pointer-events: none;"`
          
          if (
            lecc === 9 ||
            lecc === 17 ||
            lecc === 18 ||
            lecc === 25 ||
            lecc === 31 ||
            lecc === 32
          ) 
          {
            if (result.length) {

              /**OBTENER HISTORIAL DE CAJA */
              let historial = await fetch("/historia-caja-academy/" + matricula.id )
                .then((response) => response.json())
                .then((data) => {
                  /*console.log(data);*/
                  return data.obtener_historia;
                });
              /*console.log(historial);*/
              for (let i = 0; i < historial.length; i++) {
                  let split_hist = historial[i]['concepto'].split(',')
                if (split_hist.length > 1 && split_hist[0]=="Reposicion" && split_hist[1]==lecc) {
                    readonlyUse =""
                    readonlyUse0  = ""
                    disabledUse = ""
                }
              }
              
              commentarioP = `<textarea class="form-control commentProf" id="comentP${matricula.id}" rows="1" placeholder="" data-id="${matricula.id}">${GcommentProfForm}</textarea>`

              if (matricula.estadoId != 5) {
                calif = `
                      <div class="d-flex flex-column mb-1 me-1">
                          <p class="text-success"><b>Calificación</b></p>
                          <div class="d-flex align-items-center">
                              <button class="btn btn-icon btn-sm btn-primary bootstrap-touchspin-down btnCalificacionMenos caliMenos${matricula.id}" data-id="${matricula.id}" type="button" ${disabledUse}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus btnCalificacionMenos caliMenos${matricula.id}" ${readonlyUse0} data-id="${matricula.id}"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
  
                              <p class="h3 mb-0 mx-1"><input type="number" class="calificacion calific${matricula.id}" value="${notas}" min="0" max="100" ${readonlyUse}>%</p>
  
                              <button class="btn btn-icon btn-sm btn-primary bootstrap-touchspin-up btnCalificacionMas caliMas${matricula.id}" data-id="${matricula.id}" type="button" ${disabledUse}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus btnCalificacionMas caliMas${matricula.id}" data-id="${matricula.id}" ${readonlyUse0}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                          </div>
                      </div>`;
              } 

              // * CONGELADO
              /*if (matricula.estadoId === 5) {
                calif = `
                      <div class="d-flex flex-column mb-1 me-1">
                          <p class="text-success"><b>Calificación</b></p>
                          <div class="d-flex align-items-center">
                              <button class="btn btn-icon btn-sm btn-primary bootstrap-touchspin-down btnCalificacionMenos caliMenos${matricula.id}" data-id="${matricula.id}" type="button" disabled><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus btnCalificacionMenos caliMenos${matricula.id}" ${readonlyUse0} data-id="${matricula.id}"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
  
                              <p class="h3 mb-0 mx-1"><input type="number" class="calificacion calific${matricula.id}" value="${notas}" min="0" max="100" ${readonlyUse}>%</p>
  
                              <button class="btn btn-icon btn-sm btn-primary bootstrap-touchspin-up btnCalificacionMas caliMas${matricula.id}" data-id="${matricula.id}" type="button" ${disabledUse} disabled><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus btnCalificacionMas caliMas${matricula.id}" data-id="${matricula.id}" ${readonlyUse0}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                          </div>
                      </div>`;
                
              } else {
                calif = `
                      <div class="d-flex flex-column mb-1 me-1">
                          <p class="text-success"><b>Calificación</b></p>
                          <div class="d-flex align-items-center">
                              <button class="btn btn-icon btn-sm btn-primary bootstrap-touchspin-down btnCalificacionMenos caliMenos${matricula.id}" data-id="${matricula.id}" type="button" ${disabledUse}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus btnCalificacionMenos caliMenos${matricula.id}" ${readonlyUse0} data-id="${matricula.id}"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
  
                              <p class="h3 mb-0 mx-1"><input type="number" class="calificacion calific${matricula.id}" value="${notas}" min="0" max="100" ${readonlyUse}>%</p>
  
                              <button class="btn btn-icon btn-sm btn-primary bootstrap-touchspin-up btnCalificacionMas caliMas${matricula.id}" data-id="${matricula.id}" type="button" ${disabledUse}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus btnCalificacionMas caliMas${matricula.id}" data-id="${matricula.id}" ${readonlyUse0}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                          </div>
                      </div>`;
              }*/
            
            } else {
              commentarioP = `<textarea class="form-control commentProf" id="comentP${matricula.id}" rows="1" placeholder="" data-id="${matricula.id}">${GcommentProfForm}</textarea>`
            
              if (matricula.estadoId != 5) {
                calif = `
                      <div class="d-flex flex-column mb-1 me-1">
                          <p class="text-success"><b>Calificación</b></p>
                          <div class="d-flex align-items-center">
                              <button class="btn btn-icon btn-sm btn-primary bootstrap-touchspin-down btnCalificacionMenos caliMenos${matricula.id}" data-id="${matricula.id}" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus btnCalificacionMenos caliMenos${matricula.id}" data-id="${matricula.id}" style="pointer-events: none;"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
  
                              <p class="h3 mb-0 mx-1"><input type="number" class="calificacion calific${matricula.id}" value="${notas}" min="0" max="100">%</p>
  
                              <button class="btn btn-icon btn-sm btn-primary bootstrap-touchspin-up btnCalificacionMas caliMas${matricula.id}" data-id="${matricula.id}" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus btnCalificacionMas caliMas${matricula.id}" data-id="${matricula.id}" style="pointer-events: none;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                          </div>
                      </div>`;
              } 
            
              // * CONGELADO
              /*if (matricula.estadoId === 5) {
                calif = `
                <div class="d-flex flex-column mb-1 me-1">
                    <p class="text-success"><b>Calificación</b></p>
                    <div class="d-flex align-items-center">
                        <button class="btn btn-icon btn-sm btn-primary bootstrap-touchspin-down btnCalificacionMenos caliMenos${matricula.id}" data-id="${matricula.id}" type="button" disabled><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus btnCalificacionMenos caliMenos${matricula.id}" ${readonlyUse0} data-id="${matricula.id}"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>

                        <p class="h3 mb-0 mx-1"><input type="number" class="calificacion calific${matricula.id}" value="${notas}" min="0" max="100" ${readonlyUse}>%</p>

                        <button class="btn btn-icon btn-sm btn-primary bootstrap-touchspin-up btnCalificacionMas caliMas${matricula.id}" data-id="${matricula.id}" type="button" ${disabledUse} disabled><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus btnCalificacionMas caliMas${matricula.id}" data-id="${matricula.id}" ${readonlyUse0}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                    </div>
                </div>`;
              } else {
                calif = `
                      <div class="d-flex flex-column mb-1 me-1">
                          <p class="text-success"><b>Calificación</b></p>
                          <div class="d-flex align-items-center">
                              <button class="btn btn-icon btn-sm btn-primary bootstrap-touchspin-down btnCalificacionMenos caliMenos${matricula.id}" data-id="${matricula.id}" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus btnCalificacionMenos caliMenos${matricula.id}" data-id="${matricula.id}" style="pointer-events: none;"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
  
                              <p class="h3 mb-0 mx-1"><input type="number" class="calificacion calific${matricula.id}" value="${notas}" min="0" max="100">%</p>
  
                              <button class="btn btn-icon btn-sm btn-primary bootstrap-touchspin-up btnCalificacionMas caliMas${matricula.id}" data-id="${matricula.id}" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus btnCalificacionMas caliMas${matricula.id}" data-id="${matricula.id}" style="pointer-events: none;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                          </div>
                      </div>`;
                
              }*/
              
            }

            if (lecc === 32) {
              if (matricula.estadoId != 5) {
                participacion = `
                          <div class="d-flex flex-column me-1">
                              <p class="text-success"><b>Participación</b></p>
                              <div class="d-flex align-items-center">
                                  <button class="btn btn-sm btn-icon btn-primary bootstrap-touchspin-down btnParticipacionMenos" data-id="${matricula.id}" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus" style="pointer-events: none;"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>

                                  <p class="h3 mb-0 mx-1"><input type="number" class="participacion" value="${participacionPorcentaje}" min="0" max="100">%</p>

                                  <button class="btn btn-sm btn-icon btn-primary bootstrap-touchspin-up btnParticipacionMas" data-id="${matricula.id}" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus" style="pointer-events: none;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                              </div>
                          </div>
                          `;
              }

              // * CONGELADO
              /*if (matricula.estadoId === 5) {
                participacion = `
                          <div class="d-flex flex-column me-1">
                              <p class="text-success"><b>Participación</b></p>
                              <div class="d-flex align-items-center">
                                  <button class="btn btn-sm btn-icon btn-primary bootstrap-touchspin-down btnParticipacionMenos" data-id="${matricula.id}" type="button" disabled><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus" style="pointer-events: none;"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>

                                  <p class="h3 mb-0 mx-1"><input type="number" class="participacion" value="${participacionPorcentaje}" min="0" max="100" readonly>%</p>

                                  <button class="btn btn-sm btn-icon btn-primary bootstrap-touchspin-up btnParticipacionMas" data-id="${matricula.id}" type="button" disabled><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus" style="pointer-events: none;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                              </div>
                          </div>
                          `;
                
              } else {
                participacion = `
                          <div class="d-flex flex-column me-1">
                              <p class="text-success"><b>Participación</b></p>
                              <div class="d-flex align-items-center">
                                  <button class="btn btn-sm btn-icon btn-primary bootstrap-touchspin-down btnParticipacionMenos" data-id="${matricula.id}" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus" style="pointer-events: none;"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>

                                  <p class="h3 mb-0 mx-1"><input type="number" class="participacion" value="${participacionPorcentaje}" min="0" max="100">%</p>

                                  <button class="btn btn-sm btn-icon btn-primary bootstrap-touchspin-up btnParticipacionMas" data-id="${matricula.id}" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus" style="pointer-events: none;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                              </div>
                          </div>
                          `;
              }*/

            }
          }

          // * ASISTENCIAS
          if (result.length) { // * SI ESTA AUSENTE
            if (matricula.estadoId != 5) {
              div.innerHTML = `
                      <label class="card-title estudiante" hidden>${
                        matricula.nombre
                      }</label>
                          <div class="card card-statistics border-secondary" id="estudiante${
                            matricula.id
                          }">
                              <div class="row m-0 p-0">
                                  <div class="col-10 col-xl-11">
                                      <div class="row card-header p-1">
                                          <div class="col-12">
                                              <div class="d-flex flex-column flex-md-row justify-content-sm-between">
  
                                                  <div class="d-flex flex-row mb-1 mb-md-0 align-items-center">
                                                      <h1 class="me-1"><b>${
                                                        matricula.nombre
                                                      }</b></h1>
                                                      <h5><span class="badge badge-light-secondary">Ausente</span></h5>
                                                  </div>
                                                  <div class="d-flex flex-row">
                                                      ${calif}
  
                                                      ${participacion}
                                                  </div>
                                              </div>
                                          </div>
  
                                          <!--Area de comentarios-->
                                          <div class="row">
                                              <div class="col-6">
                                                  <div class="mb-1">
                                                      <label class="form-label" for="exampleFormControlTextarea1">Comentarios Profesor</label>
                                                      ${commentarioP}
                                                  </div>
                                              </div>
                                         
                                    
                                          </div>
                                          
                                      </div>
                                  </div>
                                  <div class="col-2 col-xl-1 p-0">
                                      <div class="box icon d-flex align-items-center justify-content-center h-100 btnAsistencia" role="button" data-id="${
                                        matricula.id
                                      }">
                                          ${feather.icons["user-check"].toSvg({
                                            class: "feather text-secondary check",
                                            style: "pointer-events: none;",
                                          })}
                                          ${feather.icons["user-minus"].toSvg({
                                            class:
                                              "feather text-success d-none uncheck",
                                            style: "pointer-events: none;",
                                          })}
                                      </div>
                                  </div>
                              </div>
                          </div>
                      `;
            } 
            // * CONGELADO
            /*if (matricula.estadoId === 5) {
              div.innerHTML = `
                      <label class="card-title estudiante" hidden>${
                        matricula.nombre
                      }</label>
                          <div class="card card-statistics border-secondary" id="estudiante${
                            matricula.id
                          }">
                              <div class="row m-0 p-0">
                                  <div class="col-10 col-xl-11">
                                      <div class="row card-header p-1">
                                          <div class="col-12">
                                              <div class="d-flex flex-column flex-md-row justify-content-sm-between">
  
                                                  <div class="d-flex flex-row mb-1 mb-md-0 align-items-center">
                                                      <h1 class="me-1"><b>${
                                                        matricula.nombre
                                                      }</b></h1>
                                                      <h5><span class="badge badge-light-secondary">Ausente</span><span class="badge bg-dark">Congelado</span></h5>
                                                  </div>
                                                  <div class="d-flex flex-row">
                                                      ${calif}
  
                                                      ${participacion}
                                                  </div>
                                              </div>
                                          </div>
  
                                          <!--Area de comentarios-->
                                          <div class="row">
                                              <div class="col-6">
                                                  <div class="mb-1">
                                                      <label class="form-label" for="exampleFormControlTextarea1">Comentarios Profesor</label>
                                                      ${commentarioP}
                                                  </div>
                                              </div>
                                         
                                    
                                          </div>
                                          
                                      </div>
                                  </div>
                                  <div class="col-2 col-xl-1 p-0 d-none">
                                      <div class="box icon d-flex align-items-center justify-content-center h-100 btnAsistencia" style="pointer-events: none;" data-id="${
                                        matricula.id
                                      }">
                                          ${feather.icons["user-check"].toSvg({
                                            class: "feather text-secondary check",
                                            style: "pointer-events: none;",
                                          })}
                                          ${feather.icons["user-minus"].toSvg({
                                            class:
                                              "feather text-success d-none uncheck",
                                            style: "pointer-events: none;",
                                          })}
                                      </div>
                                  </div>
                              </div>
                          </div>
                      `;
              
            } else {
              div.innerHTML = `
                      <label class="card-title estudiante" hidden>${
                        matricula.nombre
                      }</label>
                          <div class="card card-statistics border-secondary" id="estudiante${
                            matricula.id
                          }">
                              <div class="row m-0 p-0">
                                  <div class="col-10 col-xl-11">
                                      <div class="row card-header p-1">
                                          <div class="col-12">
                                              <div class="d-flex flex-column flex-md-row justify-content-sm-between">
  
                                                  <div class="d-flex flex-row mb-1 mb-md-0 align-items-center">
                                                      <h1 class="me-1"><b>${
                                                        matricula.nombre
                                                      }</b></h1>
                                                      <h5><span class="badge badge-light-secondary">Ausente</span></h5>
                                                  </div>
                                                  <div class="d-flex flex-row">
                                                      ${calif}
  
                                                      ${participacion}
                                                  </div>
                                              </div>
                                          </div>
  
                                          <!--Area de comentarios-->
                                          <div class="row">
                                              <div class="col-6">
                                                  <div class="mb-1">
                                                      <label class="form-label" for="exampleFormControlTextarea1">Comentarios Profesor</label>
                                                      ${commentarioP}
                                                  </div>
                                              </div>
                                         
                                    
                                          </div>
                                          
                                      </div>
                                  </div>
                                  <div class="col-2 col-xl-1 p-0">
                                      <div class="box icon d-flex align-items-center justify-content-center h-100 btnAsistencia" role="button" data-id="${
                                        matricula.id
                                      }">
                                          ${feather.icons["user-check"].toSvg({
                                            class: "feather text-secondary check",
                                            style: "pointer-events: none;",
                                          })}
                                          ${feather.icons["user-minus"].toSvg({
                                            class:
                                              "feather text-success d-none uncheck",
                                            style: "pointer-events: none;",
                                          })}
                                      </div>
                                  </div>
                              </div>
                          </div>
                      `;

            }*/

          } else { // * SI ESTA PRESENTE
            commentarioP = `<textarea class="form-control commentProf" id="comentP${matricula.id}" rows="1" placeholder="" data-id="${matricula.id}">${GcommentProfForm}</textarea>`
            
            if (matricula.estadoId != 5) {
              div.innerHTML = `
                      <label class="card-title estudiante" hidden>${
                        matricula.nombre
                      }</label>
                          <div class="card card-statistics border-success" id="estudiante${
                            matricula.id
                          }">
                              <div class="row m-0 p-0">
                                  <div class="col-10 col-xl-11">
                                      <div class="row card-header p-1">
                                          <div class="col-12">
                                              <div class="d-flex flex-column flex-md-row justify-content-sm-between">
                                                  
                                                  <div class="d-flex flex-row mb-1 mb-md-0 align-items-center">
                                                      <h1 class="me-1"><b>${
                                                        matricula.nombre
                                                      }</b></h1>
                                                      <h5><span class="badge badge-light-success">Presente</span></h5>
                                                  </div>
  
                                                  <div class="d-flex flex-row">
                                                      ${calif}
  
                                                      ${participacion}
                                                  </div>
                                              </div>
                                          </div>
                                          
                                          <!--Area de comentarios-->
                                          <div class="row">
                                              <div class="col-6">
                                                  <div class="mb-1">
                                                      <label class="form-label" for="exampleFormControlTextarea1">Comentarios Profesor</label>
                                                      ${commentarioP}
                                                  </div>
                                              </div>
                                         
                                    
                                          </div>
                                          
                                      </div>
                                  </div>
                                  <div class="col-2 col-xl-1 p-0">
                                      <div class="box icon d-flex align-items-center justify-content-center h-100 btnAsistencia" role="button" data-id="${
                                        matricula.id
                                      }">
                                          ${feather.icons["user-check"].toSvg({
                                            class:
                                              "feather text-secondary d-none check",
                                            style: "pointer-events: none;",
                                          })}
                                          ${feather.icons["user-minus"].toSvg({
                                            class: "feather text-success uncheck",
                                            style: "pointer-events: none;",
                                          })}
                                      </div>
                                  </div>
                              </div>
                          </div>
                      `;
            }
            
            // * CONGELADO
            /*if (matricula.estadoId === 5) {
              commentarioP = `<textarea class="form-control commentProf" id="comentP${matricula.id}" rows="1" placeholder="" data-id="${matricula.id}" disabled>${GcommentProfForm}</textarea>`

              div.innerHTML = `
                      <label class="card-title estudiante" hidden>${
                        matricula.nombre
                      }</label>
                          <div class="card card-statistics border-secondary" id="estudiante${
                            matricula.id
                          }">
                              <div class="row m-0 p-0">
                                  <div class="col-10 col-xl-11">
                                      <div class="row card-header p-1">
                                          <div class="col-12">
                                              <div class="d-flex flex-column flex-md-row justify-content-sm-between">
                                                  
                                                  <div class="d-flex flex-row mb-1 mb-md-0 align-items-center">
                                                      <h1 class="me-1"><b>${
                                                        matricula.nombre
                                                      }</b></h1>
                                                      <h5><span class="badge badge-light-success">Presente</span><span class="badge bg-dark">Congelado</span></h5>
                                                  </div>
  
                                                  <div class="d-flex flex-row">
                                                      ${calif}
  
                                                      ${participacion}
                                                  </div>
                                              </div>
                                          </div>
                                          
                                          <!--Area de comentarios-->
                                          <div class="row">
                                              <div class="col-6">
                                                  <div class="mb-1">
                                                      <label class="form-label" for="exampleFormControlTextarea1">Comentarios Profesor</label>
                                                      ${commentarioP}
                                                  </div>
                                              </div>
                                         
                                    
                                          </div>
                                          
                                      </div>
                                  </div>
                                  <div class="col-2 col-xl-1 p-0 d-none">
                                      <div class="box icon d-flex align-items-center justify-content-center h-100 btnAsistencia" style: "pointer-events: none;">
                                          ${feather.icons["user-check"].toSvg({
                                            class:
                                              "feather text-secondary d-none check",
                                            style: "pointer-events: none;",
                                          })}
                                          ${feather.icons["user-minus"].toSvg({
                                            class: "feather text-success uncheck",
                                            style: "pointer-events: none;",
                                          })}
                                      </div>
                                  </div>
                              </div>
                          </div>
                      `;

            } else {
              div.innerHTML = `
                      <label class="card-title estudiante" hidden>${
                        matricula.nombre
                      }</label>
                          <div class="card card-statistics border-success" id="estudiante${
                            matricula.id
                          }">
                              <div class="row m-0 p-0">
                                  <div class="col-10 col-xl-11">
                                      <div class="row card-header p-1">
                                          <div class="col-12">
                                              <div class="d-flex flex-column flex-md-row justify-content-sm-between">
                                                  
                                                  <div class="d-flex flex-row mb-1 mb-md-0 align-items-center">
                                                      <h1 class="me-1"><b>${
                                                        matricula.nombre
                                                      }</b></h1>
                                                      <h5><span class="badge badge-light-success">Presente</span></h5>
                                                  </div>
  
                                                  <div class="d-flex flex-row">
                                                      ${calif}
  
                                                      ${participacion}
                                                  </div>
                                              </div>
                                          </div>
                                          
                                          <!--Area de comentarios-->
                                          <div class="row">
                                              <div class="col-6">
                                                  <div class="mb-1">
                                                      <label class="form-label" for="exampleFormControlTextarea1">Comentarios Profesor</label>
                                                      ${commentarioP}
                                                  </div>
                                              </div>
                                         
                                    
                                          </div>
                                          
                                      </div>
                                  </div>
                                  <div class="col-2 col-xl-1 p-0">
                                      <div class="box icon d-flex align-items-center justify-content-center h-100 btnAsistencia" role="button" data-id="${
                                        matricula.id
                                      }">
                                          ${feather.icons["user-check"].toSvg({
                                            class:
                                              "feather text-secondary d-none check",
                                            style: "pointer-events: none;",
                                          })}
                                          ${feather.icons["user-minus"].toSvg({
                                            class: "feather text-success uncheck",
                                            style: "pointer-events: none;",
                                          })}
                                      </div>
                                  </div>
                              </div>
                          </div>
                      `;

            }*/
          }
        });

      fragment.appendChild(div);
    });