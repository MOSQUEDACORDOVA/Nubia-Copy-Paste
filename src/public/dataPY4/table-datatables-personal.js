/**
 * DataTables Basic
 */
 



 var dt_basic_table_personal = $('.datatables-basic_personal'),
 basic_usuarios = $('.datatables-basic_usuarios'),
   dt_date_table = $('.dt-date'),
   assetPath = '../../dataPY4/';
function cargaTablaPersonal(editada) {

  let valor_personal = $('#array_personal').val()
  let array_personal = ""
  if (editada) {
    
    array_personal = JSON.parse(valor_personal)

  }else{
    array_personal = JSON.parse(valor_personal.replace(/&quot;/g,'"'))
  }
 if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
  }

  // DataTable with buttons
  // --------------------------------------------------------------------
  console.log('aqui')
  if (dt_basic_table_personal.length) {
    
    var dt_basic_personal = dt_basic_table_personal.DataTable({
      data: array_personal,
      columns: [
        { data: 'id' },
        { data: 'firstName' },
        { data: 'correo' }, // used for sorting so will hide this column
        { data: 'cargo' },
        { data: 'salario',
        render: function (data, type, full, meta) {
          return (
            '$'+full['salario']  
          );
        } 
      },
        { data: 'telefono' },
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
              '<a href="javascript:;" class="'+full['id']+' dropdown-item" onclick=\'edit_personal("'+full['id']+'")\'>' +
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
            var $user_img = "-",
              $name = full['name'] + " " + full['lastName'],
              $post = full['cargo'];
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
              '<small class="emp_post text-truncate text-muted">' +
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

function cargaTablaUsuarios(edit) {
  let usuarios = $('#array_usuarios').val()
  let usuarios_array = ""
  if (edit) {
    
    usuarios_array = JSON.parse(usuarios)

  }else{
    usuarios_array = JSON.parse(usuarios.replace(/&quot;/g,'"'))
  }
console.log(usuarios_array) 

let sucursales = $('#array_sucursales').val()
let array_sucursales = JSON.parse(sucursales.replace(/&quot;/g,'"'))
console.log(array_sucursales)  
  if (basic_usuarios.length) {
    
    var dt_basic_users= basic_usuarios.DataTable({
      data: usuarios_array,
      columns: [
        { data: 'id' },
        { data: 'name' },
        { data: 'email' }, // used for sorting so will hide this column
        { data: 'tipo' },
        { data: 'sucursaleId' },
        {   // Actions
          targets: -1,
          title: 'Opciones',
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-flex">' +
              // '<a href="javascript:;" class="'+full['id']+' dropdown-item delete-record '+full['id']+'">' +
              // feather.icons['trash-2'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              // '</a>'+
              '<a href="javascript:;" class="'+full['id']+' dropdown-item" onclick=\'edit_usuario("'+full['id']+'")\'>' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>' +
              '<a href="javascript:;" class="'+full['id']+' dropdown-item" onclick=\'cambiapass("'+full['id']+'")\'>' +
              feather.icons['key'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>' 
            );
          }  },
      ],
      columnDefs: [
        {
          // Avatar image/badge, Name and post
          targets: 1,
          render: function (data, type, full, meta) {
            var $user_img = "-",
              $name = full['name'] ,
              $post = full['tipo'];
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
              '<small class="emp_post text-truncate text-muted">' +
              $post +
              '</small>' +
              '</div>' +
              '</div>';
            return $row_output;
          }
        },
        {
          // Avatar image/badge, Name and post
          targets: 4,
          render: function (data, type, full, meta) {
                  let sucursal_name=""
for (let i = 0; i < array_sucursales.length; i++) {
  if (array_sucursales[i]['id']==data) {
    sucursal_name =array_sucursales[i]['nombre']  
  }
  
}
return (
  '<span class="badge rounded-pill badge-light-success' +
  '" >' +
  sucursal_name +
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
      order: [[0, 'desc']],
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
  cargaTablaPersonal()
  cargaTablaUsuarios()


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
      dt_basic_personal.row
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
  $('.datatables-basic_personal tbody').on('click', '.delete-record', function (e) {
    if ($('#otro_rol').length) {
      console.log('no eres admin')
      Swal.fire("Función valida solo para directores")
      return
    }
   var id = e.target.classList[0]
   Swal.fire({
    title: 'Eliminar',
    text: "Seguro desea eliminar al personal indicado",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return fetch(`/delete_personal/${id}`)
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
      $('.datatables-basic_personal').DataTable().row($(this).parents('tr')).remove().draw();

      Swal.fire({
        title: `Personal ${id} borrado con éxito`,
      })
    }
  })
  });

  $('.datatables-basic_personal tbody').on('click', '.edit_record', function (e) {
    //dt_basic.row($(this).parents('tr')).remove().draw();
    var id_edit = e.target.classList[0]
    console.log(id_edit)
    if (typeof id_edit =="undefined") {
      return console.log(id_edit)
    }
  window.location.href = `/editar_personal/${id_edit}`;

  });

  $('.datatables-basic_usuarios tbody').on('click', '.delete-record', function (e) {
    if ($('#otro_rol').length) {
      console.log('no eres admin')
      Swal.fire("Función valida solo para directores")
      return
    }
    var id = e.target.classList[0]
    Swal.fire({
      title: 'Eliminar',
      text: "Seguro desea eliminar al Usuario indicado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return fetch(`/delete_usuario/${id}`)
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
        $('#exampleEtiquetas').DataTable().row($(this).parents('tr')).remove().draw();
        $("#color_tag").find('option').not(':first').remove();
        $.each(opts, function(i, d) {
          console.log(d)
          // You will need to alter the below to get the right values from your json object.  Guessing that d.id / d.modelName are columns in your carModels data
          $('#color_tag').append('<option value="' + d.id + '">' + d.etiquetas + '</option>');
      });
        Swal.fire({
          title: `Etiqueta ${id} borrada con éxito`,
        })
      }
    })
   });
   $('#save_personal_py4btn').on('click', async (e)=>{
    
    console.log('entro')
    $.ajax({
      url: `/save_personal_py4`,
      type: 'POST',
      data: $('#save_personal_py4').serialize(),
      success: function (data, textStatus, jqXHR) {
        console.log(data)
        $('#array_personal').val(JSON.stringify(data.personal_let))
        $('.datatables-basic_personal').dataTable().fnDestroy();
         $('.datatables-basic_personal').empty();
        $('.datatables-basic_personal').html(`<thead>
        <tr>
          <th>id</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Cargo</th>
          <th>Salario</th>
          <th>Teléfono</th>
          <th>Opciones</th>
        </tr>
      </thead>`);
      cargaTablaPersonal('si')
 $('.modal').modal('hide');
      },
      error: function (jqXHR, textStatus) {
        console.log('error:' + jqXHR)
      }
    });
    
  })
   $('#reg_personal').on('click', async (e)=>{
    if ($('#tipo_reg_per').val() =="") {
      Swal.fire('Debe seleccionar un tipo')
      return
    }
    if ($('#reg_per_nombre').val() =="") {
      Swal.fire('Debe colocar nombre')
      return
    }
    if ($('#register_email_pers').val() =="") {
      Swal.fire('Debe colocar un email')
      return
    }
    if ($('#reg_perspassword').val() =="") {
      Swal.fire('Debe colocar un password')
      return
    }
    if ($('#reg_pers_zona').val() =="Seleccione una Zona") {
      Swal.fire('Debe seleccionar una Zona')
      return
    }
    $.ajax({
      url: `/registrar_usuario`,
      type: 'POST',
      data: $('#reguserPy4').serialize(),
      success: function (data, textStatus, jqXHR) {
        console.log(data)

//cargaTablaEtiquetas('si')
 $('.modal').modal('hide');
      },
      error: function (jqXHR, textStatus) {
        console.log('error:' + jqXHR)
      }
    });
    
  })
  $('#edit_perso_user').on('click', async (e)=>{
    
    if ($('#tipo_edit_per').val() =="") {
      Swal.fire('Debe seleccionar un tipo')
      return
    }
    if ($('#edit_per_nombre').val() =="") {
      Swal.fire('Debe colocar nombre')
      return
    }
    if ($('#edit_email_pers').val() =="") {
      Swal.fire('Debe colocar un email')
      return
    }
    if ($('#edit_perspassword').val() =="") {
      Swal.fire('Debe colocar un password')
      return
    }
    if ($('#edit_pers_zona').val() =="Seleccione una Zona") {
      Swal.fire('Debe seleccionar una Zona')
      return
    }
    console.log('entro')
    $.ajax({
      url: `/save_usuarios_py4_edit`,
      type: 'POST',
      data: $('#edit_user_form').serialize(),
      success: function (data, textStatus, jqXHR) {
        console.log(data)
        $('#array_usuarios').val(JSON.stringify(data.usuarios_let))
        $('.datatables-basic_usuarios').dataTable().fnDestroy();
         $('.datatables-basic_usuarios').empty();
        $('.datatables-basic_usuarios').html(`<thead>
        <tr>
          <th>id</th>
          <th>Usuario</th>
          <th>Email</th>
          <th>Tipo</th>
          <th>Zona</th>
          <th>Opciones</th>
        </tr>
      </thead>`);
cargaTablaUsuarios('si')
 $('.modal').modal('hide');
      },
      error: function (jqXHR, textStatus) {
        console.log('error:' + jqXHR)
      }
    });
    
  })
  $('#cambiapass_save').on('click', async (e)=>{
    
    if ($('#pass').val() =="") {
      Swal.fire('Debe colocar una contraseña nueva')
      return
    }
    if ($('#pass_confirm').val() =="") {
      Swal.fire('Debe confirmar la contraseña')
      return
    }

    if ($('#pass').val() != $('#pass_confirm').val()) {
      Swal.fire('La nueva contraseña y su confirmación NO son iguales, verifique')
      return
    }
    console.log('entro')
    $.ajax({
      url: `/cambia_pass`,
      type: 'POST',
      data: $('#cambia_pass_form').serialize(),
      success: function (data, textStatus, jqXHR) {
        console.log(data)

        $('#array_usuarios').val(JSON.stringify(data.usuarios_let))
        $('.datatables-basic_usuarios').dataTable().fnDestroy();
         $('.datatables-basic_usuarios').empty();
        $('.datatables-basic_usuarios').html(`<thead>
        <tr>
          <th>id</th>
          <th>Usuario</th>
          <th>Email</th>
          <th>Tipo</th>
          <th>Zona</th>
          <th>Opciones</th>
        </tr>
      </thead>`);
cargaTablaUsuarios('si')
 $('.modal').modal('hide');
 Swal.fire('Se actualizó la nueva contraseña con éxito')
      },
      error: function (jqXHR, textStatus) {
        console.log('error:' + jqXHR)
      }
    });
    
  })
  $('#edit_personal_save').on('click', async (e)=>{
    
    console.log('entro')
    $.ajax({
      url: `/save_personal_py4_edit`,
      type: 'POST',
      data: $('#save_personal_py4_edit').serialize(),
      success: function (data, textStatus, jqXHR) {
        console.log(data)
        $('#array_personal').val(JSON.stringify(data.personal_let))
        $('.datatables-basic_personal').dataTable().fnDestroy();
         $('.datatables-basic_personal').empty();
        $('.datatables-basic_personal').html(`<thead>
        <tr>
          <th>id</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Cargo</th>
          <th>Salario</th>
          <th>Teléfono</th>
          <th>Opciones</th>
        </tr>
      </thead>`);
      cargaTablaPersonal('si')
 $('.modal').modal('hide');
      },
      error: function (jqXHR, textStatus) {
        console.log('error:' + jqXHR)
      }
    });
    
  })
});
function edit_usuario(id_edit) {
  if (typeof id_edit =="undefined") {
    return console.log(id_edit)
  }
 //window.location.href = `/editar_pedido/${id_edit2}`;
 console.log(id_edit)
const data_C = new FormData();
data_C.append("id", id_edit);
$.ajax({
  url: `/editar_usuario`,
  type: 'POST',
  data: data_C,
  cache: false,
  contentType: false,
  processData: false,
  success: function (data, textStatus, jqXHR) {
console.log(data)

if ( $("#tipo_edit_per option[value='" + data['usuarios_let']['tipo'] + "']").length == 0 ){
console.log(data['usuarios_let']['tipo'])
$('#tipo_edit_per').prepend('<option selected value="' + data['usuarios_let']['tipo'] + '">' + data['usuarios_let']['tipo'] + '</option>');  
}else{
//  $('#tipo_edit').find('option:selected').remove().end();
  $("#tipo_edit_per option[value='" + data['usuarios_let']['tipo'] + "']").attr("selected", true);
}
$('#edit_per_id').val(data['usuarios_let']['id'])
$('#edit_per_nombre').val(data['usuarios_let']['name'])

$('#edit_email_pers').val(data['usuarios_let']['email'])
// $('#edit_perspassword').val(data['usuarios_let']['garrafones_prestamos'])
if ( $("#edit_pers_zona option[value='" + data['usuarios_let']['sucursaleId'] + "']").length == 0 ){
  console.log(data['usuarios_let']['metodo_pago'])
  $('#edit_pers_zona').prepend('<option selected value="' + data['usuarios_let']['sucursaleId'] + '">' + data['usuarios_let']['sucursaleId'] + '</option>');  
  }else{
  //  $('#metodo_pago_edit').find('option:selected').remove().end();
    $("#edit_pers_zona option[value='" + data['usuarios_let']['sucursaleId'] + "']").attr("selected", true);
  }
$('#edit_user').modal('show')
  },
  error: function (jqXHR, textStatus) {
    console.log('error:' + jqXHR)
  }
});
}
async function cambioZona(id, zona) {
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
       if (value === zona) {
         resolve('Debe seleccionar un estado diferente')
       } else {
          resolve()
       }
     })
   }
 })
 
 if (estado) {
   console.log(estado)   
   const data_C = new FormData();
   data_C.append("id", id);
   data_C.append("status", estado);
   $.ajax({
     url: `/cambia_zona_user`,
     type: 'POST',
     data: data_C,
     cache: false,
     contentType: false,
     processData: false,
     success: function (data, textStatus, jqXHR) {
 console.log(data)
 $('#array_usuarios').val(JSON.stringify(data.usuarios_let))
 $('.datatables-basic_usuarios').dataTable().fnDestroy();
  $('.datatables-basic_usuarios').empty();
 $('.datatables-basic_usuarios').html(`<thead>
 <tr>
   <th>id</th>
   <th>Usuario</th>
   <th>Email</th>
   <th>Tipo</th>
   <th>Zona</th>
   <th>Opciones</th>
 </tr>
</thead>`);
cargaTablaUsuarios('si')
     },
     error: function (jqXHR, textStatus) {
       console.log('error:' + jqXHR)
     }
   });
 
 
 // window.location.href = `/cambiaS_pedido/${id}/${estado}`;
 }
  }
  function edit_personal(id_edit) {
    if (typeof id_edit =="undefined") {
      return console.log(id_edit)
    }
   //window.location.href = `/editar_pedido/${id_edit2}`;
   console.log(id_edit)
  const data_C = new FormData();
  data_C.append("id", id_edit);
  $.ajax({
    url: `/editar_personal_id`,
    type: 'POST',
    data: data_C,
    cache: false,
    contentType: false,
    processData: false,
    success: function (data, textStatus, jqXHR) {
  console.log(data)
   $('#edit_pers_id').val(data['personal_let']['id'])
    $('#edit_personal_firtname').val(data['personal_let']['name'])
  $('#edit_personal_lastname').val(data['personal_let']['lastName'])
 $('#edit_personal_direccion').val(data['personal_let']['direccion'])

  if ( $("#edit_personal_cargo option[value='" + data['personal_let']['cargo'] + "']").length == 0 ){
  console.log(data['personal_let']['cargo'])
  $('#edit_personal_cargo').prepend('<option selected value="' + data['personal_let']['cargo'] + '">' + data['personal_let']['cargo'] + '</option>');  
  }else{
  //  $('#cargo_edit').find('option:selected').remove().end();
    $("#edit_personal_cargo option[value='" + data['personal_let']['cargo'] + "']").attr("selected", true);
  }

  if ( $("#select_vehiculo_edit_personal option[value='" + data['personal_let']['vehiculoId'] + "']").length == 0 ){
    console.log(data['personal_let']['vehiculoId'])
    $('#select_vehiculo_edit_personal').prepend('<option selected value="' + data['personal_let']['vehiculoId'] + '">' + data['personal_let']['vehiculoId'] + '</option>');  
    }else{
    //  $('#vehiculoId_edit').find('option:selected').remove().end();
      $("#select_vehiculo_edit_personal option[value='" + data['personal_let']['vehiculoId'] + "']").attr("selected", true);
    }

    $('#edit_personal_ingreso').val(data['personal_let']['fecha_ingreso'])
    $('#edit_personal_salario').val(data['personal_let']['salario'])
  $('#edit_personal_tlf').val(data['personal_let']['telefono'])
 $('#edit_personal_correo').val(data['personal_let']['correo'])

 
  if ( $("#edit_perso_zona option[value='" + data['personal_let']['sucursaleId'] + "']").length == 0 ){
    console.log(data['personal_let']['metodo_pago'])
    $('#edit_perso_zona').prepend('<option selected value="' + data['personal_let']['sucursaleId'] + '">' + data['personal_let']['sucursaleId'] + '</option>');  
    }else{
    //  $('#metodo_pago_edit').find('option:selected').remove().end();
      $("#edit_perso_zona option[value='" + data['personal_let']['sucursaleId'] + "']").attr("selected", true);
    }

  $('#editar_personal').modal('show')
    },
    error: function (jqXHR, textStatus) {
      console.log('error:' + jqXHR)
    }
  });
  }
  function cambiapass(id_edit) {
    if (typeof id_edit =="undefined") {
      return console.log(id_edit)
    }
   //window.location.href = `/editar_pedido/${id_edit2}`;
   console.log(id_edit)
  const data_C = new FormData();
  data_C.append("id", id_edit);
  $.ajax({
    url: `/editar_usuario`,
    type: 'POST',
    data: data_C,
    cache: false,
    contentType: false,
    processData: false,
    success: function (data, textStatus, jqXHR) {
  console.log(data)
   $('#cambia_pass_id').val(data['usuarios_let']['id'])

  $('#cambiapassmodal').modal('show')
    },
    error: function (jqXHR, textStatus) {
      console.log('error:' + jqXHR)
    }
  });
  }