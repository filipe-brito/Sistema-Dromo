/**
 * Função para substituir strings vazias por null em um objeto antes de submeter ao backend.
 * Isso é necessário para o backend não acusar erros inesperados.
 *
 * Object.entries percorre um object e retorna um array com os pares chave/valor
 *
 * o reduce retorna um object depois de processar todos os elementos do array. Ele recebe
 * dois parâmetros: o acumulador (acc) e o chave/valor do elemento a ser iterado.
 *
 * Object.values extrai apenas os valores internos de um object (sem as chaves) e retorna um array.
 *
 * .every é uma função que verifica se todos os elementos de um array satisfazem uma condição. Caso algum
 * elemento seja falso, o retorno da função inteira também será falso.
 */
export function sanitizeFormData(data) {
  // Se o valor não for um objeto ou for nulo, retorna como está.
  if (typeof data !== "object" || data === null) {
    return data;
  }

  // Se for um array, sanitiza cada elemento.
  if (Array.isArray(data)) {
    return data.map(sanitizeFormData);
  }

  const sanitized = {};
  let isEmptyObject = true;

  // Usa Object.entries para iterar e aplica a lógica em cada chave/valor
  for (const [key, value] of Object.entries(data)) {
    // 1. Sanitiza o valor recursivamente
    const sanitizedValue = sanitizeFormData(value);

    // 2. Verifica se o valor sanitizado deve ser mantido ou ignorado.
    if (
      sanitizedValue !== null &&
      sanitizedValue !== "" &&
      (typeof sanitizedValue !== "object" ||
        Object.keys(sanitizedValue).length > 0)
    ) {
      sanitized[key] = sanitizedValue;
      isEmptyObject = false;
    }
  }

  // Se o objeto estiver vazio depois de sanitizado, retorna null
  return isEmptyObject ? null : sanitized;
}
