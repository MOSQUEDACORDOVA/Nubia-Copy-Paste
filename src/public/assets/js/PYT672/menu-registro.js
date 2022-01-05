$(function () {
    let provincias, canton, distritos;
    fetch('/obtenerdirecciones')
        .then(response => response.json())
        .then(data => {
            provincias = data.provincias
            canton = data.canton
            distritos = data.distritos
         
            $.each(provincias, function(key, value) {
                $('#select-provincia').append(`<option data-id="${value.id}" value="${value.nombre}">${value.nombre}</option>`);
            });
        });

    let prov = document.getElementById('select-provincia'),
    cant = document.getElementById('select-canton'),
    dist = document.getElementById('select-distrito');

    $('#select-provincia').on('change', function () {
        let current = parseInt(prov.options[prov.selectedIndex].getAttribute('data-id'));
        $.each(canton, function(key, value) {
            if(value.provinciaId === current) {
                $('#select-canton').append(`<option data-id="${value.id}" value="${value.nombre}">${value.nombre}</option>`);
            }
        });
        cant.disabled = false;
    });

    $('#select-canton').on('change', function () {
        let currentProv = parseInt(prov.options[prov.selectedIndex].getAttribute('data-id'));
        let currentCant = parseInt(cant.options[cant.selectedIndex].getAttribute('data-id'));
        $.each(distritos, function(key, value) {
            if(value.provinciaId === currentProv && value.cantonId === currentCant) {
                $('#select-distrito').append(`<option value="${value.nombre}">${value.nombre}</option>`);
            }
        });
        dist.disabled = false;
    });
});
  