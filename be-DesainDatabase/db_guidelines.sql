/*==============================================================*/
/* DBMS name:      PostgreSQL 9.x                               */
/* Created on:     11/1/2021 5:29:38 AM                         */
/*==============================================================*/


drop index MENGELOLA2_FK;

drop index MENGELOLA_FK;

drop index MENGELOLA_PK;

drop table MENGELOLA;

drop index MENGELOLA_3_FK;

drop index MENGELOLA_2_FK;

drop index MENGELOLA_2_PK;

drop table MENGELOLA_2;

drop index TBL_ADMIN_PK;

drop table TBL_ADMIN;

drop index MENGAKSES2_FK;

drop index MEMILIKI_FK;

drop index TBL_ARTIKEL_PK;

drop table TBL_ARTIKEL;

drop index TBL_MEMBER_PK;

drop table TBL_MEMBER;

drop index MENGAKSES_FK;

drop index MEMILIKI2_FK;

drop index TBL_VIDEO_PK;

drop table TBL_VIDEO;

/*==============================================================*/
/* Table: MENGELOLA                                             */
/*==============================================================*/
create table MENGELOLA (
   ADMIN_ID             VARCHAR2(255)        not null,
   ARTIKEL_ID           VARCHAR2(255)        not null,
   constraint PK_MENGELOLA primary key (ADMIN_ID, ARTIKEL_ID)
);

/*==============================================================*/
/* Index: MENGELOLA_PK                                          */
/*==============================================================*/
create unique index MENGELOLA_PK on MENGELOLA (
ADMIN_ID,
ARTIKEL_ID
);

/*==============================================================*/
/* Index: MENGELOLA_FK                                          */
/*==============================================================*/
create  index MENGELOLA_FK on MENGELOLA (
ADMIN_ID
);

/*==============================================================*/
/* Index: MENGELOLA2_FK                                         */
/*==============================================================*/
create  index MENGELOLA2_FK on MENGELOLA (
ARTIKEL_ID
);

/*==============================================================*/
/* Table: MENGELOLA_2                                           */
/*==============================================================*/
create table MENGELOLA_2 (
   ADMIN_ID             VARCHAR2(255)        not null,
   VIDEO_ID             VARCHAR2(255)        not null,
   constraint PK_MENGELOLA_2 primary key (ADMIN_ID, VIDEO_ID)
);

/*==============================================================*/
/* Index: MENGELOLA_2_PK                                        */
/*==============================================================*/
create unique index MENGELOLA_2_PK on MENGELOLA_2 (
ADMIN_ID,
VIDEO_ID
);

/*==============================================================*/
/* Index: MENGELOLA_2_FK                                        */
/*==============================================================*/
create  index MENGELOLA_2_FK on MENGELOLA_2 (
ADMIN_ID
);

/*==============================================================*/
/* Index: MENGELOLA_3_FK                                        */
/*==============================================================*/
create  index MENGELOLA_3_FK on MENGELOLA_2 (
VIDEO_ID
);

/*==============================================================*/
/* Table: TBL_ADMIN                                             */
/*==============================================================*/
create table TBL_ADMIN (
   ADMIN_ID             VARCHAR2(255)        not null,
   ADMIN_NAME           VARCHAR2(255)        not null,
   ADMIN_USERNAME       VARCHAR2(255)        not null,
   ADMIN_PASSWORD       VARCHAR2(255)        not null,
   ADMIN_EMAIL          VARCHAR2(255)        not null,
   ADMIN_PHONE          VARCHAR2(255)        not null,
   constraint PK_TBL_ADMIN primary key (ADMIN_ID)
);

comment on table TBL_ADMIN is
'

';

/*==============================================================*/
/* Index: TBL_ADMIN_PK                                          */
/*==============================================================*/
create unique index TBL_ADMIN_PK on TBL_ADMIN (
ADMIN_ID
);

/*==============================================================*/
/* Table: TBL_ARTIKEL                                           */
/*==============================================================*/
create table TBL_ARTIKEL (
   ARTIKEL_ID           VARCHAR2(255)        not null,
   MEMBER_ID            VARCHAR2(1024)       null,
   VIDEO_ID             VARCHAR2(255)        null,
   ARTIKEL_NAME         VARCHAR2(255)        not null,
   ARTIKEL_DESC         VARCHAR2(255)        not null,
   ARTIKEL_LINK         VARCHAR2(255)        not null,
   ARTIKEL_IMAGE        BLOB                 null,
   ARTIKEL_CREATED_DATE DATE                 not null,
   ARTIKEL_CREATED_BY   VARCHAR2(255)        not null,
   ARTIKEL_UPDATE_DATE  DATE                 not null,
   ARTIKEL_UPDATE_BY    VARCHAR2(255)        not null,
   constraint PK_TBL_ARTIKEL primary key (ARTIKEL_ID)
);

