// Formata uma data no padrão brasileiro: dd/mm/aaaa
export function getDataFormatada(data) {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  return `${dia}/${mes}/${data.getFullYear()}`;
}

// Retorna a data de N dias antes da data informada, à meia-noite
export function getDataMenosDias(data, dias) {
  return new Date(data.getFullYear(), data.getMonth(), data.getDate() - dias);
}

// Verdadeiro se a data cai depois de hoje (ignora o horário)
export function isDataFutura(data) {
  return getDataMenosDias(data, 0) > getDataMenosDias(new Date(), 0);
}
