DROP TABLE IF EXISTS NEGOCIO;

CREATE TABLE NEGOCIO (
                         CNEGOCIO INT NOT NULL AUTO_INCREMENT,
                         CUSUARIO VARCHAR(50) NOT NULL,
                         NOMBRE VARCHAR(100) NULL,
                         DESCRIPCION VARCHAR(150) NULL,
                         TELEFONO VARCHAR(25) NULL,
                         CORREO VARCHAR(100) NULL,
                         ACTIVO NUMERIC(1) NULL,
                         FCREACION NUMERIC(8) NULL,
                         FINGRESO TIMESTAMP NULL DEFAULT NULL,
                         FMODIFICACION TIMESTAMP NULL DEFAULT NULL,
                         CUSUARIOING VARCHAR(50) NULL,
                         CUSUARIOMOD VARCHAR(50) NULL,
                         PRIMARY KEY (CNEGOCIO),
                         CONSTRAINT FKNEGOCIOUSUARIO FOREIGN KEY (CUSUARIO)
                             REFERENCES USUARIO (CUSUARIO)
                             ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
COMMENT='Guarda el perfil del proveedor que publica lugares y actividades.';