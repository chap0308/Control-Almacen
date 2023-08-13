<style>
        .imagen-tabla{
            width: 20rem;
        }
    </style>
<main class="contenedor">
        <h1>Seccion Productos</h1>

        <?php if( intval( $resultado ) === 1): ?>
            <p class="alerta exito">Producto Creado Correctamente</p>
        <?php elseif( intval( $resultado ) === 2): ?>
            <p class="alerta exito">Actualizado Correctamente</p>
        <?php elseif( intval( $resultado ) === 3 ): ?>
            <p class="alerta exito">Producto Eliminado Correctamente</p>
        <?php endif; ?>

        <a href="/AgregarProductos" class="boton">Agregar Nuevo Producto</a>

    <div class="bus">
        <form method="GET"><!--action="/proveedores"-->
            <label for="seleccionado">Buscar por:</label>

            <select name="seleccionado">
                <option value="" disabled selected>-- Seleccione --</option>
                <?php  ?>
                <option <?php if ($seleccionado === "id") { ?> selected <?php } ?> value="id">Codigo</option>
                <option <?php if ($seleccionado === "descripcion") { ?> selected <?php } ?> value="descripcion">Descripcion</option>
            </select>

            <input id="searchInput" type="text" name="buscar" value="<?php echo $buscar ?>" placeholder="Ingresa tu búsqueda">
            <button type="submit">Buscar</button>
            <a href="/productos" class="boton">Lista completa</a>
        </form>
        <form method="GET">
            <button type="submit" name="asc" value="1">&#8593;</button>
            <button type="submit" name="desc" value="2">&#8595;</button>
        </form>

        <label for="categoria1">Buscar por Categoria:</label>
        <select id="categoria1" name="categoria1">
            <option value="" disabled selected>-- Seleccione --</option>
            <?php foreach ($categorias as $categoria) { ?>
                <option  <?php echo !$categoria1 ? ($producto->categoria_id === $categoria->id ? 'selected' : '') : ( $categoria1===$categoria->id ? 'selected':'' ); ?> value="<?php echo s($categoria->id); ?>"> <?php echo s($categoria->nombre); ?> </option>
            <?php } ?>
        </select>

    </div>

        <table class="propiedades">
            <thead>
                <tr>
                    <th>Codigo del producto</th>
                    <th>Descripcion</th>
                    <th>Categoria</th>
                    <th>Imagen del Producto</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            
            <tbody>
            <?php foreach($productos as $producto){ ?>
                <tr>

                    <td><?php echo $producto->id; ?></td>
                    <td><?php echo $producto->descripcion ?></td>
                    <td><?php foreach($categorias as $categoria) {
                        if($categoria->id==$producto->categoria_id){
                            echo $categoria->nombre;
                        }
                    }
                    ?></td>
                    <?php //$categoria=Categoria::findNombre($producto->categoria_id); ?>
                    <?php //$query1="SELECT nombre FROM categoria where idcategoria= ". $producto['categoria_id']." LIMIT 1 ";?>
                    <?PHP //var_dump($categoria); ?>
                    <?php //$resultadoConsulta1=mysqli_query($db,$query1); ?>
                    <?php //$categoria = mysqli_fetch_assoc($resultadoConsulta1) ?>
                    <?PHP //var_dump($categoria['nombre']); ?>
                    <td> <img src="/imagenes/<?php echo $producto->imagen_producto; ?>" class="imagen-tabla"> </td>
                    
                    <td>
                        
                        <form method="POST" class="" action="/EliminarProductos">

                            <input type="hidden" name="id" value="<?php echo $producto->id; ?>">

                            <input type="submit" class="boton rojo" value="Eliminar">
                        </form>
                    
                        <a href="/ActualizarProductos?id=<?php echo $producto->id; ?>" class="boton naranja">Actualizar</a>
                    </td>
            <?php } ?>
                </tr>
            </tbody>

        </table>

        <a href="/inicio" class="boton">Inicio</a>

</main>

<?php
    $script = "<script src='build/js/buscador.js'></script>"
?>