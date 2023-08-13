let fechaInput = document.querySelector('#fecha');

document.addEventListener('DOMContentLoaded', function() {
    buscarPorFecha();
    
});

function buscarPorFecha() {
    
    fechaInput.addEventListener('input', function(e) {
        let fechaSeleccionada = e.target.value;
        window.location = `?fecha=${fechaSeleccionada}`;

    });
}