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

    fetch('/obtenerusuariospy672')
        .then(response => response.json())
        .then(data => {
            usuarios = data.usuarios
            console.log(usuarios)
            for (let i = 0; i < usuarios.length; i++) {
                if (usuarios[i]['puesto']=="Vendedor") {
                $('#vendedor-edit').append(`<option value="${usuarios[i]['id']}">${usuarios[i]['nombre']}</option>`) 
                }                
            }
            
        });
    $('#select-provincia').on('change', function () {
        let current = parseInt(prov.options[prov.selectedIndex].getAttribute('data-id'));
        console.log(current)
        $('#select-canton').html('<option value="">Seleccione un Canton</option>');
        $.each(canton, function(key, value) {
            if(value.provinciaId === current) {
                $('#select-canton').append(`<option data-id="${value.id}" value="${value.nombre}">${value.nombre}</option>`);
            }
        });
        $('#select-canton').val("");
        $('#select-canton').trigger('change');

        cant.disabled = false;
    });

    $('#select-canton').on('change', function () {
        let currentProv = parseInt(prov.options[prov.selectedIndex].getAttribute('data-id'));
        let currentCant = parseInt(cant.options[cant.selectedIndex].getAttribute('data-id'));
        $('#select-distrito').html('<option value="">Seleccione un Distrito</option>');
        $.each(distritos, function(key, value) {
            if(value.provinciaId === currentProv && value.cantonId === currentCant) {
                $('#select-distrito').append(`<option value="${value.nombre}">${value.nombre}</option>`);
            }
        });
        $('#select-distrito').val("");
        $('#select-distrito').trigger('change');

        dist.disabled = false;
    });
});