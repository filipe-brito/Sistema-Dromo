// Função auxiliar para converter um object simples em um FormData,
// que é ideal quando há arquivos no formulário
export function buildFormData(dataName, data, fileName, file) {
  // Variável que vai armazenar o FormData
  const formData = new FormData();
  // Anexa o DTO como uma string JSON, com o nome 'individual'
  // O nome 'individual' DEVE ser o mesmo do seu @RequestPart do backend
  formData.append(dataName, JSON.stringify(data));

  // Anexa o arquivo, com o nome 'profile_image'
  // O nome 'profile_image' DEVE ser o mesmo do seu @RequestPart do backend
  formData.append(fileName, file);
  /**
   * Estrutura condicional "for of" que percorre o object data convertido em array de arrays
   * com os pares chave/valor (Object.entries). Cada item iterado, é armazenado na variável
   * local const [key, value]. Essa conversão em array é necessária pois a estrutura for of
   * trabalha somente com arrays.
   *
   */

  /*
  for (const [key, value] of Object.entries(data)) {
    // Verifica se o value iterado é do tipo FileList (array de arquivos)
    if (value instanceof FileList && value.length > 0) {
      // Atribui o par iterado ao formData
      formData.append(key, value);
    } else if (value !== null && value !== undefined) {
      // Atribui o par iterado ao formData
      formData.append(key, value);
    }
  }*/
  return formData; // Retorna o formulário multipart para ser submetido
}
