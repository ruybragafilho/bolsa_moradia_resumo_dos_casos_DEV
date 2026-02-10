"use strict";

/**
 * Módulo:    tabelas.gs
 * Objetivo:  Armazenar Fila de casos do sistema Bolsa Moradia
 */


/**
 * Planilha CODIGOS contendo as tabelas 
 *     . RESPOSTAS_SIMPLES 
 *     . ORGAOS_ENCAMINHADORES 
 *     . MOTIVOS_DE_DESIGNACAO  
 */
const PLANILHA_CODIGOS_ID  =  "1kiunfkV_113EpaCKopb8NI75RneypnmvfwbcK1hyjt0";
const PLANILHA_CODIGOS     =  SpreadsheetApp.openById(PLANILHA_CODIGOS_ID);

const TABELA_RESPOSTAS_SIMPLES      =  PLANILHA_CODIGOS.getSheetByName('RESPOSTAS_SIMPLES');
const TABELA_ORGAOS_ENCAMINHADORES  =  PLANILHA_CODIGOS.getSheetByName('ORGAOS_ENCAMINHADORES');
const TABELA_MOTIVOS_DE_DESIGNACAO  =  PLANILHA_CODIGOS.getSheetByName('MOTIVOS_DE_DESIGNACAO');

const BUFFER_RESPOSTAS_SIMPLES      =  TABELA_RESPOSTAS_SIMPLES.getDataRange().getDisplayValues().splice(1);
const BUFFER_ORGAOS_ENCAMINHADORES  =  TABELA_ORGAOS_ENCAMINHADORES.getDataRange().getDisplayValues().splice(1);
const BUFFER_MOTIVOS_DE_DESIGNACAO  =  TABELA_MOTIVOS_DE_DESIGNACAO.getDataRange().getDisplayValues().splice(1);

const NUM_RESPOSTAS_SIMPLES      =  BUFFER_RESPOSTAS_SIMPLES.length;
const NUM_ORGAOS_ENCAMINHADORES  =  BUFFER_ORGAOS_ENCAMINHADORES.length;
const NUM_MOTIVOS_DE_DESIGNACAO  =  BUFFER_MOTIVOS_DE_DESIGNACAO.length;



/**
 * Planilha FILA
 */
const PLANILHA_FILA_ID        =  "1du1DlnwZBBAM8du3HNpA9Hpk70XtdSAGKlylGkZX2Nw";
const PLANILHA_FILA           =  SpreadsheetApp.openById(PLANILHA_FILA_ID);
const TABELA_FILA             =  PLANILHA_FILA.getSheetByName('FILA');
let BUFFER_FILA               =  TABELA_FILA.getDataRange().getDisplayValues().splice(1);
let TAMANHO_FILA              =  BUFFER_FILA.length;
const NUM_COLUNAS_TABELA_FILA =  14;

function refreshBufferFila() {
  BUFFER_FILA  =  TABELA_FILA.getDataRange().getDisplayValues().splice(1);
  TAMANHO_FILA = BUFFER_FILA.length;
}

let flag_fila_carregada = 1;


/**
 * Planilha USUARIOS
 */
const PLANILHA_USUARIOS_ID        =  "14945tdk0asP0ySI2CxLvyflIPbIM569myEpK8nTUqcg";
const PLANILHA_USUARIOS           =  SpreadsheetApp.openById(PLANILHA_USUARIOS_ID);
const TABELA_USUARIOS             =  PLANILHA_USUARIOS.getSheetByName('USUARIOS');
const BUFFER_USUARIOS             =  TABELA_USUARIOS.getDataRange().getDisplayValues().splice(1);
const NUM_USUARIOS                =  BUFFER_USUARIOS.length;



/**
 * Constantes que armazenam as posições das colunas nas tabelas
 */

// Posição da coluna ID nas planilhas CODIGOS, FILA e USUARIOS
const ID = 0;


// Posições das colunas NOME e ATIVO nas tabelas da planilha CODIGOS e USUARIOS
const NOME  = 1;
const ATIVO = 2;


// Posições das colunas da planilha FILA
const REFERENCIA_FAMILIAR     =  1;
const CPF_RF                  =  2;
const ORGAO_ENCAMINHADOR      =  3;
const DATA_ENCAMINHAMENTO     =  4;
const PONTUACAO               =  5;
const QUANTIDADE_CEA          =  6;
const PROBLEMAS_SAUDE         =  7;
const DATA_NASCIMENTO_RF      =  8;
const TEMPO_SITUACAO_DE_RUA   =  9;

