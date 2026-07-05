-- creacion de la base de datos
create database imprenta;
use imprenta;

-- tabla administrador(usuario)
CREATE TABLE administrador (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

SELECT * FROM administrador;

-- tabla (categorias)
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

SELECT * FROM categorias;

-- tabla (productos)
CREATE TABLE productos (
    producto_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo_material VARCHAR(255) NOT NULL,
    medida VARCHAR(50),
    precio DECIMAL(10,2),
    url_imagen VARCHAR(255),
    categoria_id INT,
    -- Esto une el producto con su categoría
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) 
    ON DELETE SET NULL 
    ON UPDATE CASCADE
);

SELECT * FROM productos;

-- tabla (clientes)
CREATE TABLE clientes (
    cliente_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_razon_social VARCHAR(150) NOT NULL,
    ruc_dni VARCHAR(20) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    correo VARCHAR(100),
    direccion VARCHAR(255),
    departamento VARCHAR(50),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM clientes;

-- tabla (cotizacion)
CREATE TABLE cotizaciones (
    cotizacion_id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NULL, 
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    subtotal DECIMAL(10,2) NOT NULL,
    igv DECIMAL(10,2) NOT NULL, -- Guardamos el monto calculado
    total DECIMAL(10,2) NOT NULL,
    estado ENUM('Pendiente', 'Aceptado', 'Rechazado') DEFAULT 'Pendiente',
    CONSTRAINT fk_cotizacion_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(cliente_id) ON DELETE SET NULL
);

SELECT * FROM cotizaciones;

-- tabla (cotizacion_detalle)
CREATE TABLE cotizacion_detalle (
    detalle_id INT AUTO_INCREMENT PRIMARY KEY,
    cotizacion_id INT,
    producto_id INT NULL, 
    cantidad INT NOT NULL,
    descripcion_detalle VARCHAR(255), -- Aquí irá "Nombre + Especificaciones"
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_detalle_cotizacion FOREIGN KEY (cotizacion_id) REFERENCES cotizaciones(cotizacion_id) ON DELETE CASCADE,
    CONSTRAINT fk_detalle_producto FOREIGN KEY (producto_id) REFERENCES productos(producto_id) ON DELETE SET NULL
);

SELECT * FROM cotizacion_detalle;

-- tabla (cobranzas)
CREATE TABLE cobranzas (
    cobranza_id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NULL, 
    nombre_cliente_manual VARCHAR(150) NULL, 
    cotizacion_id INT NULL,
    fecha_emision TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    concepto VARCHAR(155) NOT NULL,
    monto_total DECIMAL(10,2) NOT NULL,    
    monto_pagado DECIMAL(10,2) DEFAULT 0.00, 
    monto_pendiente DECIMAL(10,2) NOT NULL,  
    estado ENUM('Pendiente', 'Adelanto', 'Cancelado') DEFAULT 'Pendiente',
    
    CONSTRAINT fk_cob_cliente FOREIGN KEY (cliente_id) 
        REFERENCES clientes(cliente_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_cob_cotizacion FOREIGN KEY (cotizacion_id) 
        REFERENCES cotizaciones(cotizacion_id) ON DELETE SET NULL ON UPDATE CASCADE
);

SELECT * FROM cobranzas;

-- tabla (cobranza_abonos)
CREATE TABLE cobranza_abonos (
    abono_id INT AUTO_INCREMENT PRIMARY KEY,
    cobranza_id INT NOT NULL, 
    fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    monto_abonado DECIMAL(10,2) NOT NULL, 
    metodo_pago ENUM('Efectivo', 'Transferencia', 'Yape/Plin', 'Tarjeta') DEFAULT 'Efectivo',
    nota_pago VARCHAR(255), 
    
    CONSTRAINT fk_abono_cobranza FOREIGN KEY (cobranza_id) 
        REFERENCES cobranzas(cobranza_id) ON DELETE CASCADE ON UPDATE CASCADE
);

SELECT * FROM cobranza_abonos;

-- tabla (contabilidad_ventas)
CREATE TABLE contabilidad_ventas (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    -- Si existe en el módulo clientes, guardamos su ID (opcional)
    cliente_id INT NULL, 
    -- Si es nuevo o "al paso", escribimos el nombre directamente aquí
    cliente_nombre_manual VARCHAR(150) NULL, 
    tipo_comprobante ENUM('Factura', 'Boleta', 'Nota de Venta') NOT NULL,
    serie_comprobante VARCHAR(20) NOT NULL, 
    descripcion VARCHAR(255),               
    subtotal DECIMAL(10,2) NOT NULL,
    igv DECIMAL(10,2) NOT NULL,             
    total DECIMAL(10,2) NOT NULL,           
    mes INT NOT NULL, //?
    anio INT NOT NULL, //?
    
    CONSTRAINT fk_cont_cliente FOREIGN KEY (cliente_id) 
        REFERENCES clientes(cliente_id) ON DELETE SET NULL ON UPDATE CASCADE
);

SELECT * FROM contabilidad_ventas;

-- tabla (contabilidad_compras)
CREATE TABLE contabilidad_compras (
    id_compra INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    proveedor VARCHAR(150) NOT NULL,        -- Quién te vendió
    tipo_comprobante ENUM('Factura', 'Boleta', 'Recibo') NOT NULL,
    serie_comprobante VARCHAR(20) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    igv DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    mes INT NOT NULL, //?
    anio INT NOT NULL //?
);

SELECT * FROM contabilidad_compras;
