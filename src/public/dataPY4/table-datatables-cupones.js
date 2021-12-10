/**
 * DataTables Basic
 */
 



 var dt_basic_table_cupones = $('.datatables-basic_cupones'),
 basic_used_cupons = $('.datatables-basic_cupones_usados'),
   dt_date_table = $('.dt-date'),
   assetPath = '../../dataPY4/';
function cargaTablacupones(editada) {

  let valor_cupones = $('#array_cupones').val()
  let array_cupones = ""
  if (editada) {
    
    array_cupones = JSON.parse(valor_cupones)

  }else{
    array_cupones = JSON.parse(valor_cupones.replace(/&quot;/g,'"'))
  }
 if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
  }

  // DataTable with buttons
  // --------------------------------------------------------------------
 
  if (dt_basic_table_cupones.length) {
    
    var dt_basic_cupones = dt_basic_table_cupones.DataTable({
      data: array_cupones,
      columns: [
        { data: 'id' },
        { data: 'nombre_cupon' },
        { data: 'nombre_proveedor' }, // used for sorting so will hide this column
        { data: 'cantidad' },
        { data: 'cantidad_actual'},
        { data: 'categoria' },
        { data: 'createdAt' },
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
              '<a href="javascript:;" class="'+full['id']+' dropdown-item" onclick=\'edit_cupones("'+full['id']+'")\'>' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>'  
            );
          }  },
      ],
      columnDefs: [
        {
          // Avatar image/badge, Name and post
          targets: 1,
          render: function (data, type, full, meta) {
            var $user_img = full['img'],
              $name = full['nombre_cupon'],
              $post = full['nombre_proveedor'];
            if ($user_img) {
              // For Avatar image
              var $output =
                '<img src="' + assetPath + 'img_upload/'+full['img']+'" alt="Avatar" width="32" height="32">';
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
            var $row_output =
              '<div class="d-flex justify-content-left align-items-center">' +
              '<div class="avatar ' +
              colorClass +
              ' me-1">' +
              $output +
              '</div>' +
              '<div class="d-flex flex-column">' +
              '<span class="emp_name text-truncate fw-bold">' +
              $name +
              '</span>' +
              '<small class="emp_post text-truncate text-muted">Proveedor: ' +
              $post +
              '</small>' +
              '</div>' +
              '</div>';
            return $row_output;
          }
        },
        
        {
          // Avatar image/badge, Name and post
          targets: 2,visible:false
        },
        {
          // Avatar image/badge, Name and post
          targets: 6,
          render: function (data, type, full, meta) {            
            var status = "";
            let hoy = moment()
            let fecha_final= ""              
              fecha_final= moment(hoy).isAfter(full['fecha_final']); // true
              switch (true) {
                case full['cantidad_actual'] == 0:
                  status="Agotado"
                  break;
                  case fecha_final == true:
                    status="Caducado"
                    break;

                default:
                  status="Activo"
                  break;
              }
             
              var def_status = {
                "Caducado": { title: 'Caducado', class: 'badge-light-info' },
                "Activo": { title: 'Activo', class: ' badge-light-success' },
                "Agotado": { title: 'Agotado', class: ' badge-light-danger' },
              };
              if (typeof def_status[status] === 'undefined') {
                return data;
              }
            return (
              '<span class="hover_cliente badge rounded-pill ' +def_status[status].class+
              '" >' +
              def_status[status].title +
              '</span>'
            );
          }
        },
        {
          // Label
          targets: -2,
          render: function (data, type, full, meta) {
            var $status_number = full['telefono'];
            var $status = {
              1: { title: 'Current', class: 'badge-light-primary' },
              2: { title: 'Professional', class: ' badge-light-success' },
              3: { title: 'Rejected', class: ' badge-light-danger' },
              4: { title: 'Resigned', class: ' badge-light-warning' },
              5: { title: 'Applied', class: ' badge-light-info' }
            };
            if (typeof $status[$status_number] === 'undefined') {
              return data;
            }
            return (
              '<span class="badge rounded-pill ' +
              $status[$status_number].class +
              '">' +
              $status_number +
              '</span>'
            );
          }
        },
      ],
      order: [[2, 'desc']],
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

function cargaTablacuponesUsed(editada) {

  let valor_cupones_used = $('#array_cupones_usados').val()
  let array_cupones_used = ""
  if (editada) {
    
    array_cupones_used = JSON.parse(valor_cupones_used)

  }else{
    array_cupones_used = JSON.parse(valor_cupones_used.replace(/&quot;/g,'"'))
  }
  let codigosP = $('#array_cp').val()
  let codigosP_arr = JSON.parse(codigosP.replace(/&quot;/g,'"'))
 if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
  }

  // DataTable with buttons
  // --------------------------------------------------------------------
  console.log(array_cupones_used)
  if (basic_used_cupons.length) {
    
    var dt_basic_cupones_used = basic_used_cupons.DataTable({
      data: array_cupones_used,
      columns: [
        { data: 'id' },
        { data: 'cupone.nombre_cupon' },
        { data: 'cliente.firstName' }, // used for sorting so will hide this column
        { data: 'fecha_uso' },
        { data: 'cupone.categoria' },
      ],
      columnDefs: [
        {
          // Avatar image/badge, Name and post
          targets: 1,
          render: function (data, type, full, meta) {

            var $user_img = full['cupone']['img'],
              $name = full['cupone']['nombre_cupon'],
              $post = full['cupone']['nombre_proveedor'];
            if ($user_img) {
              // For Avatar image
              var $output =
                '<img src="' + assetPath + 'img_upload/'+full['cupone']['img']+'" alt="Avatar" width="32" height="32">';
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
            var $row_output =
              '<div class="d-flex justify-content-left align-items-center">' +
              '<div class="avatar ' +
              colorClass +
              ' me-1">' +
              $output +
              '</div>' +
              '<div class="d-flex flex-column">' +
              '<span class="emp_name text-truncate fw-bold">' +
              $name +
              '</span>' +
              '<small class="emp_post text-truncate text-muted">Proveedor: ' +
              $post +
              '</small>' +
              '</div>' +
              '</div>';
            return $row_output;
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
          targets: 3,
          //className:'fecha_pedido',
          render:function(data, type, full){
           // return moment.tz(data, 'America/Mexico_City').format('L');
         //  return (`<span class="badge rounded-pill">${moment(data).format('L')}</span>`);
           return moment(data).format('L');
          }
        },
      ],
      order: [[3, 'desc']],
      dom: '<"none"<"head-label"><"dt-action-buttons text-end"B>><"none"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<" d-flex justify-content-between mx-0 row" aa<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      orderCellsTop: true,
      displayLength: 10,
      lengthMenu: [7, 10, 25, 50, 75, 100],
      // drawCallback: function (settings) {
      //   var api = this.api();
      //   var rows = api.rows({ page: 'current' }).nodes();
      //   var last = null;

      //   api
      //     .column(4, { page: 'current' })
      //     .data()
      //     .each(function (group, i) {
      //       if (last !== group) {
      //         $(rows)
      //           .eq(i)
      //           .before('<tr class="group"><td colspan="8"><i class="fas fa-truck me-1"></i>                ' + group + '</td></tr>');//AQUI LOS CHOFERES AGRUPADOS

      //         last = group;
      //       }
      //     });
      // },
    
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
  cargaTablacupones()
  cargaTablacuponesUsed()

  new QRCode(document.getElementById("qrcode"), {
    text: "https://plataforma.bwater.mx/intro_cuponera",
    width: 128,
    height: 128,
    colorDark : "#000000",
    colorLight : "#ffffff",
});
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
      dt_basic_cupones.row
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
  $('.datatables-basic_cupones tbody').on('click', '.delete-record', function (e) {
    if ($('#otro_rol').length) {
      Swal.fire("Función valida solo para directores")
      return
    }
   var id = e.target.classList[0]
   Swal.fire({
    title: 'Eliminar',
    text: "Seguro desea eliminar al cupones indicado",
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
      var opts = result.value.total_cupones_usados_cupones_act;
      $('.datatables-basic_cupones').DataTable().row($(this).parents('tr')).remove().draw();
      $('#array_cupones_usados').val(JSON.stringify(result.value.total_cupones_usados_cupones_act))
      $('.datatables-basic_cupones_usados').dataTable().fnDestroy();
       $('.datatables-basic_cupones_usados').empty();
      $('.datatables-basic_cupones_usados').html(`<thead>
      <tr>
        <th>id</th>
        <th>Cupon Usado</th>
        <th>Usado Por</th>                              
        <th>Fecha de Uso</th>
        <th>Categoria</th>
        
      </tr>
    </thead>`);
    cargaTablacuponesUsed('si')
      Swal.fire({
        title: `Cupón ${id} borrado con éxito`,
      })
    }
  })
  });

  $('.datatables-basic_cupones tbody').on('click', '.edit_record', function (e) {
    //dt_basic.row($(this).parents('tr')).remove().draw();
    var id_edit = e.target.classList[0]
    if (typeof id_edit =="undefined") {
      return console.log(id_edit)
    }
  window.location.href = `/editar_cupones/${id_edit}`;

  });

  
   $('#reg_cupon').on('click', async (e)=>{
    
    $.ajax({
      url: `/crear_cupones`,
      type: 'POST',
      data: $('#form_add_cupon').serialize(),
      success: function (data, textStatus, jqXHR) {
        $('.datatables-basic_cupones').DataTable().row.add({
          id: data.cupones_let.id,
          nombre_cupon: data.cupones_let.nombre_cupon,
          nombre_proveedor: data.cupones_let.nombre_proveedor,
          cantidad: data.cupones_let.cantidad,
          cantidad_actual: data.cupones_let.cantidad_actual,
          categoria: data.cupones_let.categoria,
          createdAt: data.cupones_let.createdAt,
        })
        .draw();
 $('.modal').modal('hide');
      },
      error: function (jqXHR, textStatus) {
        console.log('error:' + jqXHR)
      }
    });
    
  })
  $('#edit_btn_cupon').on('click', async (e)=>{
    
    $.ajax({
      url: `/editar_cupones`,
      type: 'POST',
      data: $('#form_edit_cupon').serialize(),
      success: function (data, textStatus, jqXHR) {
        $('#array_cupones').val(JSON.stringify(data.cupones_act))
        $('.datatables-basic_cupones').dataTable().fnDestroy();
         $('.datatables-basic_cupones').empty();
        $('.datatables-basic_cupones').html(`<thead>
        <tr>
          <th>id</th>
          <th>Nombre</th>
          <th>Proveedor</th>
          <th>Cantidad total</th>
          <th>Cantidad disponible</th>
          <th>Categoria</th>
          <th>Estado Actual</th>
          <th>Opciones</th>
        </tr>
      </thead>`);
      cargaTablacupones('si')
 $('.modal').modal('hide');
      },
      error: function (jqXHR, textStatus) {
        console.log('error:' + jqXHR)
      }
    });
    
  })
});
  function edit_cupones(id_edit) {
    if (typeof id_edit =="undefined") {
      return console.log(id_edit)
    }
  const data_C = new FormData();
  data_C.append("id", id_edit);
  $.ajax({
    url: `/edit_cupon_id`,
    type: 'POST',
    data: data_C,
    cache: false,
    contentType: false,
    processData: false,
    success: function (data, textStatus, jqXHR) {
   $('#id_cupon').val(data['parsed_cupon']['id'])
   $('#nombre_cupon').val(data['parsed_cupon']['nombre_cupon'])
   $('#nombre_proveedor_edit').val(data['parsed_cupon']['nombre_proveedor'])
  $('#ws_proveedor_edit').val(data['parsed_cupon']['ws_proveedor'])
   $('#fecha_inicio_edit').val(data['parsed_cupon']['fecha_inicio'])
  $('#fecha_final_edit').val(data['parsed_cupon']['fecha_final'])
 $('#cantidad_edit').val(data['parsed_cupon']['cantidad'])
 $('#edit-img5_').val(data['parsed_cupon']['img'])
  $('#dir_proveedor_edit').val(data['parsed_cupon']['ubicacion'])

$('#descripcion_edit').val(data['parsed_cupon']['especial'])
  if ( $("#categoria_edit option[value='" + data['parsed_cupon']['categoria'] + "']").length == 0 ){
  $('#categoria_edit').prepend('<option selected value="' + data['parsed_cupon']['categoria'] + '">' + data['parsed_cupon']['categoria'] + '</option>');  
  }else{
  //  
    $("#categoria_edit option[value='" + data['parsed_cupon']['categoria'] + "']").attr("selected","selected");
    $('#categoria_edit').trigger('change');
  }
  $('#edit_cupon').modal('show')
    },
    error: function (jqXHR, textStatus) {
      console.log('error:' + jqXHR)
    }
  });
  }