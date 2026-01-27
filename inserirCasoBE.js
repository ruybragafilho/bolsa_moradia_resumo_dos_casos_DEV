"use strict";

/**
 * Módulo:    inserirCasoBE.gs
 * Objetivo:  inserir um novo caso na tabela CASOS
 */



/**
 * Função que insere um novo caso na tabela CASOS
 *  
 * @param {String} referenciaFamiliar: O nome da referência familiar
 * @param {String} tipoLogradouro: Tipo do logradouro do endereço da família
 * @param {String} nomeLogradouro: Nome do logradouro do endereço da família
 * @param {String} numero: Número do endereço da família
 * @param {String} complemento: Complemento do endereço da família
 * @param {String} bairro: Bairro do endereço da família
 * @param {String} idRegional: id da regional do endereço da família
 * @param {String} cep: CEP do endereço da família
 * @param {String} tpsa:
 * @param {Date}   dataChegadaNoCREAS: Data de chegada no CREAS
 * @param {String} idsOrgaosEncaminhadores: ids dos órgãos encaminhadores
 * @param {Date}   dataPrevistaResposta: Data prevista para a resposta 
 * @param {String} idsViolacoesCaso: ids das violações
 * @param {String} idsCategoriasCaso: ids das categorias
 * @param {String} idsParametrosCaso: ids dos parâmetros selecionados
 * @param {String} observacao: Observação do trabalhador - text de 200 caracteres
 */
function inserirCasoBE( referenciaFamiliar,
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
                        idsViolacoesCaso,                        
                        idsCategoriasCaso,
                        idsParametrosCaso,
                        observacao ) {

  // Gera o id do novo caso
  const idNovoCaso = NUM_CASOS + 1;    

  // Gera a data de insercao do novo caso no sistema
  const dataInsercaoNoSistema = new Date().toLocaleString("pt-BR", {dateStyle: "short"});    

  // Gera a data da ultima resposta do novo caso
  // Para um novo caso, essa informação não é conhecida,
  // por isso o valor null é atribuído à variável
  const dataDaUltimaResposta = null;   

  // Gera a data de designação do novo caso
  // Para um novo caso, essa informação não é conhecida,
  // por isso o valor null é atribuído à variável  
  const dataDeDesignacao = null;     

  // Gera o motivo de designação do novo caso
  // Para um novo caso, essa informação não é conhecida,
  // por isso o valor null é atribuído à variável  
  const idMotivoDeDesignacao = null;
    
  // Chama a função para gravar o novo caso na tabela CASOS
  try {
    gravarNaTabelaCasos( idNovoCaso,
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

} // Fim da função inserirCasoBE



/**
 *  #####  TESTES PARA AS FUNÇÕES DESSE MÓDULO  #####
 */



/**
 * Função para testar a função principal inserirNovoCaso
 */
function teste_inserirCasoBE() {

  let referenciaFamiliar = "TESTE UM";  
  let tipoLogradouro = "  Rua  ";
  let nomeLogradouro = "TESTE 1";
  let numero ="428";
  let complemento = "Apartamento 101 bl 01";
  let bairro = "Barro Preto";
  let idRegional = "6";
  let cep = "30120-070";
  let tpsa = "127";
  let dataChegadaNoCREAS = new Date("2025-07-31");
  let idsOrgaosEncaminhadores = "2;4";
  let dataPrevistaResposta = new Date("2025-08-31");  
  let idsViolacoesCaso = "2;4";
  let idsCategoriasCaso = "1;3;5";
  let idsParametrosCaso = "1;2;3;18;28";
  let observacao = "  Observação do novo caso inserido  ";

  try {
    inserirCasoBE(  referenciaFamiliar,
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
                    idsViolacoesCaso,                
                    idsCategoriasCaso,
                    idsParametrosCaso,
                    observacao  );
  } catch( error ) {
    console.log( error.message );
  } 

} // Fim da função teste_inserirCasoBE




/**
 * ##### FIM DO MÓDULO inserirNovoCaso.gs #####
 */




