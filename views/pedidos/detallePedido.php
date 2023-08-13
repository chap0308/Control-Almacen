<h1>Pedidos</h1>

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
    if(count($pedidos) === 0) {
        echo "<h2>No hay pedidos en esta fecha</h2>";
    }
?>

<div id="citas-admin">
    <ul class="citas">   
            <?php 
                $idPedi = 0;
                foreach( $pedidos as $key => $pedido ) {//el key es la posicion( 0, 1, 2)
   
                    if($idPedi !== $pedido->id) {
            ?>                      
            <li>
                    
                    <p>Cliente: <span><?php echo $pedido->clientes; ?></span></p>
                    <p>Email: <span><?php echo $pedido->email; ?></span></p>
                    <p>Telefono: <span><?php echo $pedido->telefono; ?></span></p>
                    
                    <h3>Pedido N°<?php echo $pedido->id; ?></h3>
            <?php 
                $idPedi = $pedido->id;
            } // Fin de IF 

            ?>      
                    <p class="product">Nombre del producto: <span><?php echo $pedido->producto; ?></span></p>
                    <p class="">Precio Unitario Venta: <span>$ <?php echo $pedido->precio_unitario; ?></span></p>
                    <p class="">Cantidad Salida: <span><?php echo $pedido->cantidad_salida; ?></span></p>
                    <p class="">Precio Venta: <span>$ <?php echo $pedido->precio_venta; ?></span></p>
                    

            <?php 
                $actual = $pedido->id;//este es de la base de datos
                $proximo = $pedidos[$key + 1]->id ?? 0;//este es el mismo objeto, pero va a estar una posicion adelantada( ojo posicion, no valor), cuando cambie de id, este ultimo
                                                    //va a ser diferente al actual. Sabiendo eso, lo usamos para escribir lo siguiente:
                                                    //Si imprimimos el actual y el proximo se veran abajo de UN SERVICIO y seguirá así con todos
                if(esUltimo($actual, $proximo)) { ?><!--comprabamos que es el ultimo y mostramos el total, mas que nada hacemos esto para escribir en el despues del ultimo servicio, el total-->
                    <p class="total">Total: <span>$ <?php echo $pedido->precioTotal; ?></span></p><!--con esto se consigue el total, recuerda poner el total=0 en el if-->

                    <form action="/api/eliminarPedidos" method="POST">
                        <input type="hidden" name="id" value="<?php echo $pedido->id; ?>">
                        <input type="submit" class="boton-eliminar" value="Eliminar">
                    </form>

            <?php } 
          } // Fin de Foreach ?>
     </ul>
</div>

<?php
    $script = "<script src='build/js/buscadorFactura.js'></script>"
?>