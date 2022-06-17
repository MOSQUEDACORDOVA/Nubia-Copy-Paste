var dt_basic_table_notificaciones = $('.datatables-notificaciones'),
 //basic_used_cupons = $('.datatables-basic_notificaciones_usados'),
   dt_date_table = $('.dt-date'),
   assetPath = '../../dataPY4/';
function cargaTablaNotif(editada) {

  let valor_notificaciones = $('#array_notif_').val()
  let array_notificaciones = ""
  if (editada) {
    array_notificaciones = JSON.parse(valor_notificaciones)

  }else{
    array_notificaciones = JSON.parse(valor_notificaciones.replace(/&quot;/g,'"'))
  }
 if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
  }
  let codigosP = $('#array_cp').val()
  let codigosP_arr = JSON.parse(codigosP.replace(/&quot;/g,'"'))

  // DataTable with buttons
  // --------------------------------------------------------------------
 
  if (dt_basic_table_notificaciones.length) {
    console.log(array_notificaciones)
    var dt_basic_notificaciones = dt_basic_table_notificaciones.DataTable({
      data: array_notificaciones,
      columns: [
        { data: 'id' },
        { data: 'cliente' },
        { data: 'cliente' }, // used for sorting so will hide this column
        { data: 'cliente.telefono' },
        { data: 'cliente' },
        {   // Actions
          targets: -1,
          title: 'Opciones',
          orderable: false,
          render: function (data, type, full, meta) {
            if (full['tipo'] == "Nuevo cliente") {
              return (
              '<div class="d-inline-flex">' +
              // '<a href="javascript:;" class="'+full['id']+' dropdown-item delete-record '+full['id']+'">' +
              // feather.icons['trash-2'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              // '</a>'+
              '<a href="javascript:;" class="'+full['cliente']['id']+' dropdown-item" onclick=\'edit_cliente("'+full['cliente']['id']+'","'+full['id']+'")\' title="Editar Cliente">' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>'  
            );
            }
            
          }  },
      ],
      columnDefs: [
        {
          // Avatar image/badge, Name and post
          targets: 1,
          responsivePriority: 4,
          render: function (data, type, full, meta) {
            var $user_img = "-",
              $name = full['cliente']['firstName'] + " " + full['cliente']['lastName'],
              $post = "Cliente";
            if ($user_img) {
              // For Avatar image
              var $output =
                '<img src="' + assetPath + 'images/avatar-s-pyt4.jpg" alt="Avatar" width="32" height="32">';
            } else {
              // For Avatar badge
              var stateNum = full['status'];
              var states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
              var $state = states[stateNum],
                $initials = $name.match(/\b\w/g) || [];
              $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
              $output = '<span class="avatar-content">' + $initials + '</span>';
            }

            var colorClass = $user_img === '' ? ' bg-light-' + $state + ' ' : '';
            // Creates full output for row
            var color_tag ="", color_text=""
            if (full['cliente']['etiqueta'] ==null) {
              color_tag =0
              color_text="black"
            }else{
              color_tag =full['cliente']['etiqueta']['color']
              color_text="white"
            }
            var $row_output =
              '<div class="d-flex justify-content-left align-items-center">' +
              '<div class="avatar ' +
              colorClass +
              ' me-1">' +
              $output +
              '</div>' +
              '<div class="d-flex flex-column">' +
              '<span class="emp_name text-truncate fw-bold badge rounded-pill" style="background-color: ' +color_tag  + '; color:'+color_text+'">' +
              $name +
              '</span>' +
              '</div>' +
              '</div>';
            return $row_output;
          }
        },
         {
          // Avatar image/badge, Name and post
          targets: 2,
          responsivePriority: 4,
          render: function (data, type, full, meta) {
            for (let i = 0; i < codigosP_arr.length; i++) {
              if (codigosP_arr[i]['id'] == full['cliente']['cpId']) {
                asentamiento = codigosP_arr[i]['asentamiento']
              }
              
            }
            return asentamiento;
          }
        },
        {
          // Avatar image/badge, Name and post
          targets: 4,
          responsivePriority: 4,
          render: function (data, type, full, meta) {
            var checked ="checked"
            if (full['cliente']['cuponera'] == "s/a") {
              checked =""
            }
            var $row_output =
             `<div class="form-check" style="display: flex;justify-content: center;"> <input class="form-check-input" type="checkbox" value="" ${checked} onclick=\'hab_("${full['cliente']['id']}","${full['cliente']['cuponera']}")\'/><label class="form-check-label" for="checkboxSelectAll"></label></div>`;
            return $row_output;
          }
        },
      ],
      order: [[1, 'desc']],
      dom: '<"none"<"head-label"><"dt-action-buttons text-end"B>><"none"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<" d-flex justify-content-between mx-0 row" aa<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
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
  }

}

 $(function () {
  'use strict';
  cargaTablaNotif()

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
      dt_basic_notificaciones.row
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
  $('.odd').addClass('selector');
  $('.even').addClass('selector'); 
  // Delete Record
  $('.datatables-basic_notificaciones tbody').on('click', '.delete-record', function (e) {
    if ($('#otro_rol').length) {
      console.log('no eres admin')
      Swal.fire("Función valida solo para directores")
      return
    }
   var id = e.target.classList[0]
   Swal.fire({
    title: 'Eliminar',
    text: "Seguro desea eliminar al notificaciones indicado",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return fetch(`/borrar_cupon/${id}`)
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
      console.log(result.value.etiquetas_let)
      var opts = result.value.etiquetas_let;
      $('.datatables-basic_notificaciones').DataTable().row($(this).parents('tr')).remove().draw();

      Swal.fire({
        title: `Cupón ${id} borrado con éxito`,
      })
    }
  })
  });

  $('.datatables-basic_notificaciones tbody').on('click', '.edit_record', function (e) {
    //dt_basic.row($(this).parents('tr')).remove().draw();
    var id_edit = e.target.classList[0]
    console.log(id_edit)
    if (typeof id_edit =="undefined") {
      return console.log(id_edit)
    }
  window.location.href = `/editar_notificaciones/${id_edit}`;

  });

  $('#btn_save_edit_cliente').on('click', async (e)=>{
    if ($('#zona_clientes_edited').val()=="null") {
      Swal.fire('Debe seleccionar una zona para el cliente')
      return
    }
    console.log('entro aqui')
        $.ajax({
          url: `/editar_cliente`,
          type: 'POST',
          data: $('#edit_cliente_form').serialize(),
          success: function (data, textStatus, jqXHR) {
            console.log(data)
            $('#array_notif_').val(JSON.stringify(data.notif_))
            $('.datatables-notificaciones').dataTable().fnDestroy();
             $('.datatables-notificaciones').empty();
            $('.datatables-notificaciones').html(`<thead>
            <tr>
              <th>id</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th>Descripcion</th>
              <th>Opciones</th>
            </tr>
          </thead>`);
       cargaTablaNotif('si')
      $('.modal').modal('hide');
      Swal.fire('Se editó con éxito la información del cliente')
          },
          error: function (jqXHR, textStatus) {
            console.log('error:' + jqXHR)
          }
        });
        
      })
});
function edit_cliente(id_edit,id_notificacion) {
  if (typeof id_edit =="undefined") {
    return console.log(id_edit)
  }
 //window.location.href = `/editar_pedido/${id_edit2}`;
 console.log(id_notificacion)
const data_C = new FormData();
data_C.append("id", id_edit);
$.ajax({
  url: `/editar_cliente_id`,
  type: 'POST',
  data: data_C,
  cache: false,
  contentType: false,
  processData: false,
  success: function (data, textStatus, jqXHR) {
console.log(data)
$('#id_cliente_edited').val(data['cliente_let']['id'])
$('#id_notificacion').val(id_notificacion)
$('#firstName_edited').val(data['cliente_let']['firstName'])
$('#lastName_edited').val(data['cliente_let']['lastName'])
$('#cp_select_edited').val(data['cliente_let']['estado'])
$('#municipio_edited').val(data['cliente_let']['municipio'])

if ( $("#select_asentamiento_edited option[value='" + data['cliente_let']['cp']['id']+ "']").length == 0 ){
console.log(data['cliente_let']['tipo'])
$('#select_asentamiento_edited').prepend('<option selected value="' + data['cliente_let']['cp']['id'] + '">' + data['cliente_let']['cp']['asentamiento'] + '</option>');  
}else{
//  $('#tipo_edit').find('option:selected').remove().end();
  $("#select_asentamiento_edited option[value='" + data['cliente_let']['cp']['id'] + "']").attr("selected", true);
}

$('#coto_edited').val(data['cliente_let']['coto'])
$('#casa_edited').val(data['cliente_let']['casa'])
$('#calle_edited').val(data['cliente_let']['calle'])
$('#avenida_edited').val(data['cliente_let']['avenida'])
$('#referencia_edited').val(data['cliente_let']['referencia'])
$('#telefono_edited').val(data['cliente_let']['telefono'])

$('#nombre_familiar_1_edited').val(data['cliente_let']['nombre_familiar_1'])
$('#apellido_familiar_1_edited').val(data['cliente_let']['apellido_familiar_1'])
$('#telefono_familiar_1_edited').val(data['cliente_let']['telefono_familiar_1'])
$('#nombre_familiar_2_edited').val(data['cliente_let']['nombre_familiar_2'])
$('#apellido_familiar_2_edited').val(data['cliente_let']['apellido_familiar_2'])
$('#telefono_familiar_2_edited').val(data['cliente_let']['telefono_familiar_2'])

if ( $("#tipo_cliente_edited option[value='" + data['cliente_let']['tipo'] + "']").length == 0 ){
  $('#tipo_cliente_edited').prepend('<option selected value="' + data['cliente_let']['tipo'] + '">' + data['cliente_let']['tipo'] + '</option>');  
  }else{
  //  $('#metodo_pago_edit').find('option:selected').remove().end();
    $("#tipo_cliente_edited option[value='" + data['cliente_let']['tipo'] + "']").attr("selected", true);
  }

$('#fecha_ultimo_pedido').val(data['cliente_let']['fecha_ultimo_pedido'])
$('#utimos_botellones_edited').val(data['cliente_let']['ultimos_botellones'])

if ( $("#zona_clientes_edited option[value='" + data['cliente_let']['sucursaleId'] + "']").length == 0 ){
  $('#zona_clientes_edited').prepend('<option selected value="' + data['cliente_let']['sucursaleId'] + '">' + data['cliente_let']['sucursaleId'] + '</option>');  
  }else{
  //  $('#metodo_pago_edit').find('option:selected').remove().end();
    $("#zona_clientes_edited option[value='" + data['cliente_let']['sucursaleId'] + "']").attr("selected", true);
  }
  $('#correo_edit_cliente_edited').val(data['cliente_let']['email'])
$('#edit_cliente').modal('show')
  },
  error: function (jqXHR, textStatus) {
    console.log('error:' + jqXHR)
  }
});
}
function hab_(id_edit,actual) {
  if (typeof id_edit =="undefined") {
    return console.log(id_edit)
  }
 //window.location.href = `/editar_pedido/${id_edit2}`;
 console.log(id_edit)
 if (actual =="s/a") {
   actual="c/a"
 }else{
   actual ="s/a"
 }
 console.log(actual)
const data_C = new FormData();
data_C.append("id", id_edit);
data_C.append("actual", actual);
$.ajax({
  url: `/editar_cliente_id_cuponera`,
  type: 'POST',
  data: data_C,
  cache: false,
  contentType: false,
  processData: false,
  success: function (data, textStatus, jqXHR) {
console.log(data)
$('#array_notif_').val(JSON.stringify(data.notif_))
            $('.datatables-notificaciones').dataTable().fnDestroy();
             $('.datatables-notificaciones').empty();
            $('.datatables-notificaciones').html(`<thead>
            <tr>
              <th>id</th>
              <th>Nombre</th>
              <th>Asentamiento</th>
              <th>Telefono</th>
              <th>Acceso Cuponera</th>
              <th>Opciones</th>
            </tr>
          </thead>`);
       cargaTablaNotif('si')
      $('.modal').modal('hide');
      Swal.fire('Se editó con éxito la información del cliente')
  },
  error: function (jqXHR, textStatus) {
    console.log('error:' + jqXHR)
  }
});
}