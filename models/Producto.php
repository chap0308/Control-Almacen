<?php

namespace Model;

class Producto extends ActiveRecord{

    protected static $tabla = 'productos';
    protected static $columnasDB = ['id','descripcion', 'categoria_id','stock', 'imagen_producto','precio_costo','ganancia','precio_unitarioVenta','fecha_inicial'];

    public $id;
    public $descripcion;
    public $categoria_id;
    public $stock;
    public $imagen_producto;
    public $precio_costo;
    public $ganancia;
    public $precio_unitarioVenta;
    public $fecha_inicial;

    public function __construct($args=[]){
        date_default_timezone_set('America/Lima');
        $fecha_actual = date('Y-m-d');
        $this->id=$args['id'] ?? NULL;//si existe en el array $args un $key llamado 'id', entonces toma NULL.
        $this->descripcion=$args['descripcion'] ?? '';
        $this->categoria_id=$args['categoria_id'] ?? '';
        $this->stock=$args['stock'] ?? 0;
        $this->imagen_producto=$args['imagen_producto'] ?? '';
        $this->precio_costo=$args['precio_costo'] ?? 0;
        $this->ganancia=$args['ganancia'] ?? 0;
        $this->precio_unitarioVenta=$args['precio_unitarioVenta'] ?? 0;
        $this->fecha_inicial=$args['fecha_inicial'] ?? $fecha_actual;

    }

    public function validar() {

        if(!$this->descripcion){
            self::$alertas[]="Debes añadir una descripcion";
        }
        if(!$this->categoria_id){
            self::$alertas[]="Debes elegir la categoria";
        }

        if(!$this->imagen_producto ) {
            self::$alertas[] = 'La Imagen es Obligatoria';
        }

        return self::$alertas;

    }
}