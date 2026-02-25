"use strict";

/**
 * Módulo:    evoluirCasoBE.gs
 * Objetivo:  evoluir um caso da tabela CASOS
 */


/**
 * Função que evolui um caso da tabela CASOS
 *  
 * @param {String} idCaso: id do caso de será evoluido
 * @param {String} idEvolucao: id da evolucao
 */
function evoluirCasoBE( idCaso, idEvolucao ) {

  // Se id inválido, retorna uma exceção
  if( idCaso < 1  ||  idCaso > TAMANHO_FILA ) {
    throw( new Error( "evoluirCasoBE - ID Inválido" ) );
  }  

  // TENTA PEGAR O LOCK
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);  

  // SE PEGAR O LOCK, PROSSEGUE COM A EVOLUÇÃO
  if( lock.hasLock() ) {

    // Grava a evolução
    try {

      // Converte o id para Integer
      const id = parseInt(idCaso);

          
      // Gera, formata e grava a data da evolução do caso
      let dataEvolucao = new Date().toLocaleString("pt-BR", {dateStyle: "short"});
  
      const campo_data = TABELA_FILA.getRange( id+1, DATA_ULTIMA_EVOLUCAO+1 );
      campo_data.setValue( dataEvolucao );    
  
  
      // Gera e grava o id da evolução do caso
      let idSituacaoBeneficio = parseInt(idEvolucao) + 1;
  
      const campo_SituacaoBeneficio = TABELA_FILA.getRange( id+1, SITUACAO_BENEFICIO+1 );
      campo_SituacaoBeneficio.setValue( idSituacaoBeneficio );      


    } catch( error ) {
      throw( "evoluirCasoBE - " + error.message );
    }

    
    // SOLTA O LOCK
    lock.releaseLock();

    return true;

  } else {

    // SE NAO CONSEGUIR PEGAR O LOCK, LANCA UMA EXCESSAO
    throw( new Error( "evoluirCasoBE - Nao foi possivel pegar o LOCK" ) );
  }

} // Fim da função evoluirCasoBE



/**
 *  #####  TESTES PARA AS FUNÇÕES DESSE MÓDULO  #####
 */



/**
 * Função para testar a função principal evoluirCasoBE
 */
function teste_evoluirCasoBE() {

  let idCaso = 1;
  let idEvolucao = "3";   

  try {
    evoluirCasoBE( idCaso, idEvolucao );
  } catch( error ) {
    console.log( error.message );
  }

} // Fim da função teste_evoluirCasoBE




/**
 * ##### FIM DO MÓDULO evoluirCasoBE.gs #####
 */