const STATUS_CONVOCACAO       = 10;
const MOTIVO_DE_DESIGNACAO    = 11;
const DATA_DE_DESIGNACAO      = 12;
const DOC_PENDENTE            = 13;



// Posições das colunas da planilha USUARIOS
const EMAIL             = 1;
const REGIONAL_USUARIO  = 3;
const TIPO_USUARIO      = 4;


let linhaTabela = 0;

//carregarFila();


/** 
 *  ####################################################
 *  #####                                          ##### 
 *  #####  IMPLEMENTAÇÃO DAS FUNÇÕES DESSE MÓDULO  #####
 *  #####                                          ##### 
 *  ####################################################
 */




/**
 * Função que retorna uma cópia da tabela cujo nome é passado como parâmetro.
 * É chamada pelo front-end para obter os ids e nomes das informações que
 * serão mostradas na tela
 * 
 * @param {String} nomeTabela: Nome da tabela a qual os ids se referem. Pode ser
 *                             RESPOSTAS_SIMPLES, ORGAOS_ENCAMINHADORES OU MOTIVOS_DE_DESIGNACAO 
 * 
 * return Uma cópia da tabela
 */
function obterTabelaCompleta( nomeTabela ) {

  let bufferTabela;

  switch( nomeTabela ) {
    case "RESPOSTAS_SIMPLES":        bufferTabela = BUFFER_RESPOSTAS_SIMPLES;
                                     break;                                                                  
    case "ORGAOS_ENCAMINHADORES":    bufferTabela = BUFFER_ORGAOS_ENCAMINHADORES;
                                     break;
    case "MOTIVOS_DE_DESIGNACAO":    bufferTabela = BUFFER_MOTIVOS_DE_DESIGNACAO;
                                     break;            
    default:                         throw( new Error( "Tabela inválida" ) ); 
  }

  let tabela = [];
  
  bufferTabela.forEach( linha => tabela.push( linha ) );

  return tabela;

} // Fim da função obterTabelaCompleta



/**
 * Função que recebe um id e o nome da tabela a qual o id se refere, 
 * e retorna o nome relacionado ao ID. 
 */
function idToNome( id, nomeTabela ) {

  if( id == "" ) {
    return "";
  }

  let bufferTabela;
  let tamanhoTabela;

  switch( nomeTabela ) {
    case "RESPOSTAS_SIMPLES":        bufferTabela = BUFFER_RESPOSTAS_SIMPLES;
                                     tamanhoTabela = NUM_RESPOSTAS_SIMPLES;
                                     break;                                                        
    case "ORGAOS_ENCAMINHADORES":    bufferTabela = BUFFER_ORGAOS_ENCAMINHADORES;
                                     tamanhoTabela = NUM_ORGAOS_ENCAMINHADORES;
                                     break;          
    case "MOTIVOS_DE_DESIGNACAO":    bufferTabela = BUFFER_MOTIVOS_DE_DESIGNACAO;
                                     tamanhoTabela = NUM_MOTIVOS_DE_DESIGNACAO;
                                     break;               
    default:                         throw( new Error( "idToNome - Tabela Inválida" ) );    
  }

  if( id < 1  ||  id > tamanhoTabela ) {
    throw( new Error( "idToNome - ID Inválido - " + id + " - " + tamanhoTabela ) );      
  }

  return bufferTabela[id-1][NOME];  

} // Fim da função idToNome



/**
 * Função que grava um caso na fila 
 */
function gravarCasoNaFila( caso ) {

  // Determina em qual linha da tabela o caso será gravado
  let posicaoTabela = caso[ID] + 1;

  // TENTA PEGAR O LOCK
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);  

  // SE PEGAR O LOCK, PROSSEGUE COM A INSERÇÃO
  if( lock.hasLock() ) {    

    let range = TABELA_FILA.getRange( posicaoTabela, 1, 1, NUM_COLUNAS_TABELA_FILA-4 );
    range.setValues([caso]);
  
    // Flush na planilha
    try {
      SpreadsheetApp.flush();
      PLANILHA_FILA.waitForAllDataExecutionsCompletion(2);      
    } catch( error ) {
      throw( error.message );
    }
  
    // SOLTA O LOCK
    lock.releaseLock();

  } else {

    // SE NAO CONSEGUIR PEGAR O LOCK, LANCA UMA EXCESSAO
    throw( new Error( "Nao foi possivel pegar o LOCK" ) );
  }    

} // Fim da função gravarNaTabelaFila



