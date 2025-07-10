import api from "@/api/api";

export const FetchCity = async (city) => {
  try {
    const response = await api.get(`/utils/cities/search?name=${city}`);
    console.log("Teste: ", response.data);
    return response.data.map((city) => ({
      value: city.id,
      label: city.cityAndState,
      ibgeCode: city.ibgeCode,
      name: city.name,
      state: city.state,
    }));
  } catch (error) {
    console.warn("Erro ao buscar cidades: ", error.message);
    throw new Error("Erro ao buscar cidades");
  }
};
