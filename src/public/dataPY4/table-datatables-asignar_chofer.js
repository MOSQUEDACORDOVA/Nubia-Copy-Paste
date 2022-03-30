/**
 * DataTables Basic
 */
 


var minDateas,maxDateas
 var dt_basic_table_asig_chofer = $('.datatables-basic_asig_chofer'),
 basic_usuarios = $('.datatables-basic_usuarios'),
   dt_date_table = $('.dt-date'),
   assetPath = '../../dataPY4/';
   var filterByDateasig = function (column, startDate, endDate) {
    // Custom filter syntax requires pushing the new filter to the global filter array
    $.fn.dataTableExt.afnFiltering.push(function (oSettings, aData, iDataIndex) {
      var rowDate = normalizeDate(aData[column]),
        start = normalizeDate(startDate),
        end = normalizeDate(endDate);
        var  min2 = minDateas.val();
        var max2 = maxDateas.val();
        let f = aData[4]
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
function cargaTabla(editada) {

  let valor_asig_chofer = $('#asignados').val()
  let array_asig_chofer = ""
  if (editada) {
    
    array_asig_chofer = JSON.parse(valor_asig_chofer)

  }else{
    array_asig_chofer = JSON.parse(valor_asig_chofer.replace(/&quot;/g,'"'))
  }
 if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
  }

  // DataTable with buttons
  // --------------------------------------------------------------------
 
  console.log(array_asig_chofer)
  if (dt_basic_table_asig_chofer.length) {
     console.log('aqui')
    var dt_basic_asig_chofer = dt_basic_table_asig_chofer.DataTable({
      data: array_asig_chofer,
      columns: [
        { data: 'id' },
        { data: 'personalId' },
        { data: 'vehiculoId' }, // used for sorting so will hide this column
        { data: 'sucursale.nombre' },
        { data: 'createdAt'    },
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
              '<a href="javascript:;" class="'+full['id']+' dropdown-item" onclick=\'edit_asig_chofer("'+full['id']+'")\'>' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>'  
            );
          }  },
      ],
      columnDefs: [
        {targets: 1, render: function (data, type, full) {
          let nombre = full['personal']['name']+ " "+ full['personal']['lastName']
          return nombre
        }
      },
      {targets: 2, render: function (data, type, full) {
         let vehiculo = full['vehiculo']['tipo'] +" "+ full['vehiculo']['matricula']
         return vehiculo
      }},
        {targets:4, render: function (data, type, full) {
          return moment(data).format('DD/MM/YYYY')
        
        }
      }
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
  $('#min_asig, #max_asig').on('change', function () {
    filterByDateasig(5); // We call our filter function
    dt_basic_asig_chofer.draw();
    });

}

 $(function () {
  'use strict';
  cargaTabla()
  minDateas = new DateTime($('#min_asig'), {
    format: 'DD/MM/YYYY'
});
maxDateas = new DateTime($('#max_asig'), {
    format: 'DD/MM/YYYY'
});

  // Add New record
  // ? Remove/Update this code as per your requirements ?
  var count = 101;


  $('.odd').addClass('selector');
  $('.even').addClass('selector'); 
  // Delete Record
  $('.datatables-basic_asig_chofer tbody').on('click', '.delete-record', function (e) {
    if ($('#otro_rol').length) {
      console.log('no eres admin')
      Swal.fire("Función valida solo para directores")
      return
    }
   var id = e.target.classList[0]
   Swal.fire({
    title: 'Eliminar',
    text: "Seguro desea eliminar la asignación indicada",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return fetch(`/delete_asig_chofer/${id}`)
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
      $('.datatables-basic_asig_chofer').DataTable().row($(this).parents('tr')).remove().draw();

      Swal.fire({
        title: `Asignación #${id} borrado con éxito`,
      })
    }
  })
  });

  $('.datatables-basic_asig_chofer tbody').on('click', '.edit_record', function (e) {
    //dt_basic.row($(this).parents('tr')).remove().draw();
    var id_edit = e.target.classList[0]
    console.log(id_edit)
    if (typeof id_edit =="undefined") {
      return console.log(id_edit)
    }
  window.location.href = `/editar_asig_chofer/${id_edit}`;

  });

   $('#btn_asignar').on('click', async (e)=>{
    
    console.log('entro')
    $.ajax({
      url: `/save_asig_chofer_py4`,
      type: 'POST',
      data: $('#form_asig_chofer').serialize(),
      success: function (data, textStatus, jqXHR) {
        console.log(data)
        $('#asignados').val(JSON.stringify(data.asignados_let))
        $('.datatables-basic_asig_chofer').dataTable().fnDestroy();
         $('.datatables-basic_asig_chofer').empty();
        $('.datatables-basic_asig_chofer').html(`<thead>
        <tr>
          <th>id</th>
          <th>Chofer</th>
          <th>Vehiculo Asignado</th>
          <th>Zona</th>
          <th>Fecha de asignación</th>
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
  $('#btn_asignar_edit').on('click', async (e)=>{
    
    console.log('entro')
    $.ajax({
      url: `/save_asig_chofer_edit`,
      type: 'POST',
      data: $('#form_asig_chofer_editd').serialize(),
      success: function (data, textStatus, jqXHR) {
        console.log(data)
        $('#asignados').val(JSON.stringify(data.asignados_let))
        $('.datatables-basic_asig_chofer').dataTable().fnDestroy();
         $('.datatables-basic_asig_chofer').empty();
        $('.datatables-basic_asig_chofer').html(`<thead>
        <tr>
          <th>id</th>
          <th>Chofer</th>
          <th>Vehiculo Asignado</th>
          <th>Zona</th>
          <th>Fecha de asignación</th>
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
function edit_asig_chofer(id_edit) {
  if (typeof id_edit =="undefined") {
    return console.log(id_edit)
  }
 //window.location.href = `/editar_pedido/${id_edit2}`;
 console.log(id_edit)
const data_C = new FormData();
data_C.append("id", id_edit);
$.ajax({
  url: `/editar_asig_chofer`,
  type: 'POST',
  data: data_C,
  cache: false,
  contentType: false,
  processData: false,
  success: function (data, textStatus, jqXHR) {
console.log(data)
$('#id_asig').val(data['asig_chofer_let']['id'])
if ( $("#edit_chofer_carga option[value='" + data['asig_chofer_let']['personalId'] + "']").length == 0 ){
console.log(data['asig_chofer_let']['tipo'])
$('#edit_chofer_carga').prepend('<option selected value="' + data['asig_chofer_let']['tipo'] + '">' + data['asig_chofer_let']['tipo'] + '</option>');  
}else{
//  $('#tipo_edit').find('option:selected').remove().end();
  $("#edit_chofer_carga option[value='" + data['asig_chofer_let']['personalId'] + "']").attr("selected", true);
}

if ( $("#vehiculo_asig_edit option[value='" + data['asig_chofer_let']['vehiculoId'] + "']").length == 0 ){
  console.log(data['asig_chofer_let']['metodo_pago'])
  $('#vehiculo_asig_edit').prepend('<option selected value="' + data['asig_chofer_let']['sucursaleId'] + '">' + data['asig_chofer_let']['sucursaleId'] + '</option>');  
  }else{
  //  $('#metodo_pago_edit').find('option:selected').remove().end();
    $("#vehiculo_asig_edit option[value='" + data['asig_chofer_let']['vehiculoId'] + "']").attr("selected", true);
  }

  if ( $("#edit_zona_asig option[value='" + data['asig_chofer_let']['sucursaleId'] + "']").length == 0 ){
    console.log(data['asig_chofer_let']['metodo_pago'])
    $('#edit_zona_asig').prepend('<option selected value="' + data['asig_chofer_let']['sucursaleId'] + '">' + data['asig_chofer_let']['sucursaleId'] + '</option>');  
    }else{
    //  $('#metodo_pago_edit').find('option:selected').remove().end();
      $("#edit_zona_asig option[value='" + data['asig_chofer_let']['sucursaleId'] + "']").attr("selected", true);
    }

$('#edit_asignar_chofer').modal('show')
  },
  error: function (jqXHR, textStatus) {
    console.log('error:' + jqXHR)
  }
});
}
