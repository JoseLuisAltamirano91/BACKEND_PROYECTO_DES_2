USE planinggo;

DROP TABLE IF EXISTS USUARIOROL;
DROP TABLE IF EXISTS USUARIO;
DROP TABLE IF EXISTS ROL;

CREATE TABLE ROL (
                     CROL NUMERIC(4) NOT NULL,
                     NOMBRE VARCHAR(50) NULL,
                     DESCRIPCION VARCHAR(100) NULL,
                     ACTIVO NUMERIC(1) NULL,
                     FINGRESO TIMESTAMP NULL DEFAULT NULL,
                     FMODIFICACION TIMESTAMP NULL DEFAULT NULL,
                     CUSUARIOING VARCHAR(50) NULL,
                     CUSUARIOMOD VARCHAR(50) NULL,
                     PRIMARY KEY (CROL)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
COMMENT='Define los roles como: USUARIO, NEGOCIO, ADMINISTRADOR.';

CREATE TABLE USUARIO (
                         CUSUARIO VARCHAR(50) NOT NULL,
                         NOMBRES VARCHAR(100) NULL,
                         APELLIDOS VARCHAR(100) NULL,
                         CORREO VARCHAR(150) NULL,
                         TELEFONO VARCHAR(25) NULL,
                         FNACIMIENTO NUMERIC(8) NULL,
                         PASSWORD VARCHAR(255) NULL,
                         ACTIVO NUMERIC(1) NULL,
                         FINGRESO TIMESTAMP NULL DEFAULT NULL,
                         FMODIFICACION TIMESTAMP NULL DEFAULT NULL,
                         CUSUARIOING VARCHAR(50) NULL,
                         CUSUARIOMOD VARCHAR(50) NULL,
                         CORREO_NORMALIZADO VARCHAR(150) COLLATE utf8mb4_bin
                             GENERATED ALWAYS AS (LOWER(TRIM(CORREO))) STORED,
                         PRIMARY KEY (CUSUARIO),
                         UNIQUE KEY uq_usuario_correo_normalizado (CORREO_NORMALIZADO)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
COMMENT='Guarda los datos personales y de acceso de los tres tipos de usuario.';

CREATE TABLE USUARIOROL (
                            CUSUARIO VARCHAR(50) NOT NULL,
                            CROL NUMERIC(4) NOT NULL,
                            FASIGNACION NUMERIC(8) NULL,
                            ACTIVO NUMERIC(1) NULL,
                            FINGRESO TIMESTAMP NULL DEFAULT NULL,
                            FMODIFICACION TIMESTAMP NULL DEFAULT NULL,
                            CUSUARIOING VARCHAR(50) NULL,
                            CUSUARIOMOD VARCHAR(50) NULL,
                            PRIMARY KEY (CUSUARIO, CROL),
                            CONSTRAINT FKUSUARIOROLROL FOREIGN KEY (CROL)
                                REFERENCES ROL (CROL)
                                ON DELETE RESTRICT ON UPDATE RESTRICT,
                            CONSTRAINT FKUSUARIOROLUSUARIO FOREIGN KEY (CUSUARIO)
                                REFERENCES USUARIO (CUSUARIO)
                                ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
COMMENT='Permite asignar varios roles a una misma cuenta.';