<?php

namespace Controllers;

use MVC\Router;

class SolicitudesController {
    public static function index( Router $router ) {     

        session_start();

        isAuth();

        $router->render('solicitudes/index', [
        ]);
    }
}