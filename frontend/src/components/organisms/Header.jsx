import React, { useContext, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserIcon } from "../atoms/icons/UserIcon";
import { LogoutIcon } from "../atoms/icons/LogoutIcon";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { DropdownButton } from "../molecules/DropdownButton";

const Header = ({ className = "" }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const recordsOptions = [
    {
      name: "people",
      value: (
        <Link
          to="/records/people"
          className="block px-4 py-2 hover:bg-stone-200 rounded-md"
        >
          Pessoas
        </Link>
      ),
      optionStyle: "hover:bg-stone-300/50",
    },
  ];
  const userOptions = [
    {
      name: "logout",
      value: (
        <button
          onClick={handleLogout}
          className="flex w-full px-2 py-2 cursor-pointer group hover:bg-stone-200 rounded-md"
        >
          <LogoutIcon className="text-neutral-600/70 group-hover:text-neutral-600/100" />
          Sair
        </button>
      ),
      optionStyle: "hover:bg-stone-300/50",
    },
  ];

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
            <li>
              <DropdownButton
                dropdownStyle="left-0 mt-2 w-48 bg-stone-300 text-neutral-800 shadow-lg rounded-md"
                dropdownOptions={recordsOptions}
                buttonStyle="text-xl font-semibold flex items-center gap-2 hover:text-neutral-50 cursor-pointer"
                buttonLabel="Cadastros"
              />
            </li>
          </ul>
        </nav>
        <DropdownButton
          buttonStyle="flex items-center group rounded-2xl bg-black/30 w-16 hover:outline-2 outline-white/40 cursor-pointer active:bg-black/5"
          buttonLabel={
            <React.Fragment>
              <UserIcon className="text-green-700 h-10 w-10" />
              <span className="text-white/20 group-hover:text-white/40">
                &#9660;
              </span>
            </React.Fragment>
          }
          dropdownStyle={
            "mt-2 right-0 w-30 bg-stone-300 text-neutral-800 shadow-lg rounded-md"
          }
          dropdownOptions={userOptions}
        />
      </div>
    </header>
  );
};

export default Header;
