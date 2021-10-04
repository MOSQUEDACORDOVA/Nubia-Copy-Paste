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
  
  let corte = $('#array_corte').val()
  
  let corte2 = JSON.parse(corte.replace(/&quot;/g,'"'))
  
  //let stproductos = JSON.parse(corte.productos)
  let status_pedido = corte2.filter(status => status.cliente.tipo == 'Residencial'); // return implicito
  let status_pedido2 = corte2.filter(status => status.status_pedido == "Entregado" || status.status_pedido == "Reasignado" || status.status_pedido == "Cancelado"); // return implicito
  console.log(status_pedido)
  let nuevoObjeto = {}
//Recorremos el arreglo 
status_pedido.forEach( x => {
  //Si la ciudad no existe en nuevoObjeto entonces
  //la creamos e inicializamos el arreglo de profesionales. 
  if( !nuevoObjeto.hasOwnProperty(x.chofer)){
    nuevoObjeto[x.chofer] =[]
  }
  
  //Agregamos los datos de profesionales. 
    nuevoObjeto[x.chofer].push(x)
  
})

console.log(nuevoObjeto)
let arregloDeClavesYValores = Object.entries(nuevoObjeto);
console.log("Claves y valores: ", arregloDeClavesYValores);
  var dt_basic_table = $('.datatables-basic'),
    dt_date_table = $('.dt-date'),
    dt_basic_table2 = $('.datatables-basic2'),
    dt_adv_filter_table = $('.datatables-basic'),
    dt_row_grouping_table = $('.dt-row-grouping'),
    dt_multilingual_table = $('.dt-multilingual'),
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
 
  if (dt_basic_table.length) {
    $('.dt-column-search thead tr').clone(true).appendTo('.dt-column-search thead');
    $('.dt-column-search thead tr:eq(1) th').each(function (i) {
      var title = $(this).text();
      $(this).html('<input type="text" class="form-control form-control-sm" placeholder="Buscar ' + title + '" />');
  
      $('input', this).on('keyup change', function () {
        if (dt_basic.column(i).search() !== this.value) {
          dt_basic.column(i).search(this.value).draw();
        }
      });
    });
    var dt_basic = dt_basic_table.DataTable({
      data: arregloDeClavesYValores,
     columns: [
        { data: '0' },
        { data: '0'},
        { data: '0' },
        { data: '0' },
        { data: '0' },
        { data: '0'},
        {   // Actions
          targets: -1,
          title: 'Opciones',
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-flex">' +
              '<a href="javascript:;" class="'+full['id']+' dropdown-item delete-record '+full['id']+'">' +
              feather.icons['trash-2'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>'+
              '<a href="javascript:;" class="'+full['id']+' dropdown-item edit_record">' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>'  
            );
          } },
      ], columnDefs: [
        {
          // Label
          targets: 1,
          render: function (data, type, full, meta) {
            let marca="", modelo ="", matricula="", vehiculo ="";
              for (let i = 0; i < full[1].length; i++) {
                marca = full[1][i]['personal']['vehiculo']['marca']
                modelo = full[1][i]['personal']['vehiculo']['modelo']
                matricula = full[1][i]['personal']['vehiculo']['matricula']
            }
            vehiculo = marca + modelo + matricula
            return vehiculo;
          }
      },
      {
        // Label
        targets: 2,
        render: function (data, type, full, meta) {
          let botella1L="", botella5L ="", garrafon11L="", garrafon19L ="";
          let Tbotella1L=0, Tbotella5L =0, Tgarrafon11L=0, Tgarrafon19L =0;
            for (let i = 0; i < full[1].length; i++) {
              botella1L = JSON.parse(full[1][i]['botella1L'])
              botella5L = JSON.parse(full[1][i]['botella5L'])
              garrafon11L = JSON.parse(full[1][i]['garrafon11L'])
              garrafon19L = JSON.parse(full[1][i]['garrafon19L'])
              if (Array.isArray(botella1L)) {
                Tbotella1L += countArray(parseInt(botella1L['total_cant']));
            } else {
              Tbotella1L += parseInt(botella1L['total_cant']);
            }

            if (Array.isArray(botella5L)) {
              Tbotella5L += countArray(parseInt(botella5L['total_cant']));
          } else {
            Tbotella5L += parseInt(botella5L['total_cant']);
          }

          if (Array.isArray(garrafon11L)) {
            Tgarrafon11L += countArray(parseInt(garrafon11L['total_cant']));
        } else {
          Tgarrafon11L += parseInt(garrafon11L['total_cant']);
        }


            if (Array.isArray(garrafon19L)) {
              Tgarrafon19L += countArray(parseInt(garrafon19L['total_cant']));
          } else {
            Tgarrafon19L += parseInt(garrafon19L['total_cant']);
          }


          }
          let total_garrafones=parseInt(Tbotella1L)+parseInt(Tbotella5L)+parseInt(Tgarrafon11L)+parseInt(Tgarrafon19L)
          return total_garrafones;
        }
    },
          {
            // Label
            targets: 3,
            render: function (data, type, full, meta) {
              var suma = 0;
                for (let i = 0; i < full[1].length; i++) {
                  if (full[1][i]['metodo_pago'] == "Efectivo") {
                    if (Array.isArray(full[1][i]['monto_total'])) {
                      suma += countArray(parseInt(full[1][i]['monto_total']));
                  } else {
                      suma += parseInt(full[1][i]['monto_total']);
                  }

                  }
                  
              }
              return suma;
            }
        },{
          
          // Label
          targets: 4,
          render: function (data, type, full, meta) {
            var suma = 0;
              for (let i = 0; i < full[1].length; i++) {
                if (full[1][i]['metodo_pago'] == "Transferencia") {
                  if (Array.isArray(full[1][i]['monto_total'])) {
                    suma += countArray(parseInt(full[1][i]['monto_total']));
                } else {
                    suma += parseInt(full[1][i]['monto_total']);
                }
                }                
            }
            return suma;
          }
        },
        {
          
          // Label
          targets: 5,
          render: function (data, type, full, meta) {
            var suma = 0;
              for (let i = 0; i < full[1].length; i++) {
                if (full[1][i]['metodo_pago'] == "Tarjeta") {
                  if (Array.isArray(full[1][i]['monto_total'])) {
                    suma += countArray(parseInt(full[1][i]['monto_total']));
                } else {
                    suma += parseInt(full[1][i]['monto_total']);
                }
                }                
            }
            return suma;
          }
        },
      ],
      order: [[2, 'desc']],
      dom: '<"none "<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      orderCellsTop: true,
      displayLength: 10,
      lengthMenu: [7, 10, 25, 50, 75, 100],  
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              console.log(row)
              var data = row.data();
              return 'Details of ' + data['full_name'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                    col.rowIdx +
                    '" data-dt-column="' +
                    col.columnIndex +
                    '">' +
                    '<td>' +
                    col.title +
                    ':' +
                    '</td> ' +
                    '<td>' +
                    col.data +
                    '</td>' +
                    '</tr>'
                : '';
            }).join('');

            return data ? $('<table class="table"/>').append('<tbody>' + data + '</tbody>') : false;
          }
        }
      },
     
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
    $('div.head-label').html('<h6 class="mb-0">DataTable with Buttons</h6>');
      // on key up from input field
 /* $('input.dt-input').on('keyup change', function () {
    filterColumn($(this).attr('data-column'), $(this).val());
  });**/

  
    // Refilter the table
    $('#min1, #max1').on('change', function () {
      filterByDate(5); // We call our filter function
      dt_basic.draw();
      });
  }
 
  // Flat Date picker
  if (dt_date_table.length) {
    dt_date_table.flatpickr({
      monthSelectorType: 'static',
      dateFormat: 'm/d/Y'
    });
  }

  // Add New record
  // ? Remove/Update this code as per your requirements ?
  var count = 101;
  $('.data-submit').on('click', function () {
    var $new_name = $('.add-new-record .dt-full-name').val(),
      $new_post = $('.add-new-record .dt-post').val(),
      $new_email = $('.add-new-record .dt-email').val(),
      $new_date = $('.add-new-record .dt-date').val(),
      $new_salary = $('.add-new-record .dt-salary').val();

    if ($new_name != '') {
      dt_basic.row
        .add({
          responsive_id: null,
          id: count,
          full_name: $new_name,
          post: $new_post,
          email: $new_email,
          start_date: $new_date,
          salary: '$' + $new_salary,
          status: 5
        })
        .draw();
      count++;
      $('.modal').modal('hide');
    }
  });



  // Responsive Table
  // --------------------------------------------------------------------


  // Filter form control to default size for all tables
  $('.dataTables_filter .form-control').removeClass('form-control-sm');
  $('.dataTables_length .form-select').removeClass('form-select-sm').removeClass('form-control-sm');
  // Delete Record
  
  $('.odd').addClass('selector');
  $('.even').addClass('selector'); 

  $('.datatables-basic tbody').on('click', '.delete-record', function (e) {
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

  });


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
    $('.datatables-basic').dataTable().fnDraw();
    
  } else {
    $('.datatables-basic').DataTable().column(i).search(val, false, true).draw();
  }
}
// Filter column wise function
function filterColumn2(i, val) {
  if (i == 5) {
    var startDate = $('.start_date2').val(),
      endDate = $('.end_date2').val();
    if (startDate !== '' && endDate !== '') {
      
      filterByDate(i, startDate, endDate); // We call our filter function
    }
    
 /*   if (startDate == '' && endDate == '') {
      
      location.reload();
    }*/
    $('.datatables-basic2').dataTable().fnDraw();
    
  } else {
    $('.datatables-basic2').DataTable().column(i).search(val, false, true).draw();
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