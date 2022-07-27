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
  let ventaBruta=0, porVerificar=0,GastosbyDay=0, gananciasT=0, pagados = 0;
  pedidos = await fetch(`/getPedidosbyDaypy4/${moment(diainicio,'YYYY-MM-DD').format('YYYY-MM-DD')}/${moment(diaFin,'YYYY-MM-DD').format('YYYY-MM-DD')}`)
  .then(response => response.json())
  .then(data => {
      return data.pedidos_let;
  });
  pedidos.forEach(element => {
    if (element.status_pedido=="Entregado") {
      ventaBruta += parseFloat(element.monto_total);
    }    
    if (element.status_pedido=="Entregado" && element.status_pago == "Por verificar") {
      porVerificar += parseFloat(element.monto_total);
    }    
    if (element.status_pedido=="Entregado" && element.status_pago == "Pagado") {
      pagados += parseFloat(element.monto_total);
    }    
  });
  let inicio = moment(diainicio,'YYYY-MM-DD').format('YYYY-MM-DD');
  let fin = moment(diaFin,'YYYY-MM-DD').format('YYYY-MM-DD');
  GastosList.forEach(element => {
    if (moment(element.fecha).isBetween(inicio,fin, undefined, '[]')) {
      GastosbyDay += parseFloat(element.monto);
    }    
  });
  gananciasT = ventaBruta -porVerificar- GastosbyDay; 
  console.log("🚀 ~ file: table-datatables-gastos.js ~ line 35 ~ pedidosbyDay ~ pagados", pagados)
  $('#fechaT').text(diaFin + ' hasta '+ diainicio);

  $('#ventasBruta').text('$'+ventaBruta);
  $('#porVerificar').text('$'+porVerificar);
  $('#gastosGrafica').text('$'+GastosbyDay);
  $('#gananciaNeta').text('$'+gananciasT);
  gananciasChart(gananciasT, ventaBruta,porVerificar, GastosbyDay);
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
          { data: 'observacion' },
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
                      <a href="javascript:;" class="${full['id']} dropdown-item d-none share_record ${full['id']}" onclick=\'share_record("${full['id']}")\'>
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
              let fecha = `<span class="d-none">${moment(data).format('YYYYMMDD')}-</span>${moment(data).format('DD/MM/YYYY')}`
              return fecha;
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

$('#idGasto').val(data.listaGastos.id);
$('#categoria').val(data.listaGastos.tipo).trigger('change');
if (data.listaGastos.tipo == 'NOMINA') {
  $('#personal_gastos').removeClass('d-none');
}
$('#personal_gastos').val(data.listaGastos.personalId).trigger('change');
$('#fecha_gastos').val(data.listaGastos.fecha);
$('#monto_gastos').val(data.listaGastos.monto);
$('#observacion_gastos').val(data.listaGastos.observacion);

  $('#addGasto_modal').modal('show');
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
          if (data.updateGasto) {
            gastosDT.DataTable().row($(`#gastosTableDt tbody .delete-record${data.gastoActualizado.id}`).parents('tr')).remove().draw();
            gastosDT.DataTable().row.add(data.gastoActualizado).draw();
            Swal.fire({
              icon: 'success',
              title: 'Gasto actualizado con éxito',
              showConfirmButton: false,
              timer: 1500
            })
            $('#addGasto_modal').modal('hide');
            return
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
  async function  gananciasChart(gananciasT, ventaBruta,porVerificar, GastosbyDay){
    console.log("🚀 ~ file: table-datatables-gastos.js ~ line 372 ~ gananciasChart ~ GastosbyDay", GastosbyDay)
    console.log("🚀 ~ file: table-datatables-gastos.js ~ line 372 ~ gananciasChart ~ porVerificar", porVerificar)
    console.log("🚀 ~ file: table-datatables-gastos.js ~ line 372 ~ gananciasChart ~ ventaBruta", ventaBruta)
    console.log("🚀 ~ file: table-datatables-gastos.js ~ line 372 ~ gananciasChart ~ gananciasT", gananciasT)
    let gananciasCharts
let optionsC
optionsC = {
            series: [{
              data: [ventaBruta,porVerificar,GastosbyDay,gananciasT ]
            }],
            chart: {
              width: '100%',
              height: '350',
              type: 'bar',
            },
            // labels: ['Ganancias','Ingresos','Gastos'],
            xaxis: {
              categories: ['Venta bruta', 'Por verificar', 'Gastos', 'Ganancia neta'],
            },
            dataLabels: {
              enabled: false,
              // textAnchor: 'middle'
            },
            // responsive: [{
            //   breakpoint: 568,
            //   options: {
            //     chart: {
            //       width: '100%'
            //     },
            //     /*plotOptions: {
            //       pie: {
            //         donut: {
            //           labels: {
            //             show: false,
            //           }
            //         },
            //       }
            //     }*/
            //   },
            // }],
            plotOptions: {
              bar: {
                borderRadius: 4,
                horizontal: true,
              }
            },
            legend: {
              position: 'top',
              offsetY: 0,
              height: 50,
            },
          };
          
          gananciasCharts = new ApexCharts(document.querySelector("#chart5"), optionsC);
          gananciasCharts.render();
          gananciasCharts.updateOptions([{
            series: [gananciasT, ventaBruta,porVerificar, GastosbyDay]
          }])
  }
