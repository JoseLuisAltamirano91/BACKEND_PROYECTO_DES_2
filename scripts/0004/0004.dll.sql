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




drop index INDPKUSUARIOINTERES;

drop table USUARIOINTERES;

/*==============================================================*/
/* Table: USUARIOINTERES                                        */
/*==============================================================*/
create table USUARIOINTERES (
                                CUSUARIO             VARCHAR(50)          not null,
                                CINTERES             NUMERIC(5)           not null,
                                FINGRESO             TIMESTAMP            null,
                                FMODIFICACION        TIMESTAMP            null,
                                CUSUARIOING          VARCHAR(50)          null,
                                CUSUARIOMOD          VARCHAR(50)          null,
                                constraint PKUSUARIOINTERES primary key (CUSUARIO, CINTERES)
);

comment on table USUARIOINTERES is
'Permite almacenar los intereses de una persona.';

/*==============================================================*/
/* Index: INDPKUSUARIOINTERES                                   */
/*==============================================================*/
create unique index INDPKUSUARIOINTERES on USUARIOINTERES (
                                                           CUSUARIO,
                                                           CINTERES
    );

alter table USUARIOINTERES
    add constraint FKUSUARIOINTERESINTERES foreign key (CINTERES)
        references INTERES (CINTERES)
        on delete restrict on update restrict;

alter table USUARIOINTERES
    add constraint FKUSUARIOINTERESUSUARIO foreign key (CUSUARIO)
        references USUARIO (CUSUARIO)
        on delete restrict on update restrict;
