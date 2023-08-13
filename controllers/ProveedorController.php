<?php

namespace Controllers;

use MVC\Router;
use Model\Proveedor;

class ProveedorController{
    public static function proveedores(Router $router){
        session_start();
        isAuth();
        isAdmin();
        $buscar=$_GET['buscar']??null;
        $seleccionado=$_GET['seleccionado']??null; 
        $asc=$_GET['asc'];
        $desc=$_GET['desc'];
        
        $proveedores=Proveedor::all();

        if($seleccionado && $buscar){
            $proveedores=Proveedor::buscar($seleccionado,$buscar);
        }

        if($asc=="1"){
            $proveedores=Proveedor::asc();
        }

        if($desc=="2"){
            $proveedores=Proveedor::desc();
        }
        

        /*
        foreach($proveedores as $proveedor){
            foreach($proveedor as $key=>$value){
                debuguear($key);
            }
        }
        */

        //Muestra mensaje condicional
        $resultado=$_GET['resultado'] ?? null;
        /*
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $busqueda=$_POST['buscar'] ?? null;
            $prov= new Proveedor;
            $resultado=$proveedores->buscar($busqueda);
            if($resultado) {
                header('location: /proveedores?resultado=4');
            }
        }
        */
        $router->render('proveedores/index',[
            'proveedores'=>$proveedores,
            'resultado'=>$resultado,
            'buscar'=>$buscar,
            'seleccionado'=>$seleccionado
            //'prov'=>$prov
        ]);
    }

    public static function crear(Router $router){
        session_start();
        isAuth();
        isAdmin();
        $proveedor= new Proveedor;

        //Arreglo con mensajes de errores
        $alertas=Proveedor::getAlertas();

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $proveedor= new Proveedor($_POST['proveedor']);

            // Validar
            $alertas = $proveedor->validar();

            if (empty($alertas)) {
                $resultado=$proveedor->guardar();
                if($resultado) {
                    header('location: /proveedores?resultado=1');
                }
            }    
        }

        $router->render('proveedores/crear',[
            'alertas'=>$alertas,
            'proveedor'=>$proveedor
        ]);
    }

    public static function actualizar(Router $router){
        session_start();
        isAuth();
        isAdmin();
        $id = validarORedireccionar('/proveedores');
    
        $proveedor= Proveedor::find($id);
    
        //Arreglo con mensajes de errores
        $alertas=Proveedor::getAlertas();
    
        if($_SERVER['REQUEST_METHOD']==='POST'){
            
            $args=$_POST['proveedor'];
    
            //para que los valores que actualices, se inserten en una array nuevo
            $proveedor->sincronizar($args);
    
            //y luego sean validadas, es decir si está está completa
            $alertas=$proveedor->validar();
            
            
            if (empty($alertas)) {
    
                $resultado=$proveedor->guardar();
                if($resultado){
                    header('Location: /proveedores?resultado=2');
                }
            }
        }

        $router->render('proveedores/actualizar',[
            'proveedor'=>$proveedor,
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

                $eliminar=Proveedor::find($id);

                $resultado=$eliminar->eliminar();

                if ($resultado) {
                    
                    header('location: /proveedores?resultado=3');
                }
            }
        }
    }
}