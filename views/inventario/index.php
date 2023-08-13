<h1>Inventario</h1>
<div id="app">
    <nav class="tabs">
        <button class="actual" type="button" data-paso="1">Buscar por Fecha</button>
        <button type="button" data-paso="2">Buscar por Producto</button>
    </nav>
    


    <?php
        // debuguear($inventarios);
        // if(count($inventarios) === 0) {
        //     echo "<h2>No hay registros en esta fecha</h2>";
        // }
        date_default_timezone_set('America/Lima');
        $fecha_actual = date('Y-m-d');
        //MODO PRUEBA
        // $fecha1 = new DateTime($fecha_actual);
        // $fecha1->modify('+1 day');
        // $nueva_fecha = $fecha1->format('Y-m-d');
        
    ?>

    <div id="paso-1" class="seccion"> 
        <div class="busqueda" style="margin-left: 5rem;margin-bottom: 5rem;">
            <form class="formulario">
                <div class="campo" style="display:block;">
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
        <div class="form-group table-responsive" style="display: grid;text-align: center;font-size: 2.5rem;"> 
            <table class="form-group table">
                <thead  style="color: cornflowerblue;">
                    <tr id="cab">
                        <th >Codigo del producto</th>
                        <th >Categoria</th>
                        <th >Descripcion</th>
                        <th >Cantidad Entrada</th>
                        <th >Cantidad Salida</th>
                        <th ><?php echo $fecha_actual==$fecha ? 'Stock Actual ': 'Stock Anterior '; ?></th>
                        <th>Total Egresos</th>
                        <th >Total Ingresos</th>
                    </tr>
                </thead>
            <?php
            $idInvent = 0;
            foreach( $inventarios as $key => $inventario ) {//el key es la posicion( 0, 1, 2)
                //debuguear($nueva_fecha==$fecha ? (intval($inventario->StockActual) + intval($inventario->stock)): $inventario->StockActual);
            if(($inventario->stock+$inventario->StockActual)!= $inventario->stock){

                ?>
                <tbody>
                    <tr>
                        <td><?php echo $inventario->idProducto; ?></td>
                        <td><?php echo $inventario->descripcion; ?></td>
                        <td><?php echo $inventario->categoria; ?></td>
                        <td><?php echo $inventario->TotalEntrada; ?></td>
                        <td><?php echo $inventario->TotalSalida; ?></td>
                        <td><?php echo $stockAct[$key] ?></td>
                        <td><?php echo $inventario->Egresos; ?></td>
                        <td><?php echo $inventario->Ingresos; ?></td>
                    </tr>
                </tbody>
                
                    <?php
                    $idInvent++;
                        }
                    }// Fin de Foreach
                    if($idInvent==0){
                        echo "<h2 id='msg' style='color: darkred;'>No hay registros en esta fecha</h2>";
                    }
                    ?>
            </table>
        </div>
    </div>

    <div id="paso-2" class="seccion">
            <div class="campo" style="display: block;">
                <label for="producto">Producto:</label>
                <select id="producto" name="seleccionado">
                    <option value="" disabled selected>--Seleccione--</option>

                </select>
                    
            </div>
            <div class="contenido-resumen" style="justify-content: center; display: flex;">

            </div>
    </div>
</div>

<?php
    $script = "
    <script src='https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment.min.js'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/locale/es.min.js' integrity='sha512-tgY2qswcbQir80Vp67s5ZdbKikl99YmVXp3V/C4Acthk4gI29ONbQ+MR8B5tpESkNoa0N1P7HnSuzC6nOflrwA==' crossorigin='anonymous'></script>
    <script src='build/js/buscadorInventario.js'></script>
    "
?>