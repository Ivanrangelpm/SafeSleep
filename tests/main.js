const serialport = require('serialport');

const SERIAL_BAUD_RATE = 9600;

const serial = async (
    valoresLm35Temperatura
) => {
    const portas = await serialport.SerialPort.list();
    console.log(portas);
    // const portaArduino = portas.find((porta) => porta.vendorId == '1A86' && porta.productId == 7523);
    // if (!portaArduino) {
    //     throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    // }

    // // Configura a porta serial com o baud rate especificado
    // const arduino = new serialport.SerialPort(
    //     {
    //         path: portaArduino.path,
    //         baudRate: SERIAL_BAUD_RATE
    //     }
    // );

    // // Evento quando a porta serial é aberta
    // arduino.on('open', () => {
    //     console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    // });

    // // Processa os dados recebidos do Arduino
    // arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
    //     console.log(data);
    //     const valores = data.split(';');
    //     const lm35Temperatura = parseFloat(valores[0]);
    //     valoresLm35Temperatura.push(lm35Temperatura);
    // });

    // // Evento para lidar com erros na comunicação serial
    // arduino.on('error', (mensagem) => {
    //     console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    // });
}

// Função principal assíncrona para iniciar a comunicação serial e o servidor web
(async () => {
    // Arrays para armazenar os valores dos sensores
    const valoresLm35Temperatura = [];

    // Inicia a comunicação serial
    await serial(
        valoresLm35Temperatura
    );
})();
