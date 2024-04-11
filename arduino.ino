//Sensor de temperatura usando o LM35
const int pino = A0; // Define o pino que lera a saída do LM35
float temperatura; // Variável que armazenará a temperatura medida

//Função que será executada uma vez quando ligar ou resetar o Arduino
void setup() {
  Serial.begin(9600); // inicializa a comunicação serial
}
//Função que será executada continuamente
void loop() {
  temperatura = (float) analogRead(pino)*0.49;
  Serial.println(temperatura);
  delay(500);
}
