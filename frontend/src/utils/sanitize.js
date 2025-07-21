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
  const sanitized = Object.entries(data).reduce((acc, [key, value]) => {
    // verifica se o value iterado é do tipo String
    if (typeof value === "string") {
      //se estiver vazio, atribui null
      acc[key] = value.trim() === "" ? null : value;
    }
    // verifica se o value iterado é do tipo Object
    else if (typeof value === "object" && value !== null) {
      const subValues = Object.values(value);
      const allUndefined = subValues.every((v) => v === undefined);

      acc[key] = allUndefined ? null : value;
    } else {
      acc[key] = value;
    }
    return acc;
  }, {});

  return sanitized;
}
