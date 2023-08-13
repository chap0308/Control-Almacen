<?php

define('CARPETA_IMAGENES', $_SERVER['DOCUMENT_ROOT'] . '/imagenes/');

function isAuth() : void {
    if(!isset($_SESSION['login'])) {
        header('Location: /');
    }
}

function debuguear($variable) : string {
    echo "<pre>";
    var_dump($variable);
    echo "</pre>";
    exit;
}

// Escapa / Sanitizar el HTML
function s($html) : string {
    $s = htmlspecialchars($html);
    return $s;
}

function validarORedireccionar(string $url) {
    $id = $_GET['id'];
    $id = filter_var($id, FILTER_VALIDATE_INT);
    
    if(!$id) {
        header("Location: $url " );
    }

    return $id;
}

function isAdmin() : void {
    if( $_SESSION['login'] && $_SESSION['rol']==="trabajador") {
        header('Location: /inicio');
    }
}
function esUltimo(string $actual, string $proximo): bool {

    if($actual !== $proximo) {
        return true;
    }
    return false;
}