"use strict";

/**
 * Módulo:    tabelasEncaminhamentos.gs
 * Objetivo:  Importar os dados das tabelas de encaminhamentos para a tabela interna com os resumos dos casos
 */



/**
 * Planilha CASOS EXTERNOS - TRABALHADORES EXTERNOS (casos registrados por trabalhadores externos)
 */
const PLANILHA_CASOS_EXTERNOS_ID   =  "1qZjH09l2Nzr28k4ucv9-ecAn9N5fXomtLOj7rWJoPBM";
const PLANILHA_CASOS_EXTERNOS      =  SpreadsheetApp.openById(PLANILHA_CASOS_EXTERNOS_ID);

const TABELA_CASOS_EXTERNOS             =  PLANILHA_CASOS_EXTERNOS.getSheetByName('PESSOA');
const BUFFER_CASOS_EXTERNOS             =  TABELA_CASOS_EXTERNOS.getDataRange().getDisplayValues().splice(1);
const NUM_LINHAS_TABELA_CASOS_EXTERNOS  =  BUFFER_CASOS_EXTERNOS.length;


/**
 * Planilha CASOS PBH - TRABALHADORES PBH (casos registrados por trabalhadores PBH)
 */
const PLANILHA_CASOS_PBH_ID   =  "1w-mJ-7IznF7K0DGx1no1EzHq3gt_yINw_H4O2X87vGs";
const PLANILHA_CASOS_PBH      =  SpreadsheetApp.openById(PLANILHA_CASOS_PBH_ID);

const TABELA_CASOS_PBH             =  PLANILHA_CASOS_PBH.getSheetByName('PESSOA');
const BUFFER_CASOS_PBH             =  TABELA_CASOS_PBH.getDataRange().getDisplayValues().splice(1);
const NUM_LINHAS_TABELA_CASOS_PBH  =  BUFFER_CASOS_PBH.length;



// Posições das colunas das planilhas de encaminhamentos
const UNI_ID = 0;
const UNI_CPF_RF = 1;
const UNI_COD_PARENTESCO = 2;
const UNI_RF_2 = 3;
const UNI_NOME = 4;
const UNI_CPF = 5;
const UNI_DATA_NASCIMENTO = 6;
const UNI_NOME_SOCIAL = 7;
const UNI_NOME_MAE = 8;
const UNI_RACA_COR = 9;
const UNI_GENERO = 10;
const UNI_ORIENTACAO_SEXUAL = 11;
const UNI_ESCOLARIDADE = 12;
const UNI_DATA_ATUALIZACAO_CADUNICO = 13;
const UNI_TEMP_RESIDENCIA_BH = 14;
const UNI_TEMPO_SITUACAO_DE_RUA = 15;
const UNI_TELEFONE = 16;
const UNI_RENDA_FAMILIAR = 17;
const UNI_PCD = 18;
const UNI_PROBLEMAS_SAUDE = 19;
const UNI_GESTANTE = 20;
const UNI_TRABALHO_FORMAL = 21;
const UNI_TRABALHO_OUTROS = 22;
const UNI_BENEFICIO = 23;
const UNI_ESTAMOS_JUNTOS = 24;
const UNI_INSTITUCIONALIZACAO = 25;
const UNI_DIAGNOSTICO = 26;
const UNI_AMEACA_CONFLITO_VIOLENCIA = 27;
const UNI_DESC_AMEACA_CONFLITO_VIOLENCIA = 28;
const UNI_PROSTITUICAO = 29;
const UNI_CEA_ACOLHIMENTO_INSTITUCIONAL = 30;
const UNI_CEA_PRIVACAO_CONVIVIO = 31;
const UNI_DESC_CEA_PRIVACAO_CONVIVIO = 32;
const UNI_CEA_TRABALHO_INFANTIL_EXPLORACAO_SEXUAL = 33;
const UNI_AUTONOMIA = 34;
const UNI_INFO_ADICIONAIS = 35;
const UNI_LOCAL_COMUM = 36;
const UNI_ORGAO_ENCAMINHADOR = 37;
const UNI_NOME_TECNICO_ENCAMINHADOR = 38;
const UNI_EMAIL_TECNICO_ENCAMINHADOR = 39;
const UNI_DATA_REGISTRO_ENCAMINHAMENTO = 40;





