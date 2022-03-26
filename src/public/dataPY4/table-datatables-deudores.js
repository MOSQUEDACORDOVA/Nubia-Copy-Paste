/**
 * DataTables Advanced
 */

 'use strict';
 // Advanced Search Functions Starts
 // --------------------------------------------------------------------
 var minDate, maxDate,minDate2, maxDate2;
 
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
 function tablaDeudores(rechar) {
    
  let valor = $('#pedidos_deudores').val()
  let array2 = ""
  if (rechar) {
    
    array2 = JSON.parse(valor)

  }else{
    array2 = JSON.parse(valor.replace(/&quot;/g,'"'))
  }
  let codigosP = $('#array_cp').val()
  let codigosP_arr = JSON.parse(codigosP.replace(/&quot;/g,'"'))
  console.log(array2)
  //let stproductos = JSON.parse(array.productos)
  let status_pedido = array2.filter(status => status.status_pedido == "Entregado" && status.status_pago == "Por verificar" ); // return implicito
  console.log(status_pedido)
  var dt_basic_table = $('.datatables-deudores'),
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
        let valor = (this.value).normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        console.log(valor)
        if (dt_basic.column(i).search() !== this.value) {
          dt_basic.column(i).search(this.value).draw();
        }else{
          dt_basic.column(i).search(valor).draw();
        }
      });
    });
    $('.select_chofer_pedidos').on('change', function(){

      dt_basic.search(this.value).draw();   
   });
   $('.select_etiqueta_pedidos').on('change', function(){
 
    dt_basic.search(this.value).draw();   
 });
    var dt_basic = dt_basic_table.DataTable({
      data: status_pedido,
      columns: [
        { data: 'id' },
        { data: 'id' },
        { data: 'cliente.firstName' },
        { data: 'status_pago' },
        { data: 'monto_total' },
        { data: 'fecha_pedido'},
        {   // Actions
          targets: -1,
          title: 'Opciones',
          orderable: false,
          visible: false,
          render: function (data, type, full, meta) {
            let rf= parseInt((JSON.parse(full['botella1L']))['refill_cant'])+parseInt((JSON.parse(full['botella5L']))['refill_cant'])+parseInt((JSON.parse(full['garrafon11L']))['refill_cant'])+parseInt((JSON.parse(full['garrafon19L']))['refill_cant'])
            let CJ= parseInt((JSON.parse(full['botella1L']))['canje_cant'])+parseInt((JSON.parse(full['botella5L']))['canje_cant'])+parseInt((JSON.parse(full['garrafon11L']))['canje_cant'])+parseInt((JSON.parse(full['garrafon19L']))['canje_cant'])
            let Env= parseInt((JSON.parse(full['botella1L']))['nuevo_cant'])+parseInt((JSON.parse(full['botella5L']))['nuevo_cant'])+parseInt((JSON.parse(full['garrafon11L']))['nuevo_cant'])+parseInt((JSON.parse(full['garrafon19L']))['nuevo_cant'])
            let asentamiento = ""
for (let i = 0; i < codigosP_arr.length; i++) {
  if (codigosP_arr[i]['id'] == full['cliente']['cpId']) {
    asentamiento = codigosP_arr[i]['asentamiento']
  }
  
}
if ($('#otro_rol').length>0) {
let Hoy = moment().format('DD/MM/YYYY'); 
let fecha =moment(full['fecha_pedido']).format('DD/MM/YYYY')
    var fecha_final= moment(Hoy).isAfter(fecha); // true
        
} 
let modif = ""

if (fecha_final == true) {
  modif = "d-none"
}
            return (
              '<div class="d-inline-flex">' +
              '<a href="javascript:;" class="'+full['id']+' dropdown-item delete-record'+full['id']+'" onclick=\'delete_pedido("'+full['id']+'",".datatables-basic")\'>' +
              feather.icons['trash-2'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>'+
              '<a href="javascript:;" class="'+full['id']+' dropdown-item '+modif+'" onclick=\'edit_pedido("'+full['id']+'")\'>' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>' +
              '<a href="javascript:;" class="'+full['id']+' dropdown-item share_record '+full['id']+'" onclick=\'share_record("'+full['id']+'")\'>' +
              feather.icons['share-2'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>' +
             `<p id="CopyPedido${full['id']}" class="d-none">
--------------------------------------------------------------
#Pedido:${full['id']} -
Cliente:  ${full['cliente']['firstName']} ${full['cliente']['lastName']}.
Dirección: ${asentamiento}, Coto ${full['cliente']['coto']}, Casa ${full['cliente']['casa']},Calle ${full['cliente']['calle']}, Avenida ${full['cliente']['avenida']}.
Referencia:${full['cliente']['referencia']}.
Rf:${rf}.
CJ: ${CJ}.
Env: ${Env}.</p>`  
            );
          }, 
        },
        { data: 'cliente.etiqueta' },
      ], columnDefs: [
        
        {
          // For Checkboxes
          targets: 0,
          orderable: false,
          searchable: false,
          responsivePriority: 3,
          render: function (data, type, full, meta) {
            return (
              '<div class="form-check"> <input class="form-check-input dt-checkboxes" type="checkbox" value="'+data+'" id="checkbox' +
              data +
              '" /><label class="form-check-label" for="checkbox' +
              data +
              '"></label></div>'
            );
          },
          checkboxes: {
            selectAllRender:
              '<div class="form-check"> <input class="form-check-input" type="checkbox" value="" id="checkboxSelectAll" /><label class="form-check-label" for="checkboxSelectAll"></label></div>'
          }
        },
        { targets: 4,
          render: function (data, type, full) {
            
            return `$${data}`
          }
          
        },
        { visible: false, targets: 7,
          render: function (data, type, full) {
            
            if (full['cliente']['etiqueta'] == null) {
          return data
            }else{
              
              return data['etiquetas']
            }
            
          }
         
        },
        {
          // Label
          targets: 1,
          render: function (data, type, full, meta) {
          //  let fecha_creado = full['fecha_pedido'], modificado = full['updatedAt']
          //  let modificacion = moment(fecha_creado).isSame(modificado)
          //   if (modificacion == false) {
          //     return (`<span class="badge rounded-pill badge-light-danger"> ${full['id']}</span>`);
          //   }
            var cliente_arr = encodeURIComponent(JSON.stringify(full['cliente']));
            var color_tag ="", color_text=""
            if (full['cliente']['etiqueta'] ==null) {
              color_tag =0
              color_text="black"
            }else{
              color_tag =full['cliente']['etiqueta']['color']
              color_text="white"
            }
            return (`<span class="badge rounded-pill " style="cursor:pointer; background-color: ${color_tag}; color:${color_text}"> ${full['id']}</span>`);
          }
        },
        {
          // Label
          targets: 2,
          render: function (data, type, full, meta) {
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
        var cliente_arr = encodeURIComponent(JSON.stringify(full['cliente']));
        var color_tag ="", color_text=""
        if (full['cliente']['etiqueta'] ==null) {
          color_tag =0
          color_text="black"
        }else{
          color_tag =full['cliente']['etiqueta']['color']
          color_text="white"
        }
        //aqui activa el modal info del cliente
            return (
              '<span class="hover_cliente badge rounded-pill ' +$status[$status_number].class+
              '" data-id="'+full['cliente']['id']+'" data-arraycliente="'+cliente_arr+'" data-title="Datos de '+full['cliente']['firstName']+'" >' +
              $status[$status_number].title +
              '</span>'
            );
          }
        },
        {
          // Label
          targets: 3,
          render: function (data, type, full, meta) {
            var $status_number = full['status_pago'];
            var $status = {
              "Pagado": { title: 'Pagado', class: 'badge-light-success' },
              "Por verificar": { title: 'Por verificar', class: ' badge-light-yellow' },
            };
            if (typeof $status[$status_number] === 'undefined') {
              return data;
            }
            return (
              '<span class="badge rounded-pill pago' +
              full['id'] + ' '+
              $status[$status_number].class +
              '" style="cursor:pointer" onclick=\'cambioPago("'+full['id'] +'","'+full['status_pago'] +'","'+full['monto_total'] +'")\'>' +
              $status[$status_number].title +
              '</span>'
            );
          }
        },
        {
          targets: 5,className:'fecha_pedido',
          render:function(data, type, full){
            
           // return moment.tz(data, 'America/Mexico_City').format('DD/MM/YYYY');
         //  return (`<span class="badge rounded-pill">${moment(data).format('DD/MM/YYYY')}</span>`);
           return moment(data).format('DD/MM/YYYY');
          }
        },
        
      ],
          
      order: [[3, 'desc']],
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
      dt_basic.draw();
      });
  }
}

 // Advanced Search Functions Ends
 $(function () {
  'use strict';
  tablaDeudores()
  let codigosP = $('#array_cp').val()
  let codigosP_arr = JSON.parse(codigosP.replace(/&quot;/g,'"'))

  //CAMBIA CHOFER TABLA PEDIDOS
  $("#button_change_chofer").on('click', function (e) {
    let valoresCheck = [];
  
    $("input[type=checkbox]:checked").each(function(){
        valoresCheck.push(this.value);
    });
    if (valoresCheck.length == 0) {    
      
      Swal.fire('Debe seleccionar por lo menos un pedido para hacer el cambio de chofer')
  
      return
    }else{
      $('#change_chofer').modal('show')
    }
  $("#ids_pedido").val(valoresCheck);
  });

  $('#change_chofer_btn').on('click', async (e)=>{
    if ($('#chofer_cambia').val() =="default") {
      Swal.fire('Debe seleccionar un chofer')
      return
    }

    $.ajax({
      url: `/change_chofer_pedido`,
      type: 'POST',
      data: $('#change_chofer_form').serialize(),
      success: function (data, textStatus, jqXHR) {
        console.log(data)
        $('#array_pedido').val(JSON.stringify(data.pedidos_let))
        $('.datatables-basic').dataTable().fnDestroy();
         $('.datatables-basic').empty();
        $('.datatables-basic').html(`<thead>
        <tr>                                                
            <th></th>
            <th>Nº Pedido</th>
            <th>Cliente</th>
            <th>Total garrafones</th>
            <th>Monto Total</th>
            <th>Adeudo</th>
            <th>Status del Pedido</th>
            <th>Status de Pago</th>
            <th>Fecha</th>
            <th>Opciones</th>
            
        
        <th>oculto choferes </th> 
        <th>oculto etiqueta </th> 
        </tr>
    </thead>`);
        $('.datatables-basic2').dataTable().fnDestroy();
        $('.datatables-basic2').empty();
        $('.datatables-basic2').html(`<thead>
        <tr>
            <th>Nº Pedido</th>
            <th>Cliente</th>
            <th>Total garrafones</th>
            <th>Monto Total</th>
            <th>Status del Pedido</th>
            <th>Status de Pago</th>
            <th>Fecha</th>
            <th>Opciones</th>
            
        
        <th>oculto choferes </th> 
        <th>oculto etiqueta </th> 
        </tr>
    </thead>`);
        
        tablaDeudores('si')
  $('.modal').modal('hide');
  Swal.fire('Se cambió con éxito el(los) choferes')
      },
      error: function (jqXHR, textStatus) {
        console.log('error:' + jqXHR)
      }
    });
    
  })

 
  //ACA SE ACTIVAS LOS CONTEXT MENU

$.contextMenu({
  selector: '.hover_cliente',
  trigger: 'hover',
  autoHide: true,
  build: function ($trigger, e) {
    var title = e.currentTarget['dataset']["title"];
    var Array = e.currentTarget['dataset']["arraycliente"];
     var my_object = JSON.parse(decodeURIComponent(Array));
   //  $("#home_modalBody").append(txt2);
   let asentamiento =""
   for (let i = 0; i < codigosP_arr.length; i++) {
   if (my_object['cpId'] == codigosP_arr[i]['id']) {
     asentamiento = codigosP_arr[i]['asentamiento']
   }
   }
      return {
          callback: function (key, options) {
              var m = "clicked: " + key;
          },
          items: {
              "Asentamiento": { name: `Asentamiento: ${asentamiento}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
              "Coto": { name: `Coto: ${my_object['coto']}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
              "Casa": { name: `Casa: ${my_object['casa']}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
              "Tel": { name: `Tel: ${my_object['telefono']}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
          }
      };
  }
});
 

  // Filter form control to default size for all tables
  $('.dataTables_filter .form-control').removeClass('form-control-sm');
  $('.dataTables_length .form-select').removeClass('form-select-sm').removeClass('form-control-sm');
  // Delete Record
  
  $('.odd').addClass('selector');
  $('.even').addClass('selector'); 





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

async function cambioPago(id, status, monto) {
  let chof = $('#choferes').val()
  let choferes  = JSON.parse(chof.replace(/&quot;/g,'"'))
  console.log(choferes)
  let arr=[]
for (let i = 0; i < choferes.length; i++) {
  arr.push({id:choferes[i]['id'],name: choferes[i]['name']+ " "+ choferes[i]['lastName']})  
}
var options = {};
$.map(arr,
    function(o) {
        options[o.id] = o.name;
    });
  console.log(options) 
  const { value: status_ } = await Swal.fire({
    title: 'Seleccione un nuevo Status',
    input: 'select',
    inputOptions: {
        Pagado: 'Pagado',
        'Por verificar': 'Por verificar',
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
  
  if (status_) {
    console.log(status_)   
  var tipo_p, fecha_pago, chofer_r
  if (status_ == "Pagado") {
    const { value: tipo } = await Swal.fire({
      title: 'Indique el tipo',
      input: 'select',
    inputOptions: {
        Efectivo: 'Efectivo',
        'Tarjeta': 'Tarjeta',
        'Transferencia': 'Transferencia'
    },
      inputPlaceholder: 'tipo',
     // inputValue: inputValue,
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (!value) {
            resolve('Debe colocar un tipo')
          } else {
             resolve()
          }
        })
      }
    })
    tipo_p = tipo    
  }
 
  if (tipo_p == "Efectivo") {
    const { value: chofer } = await Swal.fire({
      title: 'Indique el chofer',
      input: 'select',
    inputOptions: options,
      inputPlaceholder: 'tipo',
     // inputValue: inputValue,
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (!value) {
            resolve('Debe colocar un tipo')
          } else {
             resolve()
          }
        })
      }
    })
    chofer_r = chofer
    const { value: fecha_re } = await Swal.fire({
      title: 'Indique la fecha',
      html:
      '<input id="swal-input2" class="swal2-input" type="date">',
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById('swal-input2').value,
      ]
    }
    })
    fecha_pago =fecha_re
  }else{
    const { value: fecha_re } = await Swal.fire({
      title: 'Indique la fecha',
      html:
      '<input id="swal-input1" class="swal2-input" type="date">',
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById('swal-input1').value,
      ]
    }
    })
    chofer_r = 'Null'
    fecha_pago =fecha_re
  }
  console.log("id pedido: "+id)
    console.log(tipo_p)
    console.log(chofer_r)
    console.log(fecha_pago) 
      
    const data_C = new FormData();
    data_C.append("id", id);
    data_C.append("status", status_);
    data_C.append("tipo_pago", tipo_p);
    data_C.append("chofer_r", chofer_r);
    data_C.append("fecha_pago", fecha_pago);
    data_C.append("monto", monto);
    $.ajax({
      url: `/cambia_S_pago_deudor`,
      type: 'POST',
      data: data_C,
      cache: false,
      contentType: false,
      processData: false,
      success: function (data, textStatus, jqXHR) {
  console.log(data)
  $('#array_pedido').val(JSON.stringify(data.pedidos_let))
  console.log($('#array_pedido').val()) 
  $(`.datatables-deudores`).DataTable().row($(`.datatables-deudores tbody .pago${id}`).parents('tr')).remove().draw();
      Swal.fire({
        title: `Pedido ${id} actualizado con éxito`,
      })
      },
      error: function (jqXHR, textStatus) {
        console.log('error:' + jqXHR)
      }
    });
  
  }
}