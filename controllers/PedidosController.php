<?php

namespace Controllers;

use MVC\Router;

class PedidosController {
    public static function index( Router $router ) {     

        session_start();

        isAuth();

        $router->render('pedidos/index', [
        ]);
    }
}