"use strict";


/**
 * Implementação da função get, que é chamada quando a aplicação é executada
 * 
 * @return Retorna o HTML index.html, após executar (evaluate) os back-end scripts contidos nele.
 */
function doGet() {    
  
//  return HtmlService.createTemplateFromFile('index').evaluate();

  let retorno;

  try {

    retorno = HtmlService.createTemplateFromFile('index').evaluate();

  } catch( error ) {
    throw( "doGet: " + error.message );
  }

  return retorno;  
    
} // Fim da função doGet


// FIM DO MÓDULO doGet.gs