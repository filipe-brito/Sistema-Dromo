import { LoadingIcon } from "../atoms/icons/LoadingIcon";
import { DoneIcon } from "../atoms/icons/DoneIcon";
import React, { useEffect } from "react";
import { ErrorIcon } from "../atoms/icons/ErrorIcon";

export const ConfirmModal = ({
  status, // Modal usa o status como critério para definir qual componente o content deve receber
  setConfirmOpen, // Modal usa para se fechar após status success ou error
  messages, // Mensagens para exibir em cada status
  onConfirm, // Ação do botão "sim" no status idle
}) => {
  useEffect(() => {
    if (status === "success" || status === "error") {
      const timeout = setTimeout(() => setConfirmOpen(false), 5000);
      return () => clearTimeout(timeout);
    }
  }, [status, setConfirmOpen]);

  let content; // Variável mutável que recebe determinado componente de acordo com o status

  // Vamos definir qual componente content receberá de acordo com o status recebido nas props usando o switch/case
  switch (status) {
    // idle apresenta o componente padrão apresentado ao abrir o modal
    case "idle":
      content = (
        <React.Fragment>
          <p className="mb-4 text-2xl">{messages.idle}</p>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setConfirmOpen(false)} // Botão de cancelar. Fecha o modal
              className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded cursor-pointer"
            >
              Cancelar
            </button>
            <button
              // Botão de confirmação da ação
              form="save" // Caso o modal seja criado em um hook form, vinculamos esse botão ao submit através dessa propriedade
              onClick={onConfirm} // Se não estiver em um formulário, podemos passar a ação para o onClick
              className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-500"
            >
              Sim
            </button>
          </div>
        </React.Fragment>
      );
      break;

    // loading apresenta o componente de carregamento enquanto o submit ou o onClick é executado
    case "loading":
      content = (
        <React.Fragment>
          <p className="text-2xl">{messages.loading}</p>
          <LoadingIcon className="w-12 h-12" />
        </React.Fragment>
      );
      break;

    // seccess apresenta o componente indicando que a operação foi concluída
    case "success":
      content = (
        <React.Fragment>
          <DoneIcon className={"w-15 h-15 text-green-600"} />
          <p className="text-2xl">{messages.success}</p>
          <button
            onClick={() => setConfirmOpen(false)} // Fecha o modal ao clicar nesse botão
            className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-500"
          >
            Fechar
          </button>
        </React.Fragment>
      );
      break;

    // Componente que apresenta mensagens de erro no processo
    case "error":
      content = (
        <React.Fragment>
          <ErrorIcon className="w-15 h-15 text-red-500" />
          <p className="text-2xl">{messages.error}</p>
          <button
            onClick={() => setConfirmOpen(false)}
            className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-500"
          >
            Fechar
          </button>
        </React.Fragment>
      );
      break;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-white flex flex-col items-center p-6 rounded gap-y-4 min-w-100">
        {content}
      </div>
    </div>
  );
};
