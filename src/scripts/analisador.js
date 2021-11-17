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

  const rgx_inexistentes = /informa...? inexistente|informa...? nao existe|dados? inexistente|dados? nao existe|documentos? inexistente|documentos? nao existe|nao detem (a |as )informac|nao detem (o |os )dado/;
  if (texto.match(rgx_inexistentes)) {
    termos.push("Dado/info inexistente");
  }

  const rgx_desarrazoado = /desarrazoado|desproporcional/;
  if (texto.match(rgx_desarrazoado)) {
    termos.push("Desarrazoado");
  }

  const rgx_fishing = /fishing/;
  if (texto.match(rgx_fishing)) {
    termos.push("Fishing");
  }

  const rgx_seguranca_nac = /seguranca nacional|seguranca do estado/;
  if (texto.match(rgx_seguranca_nac)) {
    termos.push("Segurança nacional");
  }

  const rgx_sigilo = /sigilo/;
  if (texto.match(rgx_sigilo)) {
    termos.push("Sigilo");
  }

  const rgx_decisao = /processo decisorio em curso|documentos? preparatorio/;
  if (texto.match(rgx_decisao)) {
    termos.push("Processo decisório em curso");
  }

  const rgx_trabalho_adic = /trabalhos? adiciona|tratamentos? adiciona/;
  if (texto.match(rgx_trabalho_adic)) {
    termos.push("Trabalho adicional");
  }

  const rgx_generico = /generico/;
  if (texto.match(rgx_generico)) {
    termos.push("Pedido genérico");
  }

  const rgx_dados_pessoais = /dados? pessoa(l|is)/;
  if (texto.match(rgx_dados_pessoais)) {
    termos.push("Dados pessoais");
  }

  const rgx_lgpd = /lei geral de protecao de dados|lei de protecao de dados pessoais|lgpd|13709/;
  if (texto.match(rgx_lgpd)) {
    termos.push("LGPD");
  }

  const rgx_nao_competencia = /nao( sao de| e de| sao| e| tem) competencia/;
  if (texto.match(rgx_nao_competencia)) {
    termos.push("Órgão incompetente");
  }

  const rgx_anexo_corrompido = /anexo ilegivel|anexo corrompido|anexo nao consta|nao( foi)? anex|anexo faltante|faltou anexar|faltou o anexo|sem( arquivo)? anexo|arquivo nao encontrado|nao e possivel acessar o anexo/;
  if (texto.match(rgx_anexo_corrompido)) {
    termos.push("Recurso com anexo corrompido");
  }

  const rgx_resposta_incompleta = /resposta incompleta|parcialmente respondido|faltaram informacoes|faltam informacoes|faltou informar|pedido parcialmente atendido|resposta apresentada nao contempla|nao encaminhou( copia d..?)?( arquivo| documento| normativo)/;
  if (texto.match(rgx_resposta_incompleta)) {
    termos.push("Recurso com resposta incompleta");
  }

  return termos;
}

module.exports = {
  verificarTermos
}