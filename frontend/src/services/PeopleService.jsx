export const fetchIndividuals = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const response = await fetch(`http://localhost:8080/records/individuals${query ? `${query}` : ""}`);
  console.log("query do PF: " + query);

  if (!response.ok) {
    throw new Error("Erro ao buscar dados dos indivíduos");
  }

  return response.json();
};

export const fetchCompanies = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const response = await fetch(`http://localhost:8080/records/companies${query ? `${query}` : ""}`);
  console.log("query do PJ: " + query);

  if (!response.ok) {
    throw new Error("Erro ao buscar dados de companias");
  }

  return response.json();
};
