drop index INDPKPREFERENCIAUSUARIO;

drop table PREFERENCIAUSUARIO;

/*==============================================================*/
/* Table: PREFERENCIAUSUARIO                                    */
/*==============================================================*/
create table PREFERENCIAUSUARIO (
                                    CPREFERENCIA         NUMERIC(5)           not null,
                                    CUSUARIO             VARCHAR(50)          not null,
                                    PRESUPUESTOMAX       NUMERIC(10,2)        null,
                                    DISTANCIAMAX         NUMERIC(5)           null,
                                    TIPOCOMPANIA         VARCHAR(20)          null,
                                    ACTIVO               NUMERIC(1)           null,
                                    FINGRESO             TIMESTAMP            null,
                                    FMODIFICACION        TIMESTAMP            null,
                                    CUSUARIOING          VARCHAR(50)          null,
                                    CUSUARIOMOD          VARCHAR(50)          null,
                                    constraint PKPREFERENCIAUSUARIO primary key (CPREFERENCIA),
                                    constraint AK_UKPREFERENCIAUSUAR_PREFEREN unique (CUSUARIO)
);

comment on table PREFERENCIAUSUARIO is
'Guardar las preferencias del usuario';

/*==============================================================*/
/* Index: INDPKPREFERENCIAUSUARIO                               */
/*==============================================================*/
create unique index INDPKPREFERENCIAUSUARIO on PREFERENCIAUSUARIO (
                                                                   CPREFERENCIA
    );

alter table PREFERENCIAUSUARIO
    add constraint FKPREFERENCIAUSUARIOUSUARIO foreign key (CUSUARIO)
        references USUARIO (CUSUARIO)
        on delete restrict on update restrict;