/**
 * Planilha CONTROLE_CASOS, utilizada para armazenar, de forma persistente,
 * os números de linhas nas tabelas TABELA_CASOS_EXTERNOS e TABELA_CASOS_PBH.
 * 
 * Esses valores são utilizados para determinar se houve alguma inserção 
 * de caso desde a última vez que o sistema foi executado.
 */
const PLANILHA_CONTROLE_CASOS_ID  =  "1ssfHxXVomhgf7wNK8CI6n-QVv53GoajJlkPsZg23IDY";
const PLANILHA_CONTROLE_CASOS     =  SpreadsheetApp.openById(PLANILHA_CONTROLE_CASOS_ID);

const TABELA_CONTROLE_CASOS       =  PLANILHA_CONTROLE_CASOS.getSheetByName('CONTROLE');
const BUFFER_CONTROLE_CASOS       =  TABELA_CONTROLE_CASOS.getDataRange().getDisplayValues().splice(1);
const NUM_CONTROLE_CASOS          =  BUFFER_CONTROLE_CASOS.length;

const ORIGEM_EXTERNA    = 0;
const ORIGEM_PBH        = 1;

const COLUNA_NUM_LINHAS = 1;

let CONTROLE_NUM_LINHAS_TABELA_CASOS_EXTERNOS = 0;
let CONTROLE_NUM_LINHAS_TABELA_CASOS_PBH      = 0;



/**
 * Função que carrega, da planilha CONTROLE CASOS, os números de linhas 
 * nas tabelas TABELA_CASOS_EXTERNOS e TABELA_CASOS_PBH, obtidas na 
 * execução anterior do sistema. 
 * 
 * Essas variáveis são utilizadas para determinar se houve alguma inserção 
 * de caso desde a última vez que o sistema foi executado.
 */
function lerTabelaControle() { 

    CONTROLE_NUM_LINHAS_TABELA_CASOS_EXTERNOS  =  BUFFER_CONTROLE_CASOS[ORIGEM_EXTERNA][COLUNA_NUM_LINHAS];
    CONTROLE_NUM_LINHAS_TABELA_CASOS_PBH       =  BUFFER_CONTROLE_CASOS[ORIGEM_PBH][COLUNA_NUM_LINHAS];

    console.log( "CONTROLE_NUM_LINHAS_TABELA_CASOS_EXTERNOS: " + CONTROLE_NUM_LINHAS_TABELA_CASOS_EXTERNOS );
    console.log( "CONTROLE_NUM_LINHAS_TABELA_CASOS_PBH:      " + CONTROLE_NUM_LINHAS_TABELA_CASOS_PBH );

} // Fim da função lerTabelaControle



/**
 * Função que atualiza, na planilha CONTROLE CASOS, os números de linhas 
 * nas tabelas TABELA_CASOS_EXTERNOS e TABELA_CASOS_PBH, obtidas diretamente
 * dessas tabelas.
 * 
 * Essas variáveis são utilizadas para determinar se houve alguma inserção 
 * de caso desde a última vez que o sistema foi executado.
 */
