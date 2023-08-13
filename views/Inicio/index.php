<style>
    .boton{
        padding: 0;
    }
</style>
<main>
    <div class="contenedor-inicio">
        <h1>Panel de Inicio</h1>
        <h3>Bienvenido <?php  ?></h3>
        <div class="panel-cajas">

            <div class="caja">
                <div class="title">
                    <p>Productos</p>
                </div>
                <div class="desc">
                    <p>Agregar, visualizar, editar y eliminar</p>
                </div>
                <div class="boton">
                    <button><a href="/productos">Ver Productos</a></button>
                </div>
            </div>

            <div class="caja">
                <div class="title">
                    <p>Productos Entrada</p>
                </div>
                <div class="desc">
                    <p>Registro de Productos de Entrada</p>
                </div>
                <div class="boton">
                    <button><a href="/solicitudes">Ver Productos Entrada</a></button>
                </div>
            </div>

            <div class="caja">
                <div class="title">
                    <p>Productos Salida</p>
                </div>
                <div class="desc">
                    <p>Registro de Productos de Salida</p>
                </div>
                <div class="boton">
                    <button><a href="/pedidos">Ver Productos Salida</a></button>
                </div>
            </div>

            <div class="caja">
                <div class="title">
                    <p>Inventario</p>
                </div>
                <div class="desc">
                    <p>Visualizar todos los movimientos por fecha</p>
                </div>
                <div class="boton">
                    <button><a href="/inventario">Ver Inventario</a></button>
                </div>
            </div>

            <?php if($_SESSION['rol']==="administrador") { ?>
            <div class="caja">
                <div class="title">
                    <p>Proveedores</p>
                </div>
                <div class="desc">
                    <p>Agregar, visualizar, editar y eliminar</p>
                </div>
                <div class="boton">
                    <button><a href="/proveedores">Ver Proveedores</a></button>
                </div>
            </div>
            <div class="caja">
                <div class="title">
                    <p>Clientes</p>
                </div>
                <div class="desc">
                    <p>Agregar, visualizar, editar y eliminar</p>
                </div>
                <div class="boton">
                    <button><a href="/clientes">Ver Clientes</a></button>
                </div>
            </div>

            <div class="caja">
                <div class="title">
                    <p>Usuarios</p>
                </div>
                <div class="desc">
                    <p>Agregar, visualizar, editar y eliminar</p>
                </div>
                <div class="boton">
                    <button><a href="/usuarios">Ver Usuarios</a></button>
                </div>
            </div>
        </div>
        <?php } ?>
    </div>

</main>