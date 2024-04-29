CREATE DATABASE SafeSleep;
USE SafeSleep;

CREATE TABLE hospital(
idHospital int primary key not null auto_increment,
  razaoSocial varchar(100) not null,
  nomeFantasia varchar(100),
  cnpj char(14) not null,
  email varchar(60) not null,
  telefone char(14) not null,
  cep char(8) not null,
  numero varchar(45)not null
);

INSERT INTO hospital VALUES 
(default, "Familia Feliz", "HospitalTech", "23456789101213", "hospitalTech@gmail.com", "11999999999", "11111000", "500"),
(default, "Familia Contente", "Sptechospital", "75920391645378", "SpTechospital@gmail.com", "11777777777", "11111222", "91"),
(default, "Familia Happy", "SaoPedro", "78946372849307", "SaoPedro@gmail.com", "11888888888", "11111444", "1000");

CREATE TABLE usuario(
  idUsuario int not null auto_increment,
  login varchar(45) not null,
  senha varchar(45) not null,
  cpf char(11) not null,
  cargo varchar(45),
  nome varchar(45) not null,
  sobrenome varchar(45),
  licenca varchar(45),
  fkHospital int not null,
  constraint chkLicenca check (licenca like 'CRM/%'),
  constraint pkUsuarioHospital primary key (idUsuario, fkHospital),
  constraint fkUsuarioHospital foreign key (fkHospital) references hospital(idHospital)
);

INSERT INTO usuario VALUES
	(default, 'brandao@gmail.com', '1234567!', '85768548503', 'Diretor', 'Fernando', 'Brandão', 'CRM/SP 123456', 3),
	(default, 'david@outlook.com', '2345678@', '38569845804', 'Diretor', 'David', 'Oliveira', 'CRM/SP 987654', 1),
	(default, 'raul@yahoo.com.br', '8745643#', '75684295505', 'Médico', 'Raul', 'Gagliardo', 'CRM/SP 758692', 1),
	(default, 'rebecca@gmail.com.br', '6789$647', '75849368502', 'Diretora', 'Rebecca', 'Andrade', 'CRM/SP 746583', 2);


CREATE TABLE incubadora(
  codigoDeSerie int primary key not null,
  modelo varchar(50),
  fkHospital int not null,
  constraint fkIncubadoraHospital foreign key (fkHospital) references hospital(idHospital)
);

INSERT INTO incubadora VALUES
	(289, 1186, 1),
    (362, 1186, 2),
    (121, 1186, 3),
    (523, 1186, 2),
    (321, 1186, 1);

CREATE TABLE sensor (
  idSensor INT PRIMARY KEY
  fkIncubadora int not null unique,
  constraint fkSensorIncubadora foreign key (fkIncubadora) references incubadora(idIncubadora)
);

INSERT INTO sensor VALUES
	(1, 289),
	(2, 362),
	(3, 121),
	(4, 523),
	(5, 321);

CREATE TABLE historico(
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

INSERT INTO bebe VALUES 
(default, 1, "Jorge", "Silva", "2024-05-01", "Masculino", 0),
(default, 2, "Hellen", "Monteiro", "2024-04-26", "Feminino", 1),
(default, 3, "Lua", "Santos", "2024-05-07", "Feminino", 0),
(default, 4, "Melissa", "Bittencourt", "2024-05-03", "Feminino", 0),
(default, 5, "Miguel", "Camargo", "2024-05-08", "Masculino", 1);
