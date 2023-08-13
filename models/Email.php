<?php

namespace Model;


use PHPMailer\PHPMailer\PHPMailer;

class Email extends ActiveRecord{

    protected static $tabla = 'email';//no respeta las mayusculas el sql
    protected static $columnasDB = ['email', 'nombre', 'telefono', 'mensaje'];

    public $email;
    public $nombre;
    public $telefono;
    public $mensaje;

    
    public function __construct($args=[])
    {
        $this->email = $args['email'] ?? '';
        $this->nombre = $args['nombre'] ?? '';
        $this->telefono = $args['telefono'] ?? '';
        $this->mensaje = $args['mensaje'] ?? '';
    }

    public function enviarEmail() {

         // create a new object
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = $_ENV['EMAIL_HOST'];
        $mail->SMTPAuth = true;
        $mail->Port = $_ENV['EMAIL_PORT'];
        $mail->Username = $_ENV['EMAIL_USER'];
        $mail->Password = $_ENV['EMAIL_PASS'];
    
        $mail->setFrom($this->email, $this->nombre);
        $mail->addAddress('HEAD_FARMA@gmail.com');
        $mail->Subject = 'Nuevo mensaje';

        // Set HTML
        $mail->isHTML(TRUE);
        $mail->CharSet = 'UTF-8';

        $contenido = '<html>';
        $contenido .= "<p>Usuario: <strong>" . $this->nombre .  "</strong></p>";
        $contenido .= "<p><strong>Mensaje:</strong><br>" . $this->mensaje .  "</p>";
        $contenido .= "<p>Numero de contacto: " . $this->telefono .  "</p>";
        $contenido .= '</html>';
        $mail->Body = $contenido;

        //Enviar el mail
        $mail->send();
        return true;

    }
}