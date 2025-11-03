import axios from "axios";

// Cria uma instância do axios com uma configuração base
const api = axios.create({
  /*
   *Qualquer requisição feita para essa url (inclusive com parâmetro)
   *será implementada as funções de configuração abaixo
   */
  baseURL: "/backend", // URL do seu backend
});

/*
 * Interceptor: Adiciona uma ação antes de cada requisição.
 * Neste caso, estamos adicionando o token automaticamente antes de cada requisição
 * feita para a URL definida acima na instância do Axios.
 *
 * O Axios tem o método "use" para interceptores de requisição.
 * Aqui passamos duas funções anônimas como argumento:
 *
 * 1. Primeira função: configuração da requisição.
 *    O próprio Axios injeta o argumento "config", onde podemos modificar os headers.
 *    Se houver um token no localStorage, adicionamos no header Authorization.
 *
 * 2. Segunda função: tratamento de erro caso ocorra antes de a requisição ser enviada.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Recupera o token do localStorage (se houver)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Adiciona no header Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Caso dê erro antes de enviar a requisição
  }
);

/*
 * Interceptor de resposta: Trata erros globais das respostas da API.
 * Exemplo: Se o backend responder com status 401 (Não autorizado),
 * o sistema pode tomar uma ação global, como redirecionar para a página de login.
 *
 * Aqui também usamos duas funções:
 *
 * 1. Primeira função: passa a resposta normalmente se estiver tudo OK.
 * 2. Segunda função: captura erros de resposta (ex: falha de autenticação, servidor, etc).
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      error.response.status === 403
    ) {
      console.warn("Usuário não autorizado. Redirecionando para login...");
      // Exemplo: limpar token e forçar logout
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
