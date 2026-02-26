"use strict";

/**
 * Módulo:    enviarEmailBE.gs
 * Objetivo:  Envia um email para o endereço de e-mail informado
 */


/**
 * Função que envia um email para o endereço de e-mail informado
 *  
 * @param {String} enderecoEmail: enderecoEmail Endereço para onde o email será enviado
 * 
 */
function enviarEmailBE( enderecoEmail, cpfRFCaso, nomeRFCaso, evolucaoCaso ) {
  
  if( validarEmail( enderecoEmail ) ) {

    try {
  
      MailApp.sendEmail({
  
        to: enderecoEmail,
        cc: `ruy.braga@pbh.gov.br`,
        subject: `ASSUNTO EMAL TESTE - RUY`,
        htmlBody: `Prezadas/os, boa tarde!<br><br>
  
          CORPO EMAL TESTE - RUY<br><br>
      
          Informamos que a família da RF ${nomeRFCaso}, CPF ${cpfRFCaso}, teve a seguinte evolução: ${evolucaoCaso}<br><br>

          Atenciosamente,<br>
                
          Subsecretaria de Assistência Social | SUASS<br>`
  
      });
  
      return true;
  
    } catch( error ) {
      throw( "enviarEmailBE - " + error.message );
    }

  }  else {
    throw( "enviarEmailBE - Email inválido" );
  }

} // Fim da função enviarEmailBE



// Função que verifica se o formato do endereço de email é válido
function validarEmail(enderecoEmail) {

  // Regex padrão para validação de formato de e-mail
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return ( enderecoEmail != "" && regex.test( enderecoEmail ) );

} // Fim da função validarEmail
    



/**
 *  #####  TESTES PARA AS FUNÇÕES DESSE MÓDULO  #####
 */



/**
 * Função para testar a função enviarEmail
 */
function teste_enviarEmail() {
  
  let enderecoEmail = "sigps@pbh.gov.br";
  let cpfRFCaso = "111.222.333-44";
  let nomeRFCaso = "João da Silva";
  let evolucaoCaso = "evolução;"

  enviarEmailBE( enderecoEmail, cpfRFCaso, nomeRFCaso, evolucaoCaso );
 
}


/**
 * Função para testar a função validarEmail
 */
function teste_validarEmail() {
  
  let enderecoEmail = "sigps@pbh.gov.br";

  let resultadoValidacao = validarEmail( enderecoEmail );

  console.log( "Resultado teste validação: " + resultadoValidacao );
}




/**
 * ##### FIM DO MÓDULO enviarEmailBE.gs #####
 */
