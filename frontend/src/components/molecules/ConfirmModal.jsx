import { LoadingIcon } from "../atoms/icons/LoadingIcon";
import { DoneIcon } from "../atoms/icons/DoneIcon";
import React from "react";

export const ConfirmModal = ({ status, setConfirmOpen, messages }) => {
  let content;

  switch (status) {
    case "idle":
      content = (
        <React.Fragment>
          <p className="mb-4 text-2xl">{messages.idle}</p>
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
          <p className="text-2xl">{messages.loading}</p>
          <LoadingIcon className="w-12 h-12" />
        </React.Fragment>
      );
      break;

    case "success":
      content = (
        <React.Fragment>
          <DoneIcon fill="green" className={"w-15 h-15 text-green-600"} />
          <p className="text-2xl">{messages.success}</p>
          <button
            onClick={() => setConfirmOpen(false)}
            className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-500"
          >
            Fechar
          </button>
        </React.Fragment>
      );
      setTimeout(() => setConfirmOpen(false), 5000);
      break;

    case "error":
      content = (
        <React.Fragment>
          <p className="text-2xl">{messages.error}</p>
          <button
            onClick={() => setConfirmOpen(false)}
            className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-500"
          >
            Fechar
          </button>
        </React.Fragment>
      );
      setTimeout(() => setConfirmOpen(false), 5000);
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
