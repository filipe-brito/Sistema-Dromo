import ReactDOMServer from "react-dom/server";
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

// CONVERTER SVG PARA DATA URL

export function svgToUrl(svg) {
  // Passo 1: Use ReactDOMServer para renderizar o componente como uma string
  const personIconString = ReactDOMServer.renderToStaticMarkup(svg);

  // Passo 2: Codifique a string para uma Data URL
  // Usamos encodeURIComponent para garantir que a string seja segura para URLs
  const encodedPersonIcon = encodeURIComponent(personIconString);

  // Passo 3: Exporte a URL final
  const personIconUrl = `data:image/svg+xml,${encodedPersonIcon}`;
  return personIconUrl;
}
