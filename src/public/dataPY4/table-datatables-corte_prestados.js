/**
 * DataTables Advanced
 */

 'use strict';
function cargaPrestados(rest) {
  let corte_prestados = $('#array_corte_prestados').val()
  let corte_prestados2 = ""
  if (rest) {    
    corte_prestados2 = JSON.parse(corte_prestados)
  }else{
    corte_prestados2 = JSON.parse(corte_prestados.replace(/&quot;/g,'"'))
  }
  let codigosP = $('#array_cp').val()
  let codigosP_arr = JSON.parse(codigosP.replace(/&quot;/g,'"'))
console.log(corte_prestados2)
//TABLA GRAL
let Newcorte2 = {}
//Recorremos el arreglo 
corte_prestados2.forEach( x => {
  if( !Newcorte2.hasOwnProperty(x.clienteId)){
    Newcorte2[x.clienteId] =[]
  }
    Newcorte2[x.clienteId].push(x)  
})
let ArrayGral = Object.entries(Newcorte2);

  var
  dt_Gral = $('.datatables-basicPrestados');

  // DataTable with buttons
  // --------------------------------------------------------------------

  if (dt_Gral.length) {
    $('.dt-column-searchPrestados thead tr').clone(true).appendTo('.dt-column-searchPrestados thead');
    $('.dt-column-searchPrestados thead tr:eq(1) th').each(function (i) {
      var title = $(this).text();
      $(this).html('<input type="text" class="form-control form-control-sm" placeholder="Buscar ' + title + '" />');
  
      $('input', this).on('keyup change', function () {
        if (dt_Gral_t.column(i).search() !== this.value) {
          dt_Gral_t.column(i).search(this.value).draw();
        }
      });
    });
    var dt_Gral_t = dt_Gral.DataTable({
      data: corte_prestados2,
     columns: [
      { data: 'cliente',render: function (data, type, full, meta) {
            let cantidad=full['cantidad'];                    
        var data_str = encodeURIComponent(JSON.stringify(full));
        let asentamiento = ""
        for (let i = 0; i < codigosP_arr.length; i++) {
          if (codigosP_arr[i]['id'] == full['cliente']['cpId']) {
            asentamiento = codigosP_arr[i]['asentamiento']
          }          
        }   
        var $status_number = full['cliente']['tipo'];
        var $status = {
          "Residencial": { title: full['cliente']['firstName'] +" "+ full['cliente']['lastName'] + " / "+ asentamiento, class: 'badge-light-info' },
          "Punto de venta": { title: full['cliente']['firstName'] +" "+ full['cliente']['lastName'] + " / "+ asentamiento, class: ' badge-light-success' },
          "Negocio": { title: full['cliente']['firstName'] +" "+ full['cliente']['lastName'] + " / "+ asentamiento, class: ' badge-light-danger' },
        };
        if (typeof $status[$status_number] === 'undefined') {
          return data;
        }
    var color_tag ="", color_text=""
    if (full['cliente']['etiqueta'] ==null) {
      color_tag =0
      color_text="black"
    }else{
      color_tag =full['cliente']['etiqueta']['color']
      color_text="white"
    }
        return `<span class="d-none">${asentamiento}</span><span class="badge rounded-pill ${$status[$status_number].class}" data-bs-toggle="modal" data-id="${cantidad}" data-arrayconductores="${data_str}" data-title="Garrafones Prestados a ${full['cliente']['firstName']}"  data-bs-target="#corte_modal" style="cursor: pointer;">${$status[$status_number].title}</span>`}  },
        { data: 'cantidad'},
        { data: 'fecha_ingreso' },
        { data: 'devueltos' },
        { data: 'fecha_devolucion' },
      ], columnDefs: [
        {
          // Label
          targets: 1,className:'to_total2',
          render: function (data, type, full, meta) {
            let cantidad = `<span class="cantidad">${data}</span>`
            return cantidad;
          }
      },
      {
        // Label
        targets: 2,
        render: function (data, type, full, meta) {
          let fecha = `<span class="d-none">${moment(data).format('YYYYMMDD')}</span>${moment(data).format('DD/MM/YYYY')}`
          return fecha;
        }
    },
  {
    // Label
    targets: 4,
    render: function (data, type, full, meta) {
      let fecha ="";
      if (data !=null) {
        fecha = `<span class="d-none">${moment(data).format('YYYYMMDD')}</span>${moment(data).format('DD/MM/YYYY')}`
      }      
          return fecha;
    }
},
         
      ],
      order: [[2, 'desc']],
      dom: '<"none "<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      orderCellsTop: true,
      displayLength: 10,
      lengthMenu: [7, 10, 25, 50, 75, 100],  
    
      language: {
      "decimal": "",
      "emptyTable": "No hay información",
      "info": "Total _TOTAL_ registros",
      "infoEmpty": "Total _TOTAL_ registros",
      "infoFiltered": "(Filtrado de _MAX_ registros totales)",
      "infoPostFix": "",
      "thousands": ",",
      "lengthMenu": "Mostrar _MENU_ Entradas",
      "loadingRecords": "Cargando...",
      "processing": "Procesando...",
      "search": "Buscar:",
      "zeroRecords": "Sin resultados encontrados",
        paginate: {
          // remove previous & next text from pagination
          previous: '&nbsp;',
          next: '&nbsp;'
        }
      },
      drawCallback: function (settings) {
        let sumaG = 0;
        $('.datatables-basicPrestados').dataTable().$('.cantidad').each(function(){
    if ($(this).text() == "-") {
      sumaG
    }else{
          sumaG += parseFloat($(this).text());
    }    
  });
  $('#Prestados_info').append(`<span> / Total prestados: ${sumaG} </span>`)

        var api = this.api();
        var rows = api.rows({ page: 'current' }).nodes();
        var last = null;
        let sumaT = 0;
          api.column(1, { page: 'current' }).data().each(function(group, i){
            sumaT +=parseInt(group)
           
        });
        $('tfoot .to_total2').text(sumaT)
      },
    });
       // Refilter the table
       $('#min_, #max_').on('change', function () {
        filterByDate__(2); // We call our filter function
        dt_Gral_t.draw();
        });

    
    $("#corte_modal").on('show.bs.modal', function (e) {
      var triggerLink = $(e.relatedTarget);
      var Total_total = triggerLink.data("id");
      var title = triggerLink.data("title");
     var ArrayConductores = triggerLink.data("arrayconductores");
      var my_object = JSON.parse(decodeURIComponent(ArrayConductores));
      $("#corte_modalTitle").text(title); 
    //  $("#corte_modalBody").append(txt2);
    $("#corte_modalBody").empty() 
    let cantidad=my_object['cantidad']; 
    console.log(my_object)
    let id=my_object['clienteId']+ ","+my_object['fecha_ingreso']+ ","+my_object['personalId']+ "," +cantidad

          $("#corte_modalBody").append(`<ul class='list-group list-group-flush'><li class='list-group-item d-flex justify-content-between align-items-center'>Chofer ${my_object['personal']['name']}: <span class='badge bg-primary rounded-pill'>Prestados: ${cantidad}</span><input type="text" id="${id}" placeholder="Indique la cantidad a devolver" onchange="habilitar_dev(this)" onclick="$(this).removeAttr('readonly');" readonly/> </li></ul>`);
  });
 
  }
let fecha_corte = $('#fecha_corte').val();
let deldia;
  deldia = corte_prestados2.filter(element => element.fecha_ingreso == moment().format('MM/DD/YYYY'))
if (fecha_corte !="") {
  deldia = corte_prestados2.filter(element => element.fecha_ingreso == moment(fecha_corte,'DD/MM/YYYY').format('MM/DD/YYYY'))
}  
  console.log(deldia)
  let suma_cantidad_corte = 0, devueltos_dia=0;
  for (let i = 0; i < deldia.length; i++) {
    suma_cantidad_corte += parseInt(deldia[i]['cantidad'])   
    devueltos_dia += parseInt(deldia[i]['devueltos'])   
  }
  $('#prestamos_del_dia').text(suma_cantidad_corte)
  $('#devueltos_del_dia').text(devueltos_dia)
}
 // Advanced Search Functions Ends
 $(function () {
  'use strict';
  cargaPrestados()
  $('#fecha_corte').on('change', async (e)=>{
    console.log(e.target.value)
    let fecha = moment(e.target.value,'DD/MM/YYYY').format('YYYY-DD-MM')
    console.log(fecha)
  let prestados = await fetch("/prestados/" + fecha)
    .then((response) => response.json())
    .then((data) => {
      
      return data.prestamos_byday;
    });
    console.log(JSON.parse(prestados));
    $('.datatables-basicPrestados').dataTable().fnDestroy();
         $('.datatables-basicPrestados').empty();
        $('.datatables-basicPrestados').html(`<thead>
        <tr>
            <th>Cliente</th>
            <th>Nª Envases Prestados</th>
            <th>Fecha</th>
            <th>Devueltos</th>
            <th>Fecha Ult. Devolución</th>
        </tr>
    </thead>`);
    $('#array_corte_prestados').val(prestados)
    cargaPrestados('rest')
});

});
// Filter column wise function
async function habilitar_dev(id) {
  console.log(id.id)
  let array = (id.id).split(',')
  let fecha_ = array[1]
  let id_chofer =array[2]
  let cantidad =array[3]
  let id_cliente = array[0]
  
  fecha_ = fecha_.replaceAll('/','-')
  console.log(fecha_)
  if (parseInt(id.value) > parseInt(cantidad)) {
    Swal.fire('La cantidad de devueltos no debe ser mayor a la prestada')
    return
  }
  
 
  Swal.fire({
    title: 'Seguro desea actualizar los devueltos',
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return fetch(`/actualizar_devueltos/${id_chofer}/${id.value}/${id_cliente}/${fecha_}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Request failed: ${error}`
          )
        })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then(async (result) => {
    if (result.isConfirmed) {
      console.log(result)
      Swal.fire('Listo')
      let fecha = moment(fecha_,'MM-DD-YYYY').format('YYYY-DD-MM')
      console.log(fecha)
    let prestados = await fetch("/prestados/" + fecha)
      .then((response) => response.json())
      .then((data) => {        
        return data.prestamos_byday;
      });
      console.log(JSON.parse(prestados));
      $('.datatables-basicPrestados').dataTable().fnDestroy();
           $('.datatables-basicPrestados').empty();
          $('.datatables-basicPrestados').html(`<thead>
          <tr>
              <th>Cliente</th>
              <th>Nª Envases Prestados</th>
              <th>Fecha</th>
              <th>Devueltos</th>
              <th>Fecha Ult. Devolución</th>
          </tr>
      </thead>`);
      $('#array_corte_prestados').val(prestados)
      cargaPrestados('rest')
    }
  })

}