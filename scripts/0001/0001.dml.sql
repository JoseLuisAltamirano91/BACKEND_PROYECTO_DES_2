INSERT INTO public.rol
(crol, nombre, descripcion, activo, fingreso, cusuarioing)
VALUES
(1, 'USUARIO', 'Usuario de la aplicacion', 1, CURRENT_TIMESTAMP, 'sistema'),
(2, 'NEGOCIO', 'Propietario de un negocio', 1, CURRENT_TIMESTAMP, 'sistema'),
(3, 'ADMINISTRADOR', 'Administrador de la aplicacion', 1, CURRENT_TIMESTAMP, 'sistema');

INSERT INTO public.usuario
(cusuario, nombres, apellidos, correo, telefono, fnacimiento, password, activo, fingreso, cusuarioing)
VALUES
('USR001', 'Jose', 'Prueba', 'jose.prueba@example.com', '0990000000', 19900101,
 '$2b$12$um/fPra2TBS.peWPbbV0VOHfffK1/maVid5reH05RZ2msHEzIrKlS', 1, CURRENT_TIMESTAMP, 'sistema');

INSERT INTO public.usuariorol
(cusuario, crol, fasignacion, activo, fingreso, cusuarioing)
VALUES
('USR001', 1, TO_CHAR(CURRENT_DATE, 'YYYYMMDD')::numeric, 1, CURRENT_TIMESTAMP, 'sistema');
