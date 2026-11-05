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










drop index INDPKINTERES;

drop table INTERES;

/*==============================================================*/
/* Table: INTERES                                               */
/*==============================================================*/
create table INTERES (
                         CINTERES             NUMERIC(5)           not null,
                         NOMBRE               VARCHAR(100)         null,
                         DESCRIPCION          VARCHAR(250)         null,
                         ACTIVO               NUMERIC(1)           null,
                         FINGRESO             TIMESTAMP            null,
                         FMODIFICACION        TIMESTAMP            null,
                         CUSUARIOING          VARCHAR(50)          null,
                         CUSUARIOMOD          VARCHAR(50)          null,
                         constraint PKINTERES primary key (CINTERES)
);

comment on table INTERES is
'Tabla almacenará los tipos de actividades que pueden gustarle a un usuario.';

/*==============================================================*/
/* Index: INDPKINTERES                                          */
/*==============================================================*/
create unique index INDPKINTERES on INTERES (
                                             CINTERES
    );







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







drop index INDPKPLAN;

drop table PLAN;

/*==============================================================*/
/* Table: PLAN                                                  */
/*==============================================================*/
create table PLAN (
                      CPLAN                NUMERIC(10)          not null,
                      CUSUARIO             VARCHAR(50)          not null,
                      NOMBRE               VARCHAR(150)         null,
                      DESCRIPCION          VARCHAR(500)         null,
                      FECHAINICIO          TIMESTAMP            null,
                      FECHAFIN             TIMESTAMP            null,
                      ESTADO               VARCHAR(20)          null,
                      PUBLICO              NUMERIC(1)           null,
                      FINGRESO             TIMESTAMP            null,
                      FMODIFICACION        TIMESTAMP            null,
                      CUSUARIOING          VARCHAR(50)          null,
                      CUSUARIOMOD          VARCHAR(50)          null,
                      constraint PK_PLAN primary key (CPLAN)
);

comment on table PLAN is
'Guardar los planes del usuario';

/*==============================================================*/
/* Index: INDPKPLAN                                             */
/*==============================================================*/
create unique index INDPKPLAN on PLAN (
                                       CPLAN
    );

alter table PLAN
    add constraint PLANUSUARIO foreign key (CUSUARIO)
        references USUARIO (CUSUARIO)
        on delete restrict on update restrict;
