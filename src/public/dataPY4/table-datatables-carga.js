/**
 * DataTables Advanced
 */

 'use strict';


 // Advanced Search Functions Starts
 // --------------------------------------------------------------------
 var minDate2, maxDate2
 
 // Custom filtering function which will search data in column four between two values
//  $.fn.dataTable.ext.search.push(
//      function( settings, data, dataIndex ) {
//          var min = minDate.val();
//          var max = maxDate.val();
       

//      let f = data[5]
    
//          var date = new Date(f);
//          if (
//              ( min === null && max === null ) ||
//              ( min === null && date <= max ) ||
//              ( min <= date   && max === null ) ||
//              ( min <= date   && date <= max ) 
//          ) {
//              return true;
//          }
//          return false;
//      }
//  );
 
 
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
       let f = aData[3]
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
 function tablarCargainicial(edit) {
     
  let valor = $('#array_carga').val()
  let array =""
  if (edit) {
    array = JSON.parse(valor)
console.log(array)
  }else{
   array = JSON.parse(valor.replace(/&quot;/g,'"')) 
  }

  let array2 = JSON.parse(valor.replace(/&quot;/g,'"'))
  //let stproductos = JSON.parse(array.productos)

  var dt_basic_carga_init = $('.datatables-basic_carga_init'),
    dt_date_table = $('.dt-date');
  minDate2 = new DateTime($('#min1'), {
      format: 'DD/MM/YYYY'
  });
  maxDate2 = new DateTime($('#max1'), {
      format: 'DD/MM/YYYY'
  });
  // DataTable with buttons
  // --------------------------------------------------------------------
 
  if (dt_basic_carga_init.length) {
    $('.dt-column-search_carga_init thead tr').clone(true).appendTo('.dt-column-search_carga_init thead');
    $('.dt-column-search_carga_init thead tr:eq(1) th').each(function (i) {
      var title = $(this).text();
      $(this).html('<input type="text" class="form-control form-control-sm" placeholder="Buscar ' + title + '" />');
  
      $('input', this).on('keyup change', function () {
        if (dt_basic_carg.column(i).search() !== this.value) {
          dt_basic_carg.column(i).search(this.value).draw();
        }
      });
    });
    var dt_basic_carg = dt_basic_carga_init.DataTable({
      data: array2,
      columns: [
        { data: 'id' },
        { data: 'personal' },
        { data: 'recarga' },
        { data: 'createdAt'},
       /* {   // Actions
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
          } },*/
      ], columnDefs: [
        {
          targets: 1,
          render:function(data, type, full, meta){

           return `${full['personal']['name']}  ${full['personal']['lastName']}`
          }
        },
{
          targets: 2,
          render:function(data, type, full, meta){
            console.log(full)
            var recarga_arr = encodeURIComponent(JSON.stringify(full['Recargas']));
            return (
             `<span class="badge rounded-pill badge-light-info hover_recarga" style="cursor:pointer;"   data-arrayrecarga="${recarga_arr}" data-cargainicial="${full['cantidad_inicial']}">
              ${data} </span> <i class="fas fa-plus" onclick="openrecarga('${full['id']}')" style="cursor:pointer;"></i>`
            );
          }
        },
        
        {
          targets: 3,
          render:function(data){
           // return moment.tz(data, 'America/Mexico_City').format('L');
            return moment(data).format('L');
          }
        },
      ],
     
      order: [[0, 'desc']],
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
    $('div.head-label').html('<h6 class="mb-0">DataTable with Buttons</h6>');
      // on key up from input field
 /* $('input.dt-input').on('keyup change', function () {
    filterColumn($(this).attr('data-column'), $(this).val());
  });**/

  
    // Refilter the table
    $('#min1, #max1').on('change', function () {
      filterByDate(5); // We call our filter function
      dt_basic_carg.draw();
      });
  }
   
 }
 // Advanced Search Functions Ends
 $(function () {
  'use strict';
tablarCargainicial()
  // Flat Date picker
  if (dt_date_table.length) {
    dt_date_table.flatpickr({
      monthSelectorType: 'static',
      dateFormat: 'm/d/Y'
    });
  }

  $.contextMenu({
    selector: '.hover_recarga',
    trigger: 'left',
    autoHide: true,
    build: function ($trigger, e) {
      console.log(e)
      var Recargas = e.currentTarget['dataset']["arrayrecarga"];
      var carga_inicial = e.currentTarget['dataset']["cargainicial"];
      var my_object = JSON.parse(decodeURIComponent(Recargas));
      console.log(my_object)

       var items1 = {"Carga inicial": {name: `Carga inicial =  ${carga_inicial}`}}
      for (let i = 0; i < my_object.length; i++) {
        var newUser = "Recarga" + i;
        items1[newUser] = {name: `Recargó ${i+1}º =  ${my_object[i]['recarga']}`}
      }
     console.log(items1)
        return {
            callback: function (key, options) {
                var m = "clicked: " + key;
                console.log(m);
            },
            items: 
            items1
            
        };
    }
  })
  // Add New record
  // ? Remove/Update this code as per your requirements ?
  var count = 101;
  // Responsive Table
  // --------------------------------------------------------------------


  // Filter form control to default size for all tables
  $('.dataTables_filter .form-control').removeClass('form-control-sm');
  $('.dataTables_length .form-select').removeClass('form-select-sm').removeClass('form-control-sm');
  // Delete Record
  
  $('.odd').addClass('selector');
  $('.even').addClass('selector'); 

  $('#btn_carga_inicial').on('click', async (e)=>{
    
    $.ajax({
      url: `/save_carga_init_py4`,
      type: 'POST',
      data: $('#form_cargaincial').serialize(),
      success: function (data, textStatus, jqXHR) {
        console.log(data)
        $('#array_carga').val(JSON.stringify(data.carga_let))
        $('.datatables-basic_carga_init').dataTable().fnDestroy();
        $('.datatables-basic_carga_init').empty();
        $('.datatables-basic_carga_init').append(`<thead>
        <tr>
          <th>id</th>
          <th>Chofer</th>
          <th>Carga Inicial</th>
          <th>Fecha de carga</th>
          <!--<th>Opciones</th>-->
        </tr>
      </thead>`);
      tablarCargainicial('si')
 $('.modal').modal('hide');
      },
      error: function (jqXHR, textStatus) {
        console.log('error:' + jqXHR)
      }
    });
    
  })
  $('#btn_recarga').on('click', async (e)=>{
    
    $.ajax({
      url: `/save_recarga_py4`,
      type: 'POST',
      data: $('#form_recarga').serialize(),
      success: function (data, textStatus, jqXHR) {
        console.log(data)
        $('#array_carga').val(JSON.stringify(data.carga_let))
        $('.datatables-basic_carga_init').dataTable().fnDestroy();
        $('.datatables-basic_carga_init').empty();
        $('.datatables-basic_carga_init').append(`<thead>
        <tr>
          <th>id</th>
          <th>Chofer</th>
          <th>Carga Inicial</th>
          <th>Fecha de carga</th>
          <!--<th>Opciones</th>-->
        </tr>
      </thead>`);
      tablarCargainicial('si')
 $('.modal').modal('hide');
      },
      error: function (jqXHR, textStatus) {
        console.log('error:' + jqXHR)
      }
    });
    
  })
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
function openrecarga(id) {
  $('#id_carga').val('')
  $('#recarga_name').val('')
  $('#id_carga').val(id)
  $('#recarga').modal('show')
}

