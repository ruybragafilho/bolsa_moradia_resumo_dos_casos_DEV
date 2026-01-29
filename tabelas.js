"use strict";

/**
 * Módulo:    tabelas.gs
 * Objetivo:  Armazenar referências a base de dados (planilhas) do sistema PAEFI - Inserção De Novos Casos
 */


/**
 * Planilha CODIGOS contendo as tabelas 
 *     . RESPOSTAS_SIMPLES 
 *     . ORGAOS_ENCAMINHADORES 
 *     . MOTIVOS_DE_DESIGNACAO  
 */
const PLANILHA_CODIGOS_ID  =  "1kiunfkV_113EpaCKopb8NI75RneypnmvfwbcK1hyjt0";
const PLANILHA_CODIGOS     =  SpreadsheetApp.openById(PLANILHA_CODIGOS_ID);

const TABELA_RESPOSTAS_SIMPLES      =  PLANILHA_CODIGOS.getSheetByName('RESPOSTAS_SIMPLES');
const TABELA_ORGAOS_ENCAMINHADORES  =  PLANILHA_CODIGOS.getSheetByName('ORGAOS_ENCAMINHADORES');
const TABELA_MOTIVOS_DE_DESIGNACAO  =  PLANILHA_CODIGOS.getSheetByName('MOTIVOS_DE_DESIGNACAO');

const BUFFER_RESPOSTAS_SIMPLES      =  TABELA_RESPOSTAS_SIMPLES.getDataRange().getDisplayValues().splice(1);
const BUFFER_ORGAOS_ENCAMINHADORES  =  TABELA_ORGAOS_ENCAMINHADORES.getDataRange().getDisplayValues().splice(1);
const BUFFER_MOTIVOS_DE_DESIGNACAO  =  TABELA_MOTIVOS_DE_DESIGNACAO.getDataRange().getDisplayValues().splice(1);

const NUM_RESPOSTAS_SIMPLES      =  BUFFER_RESPOSTAS_SIMPLES.length;
const NUM_ORGAOS_ENCAMINHADORES  =  BUFFER_ORGAOS_ENCAMINHADORES.length;
const NUM_MOTIVOS_DE_DESIGNACAO  =  BUFFER_MOTIVOS_DE_DESIGNACAO.length;



/**
 * Planilha CASOS
 */
const PLANILHA_CASOS_ID        =  "1du1DlnwZBBAM8du3HNpA9Hpk70XtdSAGKlylGkZX2Nw";
const PLANILHA_CASOS           =  SpreadsheetApp.openById(PLANILHA_CASOS_ID);
const TABELA_CASOS             =  PLANILHA_CASOS.getSheetByName('CASOS');
let BUFFER_CASOS               =  TABELA_CASOS.getDataRange().getDisplayValues().splice(1);
let NUM_CASOS                  =  BUFFER_CASOS.length;
const NUM_COLUNAS_TABELA_CASOS =  9;

function refreshBufferCasos() {
  BUFFER_CASOS  =  TABELA_CASOS.getDataRange().getDisplayValues().splice(1);
  NUM_CASOS = BUFFER_CASOS.length;
}



/**
 * Planilha USUARIOS
 */
const PLANILHA_USUARIOS_ID        =  "14945tdk0asP0ySI2CxLvyflIPbIM569myEpK8nTUqcg";
const PLANILHA_USUARIOS           =  SpreadsheetApp.openById(PLANILHA_USUARIOS_ID);
const TABELA_USUARIOS             =  PLANILHA_USUARIOS.getSheetByName('USUARIOS');
const BUFFER_USUARIOS             =  TABELA_USUARIOS.getDataRange().getDisplayValues().splice(1);
const NUM_USUARIOS                =  BUFFER_USUARIOS.length;



/**
 * Constantes que armazenam as posições das colunas nas tabelas
 */

// Posição da coluna ID nas planilhas CODIGOS, CASOS e USUARIOS
const ID = 0;


