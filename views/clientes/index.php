<main class="contenedor">

    <h1>Seccion Clientes</h1>
    <?php if (intval($resultado) === 1) : ?>
        <p class="alerta exito">Cliente Creado Correctamente</p>
    <?php elseif (intval($resultado) === 2) : ?>
        <p class="alerta exito">Actualizado Correctamente</p>
    <?php elseif (intval($resultado) === 3) : ?>
        <p class="alerta exito">Cliente Eliminado Correctamente</p>
    <?php endif; ?>

    <a href="/AgregarClientes" class="boton">Agregar Nuevo Cliente</a>

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
            <a href="/clientes" class="boton">Lista completa</a>
        </form>
        <form method="GET">
            <button type="submit" name="asc" value="1">&#8593;</button>
            <button type="submit" name="desc" value="2">&#8595;</button>
        </form>

    </div>


    <table class="propiedades">
        <thead>
            <tr>
                <th>Codigo del Cliente</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Telefono</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($clientes as $cliente) { ?>
                <tr>
                    <td><?php echo $cliente->id; ?></td>
                    <td><?php echo $cliente->nombre; ?></td>
                    <td><?php echo $cliente->email; ?></td>
                    <td><?php echo $cliente->telefono; ?></td>
                    <td>

                        <form method="POST" class="" action="/EliminarClientes">

                            <input type="hidden" name="id" value="<?php echo $cliente->id; ?>">

                            <input type="submit" class="boton rojo" value="Eliminar">
                        </form>

                        <a href="/ActualizarClientes?id=<?php echo $cliente->id; ?>" class="boton naranja">Actualizar</a>
                    </td>
                <?php } ?>
                </tr>
        </tbody>

    </table>

    <a href="/inicio" class="boton">Inicio</a>

</main>