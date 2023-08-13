<h1>Solicitudes</h1>

<h2>Buscar por Fecha:</h2>
<div class="busqueda">
    <form class="formulario">
        <div class="campo" style="display: block;padding:0; margin:0 5rem;">
            <label for="fecha">Fecha</label>
            <input 
                type="date"
                id="fecha"
                name="fecha"
                min="2023-06-12"
                value="<?php echo $fecha; ?>"
                max="<?php date_default_timezone_set('America/Lima'); 
                echo date('Y-m-d', strtotime('+0 day') ); ?>"
            />
        </div>
    </form> 
</div>

<?php
    if(count($solicitudes) === 0) {
        echo "<h2>No hay pedidos en esta fecha</h2>";
    }
?>

<div id="citas-admin">
    <ul class="citas">   
            <?php 
                $idSoli = 0;
                foreach( $solicitudes as $key => $solicitud ) {//el key es la posicion( 0, 1, 2)
                    
                    if($idSoli !== $solicitud->id) {
            ?>                      
            <li>
                    
                    <p>Proveedor: <span><?php echo $solicitud->proveedor; ?></span></p>
                    <p>Email: <span><?php echo $solicitud->email; ?></span></p>
                    <p>Telefono: <span><?php echo $solicitud->telefono; ?></span></p>
                    
                    <h3>Solicitud N°<?php echo $solicitud->id; ?></h3>
                    
            <?php 
                $idSoli = $solicitud->id;
            } // Fin de IF 

            ?>      
                    
                    <p class="product">Nombre del producto: <span><?php echo $solicitud->producto; ?></span></p>
                    <p class="">Precio Costo: <span>$ <?php echo $solicitud->precio_unitario; ?></span></p>
                    <p class="">Cantidad Entrada: <span><?php echo $solicitud->cantidad_entrada; ?></span></p>
                    <p class="">Precio Compra: <span>$ <?php echo $solicitud->precio_compra; ?></span></p>
                    

            <?php 
                $actual = $solicitud->id;//este es de la base de datos
                $proximo = $solicitudes[$key + 1]->id ?? 0;//este es el mismo objeto, pero va a estar una posicion adelantada( ojo posicion, no valor), cuando cambie de id, este ultimo
                                                    //va a ser diferente al actual. Sabiendo eso, lo usamos para escribir lo siguiente:
                                                    //Si imprimimos el actual y el proximo se veran abajo de UN SERVICIO y seguirá así con todos
                if(esUltimo($actual, $proximo)) { ?><!--comprabamos que es el ultimo y mostramos el total, mas que nada hacemos esto para escribir en el despues del ultimo servicio, el total-->
                    <p class="total">Total: <span>$ <?php echo $solicitud->precioTotal; ?></span></p><!--con esto se consigue el total, recuerda poner el total=0 en el if-->

                    <form action="/api/eliminarSolicitudes" method="POST">
                        <input type="hidden" name="id" value="<?php echo $solicitud->id; ?>">
                        <input type="submit" class="boton-eliminar" value="Eliminar">
                    </form>

            <?php } 
          } // Fin de Foreach ?>
     </ul>
</div>

<?php
    $script = "<script src='build/js/buscadorFactura.js'></script>"
?>