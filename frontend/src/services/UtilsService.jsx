import api from "@/api/api";

export const FetchCity = async (city) => {
  try {
    const response = await api.get(`/utils/cities/search?name=${city}`);
    return response.data;
  } catch (error) {
    console.warn("Erro ao buscar cidades: ", error.message);
    throw new Error("Erro ao buscar cidades");
  }
};
