"use strict";

/**
 * Módulo:    usuarios.gs
 * Objetivo:  Autenticar um usuário no sistema
 */



/**
 * Função que verifica se um usuário, identificado pelo seu e-mail, 
 * está cadastrado e ativo no sistema. Se sim, retorna um objeto com
 * os dados desse usuário. Se não, lança uma excessão 
 * 
 * @return Objeto com os dados do usuário, caso ele esteja cadastrado
 *         e ativo no sistema. Se não, lança uma excessão
 * 
 */
function autenticarUsuario() {

  let email = Session.getActiveUser().getEmail().toLowerCase();

  if (!email) {
    throw( new Error("Não foi possível obter o e-mail. Por favor, faça login novamente com a conta @pbh.gov.br e recarregue a página!") );
  }  

  let resultadoAutenticacao = {
    id:            0,
    email:        "",
    instituicao:  "",
    tipo:         ""
  };

  // Percorre a tabela tentando localizar o email informado
  // e se ele está ativo
  BUFFER_USUARIOS.forEach( usuario => {

    if( usuario[EMAIL] == email  && usuario[ATIVO] == 1 ) {

      resultadoAutenticacao = {

        id:        usuario[ID],
        email:     usuario[EMAIL],
        regional:  usuario[ID_INSTITUICAO],
        tipo:      usuario[TIPO_USUARIO]

      };
    }

  }); // Fim BUFFER_USUARIOS.forEach

  return  JSON.stringify( resultadoAutenticacao );
    
} // Fim da função autenticarUsuario



/**
 *  #####  TESTES PARA AS FUNÇÕES DESSE MÓDULO  #####
 */



/**
 * Função para testar a função principal autenticarUsuario
 */
function teste_autenticarUsuario() {

  const resultadoAutenticacao =  JSON.parse( autenticarUsuario() );

  if( resultadoAutenticacao.id ) {
    console.log( resultadoAutenticacao );
  } else {
    console.log( "NÃO AUTENTICADO!" );
  }

} // Fim da função teste_autenticarUsuario




/**
 * ##### FIM DO MÓDULO usuarios.gs #####
 */




