/**
 * DataTables Advanced
 */

 'use strict';


 // Advanced Search Functions Starts
 // --------------------------------------------------------------------
 var minDate, maxDate,minDate2, maxDate2;
 
 // Custom filtering function which will search data in column four between two values
 $.fn.dataTable.ext.search.push(
     function( settings, data, dataIndex ) {
         var min = minDate.val();
         var max = maxDate.val();
       

     let f = data[5]
         var date = new Date(f);
         if (
             ( min === null && max === null ) ||
             ( min === null && date <= max ) ||
             ( min <= date   && max === null ) ||
             ( min <= date   && date <= max ) 
         ) {
             return true;
         }
         return false;
     }
 );
 
 
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
 var filterByDate = function (column, startDate, endDate) {
   // Custom filter syntax requires pushing the new filter to the global filter array
   $.fn.dataTableExt.afnFiltering.push(function (oSettings, aData, iDataIndex) {
     var rowDate = normalizeDate(aData[column]),
       start = normalizeDate(startDate),
       end = normalizeDate(endDate);
       var  min2 = minDate2.val();
       var max2 = maxDate2.val();
       let f = aData[5]
       var date = new Date(f);
     // If our date from the row is between the start and end
     if (
      ( min2 === null && max2 === null ) ||
      ( min2 === null && date <= max2 ) ||
      ( min2 <= date   && max2 === null ) ||
      ( min2 <= date   && date <= max2 ) 
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

  //TABLA RESIDENCIAL
  let NewResidencial = {}
//Recorremos el arreglo 
Residencial.forEach( x => {
  if( !NewResidencial.hasOwnProperty(x.chofer)){
    NewResidencial[x.chofer] =[]
  }
    NewResidencial[x.chofer].push(x)  
})
let ArrayResidencial = Object.entries(NewResidencial);

//TABLA NEGOCIO
let NewNegocio = {}
//Recorremos el arreglo 
Negocio.forEach( x => {
  if( !NewNegocio.hasOwnProperty(x.chofer)){
    NewNegocio[x.chofer] =[]
  }
    NewNegocio[x.chofer].push(x)  
})
let ArrayNegocio = Object.entries(NewNegocio);


//TABLA PTO VENTA
let NewPuntoVenta = {}
//Recorremos el arreglo 
PuntoVenta.forEach( x => {
  if( !NewPuntoVenta.hasOwnProperty(x.chofer)){
    NewPuntoVenta[x.chofer] =[]
  }
    NewPuntoVenta[x.chofer].push(x)  
})
let ArrayPuntoVenta = Object.entries(NewPuntoVenta);

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
  minDate = new DateTime($('#min'), {
    format: 'DD/MM/YYYY'
});
maxDate = new DateTime($('#max'), {
    format: 'DD/MM/YYYY'
});

minDate2 = new DateTime($('#min1'), {
  format: 'DD/MM/YYYY'
});
maxDate2 = new DateTime($('#max1'), {
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
        console.log(full[1])
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
         console.log(ArrayConductores)
         console.log(data)
         
        return '<button class="btn btn-primary" data-bs-toggle="modal" data-id="'+cantidad+'" data-arrayconductores="'+data_str+'" data-title="Garrafones Prestados a'+full[1][0]['cliente']['firstName']+'"  data-bs-target="#corte_modal">'+full[1][0]['cliente']['firstName']+'</button>'}  },
        { data: '0'},
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
    $("#corte_modal").on('show.bs.modal', function (e) {
      var triggerLink = $(e.relatedTarget);
      var Total_total = triggerLink.data("id");
      var title = triggerLink.data("title");
     var ArrayConductores = triggerLink.data("arrayconductores");
      var my_object = JSON.parse(decodeURIComponent(ArrayConductores));
      console.log(my_object)
      $("#corte_modalTitle").text(title); 
    //  $("#corte_modalBody").append(txt2);
    $("#corte_modalBody").empty()
    for (let i = 0; i < my_object.length; i++) {
      
      for (let j = 0; j < my_object[i].length; j++) {
        
        if (typeof my_object[i][j][0]['personal'] !='undefined') {
          console.log(my_object[i][j][0]['personal'])

          $("#corte_modalBody").append("<ul class='list-group list-group-flush'><li class='list-group-item d-flex justify-content-between align-items-center'>"+ my_object[i][j][0]['personal']['name']+": <span class='badge bg-primary rounded-pill'>" + my_object[i][j][0]['cantidad'] +"</span></li>"+
      "</ul>");
        }
      }
      
    }
      //$(this).find(".modal-body").append(txt2);
     /* $(this).find(".modal-body").html("<ul class='list-group list-group-flush'><li class='list-group-item d-flex justify-content-between align-items-center'>Total Refill: <span class='badge bg-primary rounded-pill'>" + ArrayConductores +"</span></li>"+
      "<li class='list-group-item list-group-item-primary d-flex justify-content-between align-items-center'>Total General: <span class='badge bg-primary rounded-pill'>"+
      Total_total+"</span></li></ul>");*/
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
function filterColumn(i, val) {
  if (i == 5) {
    var startDate = $('.start_date').val(),
      endDate = $('.end_date').val();
    if (startDate !== '' && endDate !== '') {
      
      filterByDate(i, startDate, endDate); // We call our filter function
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
async function cambioSP(id, status) {
  console.log(status)
  const { value: estado } = await Swal.fire({
    title: 'Seleccione un nuevo Status',
    input: 'select',
    inputOptions: {
        Entregado: 'Entregado',
        Cancelado: 'Cancelado',
        'Por entregar': 'Por entregar',
    },
    inputPlaceholder: 'Seleccione un nuevo Status',
    showCancelButton: true,
    inputValidator: (value) => {
      return new Promise((resolve) => {
        if (value === status) {
          resolve('Debe seleccionar un estado diferente')
        } else {
           resolve()
        }
      })
    }
  })
  
  if (estado) {
    window.location.href = `/cambiaS_pedido/${id}/${estado}`;
  }

}