DROP TABLE IF EXISTS NEGOCIO;

/*==============================================================*/
/* Table: NEGOCIO                                               */
/*==============================================================*/
create table NEGOCIO (
                         CNEGOCIO             SERIAL               not null,
                         CUSUARIO             VARCHAR(50)          not null,
                         NOMBRE               VARCHAR(100)         null,
                         DESCRIPCION          VARCHAR(150)         null,
                         TELEFONO             VARCHAR(25)          null,
                         CORREO               VARCHAR(100)         null,
                         ACTIVO               NUMERIC(1)           null,
                         FCREACION            NUMERIC(8)           null,
                         FINGRESO             TIMESTAMP            null,
                         FMODIFICACION        TIMESTAMP            null,
                         CUSUARIOING          VARCHAR(50)          null,
                         CUSUARIOMOD          VARCHAR(50)          null,
                         constraint PKNEGOCIO primary key (CNEGOCIO)
);

comment on table NEGOCIO is
'Guarda el perfil del proveedor que publica lugares y actividades.
';

/*==============================================================*/
/* Index: INDPKNEGOCIO                                          */
/*==============================================================*/
create unique index INDPKNEGOCIO on NEGOCIO (
                                             CNEGOCIO
    );

alter table NEGOCIO
    add constraint FKNEGOCIOUSUARIO foreign key (CUSUARIO)
        references USUARIO (CUSUARIO)
        on delete restrict on update restrict;
