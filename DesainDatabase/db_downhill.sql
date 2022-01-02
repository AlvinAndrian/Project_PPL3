/*==============================================================*/
/* DBMS name:      PostgreSQL 9.x                               */
/* Created on:     1/2/2022 2:25:55 PM                          */
/*==============================================================*/


drop index MEMILIKI2_FK;

drop index ARTIKEL_PK;

drop table ARTIKEL;

drop index MEMILIKI_FK;

drop index VIDEO_PK;

drop table VIDEO;

/*==============================================================*/
/* Table: ARTIKEL                                               */
/*==============================================================*/
create table ARTIKEL (
   ARTIKEL_ID           INT4                 not null,
   VIDEO_ID             INT4                 null,
   ARTIKEL_HEADINGS     VARCHAR(50)          not null,
   ARTIKEL_DESC         VARCHAR(255)         not null,
   ARTIKEL_LINK         VARCHAR(100)         not null,
   ARTIKEL_IMAGE        VARCHAR(255)         null,
   ARTIKEL_CREATE_DATE  DATE                 not null,
   ARTIKEL_CREATE_BY    VARCHAR(30)          not null,
   ARTIKEL_UPDATE_DATE  DATE                 null,
   ARTIKEL_UPDATE_BY    VARCHAR(30)          null,
   ARTIKEL_KEYWORD      VARCHAR(50)          not null,
   ARTIKEL_AUTHOR       VARCHAR(30)          not null,
   constraint PK_ARTIKEL primary key (ARTIKEL_ID)
);

/*==============================================================*/
/* Index: ARTIKEL_PK                                            */
/*==============================================================*/
create unique index ARTIKEL_PK on ARTIKEL (
ARTIKEL_ID
);

/*==============================================================*/
/* Index: MEMILIKI2_FK                                          */
/*==============================================================*/
create  index MEMILIKI2_FK on ARTIKEL (
VIDEO_ID
);

/*==============================================================*/
/* Table: VIDEO                                                 */
/*==============================================================*/
create table VIDEO (
   VIDEO_ID             INT4                 not null,
   ARTIKEL_ID           INT4                 null,
   VIDEO_HEADINGS       VARCHAR(50)          not null,
   VIDEO_DESC           VARCHAR(255)         not null,
   VIDEO_LINK           VARCHAR(100)         not null,
   VIDEO_CREATE_DATE    DATE                 not null,
   VIDEO_CREATE_BY      VARCHAR(30)          not null,
   VIDEO_UPDATE_DATE    DATE                 null,
   VIDEO_UPDATE_BY      VARCHAR(30)          null,
   VIDEO_KEYWORD        VARCHAR(50)          not null,
   constraint PK_VIDEO primary key (VIDEO_ID)
);

/*==============================================================*/
/* Index: VIDEO_PK                                              */
/*==============================================================*/
create unique index VIDEO_PK on VIDEO (
VIDEO_ID
);

/*==============================================================*/
/* Index: MEMILIKI_FK                                           */
/*==============================================================*/
create  index MEMILIKI_FK on VIDEO (
ARTIKEL_ID
);

alter table ARTIKEL
   add constraint FK_ARTIKEL_MEMILIKI2_VIDEO foreign key (VIDEO_ID)
      references VIDEO (VIDEO_ID)
      on delete restrict on update restrict;

alter table VIDEO
   add constraint FK_VIDEO_MEMILIKI_ARTIKEL foreign key (ARTIKEL_ID)
      references ARTIKEL (ARTIKEL_ID)
      on delete restrict on update restrict;

