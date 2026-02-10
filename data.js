"use strict";


/**
 * Função que calcula a idade, em anos, de algo cuja data de nascimento 
 * é passada como oarâmetro
 * @param {Date} dataNascimento 
 * @returns Idade em anos
 */
function calcularIdade(dataNascimento) {

    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    nascimento.setDate( nascimento.getDate() + 1 );

    console.log( "Hoje: " + hoje );
    console.log( "Data Nascimento: " + nascimento );
    
    // Calcula a diferença de anos
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    console.log( "Diferença Anos: " + idade );
    
    // Verifica se o aniversário já passou no ano atual
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes == 0 && hoje.getDate() < nascimento.getDate())) {
        idade--; // Subtrai 1 se o aniversário ainda não ocorreu
    }

    console.log( "Diferença Anos considerando o mês e o dia: " + idade );
    
    return idade;

} // Fim da função calcularIdade



function testeVerificarMaioridade() {

  let dataNascimento = "2008-02-04";

  let idade = calcularIdade( dataNascimento );

  console.log( "Maioridade: " + (idade>=18)  );

}



/**
 * Função que calcula um intervalo de tempo entre a data atual e a data 
 * passada como parâmetro
 * @param {*} data 
 * @returns Número de dias no intervalo
 */
function calcularIntervaloEmDias( data ) {

    const hoje = new Date();
    hoje.setHours( 1 );

    const dataReferencia = new Date(data);
    dataReferencia.setDate( dataReferencia.getDate() + 1 );
    dataReferencia.setHours( 1 );

    let intervaloEmMilisegundos = hoje.getTime() - dataReferencia.getTime();
    let intervaloEmDias = intervaloEmMilisegundos / (1000 * 60 * 60 * 24);

    return Math.floor( intervaloEmDias );

} // Fim da função calcularIntervaloEmDias



function testeCalcularIntervaloEmDias() {

  let dataTeste = "2026-02-05";

  let intevalo = calcularIntervaloEmDias( dataTeste );

  console.log( "Intervalo: " + intevalo );
}