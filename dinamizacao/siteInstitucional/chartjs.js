// ========================================== GRÁFICOS ========================================== //

//Temperatura de Todas as Incubadoras
var divTemperaturaAll = document.getElementById('temperaturaAll').getContext('2d');
divTemperaturaAll.canvas.parentNode.style.width = '1600px';
divTemperaturaAll.canvas.parentNode.style.height = '400px';
divTemperaturaAll.canvas.width = 4;
divTemperaturaAll.canvas.height = 1;

var graficoTemperaturaAll = new Chart(
divTemperaturaAll,
{
    type: 'bar',
    data: {
    labels: ['Incubadora 1', 'Incubadora 2', 'Incubadora 3', 'Incubadora 4'],
    datasets: [{
        data: [32.5, 31.4, 30.5, 30.1],
        backgroundColor: '#003050',
        label: 'Temperatura de Cada Incubadora (°C)'
    }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    min: 26,
                    max: 38
                }
            }]
        }
    }
}
)

//Incubadoras em Uso
var divIncubadorasUso = document.getElementById('incubadorasUso').getContext('2d');
divIncubadorasUso.canvas.width = 1;
divIncubadorasUso.canvas.height = 1;

var graficoIncubadorasUso = new Chart(
    divIncubadorasUso,
    {
        type: 'pie',
        data: {
            labels: ['Livres', 'Em uso', 'Manutenção'],
            datasets: [{
                data: [1, 3, 1],
                backgroundColor: [
                '#19A7A8',
                '#003050',
                '#507090'
                ],
                label: 'Quantidade de Incubadoras'
            }]
        },
        options: {
            plugins: {
                subtitle: {
                    display: true,
                    text: 'Ola'
                }
            }
        }
    }
)

//Bebês com Risco
var divBebesCritico = document.getElementById('bebesCritico').getContext('2d');
divBebesCritico.canvas.width = 1;
divBebesCritico.canvas.height = 1;

var graficoBebesCritico = new Chart(
    divBebesCritico,
    {
        type: 'pie',
        data: {
            labels: ['Com Risco', 'Sem Risco'],
            datasets: [{
                data: [2, 3],
                backgroundColor: [
                    '#003050',
                    '#19A7A8'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: "Algo random"
                }
            }
        }
    }
)

//Prematuridade
var divPrematuridade = document.getElementById('prematuridade').getContext('2d');
divPrematuridade.canvas.width = 1;
divPrematuridade.canvas.height = 1;

var graficoPrematuridade = new Chart(
    divPrematuridade,
    {
        type: 'pie',
        data: {
            labels: ['Prematuro', 'Não Prematuro'],
            datasets: [{
                data: [1, 4],
                backgroundColor: [
                '#82FAF9',
                '#507090'
                ]
            }]
        }
    }
)

