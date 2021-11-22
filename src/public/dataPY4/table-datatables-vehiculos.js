/**
 * DataTables Basic
 */
function cargaTabla(edit) {
  let valor_vehiculos = $('#array_vehiculos').val()
  let array_vehiculos =""
  if (edit) {
    
    array_vehiculos = JSON.parse(valor_vehiculos)

  }else{
    array_vehiculos = JSON.parse(valor_vehiculos.replace(/&quot;/g,'"'))
  }


let suc = $('#array_sucursales').val()

var sucursale_pa = JSON.parse(suc.replace(/&quot;/g,'"'))
 console.log(sucursale_pa)   

  var dt_basic_table_vehiculos = $('.datatables-basic_vehiculos'),
    dt_date_table = $('.dt-date'),
    assetPath = '../../dataPY4/';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
  }

  // DataTable with buttons
  // --------------------------------------------------------------------
  console.log('aqui')
  if (dt_basic_table_vehiculos.length) {
    
    var dt_basic_vehiculos = dt_basic_table_vehiculos.DataTable({
      data: array_vehiculos,
      columns: [
        { data: 'id' },
        { data: 'createdAt' },
        { data: 'matricula' }, // used for sorting so will hide this column
        { data: 'marca' },
        { data: 'modelo'},
        { data: 'anio' },
        { data: 'tipo' },
        { data: 'capacidad'},
        { data: 'status' },
        { data: 'sucursal' },
        {   // Actions
          targets: -1,
          title: 'Opciones',
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-flex">' +
              '<a href="javascript:;" class="'+full['id']+' dropdown-item delete-record '+full['id']+'" onclick=\'delete_("'+full['id']+'")\'>' +
              feather.icons['trash-2'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>'+
              '<a href="javascript:;" class="'+full['id']+' dropdown-item" onclick=\'edit_("'+full['id']+'")\'>' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>'  
            );
          }  },
      ],
      columnDefs: [
        {
          targets: 1,
          render:function(data){
            return moment(data).format('L');
          }
        },
         {
          targets: 9,
          render:function(data, type, full, meta){
            let nombre_suc = ""
            for (let i = 0; i < sucursale_pa.length; i++) {
                if (sucursale_pa[i]['id'] == data) {
                  nombre_suc = sucursale_pa[i]['nombre']
                }
              
            }
            return nombre_suc;
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
 $(function () {
  'use strict';
cargaTabla()


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
      dt_basic_vehiculos.row
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
  $('#reg_vehiculos').on('click', async (e)=>{


    $.ajax({
      url: `/save_vehiculo_py4`,
      type: 'POST',
      data: $('#save_vehiculo_py4').serialize(),
      success: function (data, textStatus, jqXHR) {
        console.log(data)
  //$('#etiquetas_').val(JSON.stringify(data.etiquetas_let))
//   $('#exampleEtiquetas').dataTable().fnDestroy();
//   $('#exampleEtiquetas').empty();
//   $('#exampleEtiquetas').append(` <thead>
//   <tr>
//       <th>Id</th>
//       <th>Nombre de etiqueta</th>
//       <th>Color</th>
//       <th>Opciones</th>
//   </tr>
// </thead>`);
$('.datatables-basic_vehiculos').DataTable().row.add({
  id: data.save_veh.id,
createdAt: data.save_veh.createdAt,
matricula: data.save_veh.matricula  ,
marca: data.save_veh.marca  ,
modelo: data.save_veh.modelo ,
anio: data.save_veh.anio  ,
tipo: data.save_veh.tipo  ,
capacidad: data.save_veh.capacidad  ,
status: data.save_veh.status  ,
sucursal: data.save_veh.sucursaleId  ,
})
.draw();
//cargaTablaEtiquetas('si')
 $('.modal').modal('hide');
      },
      error: function (jqXHR, textStatus) {
        console.log('error:' + jqXHR)
      }
    });
    
  })
  $('#edit_vehiculosbtn').on('click', async (e)=>{
    
    console.log('entro')
    $.ajax({
      url: `/save_vehiculos_py4_edit`,
      type: 'POST',
      data: $('#save_vehiculos_py4_edit').serialize(),
      success: function (data, textStatus, jqXHR) {
        console.log(data)
        $('#array_vehiculos').val(JSON.stringify(data.vehiculos_let))
        $('.datatables-basic_vehiculos').dataTable().fnDestroy();
         $('.datatables-basic_vehiculos').empty();
        $('.datatables-basic_vehiculos').html(`<thead>
        <tr>
          <th>id</th>
          <th>Fecha Registro</th>
          <th>Matricula</th>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Año</th>
          <th>Tipo</th>
          <th>Capacidad</th>
          <th>Status</th>
          <th>Sucursal</th>
          <th>Opciones</th>
        </tr>
      </thead>`);
      cargaTabla('si')
 $('.modal').modal('hide');
      },
      error: function (jqXHR, textStatus) {
        console.log('error:' + jqXHR)
      }
    });
    
  })

});
function edit_(id_edit) {
  if (typeof id_edit =="undefined") {
    return console.log(id_edit)
  }
 //window.location.href = `/editar_pedido/${id_edit2}`;
 console.log(id_edit)
const data_C = new FormData();
data_C.append("id", id_edit);
$.ajax({
  url: `/editar_vehiculos`,
  type: 'POST',
  data: data_C,
  cache: false,
  contentType: false,
  processData: false,
  success: function (data, textStatus, jqXHR) {
console.log(data)
$('#id_vehiculo').val(data['vehiculos_let']['id'])
$('#edit_matricula').val(data['vehiculos_let']['matricula'])
$('#edit_marca').val(data['vehiculos_let']['marca'])
$('#edit_modelo').val(data['vehiculos_let']['modelo'])
$('#edit_anio').val(data['vehiculos_let']['anio'])
$('#edit_tipo').val(data['vehiculos_let']['tipo'])
$('#edit_capacidad').val(data['vehiculos_let']['capacidad'])
if ( $("#edit_zona option[value='" + data['vehiculos_let']['id'] + "']").length == 0 ){
  console.log(data['vehiculos_let']['id'])
  $('#edit_zona').prepend('<option selected value="' + data['vehiculos_let']['id'] + '">' + data['vehiculos_let']['id'] + '</option>');  
  }else{
    $("#edit_zona option[value='" + data['vehiculos_let']['id'] + "']").attr("selected", true);
  }
$('#edit_veh').modal('show')
  },
  error: function (jqXHR, textStatus) {
    console.log('error:' + jqXHR)
  }
});
}
function delete_(id_edit) {
  if ($('#otro_rol').length) {
    console.log('no eres admin')
    Swal.fire("Función valida solo para directores")
    return
  }
  if (typeof id_edit =="undefined") {
    return console.log(id_edit)
  }
  var id = id_edit
  Swal.fire({
    title: 'Eliminar',
    text: "Seguro desea eliminar al vehiculo indicado",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return fetch(`/delete_vehiculos/${id}`)
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
      $('.datatables-basic_vehiculos').DataTable().row($('.datatables-basic_vehiculos tbody .delete-record').parents('tr')).remove().draw();
      Swal.fire({
        title: `Vehículo ${id} borrado con éxito`,
      })
    }
  })
}