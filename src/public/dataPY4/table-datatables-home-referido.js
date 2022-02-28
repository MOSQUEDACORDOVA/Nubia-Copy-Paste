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
 function cargaTablas(rechar) {
    
  let valor = $('#array_pedido').val()
  let array2 = ""
  if (rechar) {
    
    array2 = JSON.parse(valor)

  }else{
    array2 = JSON.parse(valor.replace(/&quot;/g,'"'))
  }
  let codigosP = $('#array_cp').val()
  let codigosP_arr = JSON.parse(codigosP.replace(/&quot;/g,'"'))
  //let stproductos = JSON.parse(array.productos)
  let status_pedido = array2.filter(status => status.status_pedido == "En proceso" || status.status_pedido == "Reprogramado" || status.status_pedido == "Por entregar" || status.status_pedido == "Devuelto"); // return implicito
  let status_pedido2 = array2.filter(status => status.status_pedido == "Entregado" || status.status_pedido == "Reasignado" || status.status_pedido == "Cancelado"); // return implicito
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
      $(this).html('<input type="text" class="form-control form-control-sm" placeholder="Buscar ' + title + '" id="P'+title+i+'"/>');
      $('input', this).on('keyup', function () {
        console.log(this.id)
        let valor = this.value
$('#filterPosition').val(this.id)
$('#filterValue').val(this.value)
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
        { data: 'total_garrafones_pedido' },
        { data: 'monto_total'}, 
        { data: 'status_pedido' },
        { data: 'status_pago' },
        { data: 'metodo_pago' },
        { data: 'fecha_pedido'},
        {   // Actions
          targets: -1,
          title: 'Opciones',
          orderable: false,
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
CJ: ${CJ}.
Env: ${Env}.</p>`  
            );
          }, 
        },
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
        {
          // Label
          targets: 1,
          render: function (data, type, full, meta) {
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
            let total = parseInt(data)- parseInt(full['total_obsequio_pedido'])
            return (
              '<span class="badge rounded-pill badge-light-info modal_detail_garrafones" data-id="'+full['cliente']['id']+'" data-rfeill="'+full['total_refill_pedido']+'" data-total="'+data+'" data-canje="'+full['total_canje_pedido']+'" data-env="'+full['total_nv_pedido']+'" data-obsequio="'+full['total_obsequio_pedido']+'" data-title="Detalle garrafones"  style="cursor:pointer;" >' +
              total +
              '</span>'
            );
          }

        
        },
        {
          // Label
          targets: 3,
          render: function (data, type, full, meta) {
            let detailRefill = 0, detailCanje = 0, detailNuevo=0,desc=0,sindesc, condesc=0, adeudo=0
            detailRefill = parseFloat(full['total_refill_pedido'])*35
            detailCanje = parseFloat(full['total_canje_pedido'])*55
            detailNuevo = parseFloat(full['total_nv_pedido'])*105
            adeudo = full['deuda_anterior']
            desc = full['descuento']
            sindesc = data
            condesc =parseFloat(data)- parseFloat(desc) 
           return (
            '<span class="badge rounded-pill badge-light-info detail_monto " data-id="'+full['cliente']['id']+'" data-rfeill="'+detailRefill+'" data-total="'+data+'" data-canje="'+detailCanje+'" data-env="'+detailNuevo+'" data-obsequio="'+full['total_obsequio_pedido']+'" data-descuento="'+desc+'" data-title="Detalle monto total" data-sindesc="'+sindesc+'" data-condesc="'+condesc+'" data-adeudo="'+adeudo+'" style="cursor:pointer;" >$' +
            condesc +
            '</span>'
          );
        }
      },
        {
          // Label
          targets: 4,
          render: function (data, type, full, meta) {
            var $status_number = full['status_pedido'];
            var $status = {
              "Devuelto": { title: 'En proceso', class: 'badge-light-primary' },
              "Por entregar": { title: 'Por entregar', class: ' badge-light-yellow' },
              "Devuelto": { title: 'Devuelto', class: ' badge-light-danger' },
              "Reprogramado": { title: 'Reprogramado', class: ' badge-light-warning' },
              "En proceso": { title: 'En proceso', class: ' badge-light-info' }
            };
            if (typeof $status[$status_number] === 'undefined') {
              return data;
            }
            return (
              '<span class="badge rounded-pill ' +
              $status[$status_number].class +
              '" style="cursor:pointer"   onclick=\'cambioSP("'+full['id'] +'","'+full['status_pedido'] +'")\' data-status="'+full['status_pedido'] +'" data-id="'+full['id']+'">' +
              $status[$status_number].title +
              '</span>'
            );
          }
        },
        {
          // Label
          targets: 5,
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
              '<span class="badge rounded-pill ' +
              $status[$status_number].class +
              '" style="cursor:pointer" onclick=\'cambioPago("'+full['id'] +'","'+full['status_pago'] +'")\'>' +
              $status[$status_number].title +
              '</span>'
            );
          }
        },
        {
          targets: 6,className:'fecha_pedido',
          render:function(data, type, full){
            
           // return moment.tz(data, 'America/Mexico_City').format('L');
         //  return (`<span class="badge rounded-pill">${moment(data).format('L')}</span>`);
           return moment(data).format('L');
          }
        },
        
      ],
     
     
      order: [[0,'desc']],
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
  cargaTablas()
  let codigosP = $('#array_cp').val()
  let codigosP_arr = JSON.parse(codigosP.replace(/&quot;/g,'"'))

  //COPIA VARIOS PEDIDOS
  $("#button_copiar_varios").on('click', function (e) {
    let valoresCheck = [];
  
    $("input[type=checkbox]:checked").each(function(){
        valoresCheck.push(this.value);
    });
    if (valoresCheck.length == 0) {    
      
      Swal.fire('Debe seleccionar por lo menos un pedido para Copiar el pedido')
  
      return
    }else{
      console.log('copiando...')
    }
    copyToClipboardVarios(valoresCheck)
  });
  //ACA REGISTRA PEDIDO AJAX
  $('#btn_reg_pedido').on('click', async (e)=>{
    if ($('#id_cliente_reg_pedido').val() =="default") {
      Swal.fire('Debe seleccionar un cliente')
      $('#id_cliente_reg_pedido').focus()
      return
    }
    if ($('#chofer').val() =="default") {
      Swal.fire('Debe seleccionar un chofer')
      $('#chofer').focus()
      return
    }
    if ($('#reg_zona_cliente_pedido').val() == "0" ) {
      Swal.fire('Debe asignar una zona al cliente')
      return
    }
    if ($('#color_tag_reg_pedido').val() == "0") {
      Swal.fire('Debe asignar una etiqueta al cliente')
      return
    }
  if ($('#total_total_inp').val() == "0") {
      Swal.fire('Debe agregar al menos un producto para continuar')
      return
    }
    $.ajax({
      url: `/reg_pedido_modal`,
      type: 'POST',
      data: $('#reg_pedido_modal1').serialize(),
      success: function (data, textStatus, jqXHR) {
        console.log(data)

        if (data.fail) {
          Swal.fire(data.msg)
          return
          
        }
        if ($('#carga_').length>0) {
          $('#array_pedido').val(JSON.stringify(data.pedidos_let))
        $('.datatables-basic').dataTable().fnDestroy();
         $('.datatables-basic').empty();
        $('.datatables-basic').html(`<thead>
                                            <tr>                                                
                                                <th></th>
                                                <th>#Pedido</th>
                                                <th class="cliente">Cliente</th>
                                                <th>To. garr.</th>
                                                <th>Monto Total</th>
                                                <th>Adeudo</th>
                                                <th>Status del Pedido</th>
                                                <th>Status de Pago</th>
                                                <th>Forma de Pago</th>
                                                <th>Fecha</th>
                                                <th>Opciones</th>
                                                
                                            
                                                <th>oculto choferes </th> 
                                                <th>oculto asentamiento </th> 
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
            <th>Metodo de Pago</th>
            <th>Fecha</th>
            <th>Opciones</th>
            
        
        <th>oculto choferes </th> 
        <th>oculto asentamiento </th> 
        </tr>
    </thead>`);
        
        cargaTablas('si')
        $('.datatables-resumen').dataTable().fnDestroy();
        $('.datatables-resumen').empty();
        $('.datatables-resumen').html(`<thead>
        <tr>
            <th>Carga Inicial</th>
            <th>Pedidos</th>
            <th>Entregados</th>
            <th>Pendientes</th>                                                
        
        <th>oculto choferes </th>  
        </tr>
    </thead>`);
        cargaTableResumen('si')
        Swal.fire('Se creó con éxito el pedido')
  $('.modal').modal('hide');
  $('#reg_pedido_modal1').trigger("reset");
  let hoy= moment().format('YYYY-MM-DD')
  $('#fecha_pedido').val(hoy)
  $('#cant_garrafon').text('0')
  $('#monto_garrafon').text('0')
  $('#sub_total_total').text('0')
  $('#deuda_verf').text('0')
   $('#total_total').text('0')
   $('#deuda_box').attr('style','display:none')
   $("#id_cliente_reg_pedido option[value='default']").attr("selected", true);
   $("#id_cliente_reg_pedido").val('default').trigger('change');

  
        } else {
          Swal.fire('Se creó con éxito el pedido')
  $('.modal').modal('hide');
  $('#reg_pedido_modal1').trigger("reset");
  $('#cant_garrafon').text('0')
  $('#monto_garrafon').text('0')
  $('#sub_total_total').text('0')
  $('#deuda_verf').text('0')
   $('#total_total').text('0')
   $('#deuda_box').attr('style','display:none')
   $("#id_cliente_reg_pedido option[value='default']").attr("selected", true);
   $("#id_cliente_reg_pedido").val('default').trigger('change');
   let hoy= moment().format('YYYY-MM-DD')
$('#fecha_pedido').val(hoy)
        }
        
  
      },
      error: function (jqXHR, textStatus) {
        console.log('error:' + jqXHR)
      }
    });
    
  })
  //ACA SE ACTIVAS LOS CONTEXT MENU
  $.contextMenu({
    selector: '.motivo_hover',
    trigger: 'hover',
    autoHide: true,
    build: function ($trigger, e) {
      var motivo = e.currentTarget['dataset']["motivo"];
        return {
            callback: function (key, options) {
                var m = "clicked: " + key;
            },
            items: {
                "Motivo": { name: `Motivo: ${motivo}`},
            }
        };
    }
  });

  $.contextMenu({
    selector: '.modal_detail_garrafones',
    trigger: 'hover',
    autoHide: true,
    build: function ($trigger, e) {
      var title = e.currentTarget['dataset']["title"];
      var rfeill = e.currentTarget['dataset']["rfeill"];
      var canje = e.currentTarget['dataset']["canje"];
     var Env = e.currentTarget['dataset']["env"] 
     var obsequio = e.currentTarget['dataset']["obsequio"];
     var total = e.currentTarget['dataset']["total"] 
        return {
            callback: function (key, options) {
                var m = "clicked: " + key;
            },
            items: {
                "Refill": { name: `Refill: ${rfeill}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
                "Canje": { name: `Canje: ${canje}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
                "Envase Nuevo": { name: `Envase Nuevo: ${Env}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
                "Total": { name: `Total: ${total}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
            }
        };
    }
  });

$.contextMenu({
  selector: '.detail_monto',
  trigger: 'hover',
  autoHide: true,
  build: function ($trigger, e) {
    
    var title = e.currentTarget['dataset']["title"];
    var rfeill = e.currentTarget['dataset']["rfeill"];
    var canje = e.currentTarget['dataset']["canje"];
   var Env = e.currentTarget['dataset']["env"] 
   var desc = e.currentTarget['dataset']["descuento"] 
   var sindesc = e.currentTarget['dataset']["sindesc"] 
   var condesc = e.currentTarget['dataset']["condesc"] 
   var adeudo = e.currentTarget['dataset']["adeudo"] 
   var obsequio = e.currentTarget['dataset']["obsequio"];
   //var total = e.currentTarget['dataset']["total"] 
   var total = (parseInt(sindesc) +parseInt(adeudo))-parseInt(desc)

      return {
          callback: function (key, options) {
              var m = "clicked: " + key;
          },
          items: {
              "Refill": { name: `Refill: $${rfeill}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
              "Canje": { name: `Canje: $${canje}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
              "Envase Nuevo": { name: `Envase Nuevo: $${Env}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
              "Sub-Total": { name: `Sub-Total: $${sindesc}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
              "Adeudo": { name: `Adeudo: $${adeudo}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
              "Desc.": { name: `Desc.: $${desc}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
              "Total": { name: `Total: $${total}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
          }
      };
  }
});
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
function copyToClipboard(elemento) {
  var $temp = $("<textarea>")
  var brRegex = /<br\s*[\/]?>/gi;
  $("body").append($temp);
  $temp.val($(elemento).html().replace(brRegex, "\r\n")).select();
  document.execCommand("copy");
  $temp.remove();
  Swal.fire('Pedido copiado en el portapapeles')
  }
  function copyToClipboardVarios(elemento) {
    console.log(elemento)
    if ($("#checkboxSelectAll").is(':checked')) {
      console.log('borra el primero')
      var new_elemento = elemento.shift()
    }
    console.log(new_elemento)
    var $temp = $("<textarea>")
    var brRegex = /<br\s*[\/]?>/gi;
    $("body").append($temp);
    for (let i = 0; i < elemento.length; i++) {
      const element = array[i];
      $temp.append($(`#CopyPedido${elemento[i]}`).html().replace(brRegex, "\r\n")).select();
    }

    
    document.execCommand("copy");
    $temp.remove();
    Swal.fire('Pedido copiado en el portapapeles')
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
function share_record(id_) {
    //dt_basic.row($(this).parents('tr')).remove().draw();
    var id_edit = id_
    if (typeof id_edit =="undefined") {
      return console.log(id_edit)
    }
    /*let direction_copy = location.host + `/ver_pedido/${id_edit}`;
    $('#p1').text(direction_copy)*/
    copyToClipboard(`#CopyPedido${id_edit}`)
}