"use strict";

/**
 * Módulo:    evoluirCasoBE.gs
 * Objetivo:  evoluir um caso da tabela CASOS
 */


/**
 * Função que evolui um caso da tabela CASOS
 *  
 * @param {String} id: id do caso de será evoluido
 * @param {String} idEvolucao: id da evolucao
 */
function evoluirCasoBE( id, idEvolucao ) {

  // Se id inválido, retorna uma exceção
  if( id < 1  ||  id > TAMANHO_FILA ) {
    throw( new Error( "ID Inválido" ) );
  }  

  // TENTA PEGAR O LOCK
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);  

  // SE PEGAR O LOCK, PROSSEGUE COM A EVOLUÇÃO
  if( lock.hasLock() ) {

    // Converte o id para Integer
    const idCaso = parseInt(id);
        
    // Gera, formata e grava a data da evolução do caso
    let dataEvolucao = new Date().toLocaleString("pt-BR", {dateStyle: "short"});
    const data = TABELA_FILA.getRange( idCaso+1, DATA_EVOLUCAO+1 );
    data.setValue( dataEvolucao );    

    // Grava o id da evolução do caso
    const idSituacaoBeneficio = TABELA_FILA.getRange( idCaso+1, SITUACAO_BENEFICIO+1 );
    idSituacaoBeneficio.setValue( idEvolucao );        

    // SOLTA O LOCK
    lock.releaseLock();

    return true;

  } else {

    // SE NAO CONSEGUIR PEGAR O LOCK, LANCA UMA EXCESSAO
    throw( new Error( "Nao foi possivel pegar o LOCK" ) );
  }

} // Fim da função evoluirCasoBE



/**
 *  #####  TESTES PARA AS FUNÇÕES DESSE MÓDULO  #####
 */



/**
 * Função para testar a função principal evoluirCasoBE
 */
function teste_evoluirCasoBE() {

  let id = 1;
  let idEvolucao = "3";   

  try {
    evoluirCasoBE( id, idEvolucao );
  } catch( error ) {
    console.log( error.message );
  }

} // Fim da função teste_evoluirCasoBE




/**
 * ##### FIM DO MÓDULO evoluirCasoBE.gs #####
 */




