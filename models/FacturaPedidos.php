<?php

namespace Model;

class FacturaPedidos extends ActiveRecord {
    protected static $tabla = 'facturaPedido';//no respeta las mayusculas el sql
    protected static $columnasDB = ['id', 'clientes', 'email', 'telefono', 'producto', 'cantidad_salida', 'precio_unitario', 'precio_venta','precioTotal'];

    public $id;
    public $clientes;
    public $email;
    public $telefono;
    public $producto;
    public $cantidad_salida;
    public $precio_unitario;
    public $precio_venta;
    public $precioTotal;

    public function __construct()
    {
        $this->id = $args['id'] ?? null;
        $this->clientes = $args['clientes'] ?? '';
        $this->email = $args['email'] ?? '';
        $this->telefono = $args['telefono'] ?? '';
        $this->producto = $args['producto'] ?? '';
        $this->cantidad_salida = $args['cantidad_salida'] ?? '';
        $this->precio_unitario = $args['precio_unitario'] ?? '';
        $this->precio_venta = $args['precio_venta'] ?? '';
        $this->precioTotal = $args['precioTotal'] ?? '';
    }
}