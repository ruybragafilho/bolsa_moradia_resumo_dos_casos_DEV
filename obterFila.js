"use strict";

/**
 * Módulo:    obterCasos.gs
 * Objetivo:  Obtém os casos registrados no sistema, filtrados por regional
 */



/**
 * Função que retorna a fila com os casos registrados no sistema
 * 
 * @return Uma fila em que cada posição contém um objeto com os dados de um caso
 */
function obterFila() {    

  // RETORNA NULL, SE FILA ESTIVER VAZIA
  if( TAMANHO_FILA < 1 ) return null;

  
  // Obtém os casos na fila
  let fila = BUFFER_FILA.map( caso => {    

      return {

        id: caso[ID],

        referenciaFamiliar: caso[REFERENCIA_FAMILIAR],
        cpf_rf: caso[CPF_RF],
 
        id_orgao_encaminhador: caso[ORGAO_ENCAMINHADOR],
        nome_orgao_encaminhador: idsToNomes(caso[ORGAO_ENCAMINHADOR], "ORGAOS_ENCAMINHADORES"),
        
        status_convocacao: caso[STATUS_CONVOCACAO],

        id_motivo_designacao:   caso[MOTIVO_DE_DESIGNACAO], 
        nome_motivo_designacao: idsToNomes(caso[MOTIVO_DE_DESIGNACAO], "MOTIVOS_DE_DESIGNACAO"),
        //nome_motivo_designacao: "NOME_MOTIVOS_DE_DESIGNACAO",

        data_designacao: caso[DATA_DE_DESIGNACAO],

        doc_pendente: caso[DOC_PENDENTE],
        tempoDeEspera: caso[TEMPO_DE_ESPERA],

        pontuacao: caso[PONTUACAO],   
        posicaoNaFila: 0
  
      };// Fim return   

  });


  // Ordena os casos pelos pontos, em ordem decrescente  
  caso.sort((a,b) => b.pontuacao - a.pontuacao);

  // Determina a posicao na fila da regional / fila geral
  let posicao = 1;
  caso.forEach( caso => {

    caso.posicaoNaFila = posicao;
    ++posicao; 

  });

  // Retorna a fila
  return caso;

} // Fim da Função obterFila 



/**
 *  #####  TESTES PARA AS FUNÇÕES DESSE MÓDULO  #####
 */



/**
 * Função para testar a função principal obterResumosDosCasos
 */
function teste_obterCasos() {

  const casos = obterCasos( "2" );

  console.log(casos);    

} // Fim da Função teste_obterCasos 



/**
 * ##### FIM DO MÓDULO obterCasos.gs #####
 */


