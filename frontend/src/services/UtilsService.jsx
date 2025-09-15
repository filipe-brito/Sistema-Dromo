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

export const FetchAddressByZipCode = async (zipCode) => {
  try {
    const response = await api.get(`/utils/address-by-cep?cep=${zipCode}`);
    return response.data;
  } catch (error) {
    console.warn("Erro ao buscar endereço: ", error.message);
    throw new Error("Erro ao buscar endereço");
  }
};

// Esse cleaner é uma função auxiliar para limpar todas as caracteres que não sejam números
export const Cleaner = async (text) => {
  return text.replace(/\D/g, "");
};
