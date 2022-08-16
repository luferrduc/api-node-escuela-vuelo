
drop database escuelaVuelo;
create database escuelaVuelo;
use escuelaVuelo;


create table tipo_usuario(
id_tipo int not null primary key auto_increment,
descripcion nvarchar(100) not null);

create table tipo_aeronave(
id_tipo int not null primary key auto_increment,
descripcion nvarchar(100) not null);

create table estado(
id int not null primary key auto_increment,
descripcion nvarchar(100) not null);

create table usuario(
id int not null primary key auto_increment,
nom_usuario nvarchar(100) not null,
contrasena nvarchar(100) not null ,
id_tipo_usuario int not null,
foreign key (id_tipo_usuario) REFERENCES tipo_usuario(id_tipo));

create table piloto(
id_piloto int not null primary key auto_increment,
nombre_comp nvarchar(300) not null,
edad int not null,
horas_vuelo int not null,
tipo_usuario int not null,
foreign key (tipo_usuario) REFERENCES tipo_usuario(id_tipo));

create table licencia(
id int not null primary key auto_increment,
id_piloto int not null unique,
id_estado int not null,
foreign key (id_piloto) REFERENCES piloto(id_piloto),
foreign key (id_estado) REFERENCES estado(id));

create table det_licencia(
id_licencia int not null auto_increment,
id_piloto int not null,
id_tipo_lic int not null,
fec_adquisicion date not null,
primary key(id_licencia, id_piloto),
foreign key(id_licencia) REFERENCES licencia(id),
foreign key(id_piloto) REFERENCES piloto(id_piloto),
foreign key(id_tipo_lic) REFERENCES tipo_aeronave(id_tipo));

create table aeronaves(
id_aeronave int not null primary key auto_increment,
patente_aeronave nvarchar(100) unique,
descripcion_aeronave nvarchar(200) not null,
horas_vuelo int not null,
fec_integracion date not null,
fec_creacion date not null,
fec_retiro_app date not null,
fec_ultimo_mant date not null,
id_estado int not null,
id_tipo_a int not null,
foreign key (id_estado) REFERENCES estado(id),
foreign key (id_tipo_a) REFERENCES tipo_aeronave(id_tipo));

create table componentes(
id_componente int not null primary key auto_increment,
descripcion nvarchar(100) not null,
pert_componente bit not null,
aque_componente nvarchar(100) default('No pertenece'),
id_estado int not null,
foreign key (id_estado) REFERENCES estado(id));

create table mant_componentes(
id int not null primary key auto_increment,
descripcion nvarchar(100) not null,
check_mantencion bit not null,
fec_entrada date not null,
fec_salida date,
id_componente int not null,
foreign key (id_componente) REFERENCES componentes(id_componente));

create table mant_aeronave(
id int not null primary key auto_increment,
descripcion nvarchar(100) not null,
check_mantencion bit not null,
fec_entrada date not null,
fec_salida date,
id_aeronave int not null,
foreign key (id_aeronave) REFERENCES aeronaves(id_aeronave));

insert into tipo_usuario values(1,'Piloto');
insert into tipo_usuario values(2,'Consultor');
insert into tipo_usuario values(3,'Administrador');
insert into tipo_usuario values(4,'Operador');

insert into tipo_aeronave values(1,'Avion');
insert into tipo_aeronave values(2,'Helicoptero');

insert into estado values(1,'En funcionamiento');
insert into estado values(2,'Mantenimiento');

insert into usuario values(1,'pilJose','asd',1);
insert into usuario values(2,'pilLuciano','asd',1);

insert into piloto values(1,'Jose Reyes',20,200,1);
insert into piloto values(2,'Luciano Ferrando',82,6452,1);

insert into licencia values(1,1,1);
insert into licencia values(2,2,1);

insert into aeronaves values(1,'GH-22312', 'Avion comercial grande', 2839, '2013/09/02', '2005/02/20', '2020/12/02', '2021/02/02',1,1);
insert into aeronaves values(2,'GH-22233', 'Helicoptero comercial grande', 1028, '2012/02/03', '2006/07/02',  '2021/02/02', '2020/07/02',2,2);

insert into componentes values(1,'altimetro', 0, default, 1);

insert into mant_componentes values(1,'componente avion altimetro',0,'2000/02/12',null,1);
insert into mant_aeronave values(2,'avion',0,'2000/02/12',null,1);

insert into det_licencia values(1,1,1,'2000/07/02');
insert into det_licencia values(2,2,1,'2000/07/02');


select * from det_licencia;
