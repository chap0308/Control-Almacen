<?php

namespace Controllers;

use MVC\Router;
use Model\Usuarios;

class UsuariosController{
    public static function usuarios(Router $router){
        session_start();
        isAuth();
        isAdmin();
        $buscar=$_GET['buscar']??null;
        $seleccionado=$_GET['seleccionado']??null; 
        $asc=$_GET['asc'];
        $desc=$_GET['desc'];

        $usuarios=Usuarios::all();
        if($seleccionado && $buscar){
            $usuarios=Usuarios::buscar($seleccionado,$buscar);
        }

        if($asc=="1"){
            $usuarios=Usuarios::asc();
        }

        if($desc=="2"){
            $usuarios=Usuarios::desc();
        }

        //Muestra mensaje condicional
        $resultado=$_GET['resultado'] ?? null;

        $router->render('usuarios/index',[
            'usuarios'=>$usuarios,
            'resultado'=>$resultado,
            'buscar'=>$buscar,
            'seleccionado'=>$seleccionado
        ]);
    }

    public static function crear(Router $router){
        session_start();
        isAuth();
        isAdmin();
        $usuario= new Usuarios;

        //Arreglo con mensajes de errores
        $alertas=Usuarios::getAlertas();

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $usuario= new Usuarios($_POST['usuario']);

            // Validar
            $alertas = $usuario->validar();

            if (empty($alertas)) {

                $passwordHash = password_hash($usuario->password, PASSWORD_BCRYPT);

                $_POST['usuario']['password']=$passwordHash;

                $usuario= new Usuarios($_POST['usuario']);  
        
                $resultado=$usuario->guardar();
                if($resultado){
                    header('Location: /usuarios?resultado=1');
                }
            }
        }

        $router->render('usuarios/crear',[
            'alertas'=>$alertas,
            'usuario'=>$usuario
        ]);
    }

    public static function actualizar(Router $router){
        session_start();
        isAuth();
        isAdmin();
        $id = validarORedireccionar('/usuarios');

        $usuario= Usuarios::find($id);

        //Arreglo con mensajes de errores
        $alertas=Usuarios::getAlertas();

        if($_SERVER['REQUEST_METHOD']==='POST'){
        
            $args=$_POST['usuario'];
    
            //para que los valores que actualices, se inserten en una array nuevo
            $usuario->sincronizar($args);
    
            //y luego sean validadas, es decir si está está completa
            $alertas=$usuario->validar();
            
            
            if (empty($alertas)) {
    
                $resultado=$usuario->guardar();
                if($resultado){
                    header('Location: /usuarios?resultado=2');
                }
            }
        }

        $router->render('usuarios/actualizar',[
            'alertas'=>$alertas,
            'usuario'=>$usuario
        ]);
    }

    public static function eliminar(){
        session_start();
        isAuth();
        isAdmin();
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
        $id = $_POST['id'];
        $id = filter_var($id, FILTER_VALIDATE_INT);

        if($id) {

            $eliminar=Usuarios::find($id);

            $resultado=$eliminar->eliminar();
            if($resultado){
                header('Location: /usuarios?resultado=3');
            }
        }
        
    }
    }
}