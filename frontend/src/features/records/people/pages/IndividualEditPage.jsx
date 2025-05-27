import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getIndividualById, updateIndividual } from "@/services/PeopleService";
import React, { useState } from "react";
import { FormBuilder } from "@/components/organisms/FormBuilder";
import { Tab } from "@/components/templates/Tabs";
import { PersonIcon } from "@/components/atoms/icons/PersonIcon";
import { FormFooter } from "@/components/organisms/Footer";
import { ConfirmModal } from "@/components/molecules/ConfirmModal";
import { LoadingIcon } from "../../../../components/atoms/icons/LoadingIcon";

const IndividualEditPage = () => {
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
      options: [
        { optionLabel: "masculino", value: "M" },
        { optionLabel: "feminina", value: "F" },
      ],
      inputStyle: "w-25",
    },
    {
      name: "marital_status",
      type: "select",
      label: "Estado civil",
      options: [
        { optionLabel: "Solteiro", value: "solteiro" },
        { optionLabel: "Casado", value: "casado" },
      ],
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
      inputStyle: "w-30",
    },
    {
      name: "email",
      type: "default",
      type2: "email",
      label: "Email",
      inputStyle: "w-50",
    },
  ];

  // Estado que controla as mudanças de trigger recebido pelo FormBuilder
  const [triggerValidation, setTriggerValidation] = useState(null);

  const { id } = useParams();

  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [individualData, setIndividualData] = useState(null); // Estado novo para armazenar dados

  useEffect(() => {
    const fetchData = async () => {
      const data = await getIndividualById(id);
      // Substitui todos os valores null por ""
      const normalizedData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value ?? ""])
      );
      setIndividualData(normalizedData); // Salva os dados no estado
    };
    fetchData();
  }, [id]);

  const handleSubmitIndividual = async (individualData) => {
    setStatus("loading");
    try {
      await updateIndividual(id, individualData);
      setStatus("success");
    } catch (error) {
      console.error("Erro ao atualizar: ", error);
      setStatus("error");
    }
  };

  return (
    <React.Fragment>
      <div className="w-8/10 min-h-[92dvh] mx-auto px-4 py-2 bg-stone-800 border-x-2 border-stone-700">
        <h2 className="text-2xl font-bold text-neutral-50 mb-2">
          Editar Pessoa Física
        </h2>
        {isConfirmOpen && (
          <ConfirmModal
            status={status}
            setStatus={setStatus}
            setConfirmOpen={setConfirmOpen}
            messages={{
              idle: "Deseja realmente enviar os dados?",
              loading: "Carregando...",
              success: "Cadastro atualizado!",
              error: "Erro!",
            }}
          />
        )}
        <Tab
          defaultTab={0}
          tabs={[
            {
              icon: <PersonIcon className="w-4 h-4" />,
              label: "Dados pessoais",
              content: (
                <React.Fragment>
                  {individualData ? (
                    <FormBuilder
                      inputs={inputs}
                      onSubmit={handleSubmitIndividual}
                      onTriggerReady={(trigger) =>
                        setTriggerValidation(() => trigger)
                      }
                      data={individualData}
                    />
                  ) : (
                    <div className="flex flex-col items-center p-2 rounded shadow-sm bg-stone-100">
                      <LoadingIcon />
                      <p>Carregando dados...</p>
                    </div>
                  )}
                </React.Fragment>
              ),
            },
          ]}
        />
      </div>
      <FormFooter
        setConfirmOpen={setConfirmOpen}
        onTrigger={triggerValidation}
        setStatus={setStatus}
      />
    </React.Fragment>
  );
};

export default IndividualEditPage;
