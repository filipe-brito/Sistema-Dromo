import { Link } from "react-router-dom";
import { NewIcon } from "./icons/NewIcon";
import React, { useState } from "react";

export const NewButton = ({ style }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`inline-block ${style}`}>
      {/* Botão principal */}
      <button
        onClick={() => setOpen(!open)}
        className="group flex gap-2 bg-blue-800 text-neutral-50 px-3 py-1 rounded cursor-pointer"
      >
        <NewIcon className="w-6 h-6" />
        <span className="transition-transform duration-300 group-hover:scale-110">
          Nova Pessoa
        </span>
      </button>

      {/* Dropup */}
      {open && (
        <div className="absolute bottom-full mb-2 w-60 flex flex-col bg-stone-300 text-neutral-800 shadow-lg rounded-md overflow-hidden">
          <Link
            to="/records/individual/create"
            className="px-4 py-2 hover:bg-stone-100 transition-colors"
          >
            Nova Pessoa Física
          </Link>
          <Link
            to="/records/company/create"
            className="px-4 py-2 hover:bg-stone-100 transition-colors"
          >
            Nova Empresa
          </Link>
        </div>
      )}
    </div>
  );
};
