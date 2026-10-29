-- Eliminar índice si existe
DROP INDEX IF EXISTS INDPKDIRECCIONUSUARIO;

-- Eliminar tabla si existe
DROP TABLE IF EXISTS DIRECCIONUSUARIO;

/*==============================================================*/
/* Table: DIRECCIONUSUARIO                                      */
/*==============================================================*/
CREATE TABLE DIRECCIONUSUARIO (
                                  CDIRECCION           NUMERIC(5)           NOT NULL,
                                  CUSUARIO             VARCHAR(50)          NOT NULL,
                                  PAIS                 NUMERIC(5)           NULL,
                                  PROVINCIA            NUMERIC(5)           NULL,
                                  CANTON               NUMERIC(5)           NULL,
                                  CIUDAD               NUMERIC(5)           NULL,
                                  PARROQUIA            NUMERIC(5)           NULL,
                                  SECTOR               NUMERIC(5)           NULL,
                                  DIRECCION            VARCHAR(500)         NULL,
                                  PRINCIPAL            NUMERIC(1)           NULL,
                                  FINGRESO             TIMESTAMP            NULL,
                                  FMODIFICACION        TIMESTAMP            NULL,
                                  CUSUARIOING          VARCHAR(50)          NULL,
                                  CUSUARIOMOD          VARCHAR(50)          NULL,
                                  CONSTRAINT PKDIRECCIONUSUARIO PRIMARY KEY (CDIRECCION, CUSUARIO)
);

COMMENT ON TABLE DIRECCIONUSUARIO IS
'Guardar las direcciones de los usuarios';

/*==============================================================*/
/* Index: INDPKDIRECCIONUSUARIO                                 */
/*==============================================================*/
CREATE UNIQUE INDEX INDPKDIRECCIONUSUARIO ON DIRECCIONUSUARIO (
                                                               CDIRECCION,
                                                               CUSUARIO
    );

ALTER TABLE DIRECCIONUSUARIO
    ADD CONSTRAINT FKDIRECCIONUSUARIOUSUARIO FOREIGN KEY (CUSUARIO)
        REFERENCES USUARIO (CUSUARIO)
        ON DELETE RESTRICT ON UPDATE RESTRICT;