/**
 * Função que limpa a fila, excluíndo todos os casos dela
 */
function limparFila() {

  let casoNulo = new Array(NUM_COLUNAS_TABELA_FILA-4).fill("");

  // TENTA PEGAR O LOCK
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);  

  // SE PEGAR O LOCK, PROSSEGUE COM A INSERÇÃO
  if( lock.hasLock() ) {    

    let range;

    for( let linha=2; linha<=TAMANHO_FILA+1; ++linha ) {

      range = TABELA_FILA.getRange( linha, 1, 1, NUM_COLUNAS_TABELA_FILA-4 );
      range.setValues([casoNulo]);
    }

    // Flush na planilha
    try {
      SpreadsheetApp.flush();
      PLANILHA_FILA.waitForAllDataExecutionsCompletion(2);      
    } catch( error ) {
      throw( error.message );
    }
  
    // SOLTA O LOCK
    lock.releaseLock();

  } else {

    // SE NAO CONSEGUIR PEGAR O LOCK, LANCA UMA EXCESSAO
    throw( new Error( "Nao foi possivel pegar o LOCK" ) );
  }    

} // Fim da função limparFila



/**
 * Função que obtém um caso da tabela passada como parâmetro
 * @param {Array 2D} tabela onde será obtido p caso
 * @returns 1 caso
 */
function obterCaso( tabela ) {

  let caso = [];

  let numLinhas = tabela.length;

  
  caso.push( tabela[linhaTabela] );  
  ++linhaTabela;

  
  while(  ( linhaTabela < numLinhas ) &&
          ( tabela[linhaTabela][UNI_CPF_RF] == caso[0][UNI_CPF_RF] ) ) {

    caso.push( tabela[linhaTabela] );
    ++linhaTabela;
  }

  return caso;

} // Fim da função obterCaso



/**
 * Função que mostra, no console, o caso passado como parâmetro
 * @param {Array 2D} caso caso que será impresso em console 
 */
function mostrarCaso( caso ) {
  console.log( "CASO" );
  caso.forEach( c => {        
      console.log( c );  
  });
} // Fim da função mostrarCaso



function testeObterCaso() {

  let teste = obterCaso( BUFFER_CASOS_EXTERNOS );
  mostrarCaso( teste )
}



/**
 * Função que calcula a pontuação de um caso, seguindo os critérios
 * definidos pela DPOP
 * @param {Arrau 2D} caso cuja pontuação será calculada
 * @returns POntuação do caso
 */
