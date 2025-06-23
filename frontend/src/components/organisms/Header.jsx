import { useContext, useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserIcon } from "../atoms/icons/UserIcon";
import { LogoutIcon } from "../atoms/icons/LogoutIcon";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = ({ className = "" }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDropDown, setUserDropDown] = useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  // Hook do React Router que "escuta" mudanças de rota (URL).
  const location = useLocation();
  /**
   * useRef: hook do React que guarda um elemento DOM.
   * Inicialmente, seu valor vai ser nulo, e será associado a um elemento real da DOM apenas depois do primeiro render.
   */
  const dropdownRef = useRef(null);

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
       *  que no caso, é um elemento "li".
       * "!dropdownRef.current.contains(event.target)" verifica se o elemento clicado (event.target) está "contido"
       * no elemento	guardado no useRef.
       * O próprio método ".contains" é uma condicional. Ele verifica: "Esse useRef contém esse elemento do argumento?"
       */
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Caso as condicionais acima retornem true, fechamos o dropdown
        setDropdownOpen(false);
      }
    }
    /**
     * Verifica se o dropdown está aberto para ativar ou desativar os listeners.
     * document chama todo o conteúdo da DOM. O método addEventListener ativa o listener (monitorador de eventos)
     * com base nos argumentos. O primeiro argumento é o tipo de evento. No caso,
     * "mousedown" se refere a qualquer clique com o mouse que ocorra na DOM (document). O segundo argumento é a
     * função callback que deverá ser executada nesse evento.
     */
    if (dropdownOpen) {
      // Caso true, ativa o listener
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      /**
       * Caso false, remove o evento caso ele tenha sido criado anteriormente, pois,
       * se o dropdown está fechado, não há necessidade de deixar um listener ativo */
      document.removeEventListener("mousedown", handleClickOutside);
    }

    /**
     * O return em um effect só é executado quando o componente é desmontado
     * e antes do effect ser reexecutado pelas dependências.
     * Isso é necessário no caso dos listeners, pois mesmo depois que a página
     * atualiza e o componente é desmontado, o listener continua ativo. Isso pode
     * consumir recursos. Então, resolvemos isso removendo o listener quando o componente
     * é desmontado. Esse procedimento é chama "cleanup"
     */
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      className={`bg-stone-800 border-b border-yellow-600 text-neutral-300 ${className}`}
    >
      <div className="container mx-auto py-1 px-6 min-h-[8dvh] flex items-center">
        {/* Logo à esquerda */}
        <Link
          to="/home"
          className="z-10 absolute top-1/2 transform -translate-y-1/2 text-3xl font-bold"
        >
          Dromo
        </Link>

        {/* Menu Centralizado */}
        <nav className="z-0 w-full flex justify-center">
          <ul className="flex space-x-6">
            {/* Item com Dropdown */}
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-xl font-semibold flex items-center gap-2 hover:text-neutral-50 cursor-pointer"
              >
                Cadastros
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <ul className="absolute left-0 mt-2 w-48 bg-stone-300 text-neutral-800 shadow-lg rounded-md">
                  <li>
                    <Link
                      to="/records/people"
                      className="block px-4 py-2 hover:bg-stone-200 rounded-md"
                    >
                      Pessoas
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
        <div className="relative">
          <button
            onClick={() => setUserDropDown(!userDropDown)}
            className="flex items-center group rounded-2xl bg-black/30 w-16 hover:outline-2 outline-white/40 cursor-pointer active:bg-black/5"
          >
            <UserIcon className="text-green-700 h-10 w-10" />
            <span className="text-white/20 group-hover:text-white/40">
              &#9660;
            </span>
          </button>
          {userDropDown && (
            <ul className="absolute mt-2 right-0 w-30 bg-stone-300 text-neutral-800 shadow-lg rounded-md">
              <li className="flex items-center group hover:bg-stone-200 rounded-md">
                <button
                  onClick={handleLogout}
                  className="flex w-full px-2 py-2 cursor-pointer"
                >
                  <LogoutIcon className="text-neutral-600/70 group-hover:text-neutral-600/100" />
                  Sair
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
