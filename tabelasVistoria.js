"use strict";

/**
 * Módulo:    tabelasVistoria.gs
 * Objetivo:  Armazenar as tabelas do sistema Bolsa Moradia
 */


/**
 * Planilha VISTORIAS
 */
const PLANILHA_VISTORIAS_ID  =  "1FQkpBwnX181zPd2bZl1NyEsL01MGdvdAKT_uGzLMLSQ";
const PLANILHA_VISTORIAS     =  SpreadsheetApp.openById(PLANILHA_VISTORIAS_ID);
const TABELA_VISTORIAS       =  PLANILHA_VISTORIAS.getSheetByName('VISTORIAS');
const BUFFER_VISTORIAS       =  TABELA_VISTORIAS.getDataRange().getDisplayValues().splice(1);
const TAMANHO_VISTORIAS      =  BUFFER_VISTORIAS.length;



// Posições das colunas da planilha VISTORIAS
const CPF_VISTORIA                 =  3;
const DATA_SOLICITACAO_VISTORIA    =  6;
const DATA_VISTORIA                =  7;
const DATA_LAUDO                   =  9;
const DESCRICAO_LAUDO              = 10;
const INFORMACAO_COMPLEMENTAR      = 12;


function mostrarVistorias() {

  let cpf;

  BUFFER_VISTORIAS.forEach( vistoria => {

    console.log( ` ${vistoria[CPF_VISTORIA]} - ${vistoria[DATA_SOLICITACAO_VISTORIA]} - ${vistoria[DATA_VISTORIA]} - ${vistoria[DATA_LAUDO]} - ${vistoria[DESCRICAO_LAUDO]}` );

  });

}

/**
 * ##### FIM DO MÓDULO tabelasVistoria.gs #####
 */