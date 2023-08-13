<main class="contenedor ">
    <h1 style="padding-top:5rem;" >Iniciar Sesión</h1>

    <?php
    foreach ($alertas as $key => $mensajes) :
        foreach ($mensajes as $mensaje) :
    ?>
            <div class="alerta <?php echo $key; //aca se le pone el tipo de alerta y con eso se configura el nombre de esta clase para el css 
                                ?>">
                <!--no se necesita sanitizar porque ese mensaje lo genera el php-->
                <?php echo $mensaje; ?>
            </div>
    <?php
        endforeach;
    endforeach;
    ?>

    <form method="POST" class="formulario" action="/login" novalidate>
        <fieldset class="campo">
            <legend>Email y Password</legend>

            <label for="email">E-mail</label>
            <input type="email" name="email" placeholder="Tu Email" id="email" value="<?php echo s(trim($auth->email)); ?>">



            <label for="password" style="padding-top:2rem" >Password</label>
            <input type="password" name="password" placeholder="Tu Password" id="password">
        </fieldset>

        <input type="submit" value="Iniciar Sesión" class="boton boton-verde">
    </form>
</main>