function gravarTabelaControle() { 

  // TENTA PEGAR O LOCK
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);  

  // SE PEGAR O LOCK, PROSSEGUE COM A INSERÇÃO
  if( lock.hasLock() ) {
    
    const PTR_CASOS_EXTERNOS = TABELA_CONTROLE_CASOS.getRange( ORIGEM_EXTERNA+2, COLUNA_NUM_LINHAS+1 );
    PTR_CASOS_EXTERNOS.setValue( NUM_LINHAS_TABELA_CASOS_EXTERNOS );    

    const PTR_CASOS_PBH = TABELA_CONTROLE_CASOS.getRange( ORIGEM_PBH+2, COLUNA_NUM_LINHAS+1 );
    PTR_CASOS_PBH.setValue( NUM_LINHAS_TABELA_CASOS_PBH );        

    // Flush na planilha
    try {
      SpreadsheetApp.flush();
      PLANILHA_CONTROLE_CASOS.waitForAllDataExecutionsCompletion(2);      
    } catch( error ) {
      throw( error.message );
    }
  
    // SOLTA O LOCK
    lock.releaseLock();

  } else {

    // SE NAO CONSEGUIR PEGAR O LOCK, LANCA UMA EXCESSAO
    throw( new Error( "Nao foi possivel pegar o LOCK" ) );
  }  

} // Fim da função gravarTabelaControle












let linhaTabela = 0;
let caso = [];

function obterCaso( tabela ) {

  caso = [];

  let numLinhas = tabela.length;

  console.log( "\nnumLinhas: " + numLinhas);
  console.log( "\nlinhaTabela: " + linhaTabela + "\n\n");

  
  caso.push( tabela[linhaTabela] );  
  ++linhaTabela;

  console.log( "\nlinhaTabela: " + linhaTabela);
  console.log( "RF: " + caso[0] );
  console.log( "CPF RF: " + caso[0][1] );
  console.log( "CPF F: "  + tabela[linhaTabela][UNI_CPF_RF] + "\n");
  
  while(  ( linhaTabela < numLinhas ) &&
          ( tabela[linhaTabela][UNI_CPF_RF] == caso[0][UNI_CPF_RF] ) ) {

    console.log( "Entrou while" );
    caso.push( tabela[linhaTabela] );
    ++linhaTabela;
  }
  
  console.log( "\n\n" + caso.join("\n\n") + "\n\n" );

  return caso;

}


function mostrarCaso( casoi ) {
  casoi.forEach( c => {  
      console.log( c );  
  });
}



function testeObterCaso() {

  let teste = obterCaso( BUFFER_CASOS_EXTERNOS );
  mostrarCaso( teste )
}



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
      }
    } 
  }

  pontuacaoTotal += pontuacaoCriterio;  


  // Retorna a pontuação total
  console.log( "Pontuação total: " + pontuacaoTotal );
  return pontuacaoTotal;
}



function testeCalcularPontuacao() {

  let caso = obterCaso( BUFFER_CASOS_EXTERNOS );

  let pontuacaoCaso = calcularPontuacao( caso );

  console.log( "\n\nPontuação caso: " + pontuacaoCaso );
}








/**
 * Função que importa os dados das tabelas de encaminhamentos 
 * para a tabela interna com os resumos dos casos.
 */
function carregarTabelasEncaminhamentos() {

} // Fim da função carregarTabelasEncaminhamentos




function calcularIdade(dataNascimento) {

    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    nascimento.setDate( nascimento.getDate() + 1 );

    console.log( "Hoje: " + hoje );
    console.log( "Data Nascimento: " + nascimento );
    
    // Calcula a diferença de anos
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    console.log( "Diferença Anos: " + idade );
    
    // Verifica se o aniversário já passou no ano atual
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes == 0 && hoje.getDate() < nascimento.getDate())) {
        idade--; // Subtrai 1 se o aniversário ainda não ocorreu
    }

    console.log( "Diferença Anos considerando o mês e o dia: " + idade );
    
    return idade;

}


function testeVerificarMaioridade() {

  let dataNascimento = "2008-02-04";

  let idade = calcularIdade( dataNascimento );

  console.log( "Maioridade: " + (idade>=18)  );

}


/**
 * ##### FIM DO MÓDULO tabelasEncaminhamentos.gs #####
 */