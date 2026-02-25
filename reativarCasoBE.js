"use strict";

/**
 * Módulo:    reativarCasoBE.gs
 * Objetivo:  Reativa um caso da tabela CASOS
 */


/**
 * Função que reativa um caso da tabela CASOS
 *  
 * @param {String} idCaso: id do caso que será reativado 
 *  
 */
function reativarCasoBE( idCaso ) {

  // Se id inválido, retorna uma exceção
  if( idCaso < 1  ||  idCaso > TAMANHO_FILA ) {
    throw( new Error( "reativarCasoBE - ID Inválido" ) );
  }  

  // TENTA PEGAR O LOCK
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);  

  // SE PEGAR O LOCK, PROSSEGUE COM A REATIVAÇÃO
  if( lock.hasLock() ) {

    // Grava a reativação
    try {

      // Converte o id para Integer
      const id = parseInt(idCaso);
          

      // Grava null na data de designação do caso    
      const dataNula = "";
  
      const campo_data = TABELA_FILA.getRange( id+1, DATA_ULTIMA_EVOLUCAO+1 );
      campo_data.setValue( dataNula );    
  
  
      // Grava null no motivo de designação do caso
      const situacaoBeneficio_ativo = 1;
  
      const campo_SituacaoBeneficio = TABELA_FILA.getRange( id+1, SITUACAO_BENEFICIO+1 );
      campo_SituacaoBeneficio.setValue( situacaoBeneficio_ativo );  


    } catch( error ) {
      throw( "reativarCasoBE - " + error.message );
    }


    // SOLTA O LOCK
    lock.releaseLock();

    return true;

  } else {

    // SE NAO CONSEGUIR PEGAR O LOCK, LANCA UMA EXCESSAO
    throw( new Error( "reativarCasoBE - Nao foi possivel pegar o LOCK" ) );
  }

} // Fim da função reativarCasoBE



/**
 *  #####  TESTES PARA AS FUNÇÕES DESSE MÓDULO  #####
 */



/**
 * Função para testar a função principal reativarCaso
 */
function teste_reativarCasoBE() {

  let id = 1;  

  try {
    reativarCasoBE( id );
  } catch( error ) {
    console.log( error.message );
  }

} // Fim da função teste_reativarCasoBE




/**
 * ##### FIM DO MÓDULO reativarCaso.gs #####
 */




