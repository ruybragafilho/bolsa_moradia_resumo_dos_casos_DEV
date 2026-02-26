"use strict";

/**
 * Módulo:    docPendenteBE.gs
 * Objetivo:  Altera o status do campo Documentação Pendente de um caso da tabela CASOS
 */


/**
 * Função que altera o status do campo Documentação Pendente de um caso da tabela CASOS
 *  
 * @param {String} idCaso: id do caso de será evoluido
 * 
 */
function docPendenteBE( idCaso ) {

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

      // Nega o status atual do Doc Pendente
      let idStatusDocPendente = BUFFER_FILA[id-1][DOC_PENDENTE] == "2" ? "1" : "2";
                
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

  let idCaso = 3;
  
  try {
    docPendenteBE( idCaso );
  } catch( error ) {
    console.log( error.message );
  }

} // Fim da função teste_docPendenteBE




/**
 * ##### FIM DO MÓDULO docPendenteBE.gs #####
 */


