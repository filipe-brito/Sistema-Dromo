import { LoadingIcon } from "../atoms/icons/LoadingIcon";
import React from "react";

export const ConfirmModal = ({ setStatus, status, setConfirmOpen }) => {
  let content;

  switch (status) {
    case "idle":
      content = (
        <React.Fragment>
          <p className="mb-4 text-lg">Deseja realmente enviar os dados?</p>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setConfirmOpen(false)}
              className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded cursor-pointer"
            >
              Cancelar
            </button>
            <button
              form="save"
              className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-500"
            >
              Sim
            </button>
          </div>
        </React.Fragment>
      );
      break;

    case "loading":
      content = (
        <React.Fragment>
          <p>Carregando...</p>
          <LoadingIcon />
        </React.Fragment>
      );
      break;

    case "success":
      content = <p>Cadastro realizado!</p>;
      break;

    case "error":
      content = <p>Erro!</p>;
      break;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-white p-6 rounded shadow-md">{content}</div>
    </div>
  );
};
