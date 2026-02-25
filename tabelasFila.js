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
const NUM_COLUNAS_TABELA_FILA =  15;

function refreshBufferFila() {
  BUFFER_FILA  =  TABELA_FILA.getDataRange().getDisplayValues().splice(1);
  TAMANHO_FILA = BUFFER_FILA.length;
}



// Posições das colunas da planilha FILA
const REFERENCIA_FAMILIAR        =  1;
const CPF_RF                     =  2;
const ORGAO_ENCAMINHADOR         =  3;
const DATA_ENCAMINHAMENTO        =  4;
const PONTUACAO                  =  5;

const IDS_PARAMETROS_CASO        =  6;
const PONTUACOES_PARAMETROS_CASO =  7;

const QUANTIDADE_CEA             =  8;
const PROBLEMAS_SAUDE            =  9;
const DATA_NASCIMENTO_RF         = 10;
const TEMPO_SITUACAO_DE_RUA      = 11;

const SITUACAO_BENEFICIO         = 12;
const DATA_ULTIMA_EVOLUCAO       = 13;
const DOC_PENDENTE               = 14;



/** 
 *  ####################################################
 *  #####                                          ##### 
 *  #####  IMPLEMENTAÇÃO DAS FUNÇÕES DESSE MÓDULO  #####
 *  #####                                          ##### 
 *  ####################################################
 */


//carregarFila();


// Timer 
const esperarFila = (time) => new Promise( ( resolve, reject ) => setTimeout( resolve, time ) );


// Flag que indica se a fila ezvaziada
let flag_fila_vazia = 0;


// Flag que indica se a fila foi carregada com os dados das tabelas de encaminhamento
let flag_fila_carregada = 1;



/**
 * Função que limpa a fila, excluíndo todos os casos dela
 */
function limparFila() {

  flag_fila_vazia = 0;

  let casoNulo = new Array(NUM_COLUNAS_TABELA_FILA).fill("");

  // TENTA PEGAR O LOCK
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);  

  // SE PEGAR O LOCK, PROSSEGUE COM A INSERÇÃO
  if( lock.hasLock() ) {    

    let range;

    for( let linha=2; linha<=TAMANHO_FILA+1; ++linha ) {

      range = TABELA_FILA.getRange( linha, 1, 1, NUM_COLUNAS_TABELA_FILA );
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
    throw( new Error( "limparFila - Nao foi possivel pegar o LOCK" ) );
  }    

  flag_fila_vazia = 1;

} // Fim da função limparFila




/**
 * Função que carrega a fila a partir das tabelas de encaminhamentos
 */
async function carregarFila() {

  flag_fila_carregada = 0;

  let caso;
  let resumoCaso = new Array(NUM_COLUNAS_TABELA_FILA).fill("");
  let id = 0;


  limparFila();

    // Aguarda esvaziamento da fila
  while( !flag_fila_vazia ) {
    console.log( "Aguardando esvaziamento da fila" );
    await esperarFila( 1000 );
  }    

  
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

    resumoCaso[IDS_PARAMETROS_CASO] = idsParametrosCaso.join(";");
    resumoCaso[PONTUACOES_PARAMETROS_CASO] = pontuacoesParametrosCaso.join(";");

    resumoCaso[QUANTIDADE_CEA] = numeroDeCEAs( caso );
    resumoCaso[PROBLEMAS_SAUDE] = numeroDeProblemasDeSaude( caso );
    resumoCaso[DATA_NASCIMENTO_RF] = caso[0][UNI_DATA_NASCIMENTO];
    resumoCaso[TEMPO_SITUACAO_DE_RUA] = caso[0][UNI_TEMPO_SITUACAO_DE_RUA];

    resumoCaso[SITUACAO_BENEFICIO] = 1; // 1 == Ativo

    resumoCaso[DATA_ULTIMA_EVOLUCAO] = "";

    resumoCaso[DOC_PENDENTE] = 1; // 1 == Não
    
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

    resumoCaso[IDS_PARAMETROS_CASO] = idsParametrosCaso.join(";");
    resumoCaso[PONTUACOES_PARAMETROS_CASO] = pontuacoesParametrosCaso.join(";");

    resumoCaso[QUANTIDADE_CEA] = numeroDeCEAs( caso );
    resumoCaso[PROBLEMAS_SAUDE] = numeroDeProblemasDeSaude( caso );
    resumoCaso[DATA_NASCIMENTO_RF] = caso[0][UNI_DATA_NASCIMENTO];
    resumoCaso[TEMPO_SITUACAO_DE_RUA] = caso[0][UNI_TEMPO_SITUACAO_DE_RUA];    

    resumoCaso[SITUACAO_BENEFICIO] = 1; // 1 == Ativo

    resumoCaso[DATA_ULTIMA_EVOLUCAO] = "";

    resumoCaso[DOC_PENDENTE] = 1; // 1 == Não

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

    let range = TABELA_FILA.getRange( idCaso+1, 1, 1, NUM_COLUNAS_TABELA_FILA );
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
    throw( new Error( "gravarCasoNaFila - Nao foi possivel pegar o LOCK" ) );
  }    

} // Fim da função gravarCasoNaFila



/**
 * Função que retorna a fila com os casos registrados no sistema
 * 
 * @return Uma fila em que cada posição contém um objeto com os dados de um caso
 */
