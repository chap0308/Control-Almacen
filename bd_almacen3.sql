/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `categoria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

CREATE TABLE `clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

CREATE TABLE `detalle_pedidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productos_id` int DEFAULT NULL,
  `pedidos_id` int DEFAULT NULL,
  `cantidad_salida` int DEFAULT NULL,
  `precio_unitario` decimal(10,2) DEFAULT NULL,
  `precio_venta` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_detalle_pedidos_pedidos1_idx` (`pedidos_id`),
  KEY `productos_id` (`productos_id`),
  CONSTRAINT `detalle_pedidos_ibfk_1` FOREIGN KEY (`pedidos_id`) REFERENCES `pedidos` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `detalle_pedidos_ibfk_2` FOREIGN KEY (`productos_id`) REFERENCES `productos` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;

CREATE TABLE `detalle_solicitud` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productos_id` int DEFAULT NULL,
  `solicitudes_compra_id` int DEFAULT NULL,
  `cantidad_entrada` int DEFAULT NULL,
  `precio_unitario` decimal(10,2) DEFAULT NULL,
  `precio_compra` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_detalle_solicitud_solicitudes_compra1_idx` (`solicitudes_compra_id`),
  KEY `fk_detalle_solicitud_productos1_idx` (`productos_id`),
  CONSTRAINT `detalle_solicitud_ibfk_1` FOREIGN KEY (`productos_id`) REFERENCES `productos` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `detalle_solicitud_ibfk_2` FOREIGN KEY (`solicitudes_compra_id`) REFERENCES `solicitudes_compra` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8;

CREATE TABLE `pedidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clientes_id` int DEFAULT NULL,
  `fecha_pedido` date DEFAULT NULL,
  `precioTotal` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pedidos_clientes1_idx` (`clientes_id`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`clientes_id`) REFERENCES `clientes` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;

CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) NOT NULL,
  `categoria_id` int DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `imagen_producto` varchar(200) DEFAULT NULL,
  `precio_costo` decimal(10,2) DEFAULT NULL,
  `ganancia` decimal(10,2) DEFAULT NULL,
  `precio_unitarioVenta` decimal(10,2) DEFAULT NULL,
  `fecha_inicial` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_productos_categoria_idx` (`categoria_id`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

CREATE TABLE `proveedor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

