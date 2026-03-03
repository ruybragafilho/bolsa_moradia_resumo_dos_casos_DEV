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
  
  if( isEmailValidBE( enderecoEmail ) ) {

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
 * ##### FIM DO MÓDULO enviarEmailBE.gs #####
 */
