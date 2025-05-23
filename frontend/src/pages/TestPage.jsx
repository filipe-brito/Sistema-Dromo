import React, { useState } from "react";
import { ConfirmModal } from "../components/molecules/ConfirmModal";
import { DoneIcon } from "../components/atoms/icons/DoneIcon";
import { LoadingIcon } from "../components/atoms/icons/LoadingIcon";

const TestPage = () => {
  return (
    <React.Fragment>
      <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
        <div className="bg-white flex flex-col items-center p-6 rounded gap-y-4">
          <DoneIcon fill="green" className={"w-15 h-15 text-green-600"} />
          <p>Cadastro realizado!</p>
          <button
            onClick={() => setConfirmOpen(false)}
            className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-500"
          >
            Fechar
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TestPage;
