/**
 * Módulo:    validacaoDadosBE.gs
 * Objetivo:  Módulo com funções que verificam a validade dos dados
 */


// Fumção Backend que verifica se o parâmetro passado é uma string válida
function isStringValidBE(str) {    
  return typeof str === 'string' && str.trim().length > 0;
}


// Fumção Backend que verifica se o parâmetro passado é um inteiro válido
function isIntegerValidBE( int ) {
  return Number.isInteger( int );
}  


// Fumção Backend que verifica se o parâmetro passado é uma data válida
function isDateValidBE(dateStr) {
  // Tenta criar um objeto Date
  const date = new Date(dateStr);
  
  // Verifica se o objeto Date é válido:
  // 1. date.getTime() retorna NaN se for inválida
  // 2. !isNaN(date) verifica se não é Not-a-Number
  return !isNaN(date.getTime());
}



/**
 * ##### FIM DO MÓDULO isStringValidaBE.gs #####
 */