async function obterFila( idInstituicao ) {    

  // Aguarda carregamento da fila
  while( !flag_fila_carregada ) {
    console.log( "Aguardando carregamento da fila" );
    await esperarFila( 1000 );
  }    


  // Se id inválido, retorna uma exceção
  if( idInstituicao < 0  ||  idInstituicao > NUM_ORGAOS_ENCAMINHADORES ) {
    throw( new Error( "Obter Fila - ID Inválido" ) );
  }

  // RETORNA NULL, SE TABELA DE CASOS ESTIVER VAZIA
  if( TAMANHO_FILA < 1 ) return null;
    
  
  // Obtém os casos na fila
  let fila = BUFFER_FILA.map( caso => {    

    let ids_parametros = caso[IDS_PARAMETROS_CASO].split(";");

    return {

      id: caso[ID],

      referencia_familiar: caso[REFERENCIA_FAMILIAR],

      cpf_rf: caso[CPF_RF],
 
      id_orgao_encaminhador: caso[ORGAO_ENCAMINHADOR],
      nome_orgao_encaminhador: idToNome( caso[ORGAO_ENCAMINHADOR], "ORGAOS_ENCAMINHADORES"),
        
      tempo_espera: calcularIntervaloEmDias( caso[DATA_ENCAMINHAMENTO] ),

      nomes_parametros: ids_parametros.map( id => BUFFER_PARAMETROS[id-1][NOME] ),
      pesos_parametros: ids_parametros.map( id => BUFFER_PARAMETROS[id-1][PESO_PARAMETRO] ),
      pontuacoes_parametros: ids_parametros.map( id => BUFFER_PARAMETROS[id-1][PONTUACAO_PARAMETRO] ),

      pontuacoes_caso: caso[PONTUACOES_PARAMETROS_CASO].split(";"),
      pontuacao: parseInt(caso[PONTUACAO]),      

      quantidade_CEA: parseInt(caso[QUANTIDADE_CEA]),

      quantidade_problemas_saude: parseInt(caso[PROBLEMAS_SAUDE]),

      idade_RF: calcularIdade( caso[DATA_NASCIMENTO_RF] ),
      
      id_tempo_nas_ruas: caso[TEMPO_SITUACAO_DE_RUA],
      nome_tempo_nas_ruas: idToNome(caso[TEMPO_SITUACAO_DE_RUA], "INTERVALOS_DE_TEMPO"),

      id_situacao_beneficio: caso[SITUACAO_BENEFICIO], 
      nome_situacao_beneficio: idToNome(caso[SITUACAO_BENEFICIO], "SITUACOES_BENEFICIO"),
        
      data_ultima_evolucao: caso[DATA_ULTIMA_EVOLUCAO],

      id_doc_pendente: caso[DOC_PENDENTE],
      nome_doc_pendente: idToNome(caso[DOC_PENDENTE], "RESPOSTAS_SIMPLES"),
           
      posicaoNaFila: 0

    };// Fim return       
  });


  // Ordena os casos pelos pontos, em ordem decrescente  
  //fila.sort( (a,b) => b.pontuacao - a.pontuacao );
  fila.sort( function(a,b) { 

    // Primeiro critério - Pontuação
    if( b.pontuacao > a.pontuacao ) {
      return 1;
    } else if(b.pontuacao < a.pontuacao) {
      return -1;
    } 

    // Segundo critétio - Quantidade C&A
    if( b.quantidade_CEA > a.quantidade_CEA ) {
      return 1;
    } else if(b.quantidade_CEA < a.quantidade_CEA) {
      return -1;
    }     

    // Terceiro critétio - Quantidade Problemas de Saúde
    if( b.quantidade_problemas_saude > a.quantidade_problemas_saude ) {
      return 1;
    } else if(b.quantidade_problemas_saude < a.quantidade_problemas_saude) {
      return -1;
    }         

    // Quarto critétio - Idade RF
    if( b.idade_RF > a.idade_RF ) {
      return 1;
    } else if(b.idade_RF < a.idade_RF) {
      return -1;
    }             
    
    // Quinto critétio - Tempo nas Ruas
    if( b.tempo_nas_ruas > a.tempo_nas_ruas ) {
      return 1;
    } else if(b.tempo_nas_ruas < a.tempo_nas_ruas) {
      return -1;
    }                 

    // Retorno Padrão
    return 0;

  });

  
  // Determina a posicao na fila da regional / fila geral
  let posicao = 1;
  fila.forEach( caso => {

    caso.posicaoNaFila = posicao;
    ++posicao; 

  });



  // Aplica filtro para selecionar a instituicão apropriada (ORGÃO ENCAMMINHADOR)
  let filaFiltrada = [];
  if( idInstituicao != "0" ) {
    filaFiltrada = fila.filter( linhaCaso => (linhaCaso.id_orgao_encaminhador == idInstituicao) );
  } else {
    filaFiltrada = fila;
  }


  // Retorna a fila filtrada
  return filaFiltrada;

} // Fim da Função obterFila 





/** 
 *  #################################################
 *  #####                                       ##### 
 *  #####  TESTES PARA AS FUNÇÕES DESSE MÓDULO  #####
 *  #####                                       ##### 
 *  #################################################
 */




/**
 * Função para testar a função principal obterFila
 */
function teste_obterFila() {

  const fila = obterFila( "2" );

  console.log(fila);    

} // Fim da Função teste_obterFila 



/**
 * ##### FIM DO MÓDULO tabelasFila.gs #####
 */















