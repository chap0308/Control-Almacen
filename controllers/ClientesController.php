<?php

namespace Controllers;

use MVC\Router;
use Model\Clientes;

class ClientesController{
    public static function clientes(Router $router){
        session_start();
        isAuth();
        isAdmin();
        $buscar=$_GET['buscar']??null;
        $seleccionado=$_GET['seleccionado']??null; 
        $asc=$_GET['asc'];
        $desc=$_GET['desc'];
        
        $clientes=Clientes::all();

        if($seleccionado && $buscar){
            $clientes=Clientes::buscar($seleccionado,$buscar);
        }

        if($asc=="1"){
            $clientes=Clientes::asc();
        }

        if($desc=="2"){
            $clientes=Clientes::desc();
        }

        //Muestra mensaje condicional
        $resultado=$_GET['resultado'] ?? null;
        
        $router->render('clientes/index',[
            'clientes'=>$clientes,
            'resultado'=>$resultado,
            'buscar'=>$buscar,
            'seleccionado'=>$seleccionado
            
        ]);
    }

    public static function crear(Router $router){
        session_start();
        isAuth();
        isAdmin();
        $cliente= new Clientes;

        //Arreglo con mensajes de errores
        $alertas=Clientes::getAlertas();

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $cliente= new Clientes($_POST['cliente']);

            // Validar
            $alertas = $cliente->validar();

            if (empty($alertas)) {
                $resultado=$cliente->guardar();
                if($resultado) {
                    header('location: /clientes?resultado=1');
                }
            }    
        }

        $router->render('clientes/crear',[
            'alertas'=>$alertas,
            'cliente'=>$cliente
        ]);
    }

    public static function actualizar(Router $router){
        session_start();
        isAuth();
        isAdmin();
        $id = validarORedireccionar('/clientes');
    
        $cliente= Clientes::find($id);
    
        //Arreglo con mensajes de errores
        $alertas=Clientes::getAlertas();
    
        if($_SERVER['REQUEST_METHOD']==='POST'){
            
            $args=$_POST['cliente'];
    
            //para que los valores que actualices, se inserten en una array nuevo
            $cliente->sincronizar($args);
    
            //y luego sean validadas, es decir si está está completa
            $alertas=$cliente->validar();
            
            
            if (empty($alertas)) {
    
                $resultado=$cliente->guardar();
                if($resultado){
                    header('Location: /clientes?resultado=2');
                }
            }
        }

        $router->render('clientes/actualizar',[
            'cliente'=>$cliente,
            'alertas'=>$alertas
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

                $eliminar=Clientes::find($id);

                $resultado=$eliminar->eliminar();

                if ($resultado) {
                    
                    header('location: /clientes?resultado=3');
                }
            }
        }
    }
}