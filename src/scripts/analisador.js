/**
 * Procura por termos em um texto de resposta de um pedido de informação.
 * 
 * @param { string } resposta Texto da resposta
 * @returns []
 */
function verificarTermos(resposta) {
  const termos = [];
  // Tratamento do texto da resposta
  const texto = resposta.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

  // Sigilo
  const rgx_sigilo = /sigilo/;
  if (texto.match(rgx_sigilo)) {
    termos.push(1);
    termos.push(2);
    termos.push(3);
  }
  // Segurança da sociedade ou do Estado
  const rgx_seguranca_nac = /seguranca nacional|seguranca do estado/;
  if (texto.match(rgx_seguranca_nac)) {
    termos.push(4);
  }
  // Não é de competência do órgão
  const rgx_nao_competencia = /nao( sao de| e de| sao| e| tem) competencia/;
  if (texto.match(rgx_nao_competencia)) {
    termos.push(5);
  }
  // Informação inexistente
  const rgx_inexistentes = /informa...? inexistente|informa...? nao existe|dados? inexistente|dados? nao existe|documentos? inexistente|documentos? nao existe|nao detem (a |as )informac|nao detem (o |os )dado/;
  if (texto.match(rgx_inexistentes)) {
    termos.push(6);
  }
  // Processo decisório em curso, documento preparatório
  const rgx_decisao = /processo decisorio em curso|documentos? preparatorio/;
  if (texto.match(rgx_decisao)) {
    termos.push(7);
  }
  // Trabalho adicional
  const rgx_trabalho_adic = /trabalhos? adiciona|tratamentos? adiciona/;
  if (texto.match(rgx_trabalho_adic)) {
    termos.push(8);
  }
  // Dados Pessoais
  const rgx_dados_pessoais = /dados? pessoa(l|is)/;
  if (texto.match(rgx_dados_pessoais)) {
    termos.push(9);
  }
  // Pedido Genérico
  const rgx_generico = /generico/;
  if (texto.match(rgx_generico)) {
    termos.push(10);
  }
  // Desarrazoado
  const rgx_desarrazoado = /desarrazoado|desproporcional/;
  if (texto.match(rgx_desarrazoado)) {
    termos.push(11);
  }
  // Fishing
  const rgx_fishing = /fishing/;
  if (texto.match(rgx_fishing)) {
    termos.push(12);
  }
  // Resposta incompleta
  const rgx_resposta_incompleta = /resposta incompleta|parcialmente respondido|faltaram informacoes|faltam informacoes|faltou informar|pedido parcialmente atendido|resposta apresentada nao contempla|nao encaminhou( copia d..?)?( arquivo| documento| normativo)/;
  if (texto.match(rgx_resposta_incompleta)) {
    termos.push(13);
  }
  // Anexo corrompido
  const rgx_anexo_corrompido = /anexo ilegivel|anexo corrompido|anexo nao consta|nao( foi)? anex|anexo faltante|faltou anexar|faltou o anexo|sem( arquivo)? anexo|arquivo nao encontrado|nao e possivel acessar o anexo/;
  if (texto.match(rgx_anexo_corrompido)) {
    termos.push(14);
  }
  // Lei de proteção de dados
  const rgx_lgpd = /lei geral de protecao de dados|lei de protecao de dados pessoais|lgpd|13709/;
  if (texto.match(rgx_lgpd)) {
    termos.push(15);
  }

  return termos;
}

module.exports = {
  verificarTermos
}