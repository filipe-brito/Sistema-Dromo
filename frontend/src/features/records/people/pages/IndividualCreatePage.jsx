import React, { useState } from "react";
import { FormBuilder } from "@/components/organisms/FormBuilder";
import { Tab } from "@/components/templates/Tabs";
import { PersonIcon } from "@/components/atoms/icons/PersonIcon";
import { postIndividual } from "../../../../services/PeopleService";

const IndividualCreatePage = () => {

  const inputs = [
    {
      name: "name",
      type: "default",
      label: "Nome",
      required: "Nome é obrigatório",
    },
    {
      name: "cpf",
      type: "masked",
      label: "CPF",
      required: "CPF é obrigatório",
      mask: "000.000.000-00",
      placeholder: "Ex: 999.999.999-99",
    },
    {
      name: "gender",
      type: "select",
      label: "Sexo",
      required: "Sexo é obrigatório",
      options: [{ optionLabel: "masculino", value: 'M' }, { optionLabel: "feminina",value: 'F' }],
      inputStyle: "w-25",
    },
    {
      name: "marital_status",
      type: "select",
      label: "Estado civil",
      options: [{ optionLabel: "Solteiro", value: "solteiro" }, { optionLabel: "Casado", value: "casado" }],
      inputStyle: "w-25",
    },
    {
      name: "telefone",
      type: "masked",
      label: "Telefone",
      mask: "(00) 0000-0000",
      placeholder: "Ex: (99) 9999-9999",
    },
    {
      name: "cellphone",
      type: "masked",
      label: "Celular",
      mask: "(00) 0 0000-0000",
      placeholder: "Ex: (99) 9 9999-9999",
    },
    {
      name: "dob",
      type: "default",
      type2: "date",
      label: "Data de nascimento",
      required: "Data de nascimento é obrigatório",
      inputStyle: "w-30",
    },
    {
      name: "rg",
      type: "default",
      label: "RG",
      inputStyle: "w-30",
    },
    {
      name: "rntrc",
      type: "default",
      label: "RNTRC",
      inputStyle: "2-30",
    },
    {
      name: "email",
      type: "default",
      type2: "email",
      label: "Email",
      inputStyle: "w-50",
    },
  ];

  return (
    <React.Fragment>
      <div className="w-8/10 min-h-[92dvh] mx-auto px-4 py-2 bg-stone-800 border-x-2 border-stone-700">
        <h2 className="text-2xl font-bold text-neutral-50 mb-2">
          Editar Pessoa Física
        </h2>
        <Tab
          defaultTab={0}
          tabs={[
            {
              icon: <PersonIcon className="w-4 h-4" />,
              label: "Dados pessoais",
              content: (
                <React.Fragment>
                  <FormBuilder inputs={inputs} onSubmit={postIndividual} />
                  <button
                    form="save"
                    type="submit"
                    className="bg-blue-500 text-white px-3 py-1 rounded fixed right-30 bottom-5"
                  >
                    Salvar
                  </button>
                </React.Fragment>
              ),
            },
          ]}
        />
      </div>
    </React.Fragment>
  );
};

export default IndividualCreatePage;
