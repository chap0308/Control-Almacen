<main>

        <h1>Actualizar Clientes</h1>

        <a href="/clientes" class="boton">Volver</a>

        <?php foreach ($alertas as $alerta) : ?>
            <div class="alerta error">
                <?php echo $alerta; ?>
            </div>
        <?php endforeach; ?>

        <form class="formulario" method="POST" novalidate><!--enctype="multipart/form-data"  Para agregar imagenes-->
        <?php include __DIR__.'/formulario.php'; ?>

            <input type="submit" value="Enviar" class="boton">

        </form>
    </main>