// Posições das colunas NOME e ATIVO nas tabelas da planilha CODIGOS e USUARIOS
const NOME  = 1;
const ATIVO = 2;


// Posições das colunas na planilha PARAMETROS
const PONTUACAO_PARAMETRO  = 3;


// Posições das colunas da planilha CASOS
const REFERENCIA_FAMILIAR               = 1;
const CPF_RF                            = 2;
const ORGAO_ENCAMINHADOR                = 3;
const STATUS_CONVOCACAO                 = 4;
const DOC_PENDENTE                      = 5;
const TEMPO_DE_ESPERA                   = 6;
const PONTUACAO                         = 7;
const MOTIVO_DE_DESIGNACAO              = 8;
const DATA_DE_DESIGNACAO                = 9;



// Posições das colunas da planilha USUARIOS
const EMAIL             = 1;
const REGIONAL_USUARIO  = 3;
const TIPO_USUARIO      = 4;




/** 
 *  ####################################################
 *  #####                                          ##### 
 *  #####  IMPLEMENTAÇÃO DAS FUNÇÕES DESSE MÓDULO  #####
 *  #####                                          ##### 
 *  ####################################################
 */




/**
 * Função que retorna uma cópia da tabela cujo nome é passado como parâmetro.
 * É chamada pelo front-end para obter os ids e nomes das informações que
 * serão mostradas na tela
 * 
 * @param {String} nomeTabela: Nome da tabela a qual os ids se referem. Pode ser
 *                             RESPOSTAS_SIMPLES, ORGAOS_ENCAMINHADORES OU MOTIVOS_DE_DESIGNACAO 
 * 
 * return Uma cópia da tabela
 */
function obterTabelaCompleta( nomeTabela ) {

  let bufferTabela;

  switch( nomeTabela ) {
    case "RESPOSTAS_SIMPLES":        bufferTabela = BUFFER_RESPOSTAS_SIMPLES;
                                     break;                                                                  
    case "ORGAOS_ENCAMINHADORES":    bufferTabela = BUFFER_ORGAOS_ENCAMINHADORES;
                                     break;
    case "MOTIVOS_DE_DESIGNACAO":    bufferTabela = BUFFER_MOTIVOS_DE_DESIGNACAO;
                                     break;            
    default:                         throw( new Error( "Tabela inválida" ) ); 
  }

  let tabela = [];
  
  bufferTabela.forEach( linha => tabela.push( linha ) );

  return tabela;

} // Fim da função obterTabelaCompleta



/**
 * Função que grava um caso na tabela CASOS
 *  
 * @param {String} id: O id do, caso no sistema
 * @param {String} referenciaFamiliar: O nome da referência familiar
 * @param {String} tipoLogradouro: Tipo do logradouro do endereço da família
 * @param {String} nomeLogradouro: Nome do logradouro do endereço da família
 * @param {String} numero: Número do endereço da família
 * @param {String} complemento: Complemento do endereço da família
 * @param {String} bairro: Bairro do endereço da família
 * @param {String} idRegional: id da regional do endereço da família
 * @param {String} cep: CEP do endereço da família
 * @param {String} TPSA: 
 * @param {Date}   dataInsercaoNoSistema: Data de inserção do caso no sistema
 * @param {Date}   dataChegadaNoCREAS: Data de chegada no CREAS
 * @param {String} idsOrgaosEncaminhadores: ids dos órgãos encaminhadores
 * @param {Date}   dataPrevistaResposta: Data prevista para a resposta
 * @param {Date}   dataDaUltimaResposta: Data da última resposta
 * @param {Date}   dataDeDesignacao: Data de designação do caso
 * @param {String} idMotivoDeDesignacao: id do motivo de designação do caso
 * @param {String} idsViolacoesCaso: ids das violações
 * @param {String} idsCategoriasCaso: ids das categorias
 * @param {String} idsParametrosCaso: ids dos parâmetros selecionados
 * @param {String} observacao: Observação do trabalhador - text de 200 caracteres
 * 
 */