function calcularPontuacao( caso ) {

  // Familiares do caso
  let numeroFamiliares = caso.length;
  
  if( numeroFamiliares < 1 ) {    
    return 0;
  } 

  let rf = caso[0];
  let familiar = []; 


  // Pontuação
  let peso;
  let pontuacaoCriterio;
  let pontuacaoTotal = 0;


  // 1) VULNERABILIDADE ASSOCIADA A CICLOS DE VIDA E PERTENCIMENTO IDENTITÁRIO
  peso = 2;


  // 1.1) Famílias com mulheres (cis ou trans)
  console.log( "Parâmero 1.1" );
  pontuacaoCriterio = 0;

  if( rf[UNI_GENERO] == 3 || rf[UNI_GENERO] == 4 ) { 
    pontuacaoCriterio = peso*2;
    console.log( "Pontuação RF: " + pontuacaoCriterio );
  } else {
    for( let i=1; i<numeroFamiliares; ++i ) {
      familiar = caso[i];
      if( familiar[UNI_GENERO] == 3 || familiar[UNI_GENERO] == 4 ) {
        pontuacaoCriterio = peso*1;
        console.log( "Pontuação Familiar: " + pontuacaoCriterio );
        break;
      }
    } 
  }

  pontuacaoTotal += pontuacaoCriterio;


  // 1.2) Famílias com indivíduos cuja identidade de gênero e orientação sexual sejam
  //      diferentes da cisheterossexualidade
  console.log( "Parâmero 1.2" );
  pontuacaoCriterio = 0;

  if( rf[UNI_GENERO] != 1 && rf[UNI_GENERO] != 3 && rf[UNI_ORIENTACAO_SEXUAL] != 3 ) { 
    pontuacaoCriterio = peso*2;
    console.log( "Pontuação RF: " + pontuacaoCriterio );
  } else {
    for( let i=1; i<numeroFamiliares; ++i ) {
      familiar = caso[i];
      if( familiar[UNI_GENERO] != 1 && familiar[UNI_GENERO] != 3 && familiar[UNI_ORIENTACAO_SEXUAL] != 3 ) {
        pontuacaoCriterio = peso*1;
        console.log( "Pontuação Familiar: " + pontuacaoCriterio );
        break;
      }
    } 
  }

  pontuacaoTotal += pontuacaoCriterio;


  // 1.3) Famílias com indivíduos pretos, pardos ou indígenas
  console.log( "Parâmero 1.3" );
  pontuacaoCriterio = 0;

  if( rf[UNI_RACA_COR] == 2 || rf[UNI_RACA_COR] == 4 || rf[UNI_RACA_COR] == 5 ) { 
    pontuacaoCriterio = peso*2;
    console.log( "Pontuação RF: " + pontuacaoCriterio );
  } else {
    for( let i=1; i<numeroFamiliares; ++i ) {
      familiar = caso[i];
      if( familiar[UNI_RACA_COR] == 2 || familiar[UNI_RACA_COR] == 4 || familiar[UNI_RACA_COR] == 5 ) {
        pontuacaoCriterio = peso*1;
        console.log( "Pontuação Familiar: " + pontuacaoCriterio );
        break;
      }
    } 
  }

  pontuacaoTotal += pontuacaoCriterio;  


  // 1.4) Famílias com crianças e adolescentes (pontuar por criança e adolescente)
  //      compondo o núcleo familiar
  console.log( "Parâmero 1.4" );
  pontuacaoCriterio = 0;

  let tem_segundo_rf = false;
  for( let i=1; i<numeroFamiliares; ++i ) {
    familiar = caso[i];
    if(familiar[UNI_RF_2] == "true") {
      console.log( "SEGUNDO RF" );
      tem_segundo_rf = true;      
    }    
    if( calcularIdade( familiar[UNI_DATA_NASCIMENTO] ) < 18 ) {
      pontuacaoCriterio += peso*1;
      console.log( "Pontuação Familiar: " + pontuacaoCriterio );
    }
  }   
  if( pontuacaoCriterio > 0 && 
      !tem_segundo_rf &&
      (rf[UNI_GENERO] == 1 || rf[UNI_GENERO] == 2) ) {
    
      pontuacaoCriterio += peso*1;
      console.log( "Pontuação RF: " + pontuacaoCriterio );    
  }

  pontuacaoTotal += pontuacaoCriterio;  


  // 1.5) Idosos (acima de 60 anos, com maior prioridade para idosos com 80 anos ou
  // mais, conforme Estatuto do Idoso)
  console.log( "Parâmero 1.5" );
  pontuacaoCriterio = 0;

  let idadeRF = calcularIdade( rf[UNI_DATA_NASCIMENTO] );
  let idadeFamiliar;
  if( idadeRF >= 80 ) { 
    pontuacaoCriterio = peso*4;
    console.log( "Pontuação RF: " + pontuacaoCriterio );
  } else {
    for( let i=1; i<numeroFamiliares; ++i ) {
      familiar = caso[i];
      idadeFamiliar = calcularIdade( familiar[UNI_DATA_NASCIMENTO] );
      if( idadeFamiliar >= 80 ) {
        pontuacaoCriterio = peso*3;
        console.log( "Pontuação Familiar: " + pontuacaoCriterio );
        break;
      }
    } 
  }
  if( pontuacaoCriterio == 0 ) {
    if( idadeRF >= 60 ) { 
      pontuacaoCriterio = peso*2;
      console.log( "Pontuação RF: " + pontuacaoCriterio );
    } else {
      for( let i=1; i<numeroFamiliares; ++i ) {
        familiar = caso[i];
        idadeFamiliar = calcularIdade( familiar[UNI_DATA_NASCIMENTO] );
        if( idadeFamiliar >= 60 ) {
          pontuacaoCriterio = peso*1;
          console.log( "Pontuação Familiar: " + pontuacaoCriterio );
          break;
        }
      } 
    }    
  }

  pontuacaoTotal += pontuacaoCriterio;  

  
  // 1.6) Famílias com pessoas com deficiência
  console.log( "Parâmero 1.6" );
  pontuacaoCriterio = 0;

  if( rf[UNI_PCD] == 2 ) { 
    pontuacaoCriterio = peso*2;
    console.log( "Pontuação RF: " + pontuacaoCriterio );
  } else {
    for( let i=1; i<numeroFamiliares; ++i ) {
      familiar = caso[i];
      if( familiar[UNI_PCD] == 2 ) {
        pontuacaoCriterio = peso*1;
        console.log( "Pontuação Familiar: " + pontuacaoCriterio );
        break;
      }
    } 
  }

  pontuacaoTotal += pontuacaoCriterio;  


  // 1.7) Famílias com mulheres em gestação ou em fase de 
  // puerpério – até 6 meses após a gestação.
  console.log( "Parâmero 1.7" );
  pontuacaoCriterio = 0;

  if( rf[UNI_GESTANTE] == 2 ) { 
    pontuacaoCriterio = peso*2;
    console.log( "Pontuação RF: " + pontuacaoCriterio );
  } else {
    for( let i=1; i<numeroFamiliares; ++i ) {
      familiar = caso[i];
      if( familiar[UNI_GESTANTE] == 2 ) {
        pontuacaoCriterio = peso*1;
        console.log( "Pontuação Familiar: " + pontuacaoCriterio );
        break;
      }
    } 
  }

  pontuacaoTotal += pontuacaoCriterio;  



  // 2) VULNERABILIDADE RELACIONADA À VIOLAÇÃO DE DIREITOS
  peso = 1;


  // 2.1) Famílias em situação de rua com crianças e/ou adolescentes com
  //      medida protetiva de acolhimento ou em processo de acolhimento, e
  //      famílias que tiveram crianças e/ou adolescentes privadas do convívio
  //      familiar em decorrência da vida nas ruas dos responsáveis
  console.log( "Parâmero 2.1" );
  pontuacaoCriterio = 0;
  
  if( rf[UNI_CEA_ACOLHIMENTO_INSTITUCIONAL] == 2 ||
      rf[UNI_CEA_PRIVACAO_CONVIVIO] == 2   ) {
    pontuacaoCriterio = peso*2;
    console.log( "Pontuação RF: " + pontuacaoCriterio );
  }

  pontuacaoTotal += pontuacaoCriterio;


  // 2.2) Família em situação de rua com membros em situação de trabalho infantil
  //      e/ou exploração sexual de crianças/adolescentes
  console.log( "Parâmero 2.2" );
  pontuacaoCriterio = 0;
  
  if( rf[UNI_CEA_TRABALHO_INFANTIL_EXPLORACAO_SEXUAL] == 2 ) {
    pontuacaoCriterio = peso*6;
    console.log( "Pontuação RF: " + pontuacaoCriterio );
  }

  pontuacaoTotal += pontuacaoCriterio;  


  // 2.3) Família em situação de rua com membros em situação de prostituição
  console.log( "Parâmero 2.3" );
  pontuacaoCriterio = 0;
  
  if( rf[UNI_PROSTITUICAO] == 2 ) {
    pontuacaoCriterio = peso*1;
    console.log( "Pontuação RF: " + pontuacaoCriterio );
  }

  pontuacaoTotal += pontuacaoCriterio;  



  // 3) VULNERABILIDADE DE SAÚDE DA FAMÍLIA  
  peso = 1;


  // 3.1) Presença de condições de saúde que necessitem de cuidado contínuo
  console.log( "Parâmero 3.1" );
  pontuacaoCriterio = 0;

  if( rf[UNI_PROBLEMAS_SAUDE] == 3 ) { 
    pontuacaoCriterio = peso*3;
    console.log( "Pontuação RF: " + pontuacaoCriterio );
  } else if( rf[UNI_PROBLEMAS_SAUDE] == 2 ) { 
    pontuacaoCriterio = peso*2;
    console.log( "Pontuação RF: " + pontuacaoCriterio );

    for( let i=1; i<numeroFamiliares; ++i ) {
      familiar = caso[i];
      if( familiar[UNI_PROBLEMAS_SAUDE] == 3 ) {
        pontuacaoCriterio += peso*1;
        console.log( "Pontuação Familiar: " + pontuacaoCriterio );
        break;
      }
    } 
    
  } else {
    for( let i=1; i<numeroFamiliares; ++i ) {
      familiar = caso[i];
      if( familiar[UNI_PROBLEMAS_SAUDE] == 3 ) {
        pontuacaoCriterio = peso*2;
        console.log( "Pontuação Familiar: " + pontuacaoCriterio );
        break;
      } else if( familiar[UNI_PROBLEMAS_SAUDE] == 2 ) {
        pontuacaoCriterio = peso*1;
        console.log( "Pontuação Familiar: " + pontuacaoCriterio );        
      }
    } 
  }  

  pontuacaoTotal += pontuacaoCriterio;  


  // 3.2) Famílias com pessoas que possuem diagnóstico de sofrimento mental, uso prejudicial
  //      de álcool e drogas e/ou membros dependentes de cuidados para a vida diária
  console.log( "Parâmero 3.2" );
  pontuacaoCriterio = 0;

  if( rf[UNI_DIAGNOSTICO] == 2 ) {
    pontuacaoCriterio = peso*1;
    console.log( "Pontuação RF: " + pontuacaoCriterio );
  }

  pontuacaoTotal += pontuacaoCriterio;  



  // 4) VULNERABILIDADE EM DECORRÊNCIA DE VIDA NAS RUAS
  peso = 1;


  // 4.1) Tempo de vida nas ruas e/ou de acolhimento institucional
  console.log( "Parâmero 4.1" );
  pontuacaoCriterio = 0;
  
  switch( rf[UNI_TEMPO_SITUACAO_DE_RUA] ) {
    case "6":   pontuacaoCriterio = peso*6;
                break;    
    case "5":   pontuacaoCriterio = peso*5;
                break;    
    case "4":   pontuacaoCriterio = peso*4;
                break;    
    case "3":   pontuacaoCriterio = peso*3;
                break;    
    case "2":   pontuacaoCriterio = peso*2;
                break;    
    case "1":   pontuacaoCriterio = peso*1;
                break;
    default:    pontuacaoCriterio = peso*0;
                break;
  }
  console.log( "Pontuação RF: " + pontuacaoCriterio );

  pontuacaoTotal += pontuacaoCriterio;    
  

  // 4.2) Histórico de institucionalização (Clínicas psiquiátricas, comunidades terapêuticas, 
  //      sistema prisional, sistema socioeducativo, instituições asilares)
  console.log( "Parâmero 4.2" );
  pontuacaoCriterio = 0;

  if( rf[UNI_INSTITUCIONALIZACAO] != 1 ) {
    pontuacaoCriterio = peso*1;
    console.log( "Pontuação RF: " + pontuacaoCriterio );
  }

  pontuacaoTotal += pontuacaoCriterio; 
  

  // 4.3) Famílias ou indivíduos em situação de ameaça, conflito 
  //      territorial ou outras violências
  console.log( "Parâmero 4.3" );
  pontuacaoCriterio = 0;

  if( rf[UNI_AMEACA_CONFLITO_VIOLENCIA] == 2 ) {
    pontuacaoCriterio = peso*2;
    console.log( "Pontuação RF: " + pontuacaoCriterio );
  } else if( rf[UNI_AMEACA_CONFLITO_VIOLENCIA] == 3 ||
             rf[UNI_AMEACA_CONFLITO_VIOLENCIA] == 4   ) {
    pontuacaoCriterio = peso*1;
    console.log( "Pontuação RF: " + pontuacaoCriterio );
  }

  pontuacaoTotal += pontuacaoCriterio;  



  // 5) ARTICULAÇÃO ENTRE MORADIA E TRABALHO
  peso = 1;

  
  // 5.1) Pessoas em situação vinculadas ao trabalho formal ou informal, 
  //      grupos produtivos, associações e cooperativas
  console.log( "Parâmero 5.1" );
  pontuacaoCriterio = 0;

  if( rf[UNI_TRABALHO_FORMAL] != 1 || rf[UNI_TRABALHO_OUTROS] != 1 ) { 
    pontuacaoCriterio = peso*2;
    console.log( "Pontuação RF: " + pontuacaoCriterio );
  } else {
    for( let i=1; i<numeroFamiliares; ++i ) {
      familiar = caso[i];
      if( familiar[UNI_TRABALHO_FORMAL] != 1 || familiar[UNI_TRABALHO_OUTROS] != 1  ) {
        pontuacaoCriterio = peso*1;
        console.log( "Pontuação Familiar: " + pontuacaoCriterio );
        break;
      }
    } 
  }

  pontuacaoTotal += pontuacaoCriterio;


  // 5.2) Participante do Programa Estamos Juntos, inseridos 
  //      nas frentes de trabalho ou oportunidade CLT
  console.log( "Parâmero 5.2" );
  pontuacaoCriterio = 0;

  if( rf[UNI_ESTAMOS_JUNTOS] == 2 ) { 
    pontuacaoCriterio = peso*2;
    console.log( "Pontuação RF: " + pontuacaoCriterio );
  } else {
    for( let i=1; i<numeroFamiliares; ++i ) {
      familiar = caso[i];
      if( familiar[UNI_ESTAMOS_JUNTOS] == 2 ) {
        pontuacaoCriterio = peso*1;
        console.log( "Pontuação Familiar: " + pontuacaoCriterio );
        break;
      }
    } 
  }

  pontuacaoTotal += pontuacaoCriterio;  



  // Retorna a pontuação total
  console.log( "Pontuação total: " + pontuacaoTotal );
  return pontuacaoTotal;

} // Fim da função calcularPontuacao



