"use strict";

/**
 * Módulo:    tabelasFila.gs
 * Objetivo:  Armazenar Fila de casos do sistema Bolsa Moradia
 */



/**
 * Planilha FILA
 */
const PLANILHA_FILA_ID        =  "1du1DlnwZBBAM8du3HNpA9Hpk70XtdSAGKlylGkZX2Nw";
const PLANILHA_FILA           =  SpreadsheetApp.openById(PLANILHA_FILA_ID);
const TABELA_FILA             =  PLANILHA_FILA.getSheetByName('FILA');
let BUFFER_FILA               =  TABELA_FILA.getDataRange().getDisplayValues().splice(1);
let TAMANHO_FILA              =  BUFFER_FILA.length;
const NUM_COLUNAS_TABELA_FILA =  14;

function refreshBufferFila() {
  BUFFER_FILA  =  TABELA_FILA.getDataRange().getDisplayValues().splice(1);
  TAMANHO_FILA = BUFFER_FILA.length;
}

let flag_fila_carregada = 1;



/**
 * Constantes que armazenam as posições das colunas nas tabelas
 */


// Posições das colunas da planilha FILA
const REFERENCIA_FAMILIAR     =  1;
const CPF_RF                  =  2;
const ORGAO_ENCAMINHADOR      =  3;
const DATA_ENCAMINHAMENTO     =  4;
const PONTUACAO               =  5;
const QUANTIDADE_CEA          =  6;
const PROBLEMAS_SAUDE         =  7;
const DATA_NASCIMENTO_RF      =  8;
const TEMPO_SITUACAO_DE_RUA   =  9;

const STATUS_CONVOCACAO       = 10;
const MOTIVO_DE_DESIGNACAO    = 11;
const DATA_DE_DESIGNACAO      = 12;
const DOC_PENDENTE            = 13;



/** 
 *  ####################################################
 *  #####                                          ##### 
 *  #####  IMPLEMENTAÇÃO DAS FUNÇÕES DESSE MÓDULO  #####
 *  #####                                          ##### 
 *  ####################################################
 */


//carregarFila();




/**
 * Função que limpa a fila, excluíndo todos os casos dela
 */
function limparFila() {

  let casoNulo = new Array(NUM_COLUNAS_TABELA_FILA-4).fill("");

  // TENTA PEGAR O LOCK
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);  

  // SE PEGAR O LOCK, PROSSEGUE COM A INSERÇÃO
  if( lock.hasLock() ) {    

    let range;

    for( let linha=2; linha<=TAMANHO_FILA+1; ++linha ) {

      range = TABELA_FILA.getRange( linha, 1, 1, NUM_COLUNAS_TABELA_FILA-4 );
      range.setValues([casoNulo]);
    }

    // Flush na planilha
    try {
      SpreadsheetApp.flush();
      PLANILHA_FILA.waitForAllDataExecutionsCompletion(2);      
    } catch( error ) {
      throw( error.message );
    }
  
    // SOLTA O LOCK
    lock.releaseLock();

  } else {

    // SE NAO CONSEGUIR PEGAR O LOCK, LANCA UMA EXCESSAO
    throw( new Error( "Nao foi possivel pegar o LOCK" ) );
  }    

} // Fim da função limparFila




/**
 * Função que carrega a fila a partir das tabelas de encaminhamentos
 */
