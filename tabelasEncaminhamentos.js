"use strict";

/**
 * Módulo:    tabelasEncaminhamentos.gs
 * Objetivo:  Importar os dados das tabelas de encaminhamentos para a tabela interna com os resumos dos casos
 */



/**
 * Planilha CASOS EXTERNOS - TRABALHADORES EXTERNOS (casos registrados por trabalhadores externos)
 */
const PLANILHA_CASOS_EXTERNOS_ID   =  "1qZjH09l2Nzr28k4ucv9-ecAn9N5fXomtLOj7rWJoPBM";
const PLANILHA_CASOS_EXTERNOS      =  SpreadsheetApp.openById(PLANILHA_CASOS_EXTERNOS_ID);

const TABELA_CASOS_EXTERNOS             =  PLANILHA_CASOS_EXTERNOS.getSheetByName('PESSOA');
const BUFFER_CASOS_EXTERNOS             =  TABELA_CASOS_EXTERNOS.getDataRange().getDisplayValues().splice(1);
const NUM_LINHAS_TABELA_CASOS_EXTERNOS  =  BUFFER_CASOS_EXTERNOS.length;


/**
 * Planilha CASOS PBH - TRABALHADORES PBH (casos registrados por trabalhadores PBH)
 */
const PLANILHA_CASOS_PBH_ID   =  "1w-mJ-7IznF7K0DGx1no1EzHq3gt_yINw_H4O2X87vGs";
const PLANILHA_CASOS_PBH      =  SpreadsheetApp.openById(PLANILHA_CASOS_PBH_ID);

const TABELA_CASOS_PBH             =  PLANILHA_CASOS_PBH.getSheetByName('PESSOA');
const BUFFER_CASOS_PBH             =  TABELA_CASOS_PBH.getDataRange().getDisplayValues().splice(1);
const NUM_LINHAS_TABELA_CASOS_PBH  =  BUFFER_CASOS_PBH.length;



// Posições das colunas das planilhas externas de casos
const UNI_ID = 0;
const UNI_CPF_RF = 1;
const UNI_COD_PARENTESCO = 2;
const UNI_RF_2 = 3;
const UNI_NOME = 4;
const UNI_CPF = 5;
const UNI_DATA_NASCIMENTO = 6;
const UNI_NOME_SOCIAL = 7;
const UNI_NOME_MAE = 8;
const UNI_RACA_COR = 9;
const UNI_GENERO = 10;
const UNI_ORIENTACAO_SEXUAL = 11;
const UNI_ESCOLARIDADE = 12;
const UNI_DATA_ATUALIZACAO_CADUNICO = 13;
const UNI_TEMP_RESIDENCIA_BH = 14;
const UNI_TEMPO_SITUACAO_DE_RUA = 15;
const UNI_TELEFONE = 16;
const UNI_RENDA_FAMILIAR = 17;
const UNI_PCD = 18;
const UNI_PROBLEMAS_SAUDE = 19;
const UNI_GESTANTE = 20;
const UNI_TRABALHO_FORMAL = 21;
const UNI_TRABALHO_OUTROS = 22;
const UNI_BENEFICIO = 23;
const UNI_ESTAMOS_JUNTOS = 24;
const UNI_INSTITUCIONALIZACAO = 25;
const UNI_DIAGNOSTICO = 26;
const UNI_AMEACA_CONFLITO_VIOLENCIA = 27;
const UNI_DESC_AMEACA_CONFLITO_VIOLENCIA = 28;
const UNI_PROSTITUICAO = 29;
const UNI_CEA_ACOLHIMENTO_INSTITUCIONAL = 30;
const UNI_CEA_PRIVACAO_CONVIVIO = 31;
const UNI_DESC_CEA_PRIVACAO_CONVIVIO = 32;
const UNI_CEA_TRABALHO_INFANTIL_EXPLORACAO_SEXUAL = 33;
const UNI_AUTONOMIA = 34;
const UNI_INFO_ADICIONAIS = 35;
const UNI_LOCAL_COMUM = 36;
const UNI_ORGAO_ENCAMINHADOR = 37;
const UNI_NOME_TECNICO_ENCAMINHADOR = 38;
const UNI_EMAIL_TECNICO_ENCAMINHADOR = 39;
const UNI_DATA_REGISTRO_ENCAMINHAMENTO = 40;





/**
 * Planilha CONTROLE_CASOS, utilizada para armazenar, de forma persistente,
 * os números de linhas nas tabelas TABELA_CASOS_EXTERNOS e TABELA_CASOS_PBH.
 * 
 * Esses valores são utilizados para determinar se houve alguma inserção 
 * de caso desde a última vez que o sistema foi executado.
 */
