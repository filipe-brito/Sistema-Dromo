import { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ className = "" }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
      </div>
    </header>
  );
};

export default Header;
