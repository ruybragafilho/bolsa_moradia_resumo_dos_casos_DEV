"use strict";

/**
 * Módulo:    obterCaso.gs
 * Objetivo:  retorna um caso na tabela CASOS
 */



/**
 * Função que retorna um objeto contendo os dados do caso cujo id é passado para a função  
 * 
 * @param {String} id: id do caso de será retornado
 * 
 * @return Objeto com os dados do caso
 * 
 */
function obterCaso( id ) {

  // Se id inválido, retorna uma exceção
  if( id < 1  ||  id > NUM_CASOS ) {
    throw( new Error( "ID Inválido" ) );
  }

  // Array que armazenará o caso pesquisado
  const linhaCaso = BUFFER_CASOS[id-1];   

      return {
        id: linhaCaso[ID],
        referenciaFamiliar: linhaCaso[REFERENCIA_FAMILIAR],
  
        tipoLogradouro: linhaCaso[TIPO_LOGRADOURO],
        nomeLogradouro: linhaCaso[NOME_LOGRADOURO],   
        numero: linhaCaso[NUMERO],
        complemento: linhaCaso[COMPLEMENTO], 
        bairro: linhaCaso[BAIRRO],
        idRegional: linhaCaso[REGIONAL],
        nomeRegional: idsToNomes(linhaCaso[REGIONAL], "REGIONAIS"),
        cep: linhaCaso[CEP],
        tpsa: linhaCaso[TPSA],
  
        dataDeChegadaNoCREAS: linhaCaso[DATA_DE_CHEGADA_NO_CREAS],
  
        idsOrgaosEncaminhadores: linhaCaso[ORGAOS_ENCAMINHADORES],
        nomesOrgaosEncaminhadores: idsToNomes(linhaCaso[ORGAOS_ENCAMINHADORES], "ORGAOS_ENCAMINHADORES"),
  
        dataPrevistaParaResposta: linhaCaso[DATA_PREVISTA_PARA_RESPOSTA],
        dataDaUltimaResposta: linhaCaso[DATA_DA_ULTIMA_RESPOSTA],
  
        dataDeDesignacao: linhaCaso[DATA_DE_DESIGNACAO],
        ativo: linhaCaso[DATA_DE_DESIGNACAO]? "Não" : "Sim",
        idMotivoDeDesignacao: linhaCaso[MOTIVO_DE_DESIGNACAO],
        nomeMotivoDeDesignacao: idsToNomes(linhaCaso[MOTIVO_DE_DESIGNACAO], "MOTIVOS_DE_DESIGNACAO"),
  
        totalPontos: linhaCaso[TOTAL_DE_PONTOS],
  
        tempoDeEspera: linhaCaso[TEMPO_DE_ESPERA],

        idsViolacoes: linhaCaso[VIOLACOES_CASO],
        nomesViolacoes: idsToNomes(linhaCaso[VIOLACOES_CASO], "VIOLACOES"),
  
        idsCategorias: linhaCaso[CATEGORIAS_CASO],
        nomesCategorias: idsToNomes(linhaCaso[CATEGORIAS_CASO], "CATEGORIAS"),
        
        idsParametros: linhaCaso[PARAMETROS_CASO],
        nomesParametros: idsToNomes( linhaCaso[PARAMETROS_CASO], "PARAMETROS" ),

        observacao: linhaCaso[OBSERVACAO]
  
      };// Fim return   
    
} // Fim da função obterCaso



/**
 *  #####  TESTES PARA AS FUNÇÕES DESSE MÓDULO  #####
 */



/**
 * Função para testar a função principal obterCaso
 */
function teste_obterCaso() {

  let id = 9;

  try {
    const caso = obterCaso( id );
    console.log( caso );

  } catch( error ) {
    console.log( error.message );
  }

} // Fim da função teste_obterCaso




/**
 * ##### FIM DO MÓDULO obterCaso.gs #####
 */




