"use strict";

/**
 * Módulo:    reativarCasoBE.gs
 * Objetivo:  Reativa um caso da tabela CASOS
 */


/**
 * Função que reativa um caso da tabela CASOS
 *  
 * @param {String} id: id do caso de será reativado 
 *  
 */
function reativarCasoBE( id ) {

  // Se id inválido, retorna uma exceção
  if( id < 1  ||  id > NUM_CASOS ) {
    throw( new Error( "ID Inválido" ) );
  }  

  // TENTA PEGAR O LOCK
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);  

  // SE PEGAR O LOCK, PROSSEGUE COM A REATIVAÇÃO
  if( lock.hasLock() ) {

    // Converte o id para Integer
    const idCaso = parseInt(id);
        
    // Grava null na data de designação do caso    
    const data = TABELA_CASOS.getRange( idCaso+1, DATA_DE_DESIGNACAO+1 );
    data.setValue( "" );    

    // Grava null no motivo de designação do caso
    const idMotivo = TABELA_CASOS.getRange( idCaso+1, MOTIVO_DE_DESIGNACAO+1 );
    idMotivo.setValue( "" );        

    // SOLTA O LOCK
    lock.releaseLock();

    return true;

  } else {

    // SE NAO CONSEGUIR PEGAR O LOCK, LANCA UMA EXCESSAO
    throw( new Error( "Nao foi possivel pegar o LOCK" ) );
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




