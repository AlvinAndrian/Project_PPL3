/*==============================================================*/
/* DBMS name:      PostgreSQL 9.x                               */
/* Created on:     11/8/2021 12:43:35 PM                        */
/*==============================================================*/


drop index MENGELOLA2_FK;

drop index MENGELOLA_FK;

drop index MENGELOLA_PK;

drop table MENGELOLA;

drop index MENGOLAH2_FK;

drop index MENGOLAH_FK;

drop index MENGOLAH_PK;

drop table MENGOLAH;

drop index TBL_ADMIN_PK;

drop table TBL_ADMIN;

drop index MEMILIKI2_FK;

drop index TBL_ARTIKEL_PK;

drop table TBL_ARTIKEL;

drop index TBL_MEMBER_PK;

drop table TBL_MEMBER;

drop index MEMILIKI_FK;

drop index TBL_VIDEO_PK;

drop table TBL_VIDEO;

/*==============================================================*/
/* Table: MENGELOLA                                             */
/*==============================================================*/
create table MENGELOLA (
   ADMIN_ID             VARCHAR(255)         not null,
   ARTIKEL_ID           VARCHAR(255)         not null,
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
/* Table: MENGOLAH                                              */
/*==============================================================*/
create table MENGOLAH (
   ADMIN_ID             VARCHAR(255)         not null,
   VIDEO_ID             VARCHAR(255)         not null,
   constraint PK_MENGOLAH primary key (ADMIN_ID, VIDEO_ID)
);

/*==============================================================*/
/* Index: MENGOLAH_PK                                           */
/*==============================================================*/
create unique index MENGOLAH_PK on MENGOLAH (
ADMIN_ID,
VIDEO_ID
);

/*==============================================================*/
/* Index: MENGOLAH_FK                                           */
/*==============================================================*/
create  index MENGOLAH_FK on MENGOLAH (
ADMIN_ID
);

/*==============================================================*/
/* Index: MENGOLAH2_FK                                          */
/*==============================================================*/
create  index MENGOLAH2_FK on MENGOLAH (
VIDEO_ID
);

/*==============================================================*/
/* Table: TBL_ADMIN                                             */
/*==============================================================*/
create table TBL_ADMIN (
   ADMIN_ID             VARCHAR(255)         not null,
   ADMIN_NAME           VARCHAR(255)         not null,
   ADMIN_USERNAME       VARCHAR(255)         not null,
   ADMIN_PASSWORD       VARCHAR(255)         not null,
   ADMIN_EMAIL          VARCHAR(255)         not null,
   ADMIN_PHONE          VARCHAR(255)         not null,
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
   ARTIKEL_ID           VARCHAR(255)         not null,
   VIDEO_ID             VARCHAR(255)         null,
   ARTIKEL_NAME         VARCHAR(255)         not null,
   ARTIKEL_DESC         VARCHAR(255)         not null,
   ARTIKEL_IMAGE        CHAR(254)            null,
   CREATED_DATE         DATE                 not null,
   CREATED_BY           VARCHAR(255)         not null,
   UPDATE_DATE          DATE                 not null,
   UPDATE_BY            VARCHAR(255)         not null,
   constraint PK_TBL_ARTIKEL primary key (ARTIKEL_ID)
);

/*==============================================================*/
/* Index: TBL_ARTIKEL_PK                                        */
/*==============================================================*/
create unique index TBL_ARTIKEL_PK on TBL_ARTIKEL (
ARTIKEL_ID
);

/*==============================================================*/
/* Index: MEMILIKI2_FK                                          */
/*==============================================================*/
create  index MEMILIKI2_FK on TBL_ARTIKEL (
VIDEO_ID
);

/*==============================================================*/
/* Table: TBL_MEMBER                                            */
/*==============================================================*/
create table TBL_MEMBER (
   MEMBER_ID            VARCHAR(1024)        not null,
   MEMBER_NAME          VARCHAR(1024)        not null,
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
   VIDEO_ID             VARCHAR(255)         not null,
   ARTIKEL_ID           VARCHAR(255)         null,
   VIDEO_NAME           VARCHAR(255)         not null,
   VIDEO_DESC           VARCHAR(255)         not null,
   VIDEO_LINK           VARCHAR(255)         not null,
   CREATED_DATE         DATE                 not null,
   CREATED_BY           VARCHAR(255)         not null,
   UPDATE_DATE          DATE                 not null,
   UPDATE_BY            VARCHAR(255)         not null,
   constraint PK_TBL_VIDEO primary key (VIDEO_ID)
);

/*==============================================================*/
/* Index: TBL_VIDEO_PK                                          */
/*==============================================================*/
create unique index TBL_VIDEO_PK on TBL_VIDEO (
VIDEO_ID
);

/*==============================================================*/
/* Index: MEMILIKI_FK                                           */
/*==============================================================*/
create  index MEMILIKI_FK on TBL_VIDEO (
ARTIKEL_ID
);

alter table MENGELOLA
   add constraint FK_MENGELOL_MENGELOLA_TBL_ADMI foreign key (ADMIN_ID)
      references TBL_ADMIN (ADMIN_ID)
      on delete restrict on update restrict;

alter table MENGELOLA
   add constraint FK_MENGELOL_MENGELOLA_TBL_ARTI foreign key (ARTIKEL_ID)
      references TBL_ARTIKEL (ARTIKEL_ID)
      on delete restrict on update restrict;

alter table MENGOLAH
   add constraint FK_MENGOLAH_MENGOLAH_TBL_ADMI foreign key (ADMIN_ID)
      references TBL_ADMIN (ADMIN_ID)
      on delete restrict on update restrict;

alter table MENGOLAH
   add constraint FK_MENGOLAH_MENGOLAH2_TBL_VIDE foreign key (VIDEO_ID)
      references TBL_VIDEO (VIDEO_ID)
      on delete restrict on update restrict;

alter table TBL_ARTIKEL
   add constraint FK_TBL_ARTI_MEMILIKI2_TBL_VIDE foreign key (VIDEO_ID)
      references TBL_VIDEO (VIDEO_ID)
      on delete restrict on update restrict;

alter table TBL_VIDEO
   add constraint FK_TBL_VIDE_MEMILIKI_TBL_ARTI foreign key (ARTIKEL_ID)
      references TBL_ARTIKEL (ARTIKEL_ID)
      on delete restrict on update restrict;

