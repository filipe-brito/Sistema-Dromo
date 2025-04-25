// Função assíncrona exportada que faz uma chamada à API
// Recebe como argumento um objeto 'filters'. Se nenhum for passado, usa um objeto vazio por padrão
export const fetchIndividuals = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString(); // Converte 'filters' em uma string de parâmetros de URL (query string)
  const response = await fetch(
    `http://localhost:8080/records/individuals${query ? `?${query}` : ""}`
  ); // faz a requisição HTTP para a rota de PF
  console.log("query do PF: " + query);

  if (!response.ok) {
    // Verifica se a requisição deu erro
    throw new Error("Erro ao buscar dados dos indivíduos"); // lança uma exception
  }

  return response.json(); // Retorne a resposta da API
};

export const fetchCompanies = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const response = await fetch(
    `http://localhost:8080/records/companies${query ? `?${query}` : ""}`
  );
  console.log("query do PJ: " + query);

  if (!response.ok) {
    throw new Error("Erro ao buscar dados de companias");
  }

  return response.json();
};
