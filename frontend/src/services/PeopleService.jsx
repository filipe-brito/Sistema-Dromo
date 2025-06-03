// Função assíncrona exportada que faz uma chamada à API
// Recebe como argumento um objeto 'filters'. Se nenhum for passado, usa um objeto vazio por padrão
export const fetchIndividuals = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString(); // Converte 'filters' em uma string de parâmetros de URL (query string)
  const response = await fetch(
    `http://localhost:8080/records/individuals${query ? `?${query}` : ""}`
  ); // faz a requisição HTTP para a rota de PF

  if (!response.ok) {
    // Verifica se a requisição deu erro
    throw new Error("Erro ao buscar dados dos indivíduos"); // lança uma exception
  }

  return response.json(); // Retorne a resposta da API
};

export const postIndividual = async (data) => {
  const response = await fetch("http://localhost:8080/records/individuals", {
    method: "POST", // método POST
    headers: {
      "Content-Type": "application/json", // diz que o corpo será JSON
    },
    body: JSON.stringify(data), // transforma o objeto JS em JSON string
  });

  if (!response.ok) {
    throw new Error("Erro ao salvar indivíduo");
  }

  return response.json(); // retorna o DTO com os dados salvos
};

export const deleteIndividual = async (id) => {
  const response = await fetch(
    `http://localhost:8080/records/individuals/${id}`,
    { method: "DELETE" }
  );
  if (!response.ok) {
    throw new Error("Erro ao excluir registro");
  }
};

export const getIndividualById = async (id) => {
  const response = await fetch(
    `http://localhost:8080/records/individuals/${id}`
  );
  if (!response.ok) {
    throw new Error("Erro ao buscar registro");
  }
  return response.json();
};

export const updateIndividual = async (id, data) => {
  const response = await fetch(
    `http://localhost:8080/records/individuals/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // diz que o corpo será JSON
      },
      body: JSON.stringify(data),
    }
  ); // transforma o objeto JS em JSON string,);
  if (!response.ok) {
    throw new Error("Erro ao atualizar registro");
  }
};

export const fetchCompanies = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const response = await fetch(
    `http://localhost:8080/records/companies${query ? `?${query}` : ""}`
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar dados de companias");
  }

  return response.json();
};

export const postCompany = async (data) => {
  const response = await fetch("http://localhost:8080/records/companies", {
    method: "POST", // método POST
    headers: {
      "Content-Type": "application/json", // diz que o corpo será JSON
    },
    body: JSON.stringify(data), // transforma o objeto JS em JSON string
  });

  if (!response.ok) {
    throw new Error("Erro ao salvar empresa");
  }

  return response.json(); // retorna o DTO com os dados salvos
};

export const deleteCompany = async (id) => {
  console.log("Id a ser deletado:" + id);
  const response = await fetch(
    `http://localhost:8080/records/companies/${id}`,
    { method: "DELETE" }
  );
  if (!response.ok) {
    throw new Error("Erro ao excluir registro");
  }
};

export const getCompanyById = async (id) => {
  const response = await fetch(`http://localhost:8080/records/companies/${id}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar registro");
  }
  return response.json();
};

export const updateCompany = async (id, data) => {
  const response = await fetch(
    `http://localhost:8080/records/companies/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // diz que o corpo será JSON
      },
      body: JSON.stringify(data),
    }
  ); // transforma o objeto JS em JSON string,);
  if (!response.ok) {
    throw new Error("Erro ao atualizar registro");
  }
};
