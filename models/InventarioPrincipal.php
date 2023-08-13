<?php

namespace Model;

class InventarioPrincipal extends ActiveRecord {
    protected static $tabla = 'inventario';//no respeta las mayusculas el sql
    protected static $columnasDB = ['idProducto', 'descripcion', 'categoria', 'TotalEntrada', 'TotalSalida', 'StockActual', 'Egresos','Ingresos','stock'];

    public $idProducto;
    public $descripcion;
    public $categoria;
    public $TotalEntrada;
    public $TotalSalida;
    public $StockActual;
    public $Egresos;
    public $Ingresos;
    public $stock;

    public function __construct()
    {
        $this->idProducto = $args['idProducto'] ?? null;
        $this->descripcion = $args['descripcion'] ?? '';
        $this->categoria = $args['categoria'] ?? '';
        $this->TotalEntrada = $args['TotalEntrada'] ?? '';
        $this->TotalSalida = $args['TotalSalida'] ?? '';
        $this->StockActual = $args['StockActual'] ?? '';
        $this->Egresos = $args['Egresos'] ?? '';
        $this->Ingresos = $args['Ingresos'] ?? '';
        $this->stock = $args['stock'] ?? '';
    }
}