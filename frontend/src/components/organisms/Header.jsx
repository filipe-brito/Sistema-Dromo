import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserIcon } from "../atoms/icons/UserIcon";
import { LogoutIcon } from "../atoms/icons/LogoutIcon";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = ({ className = "" }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDropDown, setUserDropDown] = useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

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
            <li className="relative">
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