function testeCalcularPontuacaoCaso() {

  let caso = obterCaso( BUFFER_CASOS_EXTERNOS );

  let pontuacaoCaso = calcularPontuacao( caso );

  console.log( "\n\nPontuação caso: " + pontuacaoCaso );
}



/**
 * Função que determina o número de criançãs e adolescentes de um caso.
 * @param {Array 2D} caso 
 * @returns Número de C&A
 */
function numeroDeCEAs( caso ) {

  // Número de crianças e adolescentes na família
  let numCEA = 0;

  // Familiares do caso
  let numeroFamiliares = caso.length;
  
  if( numeroFamiliares < 1 ) {    
    return 0;
  } 

  let familiar = []; 

  for( let i=1; i<numeroFamiliares; ++i ) {
    familiar = caso[i];
    if( calcularIdade( familiar[UNI_DATA_NASCIMENTO] ) < 18 ) {
      ++numCEA;
    }
  } 
    
  return numCEA;

} // Fim da função numeroDeCEAs



/**
 * Função que determina o número problemas de saúde de um caso.
 * @param {Array 2D} caso 
 * @returns Número de problemas de saúde
 */
function numeroDeProblemasDeSaude( caso ) {

  // Familiares do caso
  let numeroFamiliares = caso.length;
  
  if( numeroFamiliares < 1 ) {    
    return 0;
  } 

  // Número de crianças e adolescentes na família
  let numProbSaude = parseInt(caso[0][UNI_PROBLEMAS_SAUDE]);

  let familiar = []; 

  for( let i=1; i<numeroFamiliares; ++i ) {
    familiar = caso[i];
    numProbSaude += parseInt(familiar[UNI_PROBLEMAS_SAUDE]);
  } 
    
  return numProbSaude;

} // Fim da função numeroDeProblemasDeSaude




