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




/**
 * Função que pesquisa por todas as vistorias relacionadas a um CPF de RF
 * @param {String} cpf - CPF da RF
 * @returns Um array de objetos, onde cada objeto representa uma vistoria relacionada ao CPF da RF, contendo as seguintes propriedades: dataSolicitacao, dataVistoria, dataLaudo, descricaoLaudo e informacaoComplementar
 */
function pesquisarVistoriasPorCPF( cpf ) {

  let vistorias = [];
  
  BUFFER_VISTORIAS.forEach( vistoria => {

    if( vistoria[CPF_VISTORIA].padStart(11, "0") == cpf.padStart(11, "0") ) {

      let v = {  
        dataSolicitacao: vistoria[DATA_SOLICITACAO_VISTORIA],
        dataVistoria: vistoria[DATA_VISTORIA],
        dataLaudo: vistoria[DATA_LAUDO],
        descricaoLaudo: vistoria[DESCRICAO_LAUDO],
        informacaoComplementar: vistoria[INFORMACAO_COMPLEMENTAR]
      };

      vistorias.push( v );
    }

  });

  return vistorias;

} // Fim da função pesquisarVistoriasPorCPF()



/**
 * Função para testar a função pesquisarVistoriasPorCPF() 
 * do módulo tabelasVistoria.gs
 */
function testePesquisarVistoriasPorCPF() {

  let cpf = "22707190349";

  let vistorias = pesquisarVistoriasPorCPF( cpf );

  console.log( `Vistorias encontradas para o CPF ${cpf}:` );
  console.log( vistorias );

} // Fim da função testePesquisarVistoriasPorCPF()



/**
 * ##### FIM DO MÓDULO tabelasVistoria.gs #####
 */