// var ambiente_processo = 'producao';
var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso

require("dotenv").config({ path: caminho_env });
const { GoogleGenerativeAI } = require("@google/generative-ai");
const chatIA = new GoogleGenerativeAI("minhaChave");

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var indexRouter = require("./src/routes/index");
var usuariosRouter = require("./src/routes/usuarios");
var hospitaisRouter = require("./src/routes/hospitais");
var funcionarioRouter = require("./src/routes/funcionario");
var incubadoraRouter = require("./src/routes/incubadora");
var bebeRouter = require("./src/routes/bebe");
var temperaturaRouter = require("./src/routes/temperatura");
var profileRouter = require("./src/routes/profile");
// var avisosRouter = require("./src/routes/avisos");
// var medidasRouter = require("./src/routes/medidas");
// var aquariosRouter = require("./src/routes/aquarios");
// var empresasRouter = require("./src/routes/empresas");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuariosRouter);
app.use("/hospitais", hospitaisRouter);
app.use("/funcionario", funcionarioRouter);
app.use("/incubadora", incubadoraRouter);
app.use("/bebe", bebeRouter);
app.use("/temperatura", temperaturaRouter);
app.use("/profile", profileRouter);
// app.use("/avisos", avisosRouter);
// app.use("/medidas", medidasRouter);
// app.use("/aquarios", aquariosRouter);
// app.use("/empresas", empresasRouter);

