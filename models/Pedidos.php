<?php

namespace Model;

class Pedidos extends ActiveRecord {
    // Base de datos
    protected static $tabla = 'pedidos';
    protected static $columnasDB = ['id', 'clientes_id', 'fecha_pedido', 'precioTotal'];

    public $id;
    public $clientes_id;
    public $fecha_pedido;
    public $precioTotal;

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->clientes_id = $args['clientes_id'] ?? '';
        $this->fecha_pedido = $args['fecha_pedido'] ?? '';
        $this->precioTotal = $args['precioTotal'] ?? '';
    }
}