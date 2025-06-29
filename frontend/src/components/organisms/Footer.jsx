import { Link } from "react-router-dom";
import { SaveButton } from "../atoms/SaveButton";
import { DropdownButton } from "../molecules/DropdownButton";
import React from "react";
import { NewIcon } from "@/components/atoms/icons/NewIcon";

export const FormFooter = ({ style, setConfirmOpen, onTrigger, setStatus }) => {
  return (
    <div className={`w-full fixed bottom-2 ${style}`}>
      <footer className="relative mx-auto w-8/10 h-8">
        <SaveButton // Componente de botão customizável
          // onClick vai receber uma função assíncrona
          onClick={async () => {
            setStatus("idle"); // Garante que o conteúdo apresentado ao abrir o modal seja referente ao state idle
            // Verifica se a função trigger de um formulário foi passada via prop
            if (onTrigger) {
              const isValid = await onTrigger(); // Chama a função trigger e só continua o código quando tiver retorno
              if (isValid) setConfirmOpen(true); // Abre o modal se o retorno de trigger for true
            }
          }}
          style="absolute right-6"
        />
      </footer>
    </div>
  );
};

export const NewFooter = ({ footerStyle }) => {
  const dropdownOptions = [
    {
      name: "new-individual",
      value: (
        <Link
          to="/records/individual/create"
          className="block px-4 py-2 hover:bg-stone-100 rounded-md transition-colors whitespace-nowrap"
        >
          Nova Pessoa Física
        </Link>
      ),
    },
    {
      name: "new-company",
      value: (
        <Link
          to="/records/company/create"
          className="block px-4 py-2 hover:bg-stone-100 rounded-md transition-colors whitespace-nowrap"
        >
          Nova Empresa
        </Link>
      ),
    },
  ];
  return (
    <div className={`w-full fixed bottom-2 ${footerStyle}`}>
      <footer className="relative mx-auto w-8/10 h-10">
        <div className="absolute right-0">
          <DropdownButton
            buttonStyle={
              "group flex gap-2 bg-blue-800 text-neutral-50 px-3 py-1 rounded cursor-pointer"
            }
            buttonLabel={
              <React.Fragment>
                <NewIcon className="w-6 h-6" />
                <span className="transition-transform duration-300 group-hover:scale-110">
                  Nova Pessoa
                </span>
              </React.Fragment>
            }
            dropdownOptions={dropdownOptions}
            dropdownStyle={
              "bottom-full right-0 mb-2 bg-stone-300 text-neutral-800 shadow-lg rounded-md"
            }
          />
        </div>
      </footer>
    </div>
  );
};