/*
function gravarNaTabelaCasos( id,
                              referenciaFamiliar,
                              tipoLogradouro,
                              nomeLogradouro,
                              numero,
                              complemento,
                              bairro,
                              idRegional,
                              cep,                          
                              tpsa, 
                              dataInsercaoNoSistema, 
                              dataChegadaNoCREAS,
                              idsOrgaosEncaminhadores,
                              dataPrevistaResposta, 
                              dataDaUltimaResposta,
                              dataDeDesignacao,
                              idMotivoDeDesignacao,  
                              idsViolacoesCaso,                                             
                              idsCategoriasCaso,
                              idsParametrosCaso,
                              observacao ) {
    
  // TENTA PEGAR O LOCK
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);  

  // SE PEGAR O LOCK, PROSSEGUE COM A INSERÇÃO
  if( lock.hasLock() ) {

    // Cria o Array que conterá o caso que será atualizado na tabela CASOS
    const caso = new Array( NUM_COLUNAS_TABELA_CASOS );    
  
    // Converte o id para Integer
    const idCaso = parseInt(id);

    // insere o id do caso    
    caso[ID] = idCaso;    
  
    // Insere o nome da referência familiar no array
    caso[REFERENCIA_FAMILIAR] = referenciaFamiliar.trim().toUpperCase();
      
    // Insere o endereço no array
    caso[TIPO_LOGRADOURO] = tipoLogradouro.trim().toUpperCase();
    caso[NOME_LOGRADOURO] = nomeLogradouro.trim().toUpperCase();
    caso[NUMERO] = numero.trim();
    caso[COMPLEMENTO] = complemento.trim().toUpperCase();
    caso[BAIRRO] = bairro.trim().toUpperCase();
    caso[REGIONAL] = idRegional;
    caso[CEP] = cep.trim();
      
    // Insere o tpsa no array
    caso[TPSA] = tpsa.trim();    
  
    // Insere a data de insercao do caso no sistema, no array
    caso[DATA_DE_INSERCAO_NO_SISTEMA] = dataInsercaoNoSistema;
      
    // Insere a data de chegada no CREAS, no array    
    caso[DATA_DE_CHEGADA_NO_CREAS] = dataChegadaNoCREAS;
        
    // Processa e insere os orgãos encaminhadores no array
    caso[ORGAOS_ENCAMINHADORES] = formatarListaIds( idsOrgaosEncaminhadores, NUM_ORGAOS_ENCAMINHADORES );
      
    // Insere a data prevista para resposta no array
    caso[DATA_PREVISTA_PARA_RESPOSTA] = dataPrevistaResposta;
  
    // Insere a data da ultima resposta no array - ATUALIZAVEL
    caso[DATA_DA_ULTIMA_RESPOSTA] = dataDaUltimaResposta;
      
    // Insere a data de designação do caso, no array - null
    caso[DATA_DE_DESIGNACAO] = dataDeDesignacao;
      
    // Insere o motivo de designação do caso, no array - null
    caso[MOTIVO_DE_DESIGNACAO] = idMotivoDeDesignacao
      
    // Insere um TOTAL DE PONTOS temporario no array (será calculado a seguir via fórmula do Planilhas Google)
    caso[TOTAL_DE_PONTOS] = null;
      
    // Insere um TEMPO DE ESPERA temporario no array (será calculado a seguir via fórmula do Planilhas Google)
    caso[TEMPO_DE_ESPERA] = null;    

    // Processa e insere as violações do caso no array
    caso[VIOLACOES_CASO] = formatarListaIds( idsViolacoesCaso, NUM_VIOLACOES );    
  
    // Processa e insere as categorias do caso no array
    caso[CATEGORIAS_CASO] = formatarListaIds( idsCategoriasCaso, NUM_CATEGORIAS );
      
    // Calcula e insere a pontuação dos parâmetros selecioados
    caso[PONTUACAO_PARAMETROS_CASO] = (idsParametrosCaso != "") ? calcularPontuacaoParametros( idsParametrosCaso.split(";") ) : 0;
        
    // Processa e insere os parâmetros no array
    caso[PARAMETROS_CASO] = formatarListaIds( idsParametrosCaso, NUM_PARAMETROS );
      
    // Insere a observacao no array
    caso[OBSERVACAO] = observacao.trim().toUpperCase();
      
    // Insere o novo caso na tabela (planilha)  **** Alterar para inserção e update      
    try {
      // Testa se é a inserção de um novo caso ou a atualização de um já existente
      if( idCaso > NUM_CASOS ) {        
        // Inserção de um novo caso
        TABELA_CASOS.appendRow( caso );
      } else {
        // Atualização de um caso já existente
        //                         getRange(row, column, numRows, numColumns)
        const range = TABELA_CASOS.getRange( idCaso+1, 1, 1, NUM_COLUNAS_TABELA_CASOS );
        range.setValues([caso]);
      }
    } catch( error ) {
      throw( error.message );
    }

    // Flush na planilha
    try {
      SpreadsheetApp.flush();
      PLANILHA_CASOS.waitForAllDataExecutionsCompletion(2);
    } catch( error ) {
      throw( error.message );
    }
     

    // Calcula e insere, na tabela, o tempo de espera em meses  
    // A função getRange endereça as linhas e colunas começando do indice 1
    // Por isso os +1 na linha e na coluna  
    try {
      const dataDeChegadaNoCREAS = TABELA_CASOS.getRange( idCaso+1, DATA_DE_CHEGADA_NO_CREAS+1 ).getA1Notation();  
      TABELA_CASOS.getRange( idCaso+1, TEMPO_DE_ESPERA+1 ).setFormula(`=DATEDIF(${dataDeChegadaNoCREAS};Today();"M")`);
    } catch( error ) {
      throw( error.message );
    }
  
    // Calcula e insere, na tabela, a pontuação final do caso = Tempo de Espera em meses + pontuação parâmetros selecionados
    // A função getRange endereça as linhas e colunas começando do indice 1
    // Por isso os +1 na linha e na coluna  
    try {
      const tempoDeEsperaEmMeses = TABELA_CASOS.getRange( idCaso+1, TEMPO_DE_ESPERA+1 ).getA1Notation();    
      const pontuacaoParametrosCaso = TABELA_CASOS.getRange( idCaso+1, PONTUACAO_PARAMETROS_CASO+1 ).getA1Notation();    
      TABELA_CASOS.getRange( idCaso+1, TOTAL_DE_PONTOS+1 ).setFormula(`=${tempoDeEsperaEmMeses}+${pontuacaoParametrosCaso}`);
    } catch( error ) {
      throw( error.message );
    }
  
    // Flush na planilha
    try {
      SpreadsheetApp.flush();
      PLANILHA_CASOS.waitForAllDataExecutionsCompletion(2);      
    } catch( error ) {
      throw( error.message );
    }

    //  Refresh no buffer casos
    refreshBufferCasos();
      
  
    // SOLTA O LOCK
    lock.releaseLock();

  } else {

    // SE NAO CONSEGUIR PEGAR O LOCK, LANCA UMA EXCESSAO
    throw( new Error( "Nao foi possivel pegar o LOCK" ) );
  }

} // Fim da função gravarNaTabelaCasos

*/

