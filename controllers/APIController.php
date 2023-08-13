<?php

namespace Controllers;

use Model\Clientes;
use Model\Proveedor;
use Model\Producto;
use Model\Pedidos;
use Model\DetallePedidos;
use Model\DetalleSolicitud;
use Model\SolicitudesCompra;

class APIController {
    public static function index(){
        $productos=Producto::all();
        $clientes=Clientes::all();
        $proveedores=Proveedor::all();
        $respuesta=[
            'productos'=>$productos,
            'clientes'=>$clientes,
            'proveedores'=>$proveedores
        ];

        echo json_encode($respuesta);
        
    }

    public static function guardar(){
        $pedidos= new Pedidos($_POST);//se guarda lo que coincida con los valores del pedido
        
        $resultado=$pedidos->guardar();

        $idPedido=$resultado['id'];

        $idProductos=explode(",",$_POST['productos']);//IMPORTANTE, PARA SEPARAR CADA ID
        $cantSalida=explode(",",$_POST['cantidad_salida']);
        $precioUn=explode(",",$_POST['precio_unitario']);
        $precioVen=explode(",",$_POST['precio_venta']);
        $stock=explode(",",$_POST['stock']);
        
        for($i=0; $i<count($idProductos); $i++){
            $arreglo=[
                'productos_id'=>$idProductos[$i],
                'pedidos_id'=>$idPedido,
                'cantidad_salida'=>$cantSalida[$i],
                'precio_unitario'=>$precioUn[$i],
                'precio_venta'=>$precioVen[$i]
            ];
            $arreglo2=[
                'stock'=>$stock[$i]
            ];
            $detallePedido=new DetallePedidos($arreglo);
            $detallePedido->crear();

            $producto=Producto::find($idProductos[$i]);
            $producto->sincronizar($arreglo2);
            $producto->guardar();
            
        };
        
        $respuesta=[
            'resultado'=>$resultado
        ];
        echo json_encode($respuesta);
    }
    
    public static function guardarSolicitudes(){
        
        $solicitudes= new SolicitudesCompra($_POST);//se guarda lo que coincida con los valores del pedido
        
        $resultado=$solicitudes->guardar();
        
        $idSolicitud=$resultado['id'];
        
        $idProductos=explode(",",$_POST['productos']);//IMPORTANTE, PARA SEPARAR CADA ID
        $cantEntrada=explode(",",$_POST['cantidad_entrada']);
        $precioUn=explode(",",$_POST['precio_unitario']);
        $precioComp=explode(",",$_POST['precio_compra']);
        $stock=explode(",",$_POST['stock']);
        $precioPro=explode(",",$_POST['precio_costo']);
        $ganancia=explode(",",$_POST['ganancia']);
        $precioUniVent=explode(",",$_POST['precio_unitarioVenta']);
        $fechaIni=explode(",",$_POST['fecha_inicial']);

        
        for($i=0; $i<count($idProductos); $i++){
            $arreglo=[
                'productos_id'=>$idProductos[$i],
                'solicitudes_compra_id'=>$idSolicitud,
                'cantidad_entrada'=>$cantEntrada[$i],
                'precio_unitario'=>$precioUn[$i],
                'precio_compra'=>$precioComp[$i]
            ];
            $arreglo2=[
                'stock'=>$stock[$i],
                'precio_costo'=>$precioPro[$i],
                'ganancia'=>$ganancia[$i],
                'precio_unitarioVenta'=>$precioUniVent[$i],
                'fecha_inicial'=>$fechaIni[$i]
            ];
            $detalleSolicitud=new DetalleSolicitud($arreglo);
            $detalleSolicitud->crear();

            $producto=Producto::find($idProductos[$i]);
            $producto->sincronizar($arreglo2);
            $producto->guardar();
            
        };
        
        
        $respuesta=[
            'resultado'=>$resultado
        ];
        
        echo json_encode($respuesta);

        /*
        $resultado=[
            'productos'=>$idProductos,
            //'pedidos_id'=>$idPedido,
            'cantidad_entrada'=>$cantEntrada,
            'precio_unitario'=>$precioUn,
            'precio_compra'=>$precioComp,
            'stock'=>$stock
        ];
        echo json_encode($respuesta);
        */
        
    }
    public static function eliminarPedidos() {
        
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            $id = $_POST['id'];
            $pedidos = Pedidos::find($id);
            $pedidos->eliminar();
            header('Location:' . $_SERVER['HTTP_REFERER']);//para llevarnos en la misma página que estabamos
        }
    }

    public static function eliminarSolicitudes() {
        
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            $id = $_POST['id'];
            $solicitudes = SolicitudesCompra::find($id);
            $solicitudes->eliminar();
            header('Location:' . $_SERVER['HTTP_REFERER']);//para llevarnos en la misma página que estabamos
        }
    }
}