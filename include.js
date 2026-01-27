"use strict";



/**
 * Função que include - Semelahnte ao include do C / C++ ou import do Java
 * 
 * @param{string} fileName - nome do arquivo que será incluído
 * 
 * @return Retorna o arquivo, cujo nome foi passado como parâmetro, após executar (evaluate) os back-end scripts contidos nele.
 */
function include(fileName) {

  return HtmlService.createTemplateFromFile(fileName).evaluate().getContent();  

} // Fim da função include



// FIM DO MÓDULO include.gs