/**
 * DataTables Basic
 */
 var GastosList;
 var gastosDT = $('#gastosTableDt'), assetPath = '../../dataPY4/', gastosForm = $('#gastoForm');
async function getGastos(again) {
    GastosList = await fetch('/getGastosLit')
    .then(response => response.json())
    .then(data => {
        return data.listaGastos;
    });
    console.log(GastosList);
    if (again) {
      return
    }
    cargaTabla();
    pedidosbyDay(moment().format('YYYY-MM-DD'),moment().format('YYYY-MM-DD'));
}
async function pedidosbyDay(diaFin,diainicio) {
  let TotalIngresos=0, GastosbyDay=0, gananciasT=0;
  pedidos = await fetch(`/getPedidosbyDaypy4/${moment(diainicio,'DD-MM-YYYY').format('YYYY-MM-DD')}/${moment(diaFin,'DD-MM-YYYY').format('YYYY-MM-DD')}`)
  .then(response => response.json())
  .then(data => {
      return data.pedidos_let;
  });
  pedidos.forEach(element => {
    if (element.status_pedido=="Entregado") {
      TotalIngresos += parseFloat(element.monto_total);
    }    
  });
  let inicio = moment(diainicio,'DD-MM-YYYY').format('YYYY-MM-DD');
  let fin = moment(diaFin,'DD-MM-YYYY').format('YYYY-MM-DD');
  GastosList.forEach(element => {
    if (moment(element.fecha).isBetween(inicio,fin, undefined, '[]')) {
      GastosbyDay += parseFloat(element.monto);
    }    
  });
  gananciasT = TotalIngresos -GastosbyDay; 
  $('#fechaT').text(diaFin + ' hasta '+ diainicio);
  $('#ingresosT').text('$'+TotalIngresos);
  $('#gastosT').text('$'+GastosbyDay);
  $('#gananciasT').text('$'+gananciasT);
}
 function cargaTabla() {  
  
    // DataTable with buttons
    // --------------------------------------------------------------------
  
    if (gastosDT.length) {
      $('.dt-column-search thead tr').clone(true).appendTo('.dt-column-search thead');
      $('.dt-column-search thead tr:eq(0) th').each(function (i) {
        var title = $(this).text();
        $(this).html('<input type="text" class="form-control form-control-sm" placeholder="Buscar ' + title + '" id="'+title+i+'"/>');
    
        $('input', this).on('keyup change', function () {
          $('#filterPosition').val(this.id);
          $('#filterValue').val(this.value);
          if (dt_basic.column(i).search() !== this.value) {
            dt_basic.column(i).search(this.value).draw();
          }
        });
        
      });
      var dt_basic = gastosDT.DataTable({
        data: GastosList,
        columns: [
          { data: 'id' },
          { data: 'tipo' },
          { data: 'personalId' },//2
          { data: 'monto' },
          { data: 'fecha' },
          { data: 'sucursaleId' },
          {   // Actions
            targets: -1,
            title: '',
            orderable: false,
            render: function (data, type, full, meta) {
              return (
               ` <div class="">
                      <a href="#" class="dropdown-toggle text-center text-primary" id="dropdownMenuButton" data-bs-toggle="dropdown">
                        ${feather.icons["more-vertical"].toSvg()}
                      </a>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" data-popper-placement="bottom-start" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(0px, 40px);">
                      <div class="d-inline-flex">
                      <a href="javascript:;" class="${full['id']} dropdown-item delete-record${full['id']}" onclick=\'delete_gasto("${full['id']}")\'>
                     ${feather.icons['trash-2'].toSvg()} 
                      </a>
                      <a href="javascript:;" class="${full['id']} dropdown-item" onclick=\'edit_gasto("${full['id']}")\'>
                      ${feather.icons['file-text'].toSvg()}
                      </a>
                      <a href="javascript:;" class="${full['id']} dropdown-item share_record ${full['id']}" onclick=\'share_record("${full['id']}")\'>
                      ${feather.icons['share-2'].toSvg()}
                      </a>
                      <a id="copyG${full['id']}" class="d-none"></a>
                  </div>`
                 
               //https://alcalina.bwater.mx/referido-bwater/${full['id']}
              );
            }  },
        ],
        columnDefs: [
          {
            // For Checkboxes
            targets: 0,
            orderable: false,
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
            targets: 2,
            render: function (data, type, full, meta) {
              let nombre = 'N/A';
              if (data) {
                nombre = full['personal']['name'] + ' '+ full['personal']['lastName']
              }
              return nombre;
            },
          },
          {
            targets: 3,className:'to_total2',
            render: function (data, type, full, meta) {
              return `<span class="d-none cantidad">${data}</span>$${data}`
            },
          },
          {
            targets: 4,
            render: function (data, type, full, meta) {
             
              return moment(data, 'YYYY-MM-DD').format('DD/MM/YYYY');
            },
          },
          {
            targets: 5,
            render: function (data, type, full, meta) {
              let zona = full['sucursale']['nombre'];
              return zona;
            },
          },

        ],
        order: [[4, 'desc']],
        dom: '<"none"<"head-label"><"dt-action-buttons text-end"B>><""<"col-sm-12 col-md-6"l><"none"f>>t<" d-flex justify-content-between mx-0 row" aa<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
        displayLength: 10,
        lengthMenu: [7, 10, 25, 50, 75, 100,120,130,140,150,200],
  
        language: {
          "decimal": "",
        "emptyTable": "No hay información",
        "info": "Total _TOTAL_ registros",
        "infoEmpty": "Total _TOTAL_ registros",
        "infoFiltered": "(Filtrado de _MAX_ registros totales)",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "Mostrar _MENU_",
        "loadingRecords": "Cargando...",
        "processing": "Procesando...",
        "search": "Buscar:",
        "zeroRecords": "Sin resultados encontrados",
          paginate: {
            // remove previous & next text from pagination
            previous: '&nbsp;',
            next: '&nbsp;'
          }
        },
        drawCallback: function (settings) {
          var api = this.api();
          var rows = api.rows({ page: 'current' }).nodes();
          var last = null;
          let sumaT = 0;
            api.column(3, { page: 'current' }).data().each(function(group, i){
              sumaT +=parseInt(group)
             
          });
          $('tfoot .to_total2').text('$'+sumaT)
        },
      });
      $('div.head-label').html('<h6 class="mb-0">DataTable with Buttons</h6>');
    }

  }
  
   $(function () {
    'use strict';
    getGastos();
    
    // Add New record
    // ? Remove/Update this code as per your requirements ?
  $('#categoria').change(function () {
    console.log($(this).val())
    $('#personalList').addClass('d-none');
    if ($(this).val() == 'NOMINA') {
      $('#personalList').removeClass('d-none');
    }
  })
$('#saveGasto').click(()=>{
  gastosForm.submit();
})

    $("#ad_tag_cliente").on('show.bs.modal', function (e) {
      var triggerLink = $(e.relatedTarget);
      var id_cliente = triggerLink.data("id");
      var title = triggerLink.data("title");
      $("#modal_detail_garrafonesTitle").text(title); 
    //  $("#home_modalBody").append(txt2);
    $("#modal_detail_garrafonesBody").empty() 
   $("#id_ad_tag_cliente").val(id_cliente);
   console.log($("#id_ad_tag_cliente").val())
  });

    /**FIN DOCUMENT READY */
  });
  function edit_gasto(id_edit) {
    if (typeof id_edit =="undefined") {
      return console.log(id_edit)
    }
   //window.location.href = `/editar_pedido/${id_edit2}`;
   console.log(id_edit)
  const data_C = new FormData();
  data_C.append("id", id_edit);
  $.ajax({
    url: `/getGastobyId`,
    type: 'POST',
    data: data_C,
    cache: false,
    contentType: false,
    processData: false,
    success: function (data, textStatus, jqXHR) {
  console.log(data)
  $('#descuento-edit-cliente').addClass('d-none');
  $('#cliente_nuevo_edited').attr('checked', false);  
  $('#id_cliente_edited').val(data['cliente_let']['id'])
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
    if (data['cliente_let']['tipo']=="Negocio" || data['cliente_let']['tipo'] =="Punto de venta") {
      $('#descuento-edit-cliente').removeClass('d-none');
      $('#descuento_edit_gasto1').val(data['cliente_let']['monto_nuevo']);
    }
    if ( data['cliente_let']['nuevo']=="SI" ){
      $('#cliente_nuevo_edited').attr('checked', true);  
      }
  $('#fecha_ultimo_pedido').val(data['cliente_let']['fecha_ultimo_pedido'])
  $('#utimos_botellones_edited').val(data['cliente_let']['ultimos_botellones'])
  
  if ( $("#zona_clientes_edited option[value='" + data['cliente_let']['sucursaleId'] + "']").length == 0 ){
    $('#zona_clientes_edited').prepend('<option selected value="' + data['cliente_let']['sucursaleId'] + '">' + data['cliente_let']['sucursaleId'] + '</option>');  
    }else{
    //  $('#metodo_pago_edit').find('option:selected').remove().end();
      $("#zona_clientes_edited option[value='" + data['cliente_let']['sucursaleId'] + "']").attr("selected", true);
    }
    $('#correo_edit_gasto_edited').val(data['cliente_let']['email'])
  $('#edit_gasto').modal('show')
    },
    error: function (jqXHR, textStatus) {
      console.log('error:' + jqXHR)
    }
  });
  }
  function delete_gasto(id_) {
    if ($('#otro_rol').length) {
      console.log('no eres admin')
      Swal.fire("Función valida solo para directores")
      return
    }
    if (typeof id_ =="undefined") {
      return console.log(id_)
    }
    var id = id_
    Swal.fire({
      title: 'Eliminar',
      text: "Seguro desea eliminar el gasto indicado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      showLoaderOnConfirm: true,
      preConfirm: (de) => {
        return fetch(`/delete_gasto/${id}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          }).then((data) => {
            console.log(data);
              if ($('#filterPosition').val() != "") {
                console.log($('#filterValue').val())
               $(`#${$('#filterPosition').val()}`).val($('#filterValue').val()).trigger('change');
             }
       gastosDT.DataTable().row($(`#gastosTableDt tbody .delete-record${id}`).parents('tr')).remove().draw();
        Swal.fire({
          title: `Gasto ${id} borrado con éxito`,
        })
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
      }
    })
  }

  if (gastosForm.length) {
    gastosForm.validate({
      errorClass: 'error',
      rules: {
        'categoria': {
          required: true
        },
        'fecha': {
          required: true
        },
        'monto_gastos': {
          required: true
        },
      }
    });

    gastosForm.on('submit', function (e) {
      var isValid = gastosForm.valid();
      e.preventDefault();
      let urlGo = 'updategasto';
      if ($('#idGasto').val()=='') {
        urlGo = 'createGasto'
      }
      if (isValid) {
        $.ajax({
          url: `/${urlGo}`,
          type: 'POST',
          data: gastosForm.serialize(),
          success: async function (data, textStatus, jqXHR) {
          console.log(data);
          if (data.listaGastos) {
            gastosDT.DataTable().row.add(data.listaGastos).draw();
            getGastos('again');
            Swal.fire({
              icon: 'success',
              title: 'Gasto agregado con éxito',
              showConfirmButton: false,
              timer: 1500
            });
            gastosForm[0].reset();
            $('#addGasto_modal').modal('hide');
            return
          }
          if (data.updateCompany == 1) {
            Swal.fire({
              icon: 'success',
              title: 'Gasto actualizado con éxito',
              showConfirmButton: false,
              timer: 1500
            })
          }
          if(data.verificaGastoRepeat){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'El gasto ya se encuentra registrado, para el dia y categoria indicados, verificar',
            })
          }
          },
          error: function (jqXHR, textStatus) {
            console.log('error:' + jqXHR)
          }
        });

      }
    });
  }