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
              '<a href="javascript:;" class="'+full['id']+' dropdown-item delete-record '+full['id']+'">' +
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
  $('.datatables-basic_vehiculos tbody').on('click', '.delete-record', function (e) {
   //dt_basic.row($(this).parents('tr')).remove().draw();
   var id = e.target.classList[0]
   Swal.fire({
     title: 'Eliminar',
     text: "Seguro desea eliminar al vehiculos indicado",
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     cancelButtonText: 'Cancelar',
     confirmButtonText: 'Eliminar'
   }).then((result) => {
     if (result.isConfirmed) {
       window.location.href = `/delete_vehiculos/${id}`;
     }
   })
  });

  $('.datatables-basic_vehiculos tbody').on('click', '.edit_record', function (e) {
    //dt_basic.row($(this).parents('tr')).remove().draw();
    var id_edit = e.target.classList[0]
    console.log(id_edit)
    if (typeof id_edit =="undefined") {
      return console.log(id_edit)
    }
  window.location.href = `/editar_vehiculos/${id_edit}`;

  });

});
