"use strict";

/**
 * Módulo:    evoluirMultiplosCasosBE.gs
 * Objetivo:  evoluir múltiplos casos da tabela CASOS
 */


/**
 * Função que evolui múltiplos casos da tabela CASOS, com
 * o mesmo tipo de evolução
 *  
 * @param {String} idsCasos: ids dos casos de serão evoluidos
 * @param {String} idEvolucao: id da evolucao
 */
function evoluirMultiplosCasosBE( idsCasos, idEvolucao ) {

  console.log( "evoluirMultiplosCasosBE" );

} // Fim da função evoluirMultiplosCasosBE



/**
 *  #####  TESTES PARA AS FUNÇÕES DESSE MÓDULO  #####
 */



/**
 * Função para testar a função principal evoluirMultiplosCasosBE
 */
function teste_evoluirMultiplosCasosBE() {

  let idsCasos = [ "3", "5", "9", "12" ];
  let idEvolucao = "3";   

  try {
    evoluirMultiplosCasosBE( idsCasos, idEvolucao );
  } catch( error ) {
    console.log( "teste_evoluirMultiplosCasosBE - " + error.message );
  }

} // Fim da função teste_evoluirMultiplosCasosBE




/**
 * ##### FIM DO MÓDULO evoluirMultiplosCasosBE.gs #####
 */




