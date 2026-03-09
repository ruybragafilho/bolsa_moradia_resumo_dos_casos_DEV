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

  // Converte o id para Integer
  const id = parseInt(idCaso);  

  // Se id inválido, retorna uma exceção
  if( id < 1  ||  id > TAMANHO_FILA ) {
    throw( new Error( "evoluirCasoBE - ID Inválido" ) );
  }  

  try {

    // TENTA PEGAR O LOCK
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);  
  
    // SE PEGAR O LOCK, PROSSEGUE COM A EVOLUÇÃO
    if( lock.hasLock() ) {
           
      // Gera, formata e grava a data da evolução do caso
      let dataEvolucao = new Date().toLocaleString("pt-BR", {dateStyle: "short"});
    
      const campo_data = TABELA_FILA.getRange( id+1, DATA_ULTIMA_EVOLUCAO+1 );
      campo_data.setValue( dataEvolucao );    
    
    
      // Gera e grava o id da evolução do caso  
      const campo_SituacaoBeneficio = TABELA_FILA.getRange( id+1, SITUACAO_BENEFICIO+1 );
      campo_SituacaoBeneficio.setValue( idEvolucao );      
        
  
      // Envia email para o órgão encaminhador e para a instituição
      const emailOrgaoEncaminhador = BUFFER_FILA[id-1][EMAIL_ORGAO_ENCAMINHADOR];
      const cpfRFCaso = (BUFFER_FILA[id-1][CPF_RF]).padStart(11, "0");
      const nomeRFCaso = BUFFER_FILA[id-1][REFERENCIA_FAMILIAR];
      const evolucaoCaso = idToNome( idEvolucao,  "SITUACOES_BENEFICIO" );
  
      const idInstituicao = parseInt(BUFFER_FILA[id-1][ORGAO_ENCAMINHADOR]);
      const emailInstituicao = BUFFER_ORGAOS_ENCAMINHADORES[idInstituicao-1][EMAIL_INSTITUICAO];
  
      const emails = [];
      if( isEmailValidBE(emailOrgaoEncaminhador) ) { emails.push(emailOrgaoEncaminhador) }
      if( isEmailValidBE(emailInstituicao) ) { emails.push(emailInstituicao) }
          
      enviarEmailBE( emails.join(",")  , cpfRFCaso, nomeRFCaso, evolucaoCaso );        
      
      // SOLTA O LOCK
      lock.releaseLock();
  
      return true;
  
    } else {
  
      // SE NAO CONSEGUIR PEGAR O LOCK, LANCA UMA EXCESSAO
      throw( new Error( "evoluirCasoBE - Nao foi possivel pegar o LOCK" ) );
    }

  } catch( error ) {
    throw( "evoluirCasoBE - " + error.message );
  }

} // Fim da função evoluirCasoBE



/**
 *  #####  TESTES PARA AS FUNÇÕES DESSE MÓDULO  #####
 */



/**
 * Função para testar a função principal evoluirCasoBE
 */
function teste_evoluirCasoBE() {

  let idCaso = "23";
  let idEvolucao = "3";   

  try {
    evoluirCasoBE( idCaso, idEvolucao );
  } catch( error ) {
    console.log( "teste_evoluirCasoBE - " + error.message );
  }

} // Fim da função teste_evoluirCasoBE




/**
 * ##### FIM DO MÓDULO evoluirCasoBE.gs #####
 */




