"use strict";

/**
 * Módulo:    obterParametrosDasCategorias.gs
 * Objetivo:  Obtém quais parâmetros estão associados a uma lista de categorias
 */




/**
 * Função que determina quais parâmetros estão associados às categorias 
 * cujos ids estão contidos no array idsCategorias.
 * 
 * @param {Array of Integers} idsCategorias: ids das categorias que serão testadas
 * 
 * return Uma tabela com os ids e nomes dos parâmetros associados ás categorias informadas
 */
function obterParametrosDasCategorias( idsCategorias ) {
  
  // Array contendo outro array, de duas posições, contendo [idParametro, nomeParametro]
  let parametrosAssociados = [];  

  // Percorre a tabela de parâmetros determinando quais estão associados às categorias      
  let linhaTabelaParametro = [];
  for( let idParametro=1; idParametro<=NUM_PARAMETROS; ++idParametro ) {

    if( parametroPertenceAasCategorias( idParametro, idsCategorias ) ) {    
      linhaTabelaParametro = BUFFER_PARAMETROS[idParametro-1];  
      parametrosAssociados.push( [ linhaTabelaParametro[ID], linhaTabelaParametro[NOME], linhaTabelaParametro[ATIVO] ] );
    }
  }

  // Retorna a lista com os ids dos parâmetros associados às categorias
  return parametrosAssociados; 

} // Fim da função obterParametrosDasCategorias



/**
 *  #####  FUNÇÕES AUXILIARES PARA A FUNÇÃO PRINCIPAL DESSE MÓDULO  #####
 */



/**
 * Função que verifica se UM parâmetro pertence a pelo menos uma das categorias passadas como argumento.
 * Se sim, a função retorna true. Se não, a função retorna false.
 * 
 * @param {Integer} idParametro: id do parâmetro que será testado
 * @param {Array of Integers} idsCategorias: ids das categorias que serão testadas
 * 
 * @return booleano
 */
function parametroPertenceAasCategorias( idParametro, idsCategorias ) {

  // Carrega, da tabela PARAMETROS, a lista de categorias associadas aos parâmetros de id idParametro
  const categoriasParametro = BUFFER_PARAMETROS[idParametro-1][CATEGORIAS_PARAMETRO].split(";");

  // Percorre o array idsCategorias, verificando se alguma das categorias
  // contidas nele está associada ao parâmetro de id idParametro  
  const numCategorias = idsCategorias.length;
  for( let i=0; i<numCategorias; ++i ) {     
    if( categoriasParametro[ idsCategorias[i] - 1 ] ) return true;
  }   
  return false;

} // Fim da função parametroPertenceAasCategorias



/**
 *  #####  TESTES PARA AS FUNÇÕES DESSE MÓDULO  #####
 */



/**
 * Função para testar a função auxiliar parametroPertenceAasCategorias
 */
function teste_parametroPertenceAasCategorias() {

    const idParametro = 7;
    
    //const idsCategorias = [2];
    //const idsCategorias = [4];
    const idsCategorias = [2,4];

    const retorno = parametroPertenceAasCategorias( idParametro, idsCategorias );

    console.log(retorno);    

} //  Fim da função teste_parametroPertenceAasCategorias



/**
 * Função para testar a função principal do módulo obterParametrosDasCategorias
 */
function teste_obterParametrosDasCategorias() {

    //const idsCategorias = [5];
    const idsCategorias = [3, 5];
    
    const retorno = obterParametrosDasCategorias( idsCategorias );

    console.log(retorno);
    
} //  Fim da função teste_obterParametrosDasCategorias




/**
 * ##### FIM DO MÓDULO obterParametrosDasCategorias.gs #####
 */



