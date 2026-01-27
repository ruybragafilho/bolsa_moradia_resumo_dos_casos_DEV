"use strict";
    


/**
 * Gerador de Checkbox
 *
 * @param {Array} tabela - Tabela de onde os ids e os nomes das opções serão lidos
 * @param {String} idCheckBox - O id do checkbox que será gerado
 * @param {Integer} inline - 1 se o checkbox a ser gerado for inline, 0 caso contrário
 */
function gerarCheckBox( tabela, idCheckBox, inline ) {
 
  // Gera, dinamicamente, as opções do Check Box
  let checkBoxGerado = "";
  let idItem;
  let classInline = inline ? "form-check-inline" : "";

  tabela.forEach( item => {

    if( parseInt( item[ATIVO] ) ) {

      idItem = idCheckBox + item[ID];

      checkBoxGerado += 
      `<div class="form-check ${classInline}">
         <input class="form-check-input" type="checkbox" name="${idCheckBox}" id="${idItem}" value="${item[ID]}">
         <label class="form-check-label" for="${idItem}">${item[NOME]}</label>
       </div>`;

    }
  }); // Fim do tabela.forEach
      
  return checkBoxGerado;

} // Fim da função gerarCheckBox



/**
 * Gerador de Select
 *
 * @param {Array} tabela - Tabela de onde os ids e os nomes das opções serão lidos
 *
 */
function gerarSelectBackend( tabela ) {
 
  // Gera, dinamicamente, as opções do Check Box
  let selectGerado = `<option selected value="">Selecione</option>`;

  tabela.forEach( item => {

    if( parseInt( item[ATIVO] ) ) {

      selectGerado += `<option value="${item[ID]}">${item[NOME]}</option>`;

    }

  }); // Fim do tabela.forEach
      
  // Retorna o select gerado  
  return selectGerado;

} // Fim da função gerarSelectBackend    