function carregarFila() {

  let caso;
  let resumoCaso = new Array(NUM_COLUNAS_TABELA_FILA-4).fill("");
  let id = 0;


  limparFila();

  
  console.log( "\n\nCASOS EXTERNOS" );
  linhaTabela = 0;
  while( linhaTabela < NUM_LINHAS_TABELA_CASOS_EXTERNOS ) {

    caso = obterCaso( BUFFER_CASOS_EXTERNOS );
    mostrarCaso( caso );

    ++id;
    resumoCaso[ID] = id;
    resumoCaso[REFERENCIA_FAMILIAR] = (caso[0][UNI_NOME]).trim().toUpperCase();
    resumoCaso[CPF_RF] = caso[0][UNI_CPF_RF];
    resumoCaso[ORGAO_ENCAMINHADOR] = caso[0][UNI_ORGAO_ENCAMINHADOR];
    
    resumoCaso[DATA_ENCAMINHAMENTO] = caso[0][UNI_DATA_REGISTRO_ENCAMINHAMENTO];
    resumoCaso[PONTUACAO] = calcularPontuacao( caso );
    resumoCaso[QUANTIDADE_CEA] = numeroDeCEAs( caso );
    resumoCaso[PROBLEMAS_SAUDE] = numeroDeProblemasDeSaude( caso );
    resumoCaso[DATA_NASCIMENTO_RF] = caso[0][UNI_DATA_NASCIMENTO];
    resumoCaso[TEMPO_SITUACAO_DE_RUA] = caso[0][UNI_TEMPO_SITUACAO_DE_RUA];
    
    gravarCasoNaFila( id, resumoCaso );
  }  


  
  console.log( "\n\nCASOS PBH" );
  linhaTabela = 0;
  while( linhaTabela < NUM_LINHAS_TABELA_CASOS_PBH ) {

    caso = obterCaso( BUFFER_CASOS_PBH );
    mostrarCaso( caso );

    ++id;
    resumoCaso[ID] = id;
    resumoCaso[REFERENCIA_FAMILIAR] = (caso[0][UNI_NOME]).trim().toUpperCase();
    resumoCaso[CPF_RF] = caso[0][UNI_CPF_RF];
    resumoCaso[ORGAO_ENCAMINHADOR] = caso[0][UNI_ORGAO_ENCAMINHADOR];
    
    resumoCaso[DATA_ENCAMINHAMENTO] = caso[0][UNI_DATA_REGISTRO_ENCAMINHAMENTO];
    resumoCaso[PONTUACAO] = calcularPontuacao( caso );
    resumoCaso[QUANTIDADE_CEA] = numeroDeCEAs( caso );
    resumoCaso[PROBLEMAS_SAUDE] = numeroDeProblemasDeSaude( caso );
    resumoCaso[DATA_NASCIMENTO_RF] = caso[0][UNI_DATA_NASCIMENTO];
    resumoCaso[TEMPO_SITUACAO_DE_RUA] = caso[0][UNI_TEMPO_SITUACAO_DE_RUA];

    gravarCasoNaFila( id, resumoCaso );
    
  }

  refreshBufferFila();

  flag_fila_carregada = 1;

} // Fim da função carregarFila



/**
 * Função que grava um caso na fila
 */
function gravarCasoNaFila( idCaso, caso ) {


  // TENTA PEGAR O LOCK
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);  

  // SE PEGAR O LOCK, PROSSEGUE COM A INSERÇÃO
  if( lock.hasLock() ) {    

    let range = TABELA_FILA.getRange( idCaso+1, 1, 1, NUM_COLUNAS_TABELA_FILA-4 );
    range.setValues( [caso] );

    // Flush na planilha
    try {
      SpreadsheetApp.flush();
      PLANILHA_FILA.waitForAllDataExecutionsCompletion(2);      
    } catch( error ) {
      throw( error.message );
    }
  
    // SOLTA O LOCK
    lock.releaseLock();

  } else {

    // SE NAO CONSEGUIR PEGAR O LOCK, LANCA UMA EXCESSAO
    throw( new Error( "Nao foi possivel pegar o LOCK" ) );
  }    

} // Fim da função gravarCasoNaFila




/** 
 *  #################################################
 *  #####                                       ##### 
 *  #####  TESTES PARA AS FUNÇÕES DESSE MÓDULO  #####
 *  #####                                       ##### 
 *  #################################################
 */








/**
 * ##### FIM DO MÓDULO tabelasFila.gs #####
 */















