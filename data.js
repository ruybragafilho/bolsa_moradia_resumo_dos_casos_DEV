"use strict";


/**
 * Função que calcula a idade, em anos, de algo cuja data de nascimento 
 * é passada como oarâmetro
 * @param {Date} dataNascimento 
 * @returns Idade em anos
 */
function calcularIdade(dataNascimento) {

    if( !isDateValidBE(dataNascimento) ) { return new Date(); }

    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    nascimento.setDate( nascimento.getDate() + 1 );
    
    // Calcula a diferença de anos
    let idade = hoje.getFullYear() - nascimento.getFullYear();    
    
    // Verifica se o aniversário já passou no ano atual
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes == 0 && hoje.getDate() < nascimento.getDate())) {
        idade--; // Subtrai 1 se o aniversário ainda não ocorreu
    }    
    
    return idade;

} // Fim da função calcularIdade



// Função para testar a função calcularIdade
function testeVerificarMaioridade() {

  let dataNascimento = "2008-02-04";

  let idade = calcularIdade( dataNascimento );

  console.log( "Maioridade: " + (idade>=18)  );

} // Fim da função testeVerificarMaioridade



/**
 * Função que calcula um intervalo de tempo entre a data atual e a data 
 * passada como parâmetro
 * @param {Date} data: Data que será comparada com a data de hoje
 *                     para calcular o intervalo de tempo 
 * @returns Número de dias no intervalo
 */
function calcularIntervaloEmDias( data ) {

    if( !isDateValidBE(data) ) { return 0; }

    const hoje = new Date();
    hoje.setHours( 1 );

    const dataReferencia = new Date(data);
    dataReferencia.setDate( dataReferencia.getDate() + 1 );
    dataReferencia.setHours( 1 );

    let intervaloEmMilisegundos = hoje.getTime() - dataReferencia.getTime();
    let intervaloEmDias = intervaloEmMilisegundos / (1000 * 60 * 60 * 24);

    return Math.floor( intervaloEmDias );

} // Fim da função calcularIntervaloEmDias



// Função para testar a função calcularIntervaloEmDias
function testeCalcularIntervaloEmDias() {

  let dataTeste = "2026-02-05";

  let intevalo = calcularIntervaloEmDias( dataTeste );

  console.log( "Intervalo: " + intevalo );

} // Fim da função testeCalcularIntervaloEmDias



// Função para comparar datas passadas como parametro
// Se data1 > data2 retorna número positivo
// Se data1 < data2 retorna número negativo
// Se data1 == data2 retorna ZERO
function compararDatas( data1, data2 ) {

  const data_1 = isDateValidBE(data1) ? new Date( data1 ) : new Date();
  const data_2 = isDateValidBE(data2) ? new Date( data2 ) : new Date();

  return data_2.getTime() - data_1.getTime();

} // Fim da função compararDatas



// Função para testar a função compararDatas
function testeCompararDatas() {

  const d1 = "2025-02-04";
  const d2 = "2025-02-04";

  let comparacao = compararDatas( d1, d2 );

  console.log( "Comparação: " + comparacao );

} // Fim da função testeCompararDatas


