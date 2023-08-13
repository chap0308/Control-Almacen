<?php

namespace Model;

class SolicitudesCompra extends ActiveRecord {
    // Base de datos
    protected static $tabla = 'solicitudes_compra';
    protected static $columnasDB = ['id', 'proveedor_id', 'fecha_solicitud', 'precioTotal'];

    public $id;
    public $proveedor_id;
    public $fecha_solicitud;
    public $precioTotal;

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->proveedor_id = $args['proveedor_id'] ?? '';
        $this->fecha_solicitud = $args['fecha_solicitud'] ?? '';
        $this->precioTotal = $args['precioTotal'] ?? '';
    }
}