"use strict";

/**
 * Módulo:    obterFila.gs
 * Objetivo:  Obtém a fila de casos registrados no sistema
 */



  // Timer 
  const esperarFila = (time) => new Promise( ( resolve, reject ) => setTimeout( resolve, time ) );


/**
 * Função que retorna a fila com os casos registrados no sistema
 * 
 * @return Uma fila em que cada posição contém um objeto com os dados de um caso
 */
async function obterFila() {    

  // Aguarda carregamento da fila
  while( !flag_fila_carregada ) {
    console.log( "Aguardando carregamento da fila" );
    await esperar( 1000 );
  }    

  // RETORNA NULL, SE FILA ESTIVER VAZIA
  if( TAMANHO_FILA < 1 ) return [];

    
  
  // Obtém os casos na fila
  let fila = BUFFER_FILA.map( caso => {    

      return {

        id: caso[ID],

        referencia_familiar: caso[REFERENCIA_FAMILIAR],
        cpf_rf: caso[CPF_RF],
 
        id_orgao_encaminhador: caso[ORGAO_ENCAMINHADOR],
        nome_orgao_encaminhador: idToNome( caso[ORGAO_ENCAMINHADOR], "ORGAOS_ENCAMINHADORES"),
        
        tempo_espera: calcularIntervaloEmDias( caso[DATA_ENCAMINHAMENTO] ),

        pontuacao: caso[PONTUACAO],

        quantidade_CEA: caso[QUANTIDADE_CEA],

        quantidade_problemas_saude: caso[PROBLEMAS_SAUDE],

        idade_RF: calcularIdade( caso[DATA_NASCIMENTO_RF] ),

        status_convocacao: caso[STATUS_CONVOCACAO],

        tempo_nas_ruas: caso[TEMPO_SITUACAO_DE_RUA],

        status_convocacao: caso[STATUS_CONVOCACAO],

        id_motivo_designacao: caso[MOTIVO_DE_DESIGNACAO], 
        nome_motivo_designacao: idToNome(caso[MOTIVO_DE_DESIGNACAO], "MOTIVOS_DE_DESIGNACAO"),
        
        data_designacao: caso[DATA_DE_DESIGNACAO],

        doc_pendente: caso[DOC_PENDENTE],
           
        posicaoNaFila: 0

      };// Fim return   
      

  });



  // Ordena os casos pelos pontos, em ordem decrescente  
  fila.sort( (a,b) => b.pontuacao - a.pontuacao );

  // Determina a posicao na fila da regional / fila geral
  let posicao = 1;
  fila.forEach( caso => {

    caso.posicaoNaFila = posicao;
    ++posicao; 

  });


  // Retorna a fila
  return fila;

} // Fim da Função obterFila 



/**
 *  #####  TESTES PARA AS FUNÇÕES DESSE MÓDULO  #####
 */



/**
 * Função para testar a função principal obterFila
 */
function teste_obterFila() {

  const fila = obterFila( "2" );

  console.log(fila);    

} // Fim da Função teste_obterFila 



/**
 * ##### FIM DO MÓDULO obterFila.gs #####
 */


