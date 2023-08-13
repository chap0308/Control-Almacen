<?php

namespace Controllers;

use MVC\Router;
use Model\Admin;
use Model\Usuarios;

class LoginController
{
    public static function login(Router $router)
    {   
        $auth=new Usuarios;
        $alertas = [];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $auth = new Usuarios($_POST);

            
            $alertas = $auth->validarLogin();
            
            if (empty($alertas)) {
                //verificar si el usuario existe
                $usuario = Usuarios::where('email', $auth->email);


                if ($usuario) {
                    // Verificar el password
                    if( $usuario->comprobarPassword($auth->password) ) {
                        // Autenticar el usuario
                        session_start();

                        $_SESSION['id'] = $usuario->id;
                        $_SESSION['nombre'] = $usuario->nombre . " " . $usuario->apellido;
                        $_SESSION['email'] = $usuario->email;
                        $_SESSION['login'] = true;

                        // Redireccionamiento
                        if($usuario->rol === "administrador") {
                            $_SESSION['rol'] = $usuario->rol ?? null;
                            header('Location: /inicio');
                        } else {
                            $_SESSION['rol'] = $usuario->rol ?? null;
                            header('Location: /inicio');
                        }
                    }
                    
                } else {
                    Usuarios::setAlerta('error', 'Usuario no encontrado');
                }
            }
        }
        $alertas = Usuarios::getAlertas();

        $router->render('auth/login', [//aca se pone la informacion de la base de datos que quieres enviar al front
            'alertas' => $alertas,
            'auth'=>$auth,
            'login'=>true
        ]);
    }

    public static function logout()
    {   
        session_start();
        //debuguear($_SESSION);//con esto sabremos las propiedades que agregamos al $_SESSION 
        $_SESSION = [];
        header('Location: /');
    }
}
