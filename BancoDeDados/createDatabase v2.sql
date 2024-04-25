create database SafeSleep;

use SafeSleep;

create table hospital(
  idHospital int primary key not null auto_increment,
  razaoSocial varchar(100) not null,
  nomeFantasia varchar(100),
  cnpj char(14) not null,
  email varchar(60) not null,
  telefone char(14) not null,
  logradouro varchar(150) not null
);
create table responsavel(
  idResponsavel int primary key not null auto_increment,
  nome varchar(50) not null,
  apelido varchar(25),
  cpf char(11) not null,
  email varchar(60) not null,
  telefone char(14) not null,
  parentesco varchar(15)
);
create table usuario(
  idUsuario int primary key not null auto_increment,
  login varchar(45) not null,
  senha varchar(45) not null,
  cpf char(11) not null,
  cargo varchar(45),
  nome varchar(45),
  licenca varchar(45),
  telefone char(14),
  fkHospital int not null,
  constraint fkUsuarioHospital foreign key (fkHospital) references hospital(idHospital)
);
create table incubadora(
  idIncubadora int primary key not null auto_increment,
  modelo varchar(50) not null,
  codigoDeSerie varchar(7) not null,
  fkHospital int not null,
  constraint fkIncubadoraHospital foreign key (fkHospital) references hospital(idHospital)
);
create table bebe(
  idBebe int not null auto_increment,
  fkIncubadora int not null,
  nome varchar(50) not null,
  nasc date not null,
  sexo varchar(9) not null,
  constraint pkBebeIncudora primary key (idBebe, fkIncubadora),
  constraint fkBebeIncubadora foreign key (fkIncubadora) references incubadora(idIncubadora)
);
create table historico(
  idHistorico int not null auto_increment,
  fkIncubadora int not null,
  dataHora date not null,
  peso decimal(5, 2) not null,
  temperatura decimal(5, 2) not null,
  prematuridade binary(1),
  constraint pkHistoricoIncubadora primary key (idHistorico, fkIncubadora),
  constraint fkHistoricoIncubadora foreign key (fkIncubadora) references incubadora(idIncubadora)
);
create table metrica(
  dataHora datetime not null,
  temperaturaMinima decimal(5, 2) not null,
  temperaturaMaxima decimal(5, 2) not null,
  fkIncubadora int not null
);
create table bebeResponsavel(
  fkBebe int not null,
  fkResponsavel int not null,
  constraint pkBebeResponsavel primary key (fkBebe, fkResponsavel),
  constraint fkMetricaBebe foreign key (fkBebe) references bebe(idBebe),
  constraint fkMetricaResponsavel foreign key (fkResponsavel) references Responsavel(idResponsavel)
);