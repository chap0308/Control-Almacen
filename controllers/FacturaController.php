<?php

namespace Controllers;

use Model\FacturaPedidos;
use Model\FacturaSolicitud;
use MVC\Router;

class FacturaController {
    public static function pedidos( Router $router ) {
        session_start();
        isAuth();
        date_default_timezone_set('America/Lima');
        $fecha = $_GET['fecha'] ?? date('Y-m-d');
        $fechas = explode('-', $fecha);

        if( !checkdate( $fechas[1], $fechas[2], $fechas[0]) ) {
            header('Location: /404');
        }

        // Consultar la base de datos
        $consulta = "SELECT pedidos.id, clientes.nombre as clientes, clientes.email, productos.descripcion as producto, clientes.telefono, detalle_pedidos.cantidad_salida, ";
        $consulta .= " detalle_pedidos.precio_unitario, detalle_pedidos.precio_venta, pedidos.precioTotal, pedidos.fecha_pedido ";
        $consulta .= " FROM pedidos  ";
        $consulta .= " LEFT OUTER JOIN clientes ON pedidos.clientes_id=clientes.id ";
        $consulta .= " LEFT OUTER JOIN detalle_pedidos ON detalle_pedidos.pedidos_id=pedidos.id  ";
        $consulta .= " LEFT OUTER JOIN productos ON productos.id=detalle_pedidos.productos_id ";
        $consulta .= " WHERE fecha_pedido= '$fecha' ";

        $pedidos = FacturaPedidos::SQL($consulta);

        $router->render('pedidos/detallePedido', [
            //'nombre' => $_SESSION['nombre'],
            'pedidos' => $pedidos, 
            'fecha' => $fecha//para obtener la fecha actual en el formulario
        ]);
    }

    public static function solicitudes( Router $router ) {
        session_start();
        isAuth();
        date_default_timezone_set('America/Lima');
        $fecha = $_GET['fecha'] ?? date('Y-m-d');
        $fechas = explode('-', $fecha);

        if( !checkdate( $fechas[1], $fechas[2], $fechas[0]) ) {
            header('Location: /404');
        }

        // Consultar la base de datos
        $consulta = "SELECT solicitudes_compra.id, proveedor.nombre as proveedor, proveedor.email, proveedor.telefono, productos.descripcion as producto, detalle_solicitud.cantidad_entrada, ";
        $consulta .= " detalle_solicitud.precio_unitario, detalle_solicitud.precio_compra, solicitudes_compra.precioTotal, solicitudes_compra.fecha_solicitud ";
        $consulta .= " FROM solicitudes_compra  ";
        $consulta .= " LEFT OUTER JOIN proveedor ON solicitudes_compra.proveedor_id=proveedor.id ";
        $consulta .= " LEFT OUTER JOIN detalle_solicitud ON detalle_solicitud.solicitudes_compra_id=solicitudes_compra.id  ";
        $consulta .= " LEFT OUTER JOIN productos ON productos.id=detalle_solicitud.productos_id ";
        $consulta .= " WHERE fecha_solicitud = '$fecha' ";

        $solicitudes = FacturaSolicitud::SQL($consulta);

        $router->render('solicitudes/detalleSolicitud', [
            //'nombre' => $_SESSION['nombre'],
            'solicitudes' => $solicitudes, 
            'fecha' => $fecha//para obtener la fecha actual en el formulario
        ]);
    }
}