/**
 * Função que carrega a fina a partir das tabelas de encaminamentos
 */
function carregarFila() {

  let caso;
  let resumoCaso = new Array(NUM_COLUNAS_TABELA_FILA-4).fill("");
  let id = 0;


  limparFila();

  
  console.log( "\n\nCASOS EXTERNOS" );
  linhaTabela = 0;
  while( linhaTabela < NUM_LINHAS_TABELA_CASOS_EXTERNOS ) {

    caso = obterCaso( BUFFER_CASOS_EXTERNOS );
    mostrarCaso( caso );

    ++id;
    resumoCaso[ID] = id;
    resumoCaso[REFERENCIA_FAMILIAR] = (caso[0][UNI_NOME]).trim().toUpperCase();
    resumoCaso[CPF_RF] = caso[0][UNI_CPF_RF];
    resumoCaso[ORGAO_ENCAMINHADOR] = caso[0][UNI_ORGAO_ENCAMINHADOR];
    
    resumoCaso[DATA_ENCAMINHAMENTO] = caso[0][UNI_DATA_REGISTRO_ENCAMINHAMENTO];
    resumoCaso[PONTUACAO] = calcularPontuacao( caso );
    resumoCaso[QUANTIDADE_CEA] = numeroDeCEAs( caso );
    resumoCaso[PROBLEMAS_SAUDE] = numeroDeProblemasDeSaude( caso );
    resumoCaso[DATA_NASCIMENTO_RF] = caso[0][UNI_DATA_NASCIMENTO];
    resumoCaso[TEMPO_SITUACAO_DE_RUA] = caso[0][UNI_TEMPO_SITUACAO_DE_RUA];
    
    gravarCaso( id, resumoCaso );
  }  


  
  console.log( "\n\nCASOS PBH" );
  linhaTabela = 0;
  while( linhaTabela < NUM_LINHAS_TABELA_CASOS_PBH ) {

    caso = obterCaso( BUFFER_CASOS_PBH );
    mostrarCaso( caso );

    ++id;
    resumoCaso[ID] = id;
    resumoCaso[REFERENCIA_FAMILIAR] = (caso[0][UNI_NOME]).trim().toUpperCase();
    resumoCaso[CPF_RF] = caso[0][UNI_CPF_RF];
    resumoCaso[ORGAO_ENCAMINHADOR] = caso[0][UNI_ORGAO_ENCAMINHADOR];
    
    resumoCaso[DATA_ENCAMINHAMENTO] = caso[0][UNI_DATA_REGISTRO_ENCAMINHAMENTO];
    resumoCaso[PONTUACAO] = calcularPontuacao( caso );
    resumoCaso[QUANTIDADE_CEA] = numeroDeCEAs( caso );
    resumoCaso[PROBLEMAS_SAUDE] = numeroDeProblemasDeSaude( caso );
    resumoCaso[DATA_NASCIMENTO_RF] = caso[0][UNI_DATA_NASCIMENTO];
    resumoCaso[TEMPO_SITUACAO_DE_RUA] = caso[0][UNI_TEMPO_SITUACAO_DE_RUA];

    gravarCaso( id, resumoCaso );
    
  }

  refreshBufferFila();

  flag_fila_carregada = 1;

} // Fim da função carregarFila



