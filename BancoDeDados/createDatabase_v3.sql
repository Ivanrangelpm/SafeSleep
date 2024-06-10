DROP DATABASE IF EXISTS SafeSleep;
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
	(default, 'brandao@gmail.com', '3456789#', '85768548503', 'Diretor', 'Fernando', 'Brandão', 'CRM/SP 123456', 3),
	(default, 'david@outlook.com', '2345678@', '38569845804', 'Diretor', 'David', 'Oliveira', 'CRM/SP 987654', 1),
	(default, 'raul@yahoo.com.br', '8745643#', '75684295505', 'Médico', 'Raul', 'Gagliardo', 'CRM/SP 758692', 1),
	(default, 'rebecca@gmail.com.br', '6789$647', '75849368502', 'Diretora', 'Rebecca', 'Andrade', 'CRM/SP 746583', 2);


CREATE TABLE incubadora(
  codigoDeSerie int primary key not null,
  modelo varchar(50),
  status VARCHAR(15),
  fkHospital int not null,
  constraint fkIncubadoraHospital foreign key (fkHospital) references hospital(idHospital)
);

INSERT INTO incubadora VALUES
	(289, 1186, "Ocupado", 1),
    (362, 1186, "Ocupado", 2),
    (121, 1186, "Ocupado", 3),
    (523, 1186, "Ocupado", 2),
    (321, 1186, "Ocupado", 1);
INSERT INTO incubadora VALUES
	(200, 1186, "Livre", 2);
CREATE TABLE sensor (
  idSensor INT PRIMARY KEY,
  fkIncubadora int not null unique,
  constraint fkSensorIncubadora foreign key (fkIncubadora) references incubadora(codigoDeSerie)
);

INSERT INTO sensor VALUES
	(1, 289),
	(2, 362),
	(3, 121),
	(4, 523),
	(5, 321);

CREATE TABLE historico(
  idHistorico int not null auto_increment,
  dataHora datetime default current_timestamp,
  temperatura decimal(5, 2) not null,
  fkSensor int not null,
  constraint pkHistoricoSensor primary key (idHistorico, fkSensor),
  constraint fkHistoricoSensor foreign key (fkSensor) references sensor(idSensor)
);
INSERT INTO historico (temperatura, fkSensor) VALUES
	(35.5, 2),
	(37.5, 4);

CREATE TABLE bebe(
  idBebe INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(50),
  sobrenome VARCHAR(45),
  nasc DATE NOT NULL,
  sexo VARCHAR(9),
  prematuridade BIT(1)
);

INSERT INTO bebe VALUES 
(default, "Jorge", "Silva", "2024-05-01", "Masculino", 0),
(default, "Hellen", "Monteiro", "2024-04-26", "Feminino", 1),
(default, "Lua", "Santos", "2024-05-07", "Feminino", 0),
(default, "Melissa", "Bittencourt", "2024-05-03", "Feminino", 0),
(default, "Miguel", "Camargo", "2024-05-08", "Masculino", 1);


CREATE TABLE controleFluxo (
    idControle INT AUTO_INCREMENT,
    fkBebe INT,
    fkcodigoDeSerie INT,
    dtEntrada DATETIME DEFAULT CURRENT_TIMESTAMP,
    dtSaida DATETIME,
    CONSTRAINT pkControle PRIMARY KEY (idControle, fkBebe, fkcodigoDeSerie),
    CONSTRAINT fkBebeControle FOREIGN KEY (fkBebe) REFERENCES bebe(idBebe),
    CONSTRAINT fkcodigoSerieControle FOREIGN KEY (fkcodigoDeSerie) REFERENCES incubadora(codigoDeSerie)
);

INSERT INTO controleFluxo VALUES
(default, 1, 289, '2024-05-02 22:40', '2024-05-04 10:03'),
(default, 2, 362, '2024-04-29 02:23', '2024-05-15 12:00'),
(default, 3, 121, '2024-05-07 17:51', '2024-05-14 16:58'),
(default, 4, 523, '2024-05-03 22:07', '2024-05-08 22:10'),
(default, 5, 321, '2024-05-08 23:33', null);

 SELECT concat('Incubadora ', C.codigoDeSerie) as Incubadora, A.temperatura, A.dataHora
	FROM historico as A
	JOIN sensor as B ON B.idSensor = A.fkSensor
    JOIN incubadora as C ON C.codigoDeSerie = B.fkIncubadora
		join (SELECT codigoDeSerie, max(dataHora) as dataHora
		FROM historico 
		JOIN sensor ON idSensor = fkSensor
		JOIN incubadora ON codigoDeSerie = fkIncubadora
		WHERE fkHospital = 2
		GROUP BY codigoDeSerie) as retorno on
        C.codigoDeSerie = retorno.codigoDeSerie
        and A.dataHora = retorno.dataHora
    WHERE C.fkHospital = 2;

select * from hospital;
select * from historico; #WHERE idHistorico >= 2001;
select * from usuario;
SELECT * FROM incubadora;
select * from sensor;
SELECT * FROM bebe;
SELECT * FROM controleFluxo;
TRUNCATE TABLE historico;

select temperatura, DATE_FORMAT(dataHora, '%H:%i:%s') as dataHora from historico join sensor on historico.fkSensor = idSensor join incubadora on fkIncubadora = codigoDeSerie join hospital on fkHospital = idHospital where idHospital = 3 and codigoDeSerie = 121 and idSensor = 3 order by dataHora desc limit 7;

SELECT 
	C.codigoDeSerie as incubadora,
    B.idSensor as sensor, 
    bebe.nome AS nome, 
    A.temperatura, 
    status, 
    A.dataHora
FROM historico as A
	JOIN sensor as B ON B.idSensor = A.fkSensor
	JOIN incubadora as C ON C.codigoDeSerie = B.fkIncubadora
	JOIN controleFluxo ON fkcodigoDeSerie = C.codigoDeSerie
	JOIN bebe ON fkBebe = idBebe
	JOIN (
		SELECT 
			codigoDeSerie, 
            max(dataHora) as dataHora
		FROM historico 
			JOIN sensor ON idSensor = fkSensor
			JOIN incubadora ON codigoDeSerie = fkIncubadora
			WHERE fkHospital = 3
			GROUP BY codigoDeSerie
		) AS retorno 
	ON C.codigoDeSerie = retorno.codigoDeSerie AND A.dataHora = retorno.dataHora
	WHERE C.fkHospital = 3 AND status = 'Ocupado';