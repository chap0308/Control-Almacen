<?php 

require_once __DIR__ . '/../includes/app.php';

use MVC\Router;
use Controllers\APIController;
use Controllers\LoginController;
use Controllers\PaginasController;
use Controllers\PedidosController;
use Controllers\ClientesController;
use Controllers\FacturaController;
use Controllers\InventarioController;
use Controllers\UsuariosController;
use Controllers\ProductosController;
use Controllers\ProveedorController;
use Controllers\SolicitudesController;


$router = new Router();

//Pagina Principal
$router->get('/', [PaginasController::class, 'index']);
// $router->post('/api/mensajes', [PaginasController::class, 'enviar']);
$router->post('/', [PaginasController::class, 'enviar']);

//LOGIN
$router->get('/login', [LoginController::class, 'login']);//entrar al formulario de login
$router->post('/login', [LoginController::class, 'login']);//enviar datos al formulario de login
$router->get('/logout', [LoginController::class, 'logout']);//CERRAR SESION

//Seccion Controles
$router->get('/inicio', [PaginasController::class, 'inicio']);

//Seccion Productos
$router->get('/productos', [ProductosController::class, 'productos']);
$router->get('/AgregarProductos', [ProductosController::class, 'crear']);
$router->post('/AgregarProductos', [ProductosController::class, 'crear']);
$router->get('/ActualizarProductos', [ProductosController::class, 'actualizar']);
$router->post('/ActualizarProductos', [ProductosController::class, 'actualizar']);
$router->post('/EliminarProductos', [ProductosController::class, 'eliminar']);

//Seccion Proveedores
$router->get('/proveedores', [ProveedorController::class, 'proveedores']);
$router->get('/AgregarProveedores', [ProveedorController::class, 'crear']);
$router->post('/AgregarProveedores', [ProveedorController::class, 'crear']);
$router->get('/ActualizarProveedores', [ProveedorController::class, 'actualizar']);
$router->post('/ActualizarProveedores', [ProveedorController::class, 'actualizar']);
$router->post('/EliminarProveedores', [ProveedorController::class, 'eliminar']);

//Seccion Clientes
$router->get('/clientes', [ClientesController::class, 'clientes']);
$router->get('/AgregarClientes', [ClientesController::class, 'crear']);
$router->post('/AgregarClientes', [ClientesController::class, 'crear']);
$router->get('/ActualizarClientes', [ClientesController::class, 'actualizar']);
$router->post('/ActualizarClientes', [ClientesController::class, 'actualizar']);
$router->post('/EliminarClientes', [ClientesController::class, 'eliminar']);

//Seccion Usuarios
$router->get('/usuarios', [UsuariosController::class, 'usuarios']);
$router->get('/AgregarUsuarios', [UsuariosController::class, 'crear']);
$router->post('/AgregarUsuarios', [UsuariosController::class, 'crear']);
$router->get('/ActualizarUsuarios', [UsuariosController::class, 'actualizar']);
$router->post('/ActualizarUsuarios', [UsuariosController::class, 'actualizar']);
$router->post('/EliminarUsuarios', [UsuariosController::class, 'eliminar']);

/* CADA TABLA PIVOTE DEBE TENER ESTAS DOS URLS, PAGINA DONDE SE VERÁN LOS DATOS Y SU API */
//Seccion Productos Salida
$router->get('/pedidos', [PedidosController::class, 'index']);
$router->get('/detallePedidos', [FacturaController::class, 'pedidos']);

//Seccion Productos Entrada
$router->get('/solicitudes', [SolicitudesController::class, 'index']);
$router->get('/detalleSolicitud', [FacturaController::class, 'solicitudes']);
    
//API
$router->get('/api/productos',[APIController::class,'index']);//creamos esta ruta solo para usarlo de buzon (o sea que acá se guardan los datos de la bd transformados en json)
$router->post('/api/pedidos',[APIController::class,'guardar']);
$router->post('/api/solicitudes',[APIController::class,'guardarSolicitudes']);
$router->post('/api/eliminarPedidos',[APIController::class,'eliminarPedidos']);
$router->post('/api/eliminarSolicitudes',[APIController::class,'eliminarSolicitudes']);

/* */

//Inventario
$router->get('/inventario', [InventarioController::class, 'index']);


// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();