/**
 * Função que calcula a pontuação da lista de parâmetros cujos ids estão contidos no array idsParametros.
 *  
 * @param {Array of Integers} idsParametros: ids dos parâmetros cujas pontuações serão somadas.
 * 
 * @return Um Integer contendo o somatório das pontuações
 */
/*
function calcularPontuacaoParametros( idsParametros ) {
  
  if(idsParametros == "") return 0;

  // Somatório das pontuações dos parâmetros 
  let somaPontos = 0;

  // Acessa a tabela de parâmetros, contabilizando os pontos dos parametros
  // cujos ids estão no array idsParametros
  let id;
  const numParametros = idsParametros.length;
  for( let i=0; i<numParametros; ++i) {

    id = idsParametros[i];
    somaPontos += parseInt( BUFFER_PARAMETROS[id-1][PONTUACAO_PARAMETRO] );
  }

  // Retorna o somatório das pontuações dos parâmetros 
  return somaPontos;

} // Fim da função calcularPontuacaoParametros
*/


/**
 * Função que recebe um string com ids separados por ponto e vírgula
 * e e o nome da tabela a qual os ids se referem, e retorna um array 
 * com os nomes referentes aos ids
 * 
 * @param {String} stringIds: string de ids separados por ponto e vírgula
 *                            Exemplo: 1;;3;;5
 * @param {String} nomeTabela: Nome da tabela a qual os ids se referem. Pode ser
 *                             RESPOSTAS_SIMPLES, ORGAOS_ENCAMINHADORES OU MOTIVOS_DE_DESIGNACAO 
 * 
 * return String com os nomes relacionados aos ids, separados por ponto e vírgula
 *        Exemplo: "Crianças e Adolescentes;PCD;Pessoas Adultas Vítimas de Violência"
 */
