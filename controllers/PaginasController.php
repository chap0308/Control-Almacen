<?php

namespace Controllers;
use Model\Email;
use MVC\Router;

class PaginasController{
    public static function index(Router $router){
        $router->render('principal/index',[

        ]);
    }

    // public static function enviar(){
    //     // debuguear($_POST);
    //     $email = new Email($_POST);
    //     $resultado=$email->enviarEmail();

    //     $respuesta=[
    //         'resultado'=>$resultado
    //     ];
    //     echo json_encode($respuesta);
    // }

    public static function enviar(Router $router){
        // debuguear($_POST);
        if($_POST['nombre'] != '' && $_POST['email'] != '' &&  $_POST['mensaje'] != ''&&  $_POST['telefono'] != ''){
            // echo "Paso";
            $email = new Email($_POST);
            $email->enviarEmail();

            sleep(7);
            $router->render('principal/index',[

            ]);
            // exit;
        }
        // if($_POST['nombre'] == '' || $_POST['email'] == '' ||  $_POST['mensaje'] == '' ||  $_POST['telefono'] == ''){
        //     debuguear("No paso");
        // }
        // debuguear("Paso");
        // $email = new Email($_POST);
        // $resultado=$email->enviarEmail();

    }

    public static function inicio(Router $router){
        session_start();

        isAuth();

        $router->render('Inicio/index', [
            'nombre' => $_SESSION['nombre'],
            'id'=> $_SESSION['id']
        ]);
    }
}