const PLANILHA_CONTROLE_CASOS_ID  =  "1ssfHxXVomhgf7wNK8CI6n-QVv53GoajJlkPsZg23IDY";
const PLANILHA_CONTROLE_CASOS     =  SpreadsheetApp.openById(PLANILHA_CONTROLE_CASOS_ID);

const TABELA_CONTROLE_CASOS       =  PLANILHA_CONTROLE_CASOS.getSheetByName('CONTROLE');
const BUFFER_CONTROLE_CASOS       =  TABELA_CONTROLE_CASOS.getDataRange().getDisplayValues().splice(1);
const NUM_CONTROLE_CASOS          =  BUFFER_CONTROLE_CASOS.length;

const ORIGEM_EXTERNA    = 0;
const ORIGEM_PBH        = 1;

const COLUNA_NUM_LINHAS = 1;

let CONTROLE_NUM_LINHAS_TABELA_CASOS_EXTERNOS = 0;
let CONTROLE_NUM_LINHAS_TABELA_CASOS_PBH      = 0;



/**
 * Função que carrega, da planilha CONTROLE CASOS, os números de linhas 
 * nas tabelas TABELA_CASOS_EXTERNOS e TABELA_CASOS_PBH, obtidas na 
 * execução anterior do sistema. 
 * 
 * Essas variáveis são utilizadas para determinar se houve alguma inserção 
 * de caso desde a última vez que o sistema foi executado.
 */
function lerTabelaControle() { 

    CONTROLE_NUM_LINHAS_TABELA_CASOS_EXTERNOS  =  BUFFER_CONTROLE_CASOS[ORIGEM_EXTERNA][COLUNA_NUM_LINHAS];
    CONTROLE_NUM_LINHAS_TABELA_CASOS_PBH       =  BUFFER_CONTROLE_CASOS[ORIGEM_PBH][COLUNA_NUM_LINHAS];

    console.log( "CONTROLE_NUM_LINHAS_TABELA_CASOS_EXTERNOS: " + CONTROLE_NUM_LINHAS_TABELA_CASOS_EXTERNOS );
    console.log( "CONTROLE_NUM_LINHAS_TABELA_CASOS_PBH:      " + CONTROLE_NUM_LINHAS_TABELA_CASOS_PBH );

} // Fim da função lerTabelaControle



/**
 * Função que atualiza, na planilha CONTROLE CASOS, os números de linhas 
 * nas tabelas TABELA_CASOS_EXTERNOS e TABELA_CASOS_PBH, obtidas diretamente
 * dessas tabelas.
 * 
 * Essas variáveis são utilizadas para determinar se houve alguma inserção 
 * de caso desde a última vez que o sistema foi executado.
 */
function gravarTabelaControle() { 

  // TENTA PEGAR O LOCK
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);  

  // SE PEGAR O LOCK, PROSSEGUE COM A INSERÇÃO
  if( lock.hasLock() ) {
    
    const PTR_CASOS_EXTERNOS = TABELA_CONTROLE_CASOS.getRange( ORIGEM_EXTERNA+2, COLUNA_NUM_LINHAS+1 );
    PTR_CASOS_EXTERNOS.setValue( NUM_LINHAS_TABELA_CASOS_EXTERNOS );    

    const PTR_CASOS_PBH = TABELA_CONTROLE_CASOS.getRange( ORIGEM_PBH+2, COLUNA_NUM_LINHAS+1 );
    PTR_CASOS_PBH.setValue( NUM_LINHAS_TABELA_CASOS_PBH );        

    // Flush na planilha
    try {
      SpreadsheetApp.flush();
      PLANILHA_CONTROLE_CASOS.waitForAllDataExecutionsCompletion(2);      
    } catch( error ) {
      throw( error.message );
    }
  
    // SOLTA O LOCK
    lock.releaseLock();

  } else {

    // SE NAO CONSEGUIR PEGAR O LOCK, LANCA UMA EXCESSAO
    throw( new Error( "Nao foi possivel pegar o LOCK" ) );
  }  

} // Fim da função gravarTabelaControle










/**
 * Função que importa os dados das tabelas de encaminhamentos 
 * para a tabela interna com os resumos dos casos.
 */
function carregarTabelasEncaminhamentos() {

} // Fim da função carregarTabelasEncaminhamentos



/**
 * ##### FIM DO MÓDULO tabelasEncaminhamentos.gs #####
 */