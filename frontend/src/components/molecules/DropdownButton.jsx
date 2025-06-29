import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const DropdownButton = ({
  buttonStyle,
  buttonLabel,
  dropdownStyle,
  dropdownOptions,
}) => {
  // Estado para controlar o dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  /**
   * useRef: hook do React que guarda um elemento DOM.
   * Inicialmente, seu valor vai ser nulo, e será associado a um elemento real da DOM apenas depois do primeiro render.
   */
  const dropdownRef = useRef(null);
  // Hook do React Router que "escuta" mudanças de rota (URL).
  const location = useLocation();

  // Effect para fechar o dropdown quando location mudar. Passamos o location com dependência
  useEffect(() => {
    setDropdownOpen(false);
  }, [location]);

  /**
   * Effect para ser executado quando os cliques serão feitos fora do dropdown.
   * Esse effect recebe dropdownOpen como dependência, ou seja, sempre que dropdownOpen mudar, esse effect será executado.
   */
  useEffect(() => {
    // Função que recebe um evento qualquer como parâmetro - geralmente um clique
    function handleClickOutside(event) {
      /**
       * useRef retorna um object inteiro com várias propriedades.
       * O .current é uma dessas propriedades que retorna especificamente qual é esse elemento na DOM real,
       *  que no caso, deverá ser um elemento "ul".
       * "!dropdownRef.current.contains(event.target)" verifica se o elemento clicado (event.target) está "contido"
       * no elemento guardado no useRef.
       * O próprio método ".contains" é uma condicional. Ele verifica: "Esse useRef contém esse elemento do argumento?"
       */
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Caso as condicionais acima retornem true, fechamos o dropdown
        setDropdownOpen(false);
      }
    }
    /**
     * Verifica se o dropdown está aberto para ativar ou desativar os listeners.
     * "document" chama todo o conteúdo da DOM. O método addEventListener ativa o listener (monitorador de eventos)
     * com base nos argumentos. O primeiro argumento é o tipo de evento. No caso,
     * "mousedown" se refere a qualquer clique com o mouse que ocorra na DOM (document). O segundo argumento é a
     * função callback que deverá ser executada nesse evento.
     */
    if (dropdownOpen) {
      // Caso true, ativa o listener
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      /**
       * Caso false, remove o listener caso ele tenha sido criado anteriormente, pois,
       * se o dropdown está fechado, não há necessidade de deixar um listener ativo */
      document.removeEventListener("mousedown", handleClickOutside);
    }

    /**
     * O return em um effect só é executado quando o componente é desmontado
     * e antes do effect ser reexecutado pelas dependências.
     * Isso é necessário no caso dos listeners, pois mesmo depois que a página
     * atualiza e o componente é desmontado, o listener continua ativo. Isso pode
     * consumir recursos. Então, resolvemos isso removendo o listener quando o componente
     * é desmontado. Esse procedimento é chamado de "cleanup"
     */
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={buttonStyle}
      >
        {buttonLabel}
      </button>
      {dropdownOpen && (
        // "dropdownStyle" deverá ter o estilo geral do dropdown, como a posição dele em relação ao botão
        <ul className={`absolute ${dropdownStyle}`}>
          {/** Essa prop deverá conter as opções em "li" já estilizadas.*/}
          {dropdownOptions.map((item) => (
            <li key={item.name}>{item.value}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
