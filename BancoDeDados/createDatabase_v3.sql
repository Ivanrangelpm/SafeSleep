create database SafeSleep;
use SafeSleep;

CREATE TABLE sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT
);

create table hospital(
  idHospital int primary key not null auto_increment,
  razaoSocial varchar(100) not null,
  nomeFantasia varchar(100),
  cnpj char(14) not null,
  email varchar(60) not null,
  telefone char(14) not null,
  cep char(8) not null,
  numero varchar(45)not null
);

create table usuario(
  idUsuario int not null auto_increment,
  login varchar(45) not null,
  senha varchar(45) not null,
  cpf char(11) not null,
  cargo varchar(45),
  nome varchar(45) not null,
  sobrenome varchar(45),
  licenca varchar(45),
  fkHospital int not null,
  constraint pkUsuarioHospital primary key (idUsuario, fkHospital),
  constraint fkUsuarioHospital foreign key (fkHospital) references hospital(idHospital)
);

create table incubadora(
  codigoDeSerie int primary key not null,
  modelo varchar(50),
  fkHospital int not null,
  fkSensor int not null,
  constraint fkSensor foreign key (fkSensor) references sensor(idSensor),
  constraint fkIncubadoraHospital foreign key (fkHospital) references hospital(idHospital)
);

create table historico(
  idHistorico int not null auto_increment,
  dataHora date not null,
  temperatura decimal(5, 2) not null,
  fkSensor int not null,
  constraint pkHistoricoSensor primary key (idHistorico, fkSensor),
  constraint pkHistoricoSensor foreign key (fkSensor) references sensor(idSensor)
);

CREATE TABLE bebe(
  idBebe INT PRIMARY KEY AUTO_INCREMENT,
  fkIncubadora INT,
  nome VARCHAR(50),
  sobrenome VARCHAR(45),
  nasc DATE NOT NULL,
  sexo VARCHAR(9),
  prematuridade BIT(1),
  CONSTRAINT fkBebeIncubadora FOREIGN KEY(fkIncubadora) 
	REFERENCES incubadora(idIncubadora)
);