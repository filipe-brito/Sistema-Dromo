export const fetchIndividuals = async () => {
  const response = await fetch("http://localhost:8080/records/individuals");

  if (!response.ok) {
    throw new Error("Erro ao buscar dados dos indivíduos");
  }

  return response.json();
};

export const fetchCompanies = async () => {
  const response = await fetch("http://localhost:8080/records/companies");
  if (!response.ok) {
    throw new Error("Erro ao buscar dados de companias");
  }

  return response.json();
};
