/**
 * DataTables Advanced
 */

 'use strict';
 // Advanced Search Functions Starts
 // --------------------------------------------------------------------
 var minDate_, maxDate_;
 // Custom filtering function which will search data in column four between two values

 // Datepicker for advanced filter
 var separator = ' - ',
   rangePickr = $('.flatpickr-range'),
   dateFormat = 'MM/DD/YYYY';
 var options = {
   autoUpdateInput: false,
   autoApply: true,
   locale: {
     format: dateFormat,
     separator: separator
   },
   opens: $('html').attr('data-textdirection') === 'rtl' ? 'left' : 'right'
 };
 
 //
 if (rangePickr.length) {
   rangePickr.flatpickr({
     mode: 'range',
     dateFormat: 'm/d/Y',
     onClose: function (selectedDates, dateStr, instance) {
       var startDate = '',
         endDate = new Date();
       if (selectedDates[0] != undefined) {
         startDate =
           selectedDates[0].getMonth() + 1 + '/' + selectedDates[0].getDate() + '/' + selectedDates[0].getFullYear();
         $('.start_date').val(startDate);
       }
       if (selectedDates[1] != undefined) {
         endDate =
           selectedDates[1].getMonth() + 1 + '/' + selectedDates[1].getDate() + '/' + selectedDates[1].getFullYear();
         $('.end_date').val(endDate);
       }
       $(rangePickr).trigger('change').trigger('keyup');
     }
   });
 }
 
 // Advance filter function
 // We pass the column location, the start date, and the end date
 var filterByDate__ = function (column, startDate, endDate) {
   // Custom filter syntax requires pushing the new filter to the global filter array
   $.fn.dataTableExt.afnFiltering.push(function (oSettings, aData, iDataIndex) {
     var rowDate = normalizeDate(aData[column]),
       start = normalizeDate(startDate),
       end = normalizeDate(endDate);
       var  min2_ = minDate_.val();
       var max2_ = maxDate_.val();
       let f = aData[2]
       var date_ = new Date(f);
       
     // If our date from the row is between the start and end
     if (
      ( min2_ === null && max2_ === null ) ||
      ( min2_ === null && date_ <= max2_ ) ||
      ( min2_ <= date_   && max2_ === null ) ||
      ( min2_ <= date_   && date_ <= max2_ ) 
  ) {
      return true;
  }
  return false;
   });
 };
 
 // converts date strings to a Date object, then normalized into a YYYYMMMDD format (ex: 20131220). Makes comparing dates easier. ex: 20131220 > 20121220
 var normalizeDate = function (dateString) {
   var date = new Date(dateString);
   var normalized =
     date.getFullYear() + '' + ('0' + (date.getMonth() + 1)).slice(-2) + '' + ('0' + date.getDate()).slice(-2);
   return normalized;
 };
 // Advanced Search Functions Ends
 $(function () {
  'use strict';
  
  let corte_prestados = $('#array_corte_prestados').val()
  
  let corte_prestados2 = JSON.parse(corte_prestados.replace(/&quot;/g,'"'))
    //let stproductos = JSON.parse(corte.productos)
  let Residencial = corte_prestados2.filter(status => status.cliente.tipo == 'Residencial'); // return implicito
  let Negocio = corte_prestados2.filter(status => status.cliente.tipo == 'Negocio'); // return implicito
  let PuntoVenta = corte_prestados2.filter(status => status.cliente.tipo == 'Punto de venta'); // return implicitoreturn implicito

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
  dt_Gral = $('.datatables-basicPrestados'),
    dt_date_table = $('.dt-date'),
    assetPath = '../../dataPY4/';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
  }
  minDate_ = new DateTime($('#min_'), {
    format: 'DD/MM/YYYY'
});
maxDate_ = new DateTime($('#max_'), {
    format: 'DD/MM/YYYY'
});

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
      data: ArrayGral,
     columns: [
      { data: '0',render: function (data, type, full, meta) {
            let cantidad=0; 
          for (let i = 0; i < full[1].length; i++) {
           if (Array.isArray(full[1][i]['cantidad'])) {
            cantidad += countArray(parseInt(full[1][i]['cantidad']));
        } else {
            cantidad += parseInt(full[1][i]['cantidad']);
        }
       }
        let Conductores = {}
        //Recorremos el arreglo 
        full[1].forEach( x => {
          if( !Conductores.hasOwnProperty(x.personalId)){
            Conductores[x.personalId] =[]
          }
            Conductores[x.personalId].push(x)  
        })
        var ArrayConductores = Object.entries(Conductores);
        //ArrayConductores = JSON.stringify(ArrayConductores)
        
        var data_str = encodeURIComponent(JSON.stringify(ArrayConductores));
         

        return '<button class="btn btn-primary" data-bs-toggle="modal" data-id="'+cantidad+'" data-arrayconductores="'+data_str+'" data-title="Garrafones Prestados a'+full[1][0]['cliente']['firstName']+'"  data-bs-target="#corte_modal">'+full[1][0]['cliente']['firstName']+'</button>'}  },
        { data: '0'},
        { data: '0' },
        { data: '0' },
        { data: '0' },
      ], columnDefs: [
        {
          // Label
          targets: 1,
          render: function (data, type, full, meta) {
            let cantidad=0;
              for (let i = 0; i < full[1].length; i++) {
                if (Array.isArray(full[1][i]['cantidad'])) {
                  cantidad += countArray(parseInt(full[1][i]['cantidad']));
              } else {
                  cantidad += parseInt(full[1][i]['cantidad']);
              }
            }
            return cantidad;
          }
      },
      {
        // Label
        targets: 2,
        render: function (data, type, full, meta) {
          let fecha="";
            for (let i = 0; i < full[1].length; i++) {
             fecha=full[1][i]['fecha_ingreso']

        
          }
          return fecha;
        }
    },
    {
      // Label
      targets: 3,
      render: function (data, type, full, meta) {
        let devueltos=0;
        let id=""
          for (let i = 0; i < full[1].length; i++) {
            if (Array.isArray(full[1][i]['devueltos'])) {
              devueltos += countArray(parseInt(full[1][i]['devueltos']));
          } else {
              devueltos += parseInt(full[1][i]['devueltos']);
          }
          id=full[1][i]['clienteId']+ ","+full[1][i]['fecha']
        }
        return devueltos;
      }
  },
  {
    // Label
    targets: 4,
    render: function (data, type, full, meta) {
      let fecha="";
        for (let i = 0; i < full[1].length; i++) {
         fecha=full[1][i]['fecha_devolucion']

    
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
      }
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
    let cantidad=0; 
    for (let i = 0; i < my_object.length; i++) {
      
      for (let j = 0; j < my_object[i].length; j++) {
        if (typeof my_object[i][j][0]['personal'] !='undefined') {
         
       for (let k = 0; k < my_object[i][j].length; k++) {
           if (Array.isArray(my_object[i][j][k]['cantidad'])) {
            cantidad += countArray(parseInt(my_object[i][j][k]['cantidad']));
        } else {
            cantidad += parseInt(my_object[i][j][k]['cantidad']);
        }
       }
          id=my_object[i][j][0]['clienteId']+ ","+my_object[i][j][0]['fecha_ingreso']+ ","+my_object[i][j][0]['personalId']+ "," +cantidad

          $("#corte_modalBody").append(`<ul class='list-group list-group-flush'><li class='list-group-item d-flex justify-content-between align-items-center'>Chofer ${my_object[i][j][0]['personal']['name']}: <span class='badge bg-primary rounded-pill'>Prestados: ${cantidad}</span><input type="text" id="${id}" placeholder="Indique la cantidad a devolver" onchange="habilitar_dev(this)" onclick="$(this).removeAttr('readonly');" readonly/> </li></ul>`);
        }

      }
      
    }
  });
    // $('div.head-label').html('<h6 class="mb-0">Negocios</h6>');
      // on key up from input field
 /* $('input.dt-input').on('keyup change', function () {
    filterColumn($(this).attr('data-column'), $(this).val());
  });**/  
 
  }

  
  // Flat Date picker
  if (dt_date_table.length) {
    dt_date_table.flatpickr({
      monthSelectorType: 'static',
      dateFormat: 'm/d/Y'
    });
  }




  // Responsive Table
  // --------------------------------------------------------------------


  // Filter form control to default size for all tables
  $('.dataTables_filter .form-control').removeClass('form-control-sm');
  $('.dataTables_length .form-select').removeClass('form-select-sm').removeClass('form-control-sm');
  // Delete Record
  
  $('.odd').addClass('selector');
  $('.even').addClass('selector'); 

  /*$('.datatables-basic tbody').on('click', '.delete-record', function (e) {
    //dt_basic.row($(this).parents('tr')).remove().draw();
    var id = e.target.classList[0]
    Swal.fire({
      title: 'Eliminar',
      text: "Seguro desea eliminar el pedido indicado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = `//${id}`;
      }
    })

  });
  $('.datatables-basic tbody').on('click', '.edit_record', function (e) {
    //dt_basic.row($(this).parents('tr')).remove().draw();
    var id_edit = e.target.classList[0]
    console.log(id_edit)
    if (typeof id_edit =="undefined") {
      return console.log(id_edit)
    }
  window.location.href = `//${id_edit}`;

  });*/


});
// Filter column wise function
function filterColumn3(i, val) {
  if (i == 5) {
    var startDate = $('.start_date_').val(),
      endDate = $('.end_date_').val();
    if (startDate !== '' && endDate !== '') {
      
      filterByDate_(i, startDate, endDate); // We call our filter function
    }
    
    if (startDate == '' && endDate == '') {
      
      location.reload();
    }
    $('.datatables-basicPrestados').dataTable().fnDraw();
    
  } else {
    $('.datatables-basicPrestados').DataTable().column(i).search(val, false, true).draw();
  }
}

// Filter column wise function
async function habilitar_dev(id) {
  console.log(id.id)
  let array = (id.id).split(',')
  let fecha_ = array[1]
  let id_chofer =array[2]
  let cantidad =array[3]
  let id_cliente = array[0]
  console.log(id.value)
  console.log(cantidad)
  fecha_ = fecha_.replaceAll('/','-')
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
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(result)
      Swal.fire('Listo')
     window.location.href =`/homepy4`
    }
  })

}