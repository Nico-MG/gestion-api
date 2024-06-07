drop schema public cascade;
create schema public;

create table if not exists usuario (
       rut_usuario varchar(20) primary key,
       correo varchar(50),
       contrasena varchar(60),
       nombre varchar(20),
       apellido varchar(20)
);

create table if not exists producto (
       id_producto varchar(20) primary key,
       nombre varchar(20),
       categoria varchar(20),
       cantidad int,
       min_cantidad int,
       precio_venta int
);

create table if not exists proveedor (
       rut_proveedor varchar(20) primary key,
       nombre  varchar(20),
       direccion varchar(20),
       numero varchar(20),
       tipo varchar(20)
);

create table if not exists cliente (
       rut_cliente varchar(20) primary key,
       nombre varchar(20),
       apellido varchar(20)
);

create table if not exists pedido (
       id_pedido varchar(20) primary key,
       rut_proveedor varchar(20),
       rut_usuario varchar(20),
       fecha TIMESTAMP,
       compra_total int,
       foreign key (rut_proveedor) references proveedor(rut_proveedor) on delete cascade on update cascade,
       foreign key (rut_usuario) references usuario(rut_usuario) on delete cascade on update cascade
);

create table if not exists detalle_pedido (
       id_pedido varchar(20),
       id_producto varchar(20),
       cantidad int,
       precio_total int, 
       foreign key (id_producto) references producto(id_producto) on delete cascade on update cascade,
       foreign key (id_pedido) references pedido(id_pedido) on delete cascade on update cascade,
       primary key(id_pedido, id_producto)
);

create table if not exists notificacion (
       id_notificacion SERIAL primary key,
       fecha TIMESTAMP,
       id_producto varchar(20),
       titulo varchar(20),
       descripcion TEXT,
       foreign key (id_producto) references producto(id_producto) on delete cascade on update cascade
);

create table if not exists venta (
       id_venta varchar(20) primary key,
       rut_cliente varchar(20),
       rut_usuario varchar(20),
       fecha TIMESTAMP,
       venta_total int,
       foreign key (rut_cliente) references cliente(rut_cliente) on delete cascade on update cascade,
       foreign key (rut_usuario) references usuario(rut_usuario) on delete cascade on update cascade
);

create table if not exists detalle_venta (
       id_venta varchar(20),
       id_producto varchar(20),
       cantidad int,
       precio_total int,
       foreign key (id_venta) references venta(id_venta) on delete cascade on update cascade,
       foreign key (id_producto) references producto(id_producto) on delete cascade on update cascade,
       primary key(id_venta, id_producto)
);

create table if not exists devolucion (
       id_devolucion varchar(20) primary key,
       id_venta varchar(20),
       fecha TIMESTAMP,
       descripcion text,
       foreign key (id_venta) references venta(id_venta) on delete cascade on update cascade
);

create table if not exists detalle_devolucion (
       id_devolucion varchar(20),
       id_producto varchar(20),
       cantidad int,
       foreign key (id_devolucion) references devolucion(id_devolucion) on delete cascade on update cascade,
       foreign key (id_producto) references producto(id_producto) on delete cascade on update cascade,
       primary key(id_devolucion,id_producto)
);

INSERT INTO usuario (rut_usuario, correo, contrasena, nombre, apellido)
VALUES
    ('123456789', 'usuario1@example.com', 'contrasena123', 'Juan', 'Perez'),
    ('987654321', 'usuario2@example.com', 'clave456', 'María', 'González');

INSERT INTO producto (id_producto, nombre, categoria, cantidad, min_cantidad, precio_venta)
VALUES
    ('P001', 'Camisa', 'Ropa', 50, 10, 20000),
    ('P002', 'Pantalón', 'Ropa', 30, 5, 25000),
    ('P003', 'Zapatillas', 'Calzado', 20, 5, 35000);

INSERT INTO proveedor (rut_proveedor, nombre, direccion, numero, tipo)
VALUES
    ('111111111', 'Proveedor A', 'Calle A #123', '123456789', 'Tipo A'),
    ('222222222', 'Proveedor B', 'Avenida B #456', '987654321', 'Tipo B');

INSERT INTO cliente (rut_cliente, nombre, apellido)
VALUES
    ('999999999', 'Pedro', 'López'),
    ('888888888', 'Ana', 'Martínez');

INSERT INTO pedido (id_pedido, rut_proveedor, rut_usuario, fecha, compra_total)
VALUES
    ('PED001', '111111111', '123456789', CURRENT_TIMESTAMP, 60000),
    ('PED002', '222222222', '987654321', CURRENT_TIMESTAMP, 50000);

INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_total)
VALUES
    ('PED001', 'P001', 10, 200000),
    ('PED001', 'P002', 5, 125000),
    ('PED002', 'P003', 8, 280000);

INSERT INTO notificacion (fecha, id_producto, titulo, descripcion)
VALUES
    (CURRENT_TIMESTAMP, 'P001', 'Nueva notificación', 'Descripción de la notificación para el producto P001');

INSERT INTO venta (id_venta, rut_cliente, rut_usuario, fecha, venta_total)
VALUES
    ('V001', '999999999', '123456789', CURRENT_TIMESTAMP, 45000),
    ('V002', '888888888', '987654321', CURRENT_TIMESTAMP, 75000);

INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_total)
VALUES
    ('V001', 'P001', 3, 60000),
    ('V001', 'P002', 2, 50000),
    ('V002', 'P003', 4, 140000);

INSERT INTO devolucion (id_devolucion, id_venta, fecha, descripcion)
VALUES
    ('D001', 'V001', CURRENT_TIMESTAMP, 'Devolución por productos defectuosos');

INSERT INTO detalle_devolucion (id_devolucion, id_producto, cantidad)
VALUES
    ('D001', 'P001', 1),
    ('D001', 'P002', 1);