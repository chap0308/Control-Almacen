<h1 class="nombre-pagina">Productos Salida</h1>
<p class="descripcion-pagina">Seleccione los productos y complete los datos</p>

<div id="app">
    <nav class="tabs">
        <button class="actual" type="button" data-paso="1">Productos</button>
        <button type="button" data-paso="2">Información Pedido</button>
        <button type="button" data-paso="3">Detalle Pedido</button>
    </nav>

    <div id="paso-1" class="seccion">
        <h2>Productos</h2>
        <p class="text-center">Elige los productos a continuación</p>
        <div id="servicios" class="listado-servicios"></div>
    </div>
    
    <div id="paso-2" class="seccion">
        <!--<p></p>-->
        <h2>Datos del Cliente y Fecha</h2>
        <p class="text-center">Coloca los datos</p>

        <form class="formulario">
            <div class="campo">
                <label for="cliente">Cliente:</label>
                <select id="cliente" >
                    <option value="" disabled selected>--Seleccione--</option>

                </select>
                
            </div>
            <?php
                date_default_timezone_set('America/Lima');
                $fecha_actual = date('Y-m-d');
            ?>
            <div class="campo">
                <label for="fecha">Fecha</label>
                <input
                    id="fecha"
                    type="date"

                    min="<?php  date_default_timezone_set('America/Lima'); 
                    echo date('Y-m-d', strtotime('+0 day') ); ?>"
                    value="<?php 
                    echo $fecha_actual;
                    ?>"
                    max="<?php date_default_timezone_set('America/Lima'); 
                    echo date('Y-m-d', strtotime('+0 day') ); ?>"
                    
                />
            </div>

            <input type="hidden" id="id" value="<?php echo $id; ?>" >
            <!--se agregaría acá-->
        </form>
    </div>
    <div id="paso-3" class="seccion contenido-resumen">
        <h2>Detalle Pedido</h2>
        <p class="text-center">Verifica que la información sea correcta</p>
    </div>

    <div class="paginacion">
        <button 
            id="anterior"
            class="boton"
        >&laquo; Anterior</button>

        <button 
            id="siguiente"
            class="boton"
        >Siguiente &raquo;</button>
    </div>

    <div class="paginacion">
    <a href="/detallePedidos" class="boton">Ver Detalles</a>
    </div>

</div>



<?php 
    $script = "
        <script src='https://cdn.jsdelivr.net/npm/sweetalert2@11'></script>
        <script src='build/js/app.js'></script>
    ";
?>