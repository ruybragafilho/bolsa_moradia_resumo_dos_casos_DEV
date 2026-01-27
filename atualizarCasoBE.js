"use strict";

/**
 * Módulo:    atualizarCasoBE.gs
 * Objetivo:  atualiza um caso na tabela CASOS
 */



/**
 * Função que atualiza um caso na tabela CASOS
 *  
 * @param {String} id: id do caso de será atualizado
 * @param {String} referenciaFamiliar: O nome da referência familiar
 * @param {String} tipoLogradouro: Tipo do logradouro do endereço da família
 * @param {String} nomeLogradouro: Nome do logradouro do endereço da família
 * @param {String} numero: Número do endereço da família
 * @param {String} complemento: Complemento do endereço da família
 * @param {String} bairro: Bairro do endereço da família
 * @param {String} idRegional: id da regional do endereço da família
 * @param {String} cep: CEP do endereço da família
 * @param {String} TPSA:
 * @param {Date}   dataChegadaNoCREAS: Data de chegada no CREAS
 * @param {String} idsOrgaosEncaminhadores: ids dos órgãos encaminhadores
 * @param {Date}   dataPrevistaResposta: Data prevista para a resposta
 * @param {Date}   dataDaUltimaResposta: Data da última resposta
 * @param {Date}   dataDeDesignacao: Data de designação do caso
 * @param {String} idMotivoDeDesignacao: id do motivo de designação 
 * @param {String} idsViolacoesCaso: ids das violacoes
 * @param {String} idsCategoriasCaso: ids das categorias
 * @param {String} idsParametrosCaso: ids dos parâmetros selecionados
 * @param {String} observacao: Observação do trabalhador - text de 200 caracteres
 */
function atualizarCasoBE( id,
                          referenciaFamiliar,
                          tipoLogradouro,
                          nomeLogradouro,
                          numero,
                          complemento,
                          bairro,
                          idRegional,
                          cep,                          
                          tpsa,
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

  // Se id inválido, retorna uma exceção
  if( id < 1  ||  id > NUM_CASOS ) {
    throw( new Error( "ID Inválido" ) );
  }  

  // Gera a data de insercao do caso no sistema
  // No caso de atualização, essa data não deve ser alterada
  const dataInsercaoNoSistema = BUFFER_CASOS[id-1][DATA_DE_INSERCAO_NO_SISTEMA];    
    
  // Chama a função para gravar o novo caso na tabela CASOS
  try {
    gravarNaTabelaCasos( id,
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
                         observacao );

    return true;

  } catch( error ) {
    throw( error.message );
  }

} // Fim da função atualizarCasoBE



/**
 *  #####  TESTES PARA AS FUNÇÕES DESSE MÓDULO  #####
 */



/**
 * Função para testar a função principal atualizarCaso
 */
function teste_atualizarCasoBE() {

  let id = 4;
  let referenciaFamiliar = "Francisco Júnior";  
  let tipoLogradouro = "Avenida";
  let nomeLogradouro = "Fortaleza";
  let numero ="460";
  let complemento = "Apartamento 504";
  let bairro = "Coração Eucarístico";
  let idRegional = "6";
  let cep = "30120-070";
  let tpsa = "127";
  let dataChegadaNoCREAS = new Date("2025-07-31");
  let idsOrgaosEncaminhadores = "2;4";
  let dataPrevistaResposta = new Date("2025-08-31");  
  let dataDaUltimaResposta = new Date("2025-09-01");  
  let dataDeDesignacao = new Date("2025-09-01");  
  let idMotivoDeDesignacao = "2";   
  let idsViolacoesCaso = "2;4";
  let idsCategoriasCaso = "1;3;5";
  let idsParametrosCaso = "1;2;4;6;9";
  let observacao = "Observação do caso atualizado";

  try {
    atualizarCasoBE(  id,
                      referenciaFamiliar,
                      tipoLogradouro,
                      nomeLogradouro,
                      numero,
                      complemento,
                      bairro,
                      idRegional,
                      cep,                          
                      tpsa,
                      dataChegadaNoCREAS,
                      idsOrgaosEncaminhadores,
                      dataPrevistaResposta,  
                      dataDaUltimaResposta, 
                      dataDeDesignacao,   
                      idMotivoDeDesignacao,   
                      idsViolacoesCaso,                 
                      idsCategoriasCaso,
                      idsParametrosCaso,
                      observacao );
  } catch( error ) {
    console.log( error.message );
  }

} // Fim da função teste_atualizarCasoBE




/**
 * ##### FIM DO MÓDULO atualizarCasoBE.gs #####
 */