function idsToNomes( stringIds, nomeTabela ) {

  if(stringIds == "") return "";

  let bufferTabela;

  switch( nomeTabela ) {
    case "RESPOSTAS_SIMPLES":        bufferTabela = BUFFER_RESPOSTAS_SIMPLES;
                                     break;                                                        
    case "ORGAOS_ENCAMINHADORES":    bufferTabela = BUFFER_ORGAOS_ENCAMINHADORES;
                                     break;          
    case "MOTIVOS_DE_DESIGNACAO":    bufferTabela = BUFFER_MOTIVOS_DE_DESIGNACAO;
                                     break;               
    default:                         throw( new Error( "Tabela Inválida" ) ); 
  }

  let arrayIDs = stringIds.split(";");
  let arrayNomes = [];

  arrayIDs.forEach( id => {
    if( id ) arrayNomes.push( bufferTabela[id-1][NOME] );
  } );

  return arrayNomes.join(";");

} // Fim da função idsToNomes



/** 
 *  #################################################
 *  #####                                       ##### 
 *  #####  TESTES PARA AS FUNÇÕES DESSE MÓDULO  #####
 *  #####                                       ##### 
 *  #################################################
 */



/**
 * Função para testar a função obterTabelaCompleta
 */
function teste_obterTabelaCompleta() {
  
  const nomeTabela = "ORGAOS_ENCAMINHADORES";

  const retorno = obterTabelaCompleta( nomeTabela );

  console.log( retorno );

} // Fim da função teste_obterTabelaCompleta



/**
 * Função para testar a função principal calcularPontuacaoParametros
 */
/*
function teste_calcularPontuacaoParametros() {

    const idsParametros = [1, 2, 3, 4, 5];    
    
    const retorno = calcularPontuacaoParametros( idsParametros );
    
    console.log(retorno);

} // Fim da função teste_calcularPontuacaoParametros

*/

/**
 * Função para testar a função idsToNomes
 */
function teste_idsToNomes() {

  const stringIds = "3";
  const nomeTabela = "MOTIVOS_DE_DESIGNACAO";  

  const retorno = idsToNomes( stringIds, nomeTabela );

  console.log( retorno );

} // Fim da função teste_idsToNomes



/**
 * Função para testar a função principal formatarListaIds
 */
function teste_formatarListaIds() {

  //const arrayIdsSelecionados = "1;2;3;4;5";
  const arrayIdsSelecionados = "2;4";
  const numMaxIds = NUM_ORGAOS_ENCAMINHADORES;

  const retorno = formatarListaIds( arrayIdsSelecionados, numMaxIds );

  console.log(retorno);

} // Fim da função teste_formatarListaIds




/**
 * ##### FIM DO MÓDULO tabelas.gs #####
 */





















