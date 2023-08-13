<main class="contenedor ">

    <h1>Seccion Proveedores</h1>
    <?php if (intval($resultado) === 1) : ?>
        <p class="alerta exito">Proveedor Creado Correctamente</p>
    <?php elseif (intval($resultado) === 2) : ?>
        <p class="alerta exito">Actualizado Correctamente</p>
    <?php elseif (intval($resultado) === 3) : ?>
        <p class="alerta exito">Proveedor Eliminado Correctamente</p>
    <?php endif; ?>

    <a href="/AgregarProveedores" class="boton">Agregar Nuevo Proveedor</a>

    <div>
        <form method="GET"><!--action="/proveedores"-->
            <label for="categoria">Buscar por:</label>

            <select name="seleccionado">
                <option value="" disabled selected>-- Seleccione --</option>
                <?php  ?>
                <option <?php if ($seleccionado === "id") { ?> selected <?php } ?> value="id">Codigo</option>
                <option <?php if ($seleccionado === "nombre") { ?> selected <?php } ?> value="nombre">Nombre</option>
            </select>

            <input id="searchInput" type="text" name="buscar" value="<?php echo $buscar ?>" placeholder="Ingresa tu búsqueda">
            <button type="submit">Buscar</button>
            <a href="/proveedores" class="boton">Lista completa</a>
        </form>
        <form method="GET">
            <button type="submit" name="asc" value="1">&#8593;</button>
            <button type="submit" name="desc" value="2">&#8595;</button>
        </form>

    </div>

    <table class="propiedades" style="margin-left: 5rem;">
        <thead>
            <tr>
                <th>Codigo del proveedor</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Telefono</th>
                <th>Acciones</th>
                
            </tr>
            
        </thead>
        <tbody>
            <?php foreach ($proveedores as $proveedor) { ?>
                <tr>
                    <td><?php echo $proveedor->id; ?></td>
                    <td><?php echo $proveedor->nombre; ?></td>
                    <td><?php echo $proveedor->email; ?></td>
                    <td><?php echo $proveedor->telefono; ?></td>
                    <td>

                        <form method="POST" class="" action="/EliminarProveedores">

                            <input type="hidden" name="id" value="<?php echo $proveedor->id; ?>">

                            <input type="submit" class="boton rojo" value="Eliminar">
                        </form>

                        <a href="/ActualizarProveedores?id=<?php echo $proveedor->id; ?>" class="boton naranja">Actualizar</a>
                    </td>
                <?php } ?>
                </tr>
        </tbody>

    </table>

    <a href="/inicio" class="boton">Inicio</a>

</main>