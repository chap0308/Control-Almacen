<?php if(isset($_SESSION['login']) || $login){ ?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MediFarm</title>
    <link rel="icon" type="image/png" href="/build/img/Logo 1.png">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;700;900&display=swap" rel="stylesheet"> 
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="/build/css/app.css">
</head>
<body>
    <header>
        <div class="encabezado">
            <div class="logo">
                <img src="/build/img/Logo 1.png" alt="Cargando...">
                <a href="/inicio">
                    <h2>HealdFarma</h2>
                </a>
            </div>
            <nav class="navigator">
                <ul>
                    
                    <?php if(isset($_SESSION['login'])){ ?>
                    <h3 style="padding-right: 3rem; padding-top: 2rem" ><?php echo $_SESSION['nombre']; ?></h3>
                    <button >
                    <a href="/logout">
                        <p>Logout</p>
                        <img src="/build/img/salir-alt.png" alt="Cargando...">
                    </a>
                    </button>
                    <?php } ?>
                </ul>
            </nav>
        </div>
    </header>
    
    <?php echo $contenido; ?>

    <?php
        echo $script ?? '';
    ?>
    
    <footer>
    <div class="contenedor-footer">
        <div class="sobre-mi">
            <h2 class="titulos-footer">QUIENES SOMOS :</h2>
            <p>Somos una empresa dedicada a la venta de productos de tecnología, con el objetivo de satisfacer las necesidades de nuestros clientes, ofreciendo productos de calidad y con garantía.</p>
            <ul class="redes-sociales">
                <li><a href="#"><i class="fa-brands fa-facebook"></i></a></li>
                <li><a href="#"><i class="fa-brands fa-youtube"></i></a></li>
                <li><a href="#"><i class="fa-brands fa-instagram"></i></i></a></li>
                <li><a href="#"><i class="fa-brands fa-whatsapp"></i></i></a></li>
                <li><a href="#"><i class="fa-brands fa-twitter"></i></i></a></li>
            </ul>
        </div>

        <div class="navegacion">
            <h2 class="titulos-footer">MENU DE NAVEGACIÓN : </h2>
            <ul>
                <li><a >Inicio</a></li>
                <li><a>Productos</a></li>
                <li><a >Contactos</a></li>
            </ul>
        </div>

        <div class="contactanos">
            <h2 class="titulos-footer">CONTÁCTANOS :</h2>
            <ul class="informacion-contacto">
                <li>
                    <span><i class="fa-solid fa-location-dot" style="color: white;"></i></span>
                    <p>Ctra. Panamericana S km 16, Villa EL Salvador 15842<br> Lima, Perú</p>
                </li>
                <li>
                    <span><i class="fa-solid fa-phone" style="color: white;"></i></span>
                    <p>+51 --------<br> +51 --------<br>+51------------<br>+51 ----------</p>
                </li>
                <li>
                    <span><i class="fa-solid fa-envelope" style="color: white;"></i></span>
                    <p>HEAD_FARMA@gmail.com</p>
                </li>
            </ul>
        </div>
    </div>
    <div class="copy">
        Copyright © 2023 Proyecto desarrollado por el grupo 4.
    </div>
    </footer>
</body>
</html>

<?php }else{ ?>

    <?php echo $contenido; ?>

    <?php
        echo $script ?? '';
    ?>
<?php } ?>