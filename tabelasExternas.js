"use strict";

/**
 * Módulo:    tabelasExternas.gs
 * Objetivo:  Armazenar referências a base de dados interna (planilhas) do sistema Bolsa Moradia - Resumos dos Casos
 */




/**
 * Planilha CASOS EXTERNOS - TRABALHADORES EXTERNOS (casos registrados por trabalhadores externos)
 */
const PLANILHA_CASOS_EXTERNOS_ID   =  "1qZjH09l2Nzr28k4ucv9-ecAn9N5fXomtLOj7rWJoPBM";
const PLANILHA_CASOS_EXTERNOS      =  SpreadsheetApp.openById(PLANILHA_CASOS_EXTERNOS_ID);

const TABELA_CASOS_EXTERNOS        =  PLANILHA_CASOS_EXTERNOS.getSheetByName('PESSOA');
const BUFFER_CASOS_EXTERNOS        =  TABELA_CASOS_EXTERNOS.getDataRange().getDisplayValues().splice(1);
const NUM_CASOS_EXTERNOS           =  BUFFER_CASOS_EXTERNOS.length;



/**
 * Planilha CASOS PBH - TRABALHADORES PBH (casos registrados por trabalhadores PBH)
 */
const PLANILHA_CASOS_PBH_ID   =  "1w-mJ-7IznF7K0DGx1no1EzHq3gt_yINw_H4O2X87vGs";
const PLANILHA_CASOS_PBH      =  SpreadsheetApp.openById(PLANILHA_CASOS_PBH_ID);

const TABELA_CASOS_PBH        =  PLANILHA_CASOS_PBH.getSheetByName('PESSOA');
const BUFFER_CASOS_PBH        =  TABELA_CASOS_PBH.getDataRange().getDisplayValues().splice(1);
const NUM_CASOS_PBH           =  BUFFER_CASOS_PBH.length;



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
 * ##### FIM DO MÓDULO tabelasExternas.gs #####
 */