"use strict";

/**
 * Módulo:    obterCasos.gs
 * Objetivo:  Obtém os casos registrados no sistema, filtrados por regional
 */



/**
 * Função que retorna uma tabela com os casos registrados no sistema, filtrados por regional   
 * 
 * @param {String} idRegional: "0" - Traz os casos de todas as regionais
 *                             "idRegional" - Traz apenas os casos da regional especificada
 * 
 * @return Uma tabela em que cada linha contém um objeto com os dados de um caso
 */
function obterCasos( idRegional ) {    

  // Se id inválido, retorna uma exceção
  if( idRegional < 0  ||  idRegional > NUM_REGIONAIS ) {
    throw( new Error( "ID Inválido" ) );
  }

  // RETORNA NULL, SE TABELA DE CASOS ESTIVER VAZIA
  if( NUM_CASOS < 1 ) return null;


  // Aplica filtro para selecionar a regional apropriada  
  let casosFiltrados = [];
  if( idRegional != "0" ) {
    casosFiltrados = BUFFER_CASOS.filter( linhaCaso => (linhaCaso[REGIONAL] == idRegional) );
  } else {
    casosFiltrados = BUFFER_CASOS;
  }

  // Obtém os casos
  let casos = casosFiltrados.map( linhaCaso => {    

      return {
        id: linhaCaso[ID],
        referenciaFamiliar: linhaCaso[REFERENCIA_FAMILIAR],

        posicaoNaFila: 0,
  
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

  });

  // Ordena os casos pelos pontos, em ordem decrescente  
  casos.sort((a,b) => b.totalPontos - a.totalPontos);

  // Determina a posicao na fila da regional / fila geral
  let posicao = 1;
  casos.forEach( caso => {

    if( caso.ativo == "Sim" ) {
      caso.posicaoNaFila = posicao;
      ++posicao; 
    } else {
      caso.posicaoNaFila = "-";
    }

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