/*==============================================================*/
/* Index: TBL_ARTIKEL_PK                                        */
/*==============================================================*/
create unique index TBL_ARTIKEL_PK on TBL_ARTIKEL (
ARTIKEL_ID
);

/*==============================================================*/
/* Index: MEMILIKI_FK                                           */
/*==============================================================*/
create  index MEMILIKI_FK on TBL_ARTIKEL (
VIDEO_ID
);

/*==============================================================*/
/* Index: MENGAKSES2_FK                                         */
/*==============================================================*/
create  index MENGAKSES2_FK on TBL_ARTIKEL (
MEMBER_ID
);

/*==============================================================*/
/* Table: TBL_MEMBER                                            */
/*==============================================================*/
create table TBL_MEMBER (
   MEMBER_ID            VARCHAR2(1024)       not null,
   MEMBER_NAME          VARCHAR2(1024)       not null,
   constraint PK_TBL_MEMBER primary key (MEMBER_ID)
);

/*==============================================================*/
/* Index: TBL_MEMBER_PK                                         */
/*==============================================================*/
create unique index TBL_MEMBER_PK on TBL_MEMBER (
MEMBER_ID
);

/*==============================================================*/
/* Table: TBL_VIDEO                                             */
/*==============================================================*/
create table TBL_VIDEO (
   VIDEO_ID             VARCHAR2(255)        not null,
   MEMBER_ID            VARCHAR2(1024)       null,
   ARTIKEL_ID           VARCHAR2(255)        null,
   VIDEO_NAME           VARCHAR2(255)        not null,
   VIDEO_DESC           VARCHAR2(255)        not null,
   VIDEO_LINK           VARCHAR2(255)        not null,
   VIDEO_CREATED_DATE   DATE                 not null,
   VIDEO_CREATED_BY     VARCHAR2(255)        not null,
   VIDEO_UPDATE_DATE    DATE                 not null,
   VIDEO_UPDATE_BY      VARCHAR2(255)        not null,
   constraint PK_TBL_VIDEO primary key (VIDEO_ID)
);

/*==============================================================*/
/* Index: TBL_VIDEO_PK                                          */
/*==============================================================*/
create unique index TBL_VIDEO_PK on TBL_VIDEO (
VIDEO_ID
);

/*==============================================================*/
/* Index: MEMILIKI2_FK                                          */
/*==============================================================*/
create  index MEMILIKI2_FK on TBL_VIDEO (
ARTIKEL_ID
);

/*==============================================================*/
/* Index: MENGAKSES_FK                                          */
/*==============================================================*/
create  index MENGAKSES_FK on TBL_VIDEO (
MEMBER_ID
);

alter table MENGELOLA
   add constraint FK_MENGELOL_MENGELOLA_TBL_ADMI foreign key (ADMIN_ID)
      references TBL_ADMIN (ADMIN_ID)
      on delete restrict on update restrict;

alter table MENGELOLA
   add constraint FK_MENGELOL_MENGELOLA_TBL_ARTI foreign key (ARTIKEL_ID)
      references TBL_ARTIKEL (ARTIKEL_ID)
      on delete restrict on update restrict;

alter table MENGELOLA_2
   add constraint FK_MENGELOL_MENGELOLA_TBL_ADMI foreign key (ADMIN_ID)
      references TBL_ADMIN (ADMIN_ID)
      on delete restrict on update restrict;

alter table MENGELOLA_2
   add constraint FK_MENGELOL_MENGELOLA_TBL_VIDE foreign key (VIDEO_ID)
      references TBL_VIDEO (VIDEO_ID)
      on delete restrict on update restrict;

alter table TBL_ARTIKEL
   add constraint FK_TBL_ARTI_MEMILIKI_TBL_VIDE foreign key (VIDEO_ID)
      references TBL_VIDEO (VIDEO_ID)
      on delete restrict on update restrict;

alter table TBL_ARTIKEL
   add constraint FK_TBL_ARTI_MENGAKSES_TBL_MEMB foreign key (MEMBER_ID)
      references TBL_MEMBER (MEMBER_ID)
      on delete restrict on update restrict;

alter table TBL_VIDEO
   add constraint FK_TBL_VIDE_MEMILIKI2_TBL_ARTI foreign key (ARTIKEL_ID)
      references TBL_ARTIKEL (ARTIKEL_ID)
      on delete restrict on update restrict;

alter table TBL_VIDEO
   add constraint FK_TBL_VIDE_MENGAKSES_TBL_MEMB foreign key (MEMBER_ID)
      references TBL_MEMBER (MEMBER_ID)
      on delete restrict on update restrict;

