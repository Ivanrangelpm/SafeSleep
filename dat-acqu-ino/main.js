// declaração das bibliotecas:
// em javascript, as bibliotecas são definidas em variáveis:
const serialport = require("serialport"); // biblioteca de comunicação serial (com o arduino)
const express = require("express"); // biblioteca de criação de servidor local
const mysql = require("mysql2"); // biblioteca de integração com o banco de dados MySQL

const SERIAL_BAUD_RATE = 9600; // define a taxa de transmissão de dados em Bauds
const SERVIDOR_PORTA = 3300; // define a porta de funcionamento do servidor

const HABILITAR_OPERACAO_INSERIR = false; // habilitar a inserção do banco de dados

// o valor de uma variável pode ser uma função também:
async function serial(valoresLm35Temperatura) {
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
  console.log(portas);
  const portaArduino = portas.find( // procura pela porta do arduino
    (porta) => porta.vendorId == 2341 && porta.productId == 43
  );
  if (!portaArduino) { // emite um erro caso o arduino não tenha sido encontrado conectado na máquina
    throw new Error("O arduino não foi encontrado em nenhuma porta serial");
  }
  const arduino = new serialport.SerialPort({ // conexão da porta arduino
    path: portaArduino.path,
    baudRate: SERIAL_BAUD_RATE,
  });
  arduino.on("open", () => { // exibe no console uma mensagem de sucesso ao iniciar o servidor
    console.log(
      `A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`
    );
  });
  arduino
    .pipe(new serialport.ReadlineParser({ delimiter: "\r\n" }))
    .on("data", async (data) => {
      //console.log(data);
      const valores = data.split(";");
      const lm35Temperatura = parseFloat(valores[2]);

      valoresLm35Temperatura.push(lm35Temperatura);

      if (HABILITAR_OPERACAO_INSERIR) {
        await poolBancoDados.execute(
          "INSERT INTO medida (temperatura) VALUES (?)",
          [lm35Temperatura]
        );
        console.log(
          "valores inseridos no banco: ",
          dht11Umidade +
            ", " +
            dht11Temperatura +
            ", " +
            luminosidade +
            ", " +
            lm35Temperatura +
            ", " +
            chave
        );
      }
    });
  arduino.on("error", (mensagem) => {
    console.error(`Erro no arduino (Mensagem: ${mensagem}`);
  });
};

function servidor(valoresLm35Temperatura) { // função para rodar o servidor da aplicação
  const app = express(); // cria uma aplicação express
  app.use(function (request, response, next) { // define configurações da aplicação
    response.header("Access-Control-Allow-Origin", "*");
    response.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.listen(SERVIDOR_PORTA, () => { // inicia o servidor na porta definida
    console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`); // exibe no console uma mensagem de sucesso ao iniciar o servidor
  });
  app.get("/monitoramento", (request, response) => { // define uma resposta para o endereço "localhost:3300/monitoramento"
    return response.json(valoresLm35Temperatura);
  });
};

(async () => {
  const valoresLm35Temperatura = [];
  await serial(valoresLm35Temperatura);
  servidor(valoresLm35Temperatura);
})();
