<?php

namespace Model;

class Usuarios extends ActiveRecord{

    protected static $tabla = 'usuarios';
    protected static $columnasDB = ['id','email','password','nombre','apellido','rol','telefono'];

    public $id;
    public $email;
    public $password;
    public $nombre;
    public $apellido;
    public $rol;
    public $telefono;
    

    public function __construct($args=[]){

        $this->id=$args['id'] ?? NULL;//si existe en el array $args un $key llamado 'id', entonces toma NULL.
        $this->email=$args['email'] ?? '';
        $this->password=$args['password'] ?? '';
        $this->nombre=$args['nombre'] ?? '';
        $this->apellido=$args['apellido'] ?? '';
        $this->rol=$args['rol'] ?? '';
        $this->telefono=$args['telefono'] ?? '';
        
    }

    public function validar() {

        
        if(!$this->email){
            self::$alertas[]="Debes colocar el email";
        }elseif(!preg_match('/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',$this->email)){//esta funcion toma una expresion regular y hace que siga un patron, en este caso va del 0 al 9 y tiene que tener max 10 digitos
            self::$alertas[]="Formato no válido del email";
        }
        if(!$this->password){
            self::$alertas[]="Debes añadir el password";
        }

        if(!$this->nombre){
            self::$alertas[]="Debes añadir un nombre";
        }

        if(!$this->apellido){
            self::$alertas[]="Debes añadir el apellido";
        }
        if(!$this->rol){
            self::$alertas[]="Debes añadir el rol";
        }elseif(!preg_match('/^(administrador|trabajador)$/',$this->rol)){//'/[+][0-9]/' esta funcion toma una expresion regular y hace que siga un patron, en este caso va del 0 al 9 y tiene que tener max 10 digitos
            self::$alertas[]="Rol no válido";
        }

        if(!$this->telefono){
            self::$alertas[]="Debes colocar el telefono";
        }elseif(!preg_match('/^9[0-9]{8}$/',$this->telefono)){//'/[+][0-9]/' esta funcion toma una expresion regular y hace que siga un patron, en este caso va del 0 al 9 y tiene que tener max 10 digitos
            self::$alertas[]="Formato no válido del telefono";
        }
        
        return self::$alertas;

    }

    public function validarLogin() {
        if(!$this->email) {
            self::$alertas['error'][] = 'El email es Obligatorio';
        }
        if(!$this->password) {
            self::$alertas['error'][] = 'El Password es Obligatorio';
        }

        return self::$alertas;
    }
    public function comprobarPassword($password) {
        $resultado = password_verify($password, $this->password);//verifica contraseña
        
        //esto permite que si la contraseña está mal o la cuenta no ha sido verificada, no te permitirá entrar
        if(!$resultado) {//dos tipos diferentes de resultado te saldran
            
            self::$alertas['error'][] = 'Password Incorrecto';//acá se llena la nueva alerta
        } else {
            return true;
        }
    }

}