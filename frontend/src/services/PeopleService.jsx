import api from "../api/api";

// Função assíncrona exportada que faz uma chamada à API
// Recebe como argumento um objeto 'filters'. Se nenhum for passado, usa um objeto vazio por padrão
export const fetchIndividuals = async (filters = {}) => {
  try {
    const query = new URLSearchParams(filters).toString();
    const response = await api.get(
      `/records/individuals${query ? `?${query}` : ""}`
    );
    return response.data; // Retorne a resposta da API
  } catch (error) {
    console.error("Erro ao buscar dados dos indivíduos", error);
    throw new Error("Erro ao buscar dados dos indivíduos");
  }
};

export const postIndividual = async (data) => {
  try {
    const response = await api.post("/records/individuals", data);
    return response.data; // retorna o DTO com os dados salvos
  } catch (error) {
    console.error("Erro ao salvar indivíduo: ", error);
    throw new Error("Erro ao salvar indivíduo");
  }
};

export const deleteIndividual = async (id) => {
  try {
    return await api.delete(`/records/individuals/${id}`);
  } catch (error) {
    console.error("Erro ao excluir registro: ", error);
    throw new Error("Erro ao excluir registro");
  }
};

export const getIndividualById = async (id) => {
  try {
    const response = await api.get(`/records/individuals/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar registro: ", error);
    throw new Error("Erro ao buscar registro");
  }
};

export const updateIndividual = async (id, data) => {
  try {
    return await api.put(`/records/individuals/${id}`, data);
  } catch (error) {
    console.error("Erro ao atualizar registro: ", error);
    throw new Error("Erro ao atualizar registro");
  }
};

export const fetchCompanies = async (filters = {}) => {
  try {
    const query = new URLSearchParams(filters).toString();
    const response = await api.get(
      `/records/companies${query ? `?${query}` : ""}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados de companias: ", error);
    throw new Error("Erro ao buscar dados de companias");
  }
};

export const postCompany = async (data) => {
  try {
    const response = await api.post("/records/companies", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao salvar empresa: ", error);
    throw new Error("Erro ao salvar empresa");
  }
};

export const deleteCompany = async (id) => {
  try {
    return await api.delete(`/records/companies/${id}`);
  } catch (error) {
    console.error("Erro ao excluir registro: ", error);
    throw new Error("Erro ao excluir registro");
  }
};

export const getCompanyById = async (id) => {
  try {
    const response = await api.get(`/records/companies/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar registro: ", error);
    throw new Error("Erro ao buscar registro");
  }
};

export const updateCompany = async (id, data) => {
  try {
    const response = await api.put(`/records/companies/${id}`, data);
  } catch (error) {
    console.error("Erro ao atualizar registro: ", error);
    throw new Error("Erro ao atualizar registro");
  }
};
