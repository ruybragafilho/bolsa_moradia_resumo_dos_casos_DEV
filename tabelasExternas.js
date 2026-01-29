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



/**
 * ##### FIM DO MÓDULO tabelasExternas.gs #####
 */