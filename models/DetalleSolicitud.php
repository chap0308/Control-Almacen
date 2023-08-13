<?php

namespace Model;

class DetalleSolicitud extends ActiveRecord {
    protected static $tabla = 'detalle_solicitud';
    protected static $columnasDB = ['id','productos_id', 'solicitudes_compra_id', 'cantidad_entrada', 'precio_unitario', 'precio_compra'];

    public $id;
    public $productos_id;
    public $solicitudes_compra_id;
    public $cantidad_entrada;
    public $precio_unitario;
    public $precio_compra;

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->productos_id = $args['productos_id'] ?? '';
        $this->solicitudes_compra_id = $args['solicitudes_compra_id'] ?? '';
        $this->cantidad_entrada = $args['cantidad_entrada'] ?? ''; 
        $this->precio_unitario = $args['precio_unitario'] ?? ''; 
        $this->precio_compra = $args['precio_compra'] ?? ''; 

    }
}