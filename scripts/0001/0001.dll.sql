drop index INDPKROL;

drop table ROL;

/*==============================================================*/
/* Table: ROL                                                   */
/*==============================================================*/
create table ROL (
   CROL                 NUMERIC(4)           not null,
   NOMBRE               VARCHAR(50)          null,
   DESCRIPCION          VARCHAR(100)         null,
   ACTIVO               NUMERIC(1)           null,
   FINGRESO             TIMESTAMP            null,
   FMODIFICACION        TIMESTAMP            null,
   CUSUARIOING          VARCHAR(50)          null,
   CUSUARIOMOD          VARCHAR(50)          null,
   constraint PKROL primary key (CROL)
);

comment on table ROL is
'Define los roles como: USUARIO, NEGOCIO, ADMINISTRADOR.';

/*==============================================================*/
/* Index: INDPKROL                                              */
/*==============================================================*/
create  index INDPKROL on ROL (

);



drop index INDPKUSUARIO;

drop table USUARIO;

/*==============================================================*/
/* Table: USUARIO                                               */
/*==============================================================*/
create table USUARIO (
   CUSUARIO             VARCHAR(50)          not null,
   NOMBRES              VARCHAR(100)         null,
   APELLIDOS            VARCHAR(100)         null,
   CORREO               VARCHAR(150)         null,
   TELEFONO             VARCHAR(25)          null,
   FNACIMIENTO          NUMERIC(8)           null,
   PASSWORD             VARCHAR(255)         null,
   ACTIVO               NUMERIC(1)           null,
   FINGRESO             TIMESTAMP            null,
   FMODIFICACION        TIMESTAMP            null,
   CUSUARIOING          VARCHAR(50)          null,
   CUSUARIOMOD          VARCHAR(50)          null,
   constraint PKUSUARIO primary key (CUSUARIO)
);

comment on table USUARIO is
'Guarda los datos personales y de acceso de los tres tipos de usuario.';

/*==============================================================*/
/* Index: INDPKUSUARIO                                          */
/*==============================================================*/
create  index INDPKUSUARIO on USUARIO (

);


drop index INDPKUSUARIOROL;

drop table USUARIOROL;

/*==============================================================*/
/* Table: USUARIOROL                                            */
/*==============================================================*/
create table USUARIOROL (
   CUSUARIO             VARCHAR(50)          not null,
   CROL                 NUMERIC(4)           not null,
   FASIGNACION          NUMERIC(8)           null,
   ACTIVO               NUMERIC(1)           null,
   FINGRESO             TIMESTAMP            null,
   FMODIFICACION        TIMESTAMP            null,
   CUSUARIOING          VARCHAR(50)          null,
   CUSUARIOMOD          VARCHAR(50)          null,
   constraint PKUSUARIOROL primary key (CUSUARIO, CROL)
);

comment on table USUARIOROL is
'Permite asignar varios roles a una misma cuenta.';

/*==============================================================*/
/* Index: INDPKUSUARIOROL                                       */
/*==============================================================*/
create  index INDPKUSUARIOROL on USUARIOROL (

);

alter table USUARIOROL
   add constraint FKUSUARIOROLROL foreign key (CROL)
      references ROL (CROL)
      on delete restrict on update restrict;

alter table USUARIOROL
   add constraint FKUSUARIOROLUSUARIO foreign key (CUSUARIO)
      references USUARIO (CUSUARIO)
      on delete restrict on update restrict;


CREATE UNIQUE INDEX uq_usuario_correo_normalizado
    ON public.usuario (LOWER(TRIM(correo)));