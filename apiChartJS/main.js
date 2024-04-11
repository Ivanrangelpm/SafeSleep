// declaração das bibliotecas:
// em javascript, as bibliotecas são definidas em variáveis:
const serialport = require("serialport"); // biblioteca de comunicação serial (com o arduino)
const express = require("express"); // biblioteca de criação de servidor local
const mysql = require("mysql2"); // biblioteca de integração com o banco de dados MySQL

const SERIAL_BAUD_RATE = 9600; // define a taxa de transmissão de dados em Bauds
const SERVIDOR_PORTA = 3300; // define a porta de funcionamento do servidor

const HABILITAR_OPERACAO_INSERIR = false; // habilitar a inserção do banco de dados

// o valor de uma variável pode ser uma função também:
async function serial(valores) {
  // função assíncrona (que roda em segundo plano) para conectar o arduino e o banco de dados

  let poolBancoDados = mysql
    .createPool({
      // informações de conexão com o banco de dados
      host: "localhost", // endereço do servidor do banco de dados
      user: "USUARIO_DO_BANCO_LOCAL", // nome do usuário do banco de dados
      password: "SENHA_DO_BANCO_LOCAL", // senha do usuário do banco de dados
      database: "DATABASE_LOCAL", // nome do banco de dados
    })
    .promise(); // variável da conexão com o banco de dados

  const portas = await serialport.SerialPort.list(); // lista de portas seriais do computador
  // console.log(portas);

  const portaArduino = portas.find(function (porta) {
    return porta.manufacturer.includes("Arduino");
    // return porta.vendorId == "2341" && porta.productId == "0043";
  }); // procura pela porta do arduino
  if (!portaArduino) {
    // emite um erro caso o arduino não tenha sido encontrado conectado na máquina
    throw new Error("O arduino não foi encontrado em nenhuma porta serial");
  }
  const arduino = new serialport.SerialPort({
    path: portaArduino.path,
    baudRate: SERIAL_BAUD_RATE,
  }); // conexão com o arduino
  arduino.on("open", function () {
    // exibe no console uma mensagem de sucesso ao conectar com o arduino
    console.log(`A leitura do arduino foi iniciada na porta "${portaArduino.path}" utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
  });
  arduino.pipe(new serialport.ReadlineParser({ delimiter: "\r\n" })).on("data", async function (data) {
    // função para ler os dados enviados pela porta serial
    const fData = parseFloat(data); // pega o segundo valor da lista (obs: não tenho certeza se vai funcionar com este valor)

    valores.push(fData); // adiciona à variável passada para a função um valor de temperatura

    if (HABILITAR_OPERACAO_INSERIR) {
      // caso a inserção no banco de dados esteja habilitada, insere no banco
      await poolBancoDados.execute("INSERT INTO medida (temperatura) VALUES (?)", [fData]);
      console.log(`valores inseridos no banco: ${fData}`);
    }
  });
  arduino.on("error", function (mensagem) {
    // caso ocorra algum erro sobre a conexão com o arduino, exibe o mesmo
    console.error(`Erro no arduino: ${mensagem}`);
  });
}

function servidor(valores) {
  // função para rodar o servidor da aplicação express (o site)
  const app = express(); // cria uma aplicação express
  app.use(function (request, response, next) {
    // define configurações da aplicação
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });
  app.listen(SERVIDOR_PORTA, function () {
    // inicia o servidor na porta definida
    console.log(`Servidor aberto na porta ${SERVIDOR_PORTA} (link: "127.0.0.1:3300")`); // exibe no console uma mensagem de sucesso ao iniciar o servidor
  });
  app.get("/monitoramento", function (request, response) {
    // caso o endereço "localhost:3300/monitoramento" seja acessado, envia os valores da temperatura
    return response.json(valores);
  });
}

(async function () {
  const valores = [];
  await serial(valores);
  servidor(valores);
})(); // função para executar as outras funções, o código "(function () {})()" serve para executar a função instantâneamente, sem nomeá-la