app.listen(PORTA_APP, function () {
    console.log(`
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######  
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##  
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##   
    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##    
    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##     
    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##      
    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######  
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});

var conversa = []
var inicio = `
Com base nesse escopo responda qualquer pergunta feita pelo usuario(a conversa começa após o "CONVERSA:::" sendo que as falas da IA são representada por "IA:" e as falas do usuario são representadas por "USUARIO: "):
Resumo da Empresa SafeSleep
A SafeSleep tem como objetivo desenvolver um sistema de monitoramento da temperatura de incubadoras para recém-nascidos prematuros, com o uso de um sensor Arduino LM35, segundo os dados obtidos da FIOCRUZ, a queda de 1°C da temperatura corporal em um recém-nascido ocasiona em 28% de aumento na taxa de óbitos.
Objetivo da SafeSleep:  
Diminuir em até 28% a mortalidade de bebês prematuros devido à queda de temperatura em incubadoras.
O que a SafeSleep vai fazer para chegar nesse objetivo?
-	Desenvolver um sistema de monitoramento de temperatura das incubadoras de recém-nascidos para o cliente.
-	Criar uma página web para que o cliente possa cadastrar seus dados.
-	Construir e mostrar gráficos com os dados de temperatura adquiridos.
-	Alertar os usuários caso haja uma alteração de temperatura.
Resultados esperados: 
É esperado como resultado uma solução feita em Arduino, acoplada a incubadora em que o recém-nascido esteja, que utiliza o sensor de temperatura. A solução indicará ao médico responsável os níveis de temperatura das incubadoras de recém-nascidos e com tais dados adquiridos gerar gráficos em uma página web e mostrá-las para os clientes. 
Nessa página web, o usuário (médico) poderá realizar o login para acessar os dados das incubadoras coletados durante um período de 5 em 5 minutos. Caso ocorra alguma alteração de temperatura, o site mandará notificações ao usuário lhe informando a temperatura da incubadora, e em casos de extrema diminuição da temperatura, um alarme será acionado. O banco de dados deverá armazenar e coletar todos os dados de alteração de temperatura durante todo o período de permanência do recém-nascido na incubadora. 
Limites / Exclusões:
Apesar de características como umidade e ventilação serem importantes dentro da incubadora, o principal fator para o desenvolvimento do bebê prematuro é a temperatura e, portanto, o projeto se limita apenas ao monitoramento deste fator. Além disso, o projeto visa entregar uma forma eficiente de visualizar os dados sobre variação de temperatura, mas qualquer tomada de decisão com base nesses dados é de responsabilidade do próprio cliente.
Recursos necessários para o funcionamento da SafeSleep:
-	O programa será desenvolvido através do editor de texto VSCode.
-	As tecnologias utilizadas serão: Javascript, HTML, CSS, node.js, SQL, C++.
-	Será utilizado o sensor de temperatura LM35 e uma placa de prototipagem Arduino UNO R3.
-	O circuito será montado com a utilização de uma protoboard e jumpers.
-	O código do funcionamento do sensor será feito no Arduino IDE.
-	Banco de dados utilizará a plataforma MySQL.
-	O servidor do projeto será hospedado em uma máquina virtual Linux.
Riscos da SafeSleep:
A falta de manutenção e cuidado dos componentes do projeto, como o seu cabeamento poderá colocar em risco o projeto, bem como uma queda de energia no setor da maternidade. Ocorrências como queda da internet ou interferência de sinal que criem empecilhos em acessar a página web e o usuário não receba a notificação ou não a veja gera uma situação que também coloca o projeto em risco, porém, tudo o que foi aqui mencionado deverá ser responsabilidade do cliente após a instalação do projeto. Então, é esperado que o cliente tenha reservadores de energia, um suporte técnico voltado para a área da informática que consiga resolver o problema de conexão e que monitore se há alguma notificação sobre a temperatura em que a máquina se encontra.
A SafeSleep parte da Premissa que: 
-	O cliente deverá possuir um desktop para ter acesso ao site e ao controle de temperatura da incubadora.
-	O cliente também deverá ter uma rede wi-fi estável.
-	O projeto envolve apenas o monitoramento da temperatura. A regulação em si da temperatura na incubadora é de responsabilidade do hospital.
-	A equipe não se responsabilizará pela falta de cuidado do cliente com os componentes do projeto.
Restrições da SafeSleep:
-	Será utilizado apenas o sensor de temperatura (LM35).
-	Site apenas para desktop.
-	A equipe envolvida não poderá monitorar o projeto 24 horas por dia.
-	Apenas profissionais da saúde e desenvolvedores conseguem ter acesso aos dados da temperatura.
-	Compatível apenas com os navegadores: Firefox, Internet Explorer e Google Chrome.
A SafeSleep se baseia nesses dados: 
Para manter a saúde dos bebês recém-nascidos prematuros ou não em perfeitas condições, é necessário que a temperatura dentro das incubadoras se mantenha a mais estável possível tendo como objetivo 36,5°C, sendo aceitável uma variação de até 1°C na maioria dos casos. Se o bebê chega à unidade com temperatura diferente de 36,5°C, verifica-se a sua temperatura a cada hora de acordo com a recomendação, configurando hipotermia quando abaixo de 34,5°C e hipertermia acima de 37,5°C.
Segundo a FIOCRUZ (Fundação Oswaldo Cruz), uma alteração acima de 1°C da temperatura corporal em um recém-nascido ocasiona em 28% de aumento na taxa de mortalidade por hipotermia. Os recém-nascidos prematuros têm uma grande dificuldade na manutenção da sua temperatura corporal e com isso, os mesmos devem ser mantidos em um ambiente termoneutro para controle da temperatura corporal.
CONVERSA:::

`;

conversa.push(inicio);

app.post("/perguntar", async (req, res) => {
    const pergunta = req.body.pergunta;

    var perguntaFormat = `USUARIO: ${pergunta}`
    conversa.push(perguntaFormat)

    try {
        const resultado = await gerarResposta(conversa);
        var mandarResult = resultado;
        var resultadoFormat = `${resultado}`
        conversa.push(resultadoFormat)
        res.json( { resultado } );
        console.log(conversa)
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }

});

// função para gerar respostas usando o gemini
async function gerarResposta(mensagem) {
    // obtendo o modelo de IA
    const modeloIA = chatIA.getGenerativeModel({ model: "gemini-pro" });

    try {
        // gerando conteúdo com base na pergunta
        const resultado = await modeloIA.generateContent(`${mensagem}`);
        const resposta = await resultado.response.text();
        
        console.log(resposta);

        return resposta;
    } catch (error) {
        console.error(error);
        throw error;
    }
}