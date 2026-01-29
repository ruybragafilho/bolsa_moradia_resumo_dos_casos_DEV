"use strict";

/**
 * Módulo:    obterCasos.gs
 * Objetivo:  Obtém os casos registrados no sistema, filtrados por regional
 */



/**
 * Função que retorna uma tabela com os casos registrados no sistema
 * 
 * @return Uma tabela em que cada linha contém um objeto com os dados de um caso
 */
function obterCasos() {    

  // RETORNA NULL, SE TABELA DE CASOS ESTIVER VAZIA
  if( NUM_CASOS < 1 ) return null;

  
  // Obtém os casos
  let casos = BUFFER_CASOS.map( linhaCaso => {    

      return {

        referenciaFamiliar: linhaCaso[REFERENCIA_FAMILIAR],
        cpf_rf: linhaCaso[CPF_RF],
 
        orgao_encaminhador: linhaCaso[ORGAO_ENCAMINHADOR],
        status_convocacao: linhaCaso[STATUS_CONVOCACAO],
        status_evolucao: linhaCaso[STATUS_EVOLUCAO], 
        doc_pendente: linhaCaso[DOC_PENDENTE],
        tempoDeEspera: linhaCaso[TEMPO_DE_ESPERA],

        pontuacao: linhaCaso[PONTUACAO],   
        posicaoNaFila: 0,        
  
      };// Fim return   

  });

  // Ordena os casos pelos pontos, em ordem decrescente  
  casos.sort((a,b) => b.pontuacao - a.pontuacao);

  // Determina a posicao na fila da regional / fila geral
  let posicao = 1;
  casos.forEach( caso => {

    caso.posicaoNaFila = posicao;
    ++posicao; 

  });

  // Retorna os casos
  return casos;

} // Fim da Função obterCasos 



/**
 *  #####  TESTES PARA AS FUNÇÕES DESSE MÓDULO  #####
 */



/**
 * Função para testar a função principal obterResumosDosCasos
 */
function teste_obterCasos() {

  const casos = obterCasos( "6" );

  console.log(casos);    

} // Fim da Função teste_obterCasos 



/**
 * ##### FIM DO MÓDULO obterCasos.gs #####
 */