/**
 * Função que grava um caso na fila
 */
function gravarCaso( idCaso, caso ) {


  // TENTA PEGAR O LOCK
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);  

  // SE PEGAR O LOCK, PROSSEGUE COM A INSERÇÃO
  if( lock.hasLock() ) {    

    let range = TABELA_FILA.getRange( idCaso+1, 1, 1, NUM_COLUNAS_TABELA_FILA-4 );
    range.setValues( [caso] );

    // Flush na planilha
    try {
      SpreadsheetApp.flush();
      PLANILHA_FILA.waitForAllDataExecutionsCompletion(2);      
    } catch( error ) {
      throw( error.message );
    }
  
    // SOLTA O LOCK
    lock.releaseLock();

  } else {

    // SE NAO CONSEGUIR PEGAR O LOCK, LANCA UMA EXCESSAO
    throw( new Error( "Nao foi possivel pegar o LOCK" ) );
  }    

}




/** 
 *  #################################################
 *  #####                                       ##### 
 *  #####  TESTES PARA AS FUNÇÕES DESSE MÓDULO  #####
 *  #####                                       ##### 
 *  #################################################
 */



/**
 * Função para testar a função obterTabelaCompleta
 */
function teste_obterTabelaCompleta() {
  
  const nomeTabela = "ORGAOS_ENCAMINHADORES";

  const retorno = obterTabelaCompleta( nomeTabela );

  console.log( retorno );

} // Fim da função teste_obterTabelaCompleta



/**
 * Função para testar a função principal calcularPontuacaoParametros
 */
/*
function teste_calcularPontuacaoParametros() {

    const idsParametros = [1, 2, 3, 4, 5];    
    
    const retorno = calcularPontuacaoParametros( idsParametros );
    
    console.log(retorno);

} // Fim da função teste_calcularPontuacaoParametros

*/

/**
 * Função para testar a função idToNome
 */
function teste_idToNome() {

  const id = "3";
  const nomeTabela = "MOTIVOS_DE_DESIGNACAO";  

  const retorno = idToNome( id, nomeTabela );

  console.log( retorno );

} // Fim da função teste_idToNome



/**
 * Função para testar a função principal formatarListaIds
 */
function teste_formatarListaIds() {

  //const arrayIdsSelecionados = "1;2;3;4;5";
  const arrayIdsSelecionados = "2;4";
  const numMaxIds = NUM_ORGAOS_ENCAMINHADORES;

  const retorno = formatarListaIds( arrayIdsSelecionados, numMaxIds );

  console.log(retorno);

} // Fim da função teste_formatarListaIds




/**
 * ##### FIM DO MÓDULO tabelas.gs #####
 */















