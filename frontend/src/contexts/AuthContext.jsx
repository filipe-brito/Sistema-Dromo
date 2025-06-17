import { createContext, useState, useEffect } from "react";

/**
 * Este componente serve para criar um 'context'.
 * Contexts, ou contextos, são estados globais; ou seja, guarda dinamicamente um valor que pode ser
 * usado em toda a aplicação.
 */

// Cria o contexto
export const AuthContext = createContext();

/**
 * Componente provedor que envolve toda a aplicação. O próprio createContex instancia a prop desse componente,
 * nós só precisamos configurar como um componente normal. */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Armazena os dados do usuário logado
  const [token, setToken] = useState(null); // Armazena o token JWT

  /**
   * Carregar token do localStorage ao iniciar o app (para manter login após refresh)
   * Como não há dependência, esse effect será executado no renderizar do componente,
   * ou seja, sempre que iniciarmos a aplicação ou recarregarmos a página.
   * Posteriormente, podemos implementar uma condição: se user e token for null, redirecionar para a página de login*/
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      // localStorage só guarda string, por isso damos parse para JSON antes de enviar o token nas requisições
      setUser(JSON.parse(savedUser));
    }
  }, []);

  /**
   * Função de login (será chamada após o usuário fazer login com sucesso).
   * Ela recebe os dados do usuário e o token via props, alterando o valor dos estados e
   * guardando no localStorage.
   */
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("user", JSON.stringify(userData)); // Salva no navegador
    localStorage.setItem("token", jwtToken);
  };

  // Função de logout (limpa tudo)
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  /**Exposição do Context para que outros componentes possam importá-lo e utilizar seus métodos.
   * no value nós oferecemos os métodos de login e logout e os estados user e token
   * children é uma feature padrão do react. Ele se refere a toda a aplicação que terá acesso a
   * esse context
   */
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
