<?php

namespace Model;

class FacturaSolicitud extends ActiveRecord {
    protected static $tabla = 'facturaSolicitud';//no respeta las mayusculas el sql
    protected static $columnasDB = ['id', 'proveedor', 'email', 'telefono', 'producto', 'cantidad_entrada', 'precio_unitario', 'precio_compra','precioTotal'];

    public $id;
    public $proveedor;
    public $email;
    public $telefono;
    public $producto;
    public $cantidad_entrada;
    public $precio_unitario;
    public $precio_compra;
    public $precioTotal;

    public function __construct()
    {
        $this->id = $args['id'] ?? null;
        $this->proveedor = $args['proveedor'] ?? '';
        $this->email = $args['email'] ?? '';
        $this->telefono = $args['telefono'] ?? '';
        $this->producto = $args['producto'] ?? '';
        $this->cantidad_entrada = $args['cantidad_entrada'] ?? '';
        $this->precio_unitario = $args['precio_unitario'] ?? '';
        $this->precio_compra = $args['precio_compra'] ?? '';
        $this->precioTotal = $args['precioTotal'] ?? '';
    }
}