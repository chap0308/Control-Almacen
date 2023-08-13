<?php

namespace Model;

class DetallePedidos extends ActiveRecord {
    protected static $tabla = 'detalle_pedidos';
    protected static $columnasDB = ['id','productos_id', 'pedidos_id', 'cantidad_salida', 'precio_unitario', 'precio_venta'];

    public $id;
    public $productos_id;
    public $pedidos_id;
    public $cantidad_salida;
    public $precio_unitario;
    public $precio_venta;

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->productos_id = $args['productos_id'] ?? '';
        $this->pedidos_id = $args['pedidos_id'] ?? '';
        $this->cantidad_salida = $args['cantidad_salida'] ?? null; 
        $this->precio_unitario = $args['precio_unitario'] ?? null; 
        $this->precio_venta = $args['precio_venta'] ?? null; 

    }
}