CREATE TABLE `solicitudes_compra` (
  `id` int NOT NULL AUTO_INCREMENT,
  `proveedor_id` int DEFAULT NULL,
  `fecha_solicitud` date DEFAULT NULL,
  `precioTotal` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_solicitudes_compra_proveedor1_idx` (`proveedor_id`),
  CONSTRAINT `solicitudes_compra_ibfk_1` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedor` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;

CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` char(60) NOT NULL,
  `nombre` varchar(15) DEFAULT NULL,
  `apellido` varchar(20) DEFAULT NULL,
  `rol` varchar(20) NOT NULL,
  `telefono` char(9) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

INSERT INTO `categoria` (`id`, `nombre`) VALUES
(1, 'Tableta');
INSERT INTO `categoria` (`id`, `nombre`) VALUES
(2, 'Jarabe');


INSERT INTO `clientes` (`id`, `nombre`, `email`, `telefono`) VALUES
(1, ' Mario Aguilar', 'mario@hotmail.com', '+51 987633221 ');
INSERT INTO `clientes` (`id`, `nombre`, `email`, `telefono`) VALUES
(2, ' Juan Castillo', 'juan@gmail.com', '+51 987678980 ');
INSERT INTO `clientes` (`id`, `nombre`, `email`, `telefono`) VALUES
(3, ' Marcia Chalco', 'marcia@gmail.com', '+51 987633221 ');

INSERT INTO `detalle_pedidos` (`id`, `productos_id`, `pedidos_id`, `cantidad_salida`, `precio_unitario`, `precio_venta`) VALUES
(31, 20, 29, 6, 22.40, 134.40);
INSERT INTO `detalle_pedidos` (`id`, `productos_id`, `pedidos_id`, `cantidad_salida`, `precio_unitario`, `precio_venta`) VALUES
(32, 22, 30, 8, 26.10, 208.80);
INSERT INTO `detalle_pedidos` (`id`, `productos_id`, `pedidos_id`, `cantidad_salida`, `precio_unitario`, `precio_venta`) VALUES
(33, 22, 31, 6, 26.10, 156.60);
INSERT INTO `detalle_pedidos` (`id`, `productos_id`, `pedidos_id`, `cantidad_salida`, `precio_unitario`, `precio_venta`) VALUES
(34, 22, 32, 4, 26.10, 104.40),
(35, 22, 33, 6, 26.10, 156.60),
(44, 24, 42, 8, 24.00, 192.00),
(45, 22, 43, 6, 36.25, 217.50),
(46, 20, 44, 6, 22.40, 134.40),
(47, 22, 44, 4, 36.25, 145.00),
(48, 20, 45, 10, 27.01, 270.10),
(49, 22, 46, 14, 36.25, 507.50),
(50, 23, 47, 30, 39.97, 1199.10);

INSERT INTO `detalle_solicitud` (`id`, `productos_id`, `solicitudes_compra_id`, `cantidad_entrada`, `precio_unitario`, `precio_compra`) VALUES
(43, 20, 37, 20, 14.00, 280.00);
INSERT INTO `detalle_solicitud` (`id`, `productos_id`, `solicitudes_compra_id`, `cantidad_entrada`, `precio_unitario`, `precio_compra`) VALUES
(44, 21, 37, 22, 25.00, 550.00);
INSERT INTO `detalle_solicitud` (`id`, `productos_id`, `solicitudes_compra_id`, `cantidad_entrada`, `precio_unitario`, `precio_compra`) VALUES
(45, 22, 38, 24, 18.00, 432.00);
INSERT INTO `detalle_solicitud` (`id`, `productos_id`, `solicitudes_compra_id`, `cantidad_entrada`, `precio_unitario`, `precio_compra`) VALUES
(46, 23, 38, 30, 24.00, 720.00),
(59, 24, 50, 20, 15.00, 300.00),
(60, 24, 51, 14, 18.00, 252.00),
(61, 26, 52, 25, 20.00, 500.00),
(62, 22, 53, 16, 25.00, 400.00),
(63, 20, 54, 5, 14.00, 70.00),
(64, 22, 54, 8, 25.00, 200.00),
(65, 20, 55, 12, 20.00, 240.00),
(66, 20, 56, 15, 16.88, 253.20),
(67, 22, 57, 8, 25.00, 200.00);

INSERT INTO `pedidos` (`id`, `clientes_id`, `fecha_pedido`, `precioTotal`) VALUES
(29, 2, '2023-06-14', 134.40);
INSERT INTO `pedidos` (`id`, `clientes_id`, `fecha_pedido`, `precioTotal`) VALUES
(30, 1, '2023-06-12', 208.80);
INSERT INTO `pedidos` (`id`, `clientes_id`, `fecha_pedido`, `precioTotal`) VALUES
(31, 2, '2023-06-13', 156.60);
INSERT INTO `pedidos` (`id`, `clientes_id`, `fecha_pedido`, `precioTotal`) VALUES
(32, 2, '2023-06-14', 104.40),
(33, 2, '2023-06-14', 156.60),
(42, 1, '2023-06-20', 192.00),
(43, 2, '2023-06-20', 217.50),
(44, 2, '2023-07-24', 279.40),
(45, 2, '2023-07-24', 270.10),
(46, 2, '2023-07-25', 507.50),
(47, 1, '2023-07-25', 1199.10);

INSERT INTO `productos` (`id`, `descripcion`, `categoria_id`, `stock`, `imagen_producto`, `precio_costo`, `ganancia`, `precio_unitarioVenta`, `fecha_inicial`) VALUES
(20, 'Vitamina C', 1, 30, 'b14fb1b771104dd874dcb9feb503c1bd.jpg', 16.88, 1.60, 27.01, '2023-06-14');
INSERT INTO `productos` (`id`, `descripcion`, `categoria_id`, `stock`, `imagen_producto`, `precio_costo`, `ganancia`, `precio_unitarioVenta`, `fecha_inicial`) VALUES
(21, 'Gingisona', 1, 22, '118f12473d589c45238c6aa31ad34046.jpg', 25.00, 1.55, 38.75, '2023-06-14');
INSERT INTO `productos` (`id`, `descripcion`, `categoria_id`, `stock`, `imagen_producto`, `precio_costo`, `ganancia`, `precio_unitarioVenta`, `fecha_inicial`) VALUES
(22, 'Panadol', 1, 8, '5e0f7574caab63171225949aa43b65f0.jpg', 25.00, 1.45, 36.25, '2023-06-12');
INSERT INTO `productos` (`id`, `descripcion`, `categoria_id`, `stock`, `imagen_producto`, `precio_costo`, `ganancia`, `precio_unitarioVenta`, `fecha_inicial`) VALUES
(23, 'Vitamina A', 2, 0, '3a3ab6f10c7a2d938cb9e8d3dba185b6.jpg', 24.67, 1.62, 39.97, '2023-06-12'),
(24, 'Paracetamol', 2, 26, 'bddb6daa44da40f052687a41020281c8.jpg', 16.62, 1.55, 25.76, '2023-06-20'),
(26, ' Amoxicilina', 2, 25, 'b747ee3e0e1dcacf1ec6f8c0878fa869.jpg', 20.00, 1.60, 32.00, '2023-06-20');

INSERT INTO `proveedor` (`id`, `nombre`, `email`, `telefono`) VALUES
(1, ' Importadero S.A.C. 123', 'importadero@correo.com', '+51 923756888 ');
INSERT INTO `proveedor` (`id`, `nombre`, `email`, `telefono`) VALUES
(2, ' Heltf SAC322', 'medic@correo.com', '+51 999888777 ');
INSERT INTO `proveedor` (`id`, `nombre`, `email`, `telefono`) VALUES
(3, ' Importadero SAC', 'hola@correo.com', '+51 963852741 ');

INSERT INTO `solicitudes_compra` (`id`, `proveedor_id`, `fecha_solicitud`, `precioTotal`) VALUES
(37, 2, '2023-06-14', 830.00);
INSERT INTO `solicitudes_compra` (`id`, `proveedor_id`, `fecha_solicitud`, `precioTotal`) VALUES
(38, 2, '2023-06-12', 1152.00);
INSERT INTO `solicitudes_compra` (`id`, `proveedor_id`, `fecha_solicitud`, `precioTotal`) VALUES
(50, 2, '2023-06-20', 300.00);
INSERT INTO `solicitudes_compra` (`id`, `proveedor_id`, `fecha_solicitud`, `precioTotal`) VALUES
(51, 2, '2023-06-20', 252.00),
(52, 1, '2023-06-20', 500.00),
(53, 1, '2023-06-20', 400.00),
(54, 1, '2023-07-24', 270.00),
(55, 1, '2023-07-24', 240.00),
(56, 2, '2023-07-25', 253.20),
(57, 1, '2023-07-25', 200.00);

INSERT INTO `usuarios` (`id`, `email`, `password`, `nombre`, `apellido`, `rol`, `telefono`) VALUES
(2, 'juan_123@correo.com', '$2y$10$LhHSHmEJ5HIOqPXFtEUOE..GasXczOEUaZ/DJnBN.TQorSo/7LRVa', 'Juan', 'Torres', 'administrador', '925687125');
INSERT INTO `usuarios` (`id`, `email`, `password`, `nombre`, `apellido`, `rol`, `telefono`) VALUES
(3, 'pepe123@correo.com', '$2y$10$9TWGA0pHrjV8Aq.UW8Z7/eiqjiohdY4sJwzGfuA51C6tXb007EKc6', 'Pepe', 'Perez', 'trabajador', '987654321');
INSERT INTO `usuarios` (`id`, `email`, `password`, `nombre`, `apellido`, `rol`, `telefono`) VALUES
(4, 'victor@correo.com', '$2y$10$UlQUomk2epW0jojD29Gkeu2RMBUSwUxzp4.cDrBdnD9Ge4oPgTAka', 'Victor', 'Aguilar', 'trabajador', '987654321');
INSERT INTO `usuarios` (`id`, `email`, `password`, `nombre`, `apellido`, `rol`, `telefono`) VALUES
(5, 'marcos123@correo.com', '$2y$10$hvHniLVacqa5RDCbsNhvquGVEIVnxp0lQaAuUGwlQ.oY8PWKVx6u.', 'Marcos', 'Aguilar', 'trabajador', '963852741');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;