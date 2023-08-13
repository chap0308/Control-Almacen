document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    buscarPorCategoria();
}

function buscarPorCategoria() {
    const categoriaInput = document.querySelector('#categoria1');
    categoriaInput.addEventListener('input', function(e) {
        const categoriaSeleccionada = e.target.value;

        window.location = `?categoria1=${categoriaSeleccionada}`;
    });
}