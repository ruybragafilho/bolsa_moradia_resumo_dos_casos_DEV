"use strict";

/**
 * Módulo:    docPendenteBE.gs
 * Objetivo:  Registrar o status do campo Documentação Pendente de um caso da tabela CASOS
 */


/**
 * Função que evolui um caso da tabela CASOS
 *  
 * @param {String} idCaso: id do caso de será evoluido
 * @param {String} idStatusDocPendente: id do status do campo Documentação Pendente
 */
function docPendenteBE( idCaso, idStatusDocPendente ) {

  // Se id inválido, retorna uma exceção
  if( idCaso < 1  ||  idCaso > TAMANHO_FILA ) {
    throw( new Error( "docPendenteBE - ID Inválido" ) );
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

          
      // Grava o status do campo Documentação Pendente  
      const campo_data = TABELA_FILA.getRange( id+1, DOC_PENDENTE+1 );
      campo_data.setValue( idStatusDocPendente );    


    } catch( error ) {
      throw( "docPendenteBE - " + error.message );
    }

    
    // SOLTA O LOCK
    lock.releaseLock();

    return true;

  } else {

    // SE NAO CONSEGUIR PEGAR O LOCK, LANCA UMA EXCESSAO
    throw( new Error( "docPendenteBE - Nao foi possivel pegar o LOCK" ) );
  }

} // Fim da função docPendenteBE



/**
 *  #####  TESTES PARA AS FUNÇÕES DESSE MÓDULO  #####
 */



/**
 * Função para testar a função principal docPendenteBE
 */
function teste_docPendenteBE() {

  let idCaso = 1;
  let idStatusDocPendente = "2";   

  try {
    docPendenteBE( idCaso, idStatusDocPendente );
  } catch( error ) {
    console.log( error.message );
  }

} // Fim da função teste_docPendenteBE




/**
 * ##### FIM DO MÓDULO docPendenteBE.gs #####
 */


