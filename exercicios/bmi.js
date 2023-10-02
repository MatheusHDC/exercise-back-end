const readline = require('readline-sync');

const calculaIMC = (alt, pes) => { 
    const IMC = (alt < 3) ? pes / alt ** 2
        : pes / (alt / 100) ** 2;

    let state = '';
    switch (true) {
        case IMC <= 18.5:
            state = 'abaixo do peso (magreza)'
            break;
        case IMC <= 24.9:
            state = 'com peso normal'
            break;
        case IMC <= 29.9:
            state = 'acima do peso (sobrepeso)'
            break;
        case IMC <= 34.9:
            state = 'com obesidade grau I'
            break;
        case IMC <= 39.9:
            state = 'com obesidade grau II'
            break;
        default:
            state = 'com obesidade graus III e IV'
            break;
    }
    return(`Seu IMC é: ${IMC}. Você está ${state}`)
};

const altura = readline.question('qual a sua altura? \n');
const peso = readline.questionFloat('qual a seu peso? \n');
console.log(calculaIMC(altura, peso));