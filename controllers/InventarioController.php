<?php

namespace Controllers;

use MVC\Router;
use Model\InventarioPrincipal;
use Model\Producto;

class InventarioController {
    public static function index( Router $router ) {
        session_start();
        isAuth();
        date_default_timezone_set('America/Lima');
        $fecha = $_GET['fecha'] ?? date('Y-m-d');
        $fechas = explode('-', $fecha);

        if( !checkdate( $fechas[1], $fechas[2], $fechas[0]) ) {
            header('Location: /404');
        }
        

        $consulta = "SELECT p.id AS idProducto, p.descripcion, c.nombre AS categoria, COALESCE(ds.suma_cantidad, 0) AS TotalEntrada, COALESCE(dp.suma_cantidad, 0) AS TotalSalida, ";
        $consulta .= " COALESCE(ds.suma_cantidad, 0) - COALESCE(dp.suma_cantidad, 0) AS StockActual, COALESCE(ds.TotalCompra, 0) AS Egresos, COALESCE(dp.TotalVenta, 0) AS Ingresos, p.stock ";
        $consulta .= " FROM productos p  ";
        $consulta .= " JOIN categoria c ON p.categoria_id = c.id ";
        $consulta .= " LEFT JOIN (  ";
        $consulta .= " SELECT ds.productos_id, SUM(ds.cantidad_entrada) AS suma_cantidad, SUM(ds.precio_compra) AS TotalCompra  ";
        $consulta .= " FROM detalle_solicitud ds  ";
        $consulta .= " JOIN solicitudes_compra sc ON ds.solicitudes_compra_id = sc.id ";
        $consulta .= " WHERE sc.fecha_solicitud = '$fecha' ";
        $consulta .= " GROUP BY ds.productos_id  ";
        $consulta .= " ) AS ds ON p.id = ds.productos_id ";
        $consulta .= " LEFT JOIN ( ";
        $consulta .= " SELECT dp.productos_id, SUM(dp.cantidad_salida) AS suma_cantidad, sum(dp.precio_venta) as TotalVenta ";
        $consulta .= " FROM detalle_pedidos dp  ";
        $consulta .= " JOIN pedidos pd ON dp.pedidos_id = pd.id ";
        $consulta .= " WHERE pd.fecha_pedido = '$fecha' ";
        $consulta .= " GROUP BY dp.productos_id ";
        $consulta .= " ) AS dp ON p.id = dp.productos_id ";
        $consulta .= " ORDER BY idProducto; ";

        // Consultar la base de datos
        $consulta1 = "SELECT p.id AS idProducto, p.descripcion, c.nombre AS categoria, COALESCE(ds.suma_cantidad, 0) AS TotalEntrada, COALESCE(dp.suma_cantidad, 0) AS TotalSalida, ";
        $consulta1 .= " COALESCE(ds.suma_cantidad, 0) - COALESCE(dp.suma_cantidad, 0) AS StockActual, COALESCE(ds.TotalCompra, 0) AS Egresos, COALESCE(dp.TotalVenta, 0) AS Ingresos, p.stock ";
        $consulta1 .= " FROM productos p ";
        $consulta1 .= " JOIN categoria c ON p.categoria_id = c.id ";
        $consulta1 .= " LEFT JOIN (  ";
        $consulta1 .= " SELECT ds.productos_id, SUM(ds.cantidad_entrada) AS suma_cantidad, SUM(ds.precio_compra) AS TotalCompra ";
        $consulta1 .= " FROM detalle_solicitud ds  ";
        $consulta1 .= " JOIN solicitudes_compra sc ON ds.solicitudes_compra_id = sc.id ";
        $consulta1 .= " WHERE sc.fecha_solicitud BETWEEN '2023-06-12' AND '$fecha' ";
        $consulta1 .= " GROUP BY ds.productos_id  ";
        $consulta1 .= " ) AS ds ON p.id = ds.productos_id ";
        $consulta1 .= " LEFT JOIN ( ";
        $consulta1 .= " SELECT dp.productos_id, SUM(dp.cantidad_salida) AS suma_cantidad, sum(dp.precio_venta) as TotalVenta ";
        $consulta1 .= " FROM detalle_pedidos dp  ";
        $consulta1 .= " JOIN pedidos pd ON dp.pedidos_id = pd.id ";
        $consulta1 .= " WHERE pd.fecha_pedido BETWEEN '2023-06-12' AND '$fecha' ";
        $consulta1 .= " GROUP BY dp.productos_id ";
        $consulta1 .= " ) AS dp ON p.id = dp.productos_id ";
        $consulta1 .= " ORDER BY idProducto; ";

        $inventarios = InventarioPrincipal::SQL($consulta);
        $inventarios1 = InventarioPrincipal::SQL($consulta1);

        $stockAct=[];
        foreach( $inventarios1 as $inventario1 ){
            array_push($stockAct, $inventario1->StockActual);
        }

        $router->render('inventario/index', [
            //'nombre' => $_SESSION['nombre'],
            'inventarios' => $inventarios,//usar todo menos el stockActual, no quitar nada porque si funciona cada variable para el inventario
            'stockAct' => $stockAct,//usar solo el stockActual(la resta es el stockActual, pero en este caso restará por el BETWEEN)
            'fecha' => $fecha//para obtener la fecha actual en el formulario
        ]);
    }
}