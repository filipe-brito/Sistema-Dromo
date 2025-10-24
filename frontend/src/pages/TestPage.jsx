import { Tab2 } from "../components/templates/Tabs";
import { useState } from "react";
import { PersonIcon } from "../components/atoms/icons/PersonIcon";
import { useForm, Controller } from "react-hook-form";
import { CheckboxInput } from "../components/atoms/Input";

const TestPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const { register, control, handleSubmit } = useForm();
  const testeFunction = (data) => {
    console.log(data);
  };
  return (
    <div className="font-[Rajdhani] h-screen w-screen bg-stone-900">
      <div className="w-8/10">
        <Tab2
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={[
            {
              icon: <PersonIcon className="w-16 h-16" />, // Ícone da tab
              label: (
                <p>
                  Dados
                  <br />
                  pessoais
                </p>
              ), // Descrição da tab
              // Conteúdo principal da tab
              content: (
                <div className="flex flex-col gap-2 bg-gray-300 p-4 rounded">
                  <form id="submit" onSubmit={handleSubmit(testeFunction)}>
                    <div className="flex flex-col gap-2 bg-gray-300 p-4">
                      <Controller
                        defaultValue={false}
                        name="checkbox1"
                        control={control}
                        render={({ field }) => (
                          <CheckboxInput
                            {...field}
                            color="text-green-800"
                            size="3"
                          />
                        )}
                      />
                    </div>
                    <input name="teste1" {...register("teste1")} />
                    <input name="teste2" {...register("teste2")} />
                    <input
                      type="checkbox"
                      className="border-2 border-green-800"
                      {...register("teste3")}
                    />
                  </form>
                  <button form="submit" className="bg-red-500">
                    teste
                  </button>
                  <input
                    type="text"
                    label="Dados pessoais"
                    className="bg-gray-400 rounded border-2 border-gray-700 px-2"
                  />
                  <input
                    type="text"
                    label="Dados do motorista"
                    className="bg-gray-400 rounded border-2 border-gray-700 px-2"
                  />
                  <input
                    type="text"
                    label="Dados do Agregado"
                    className="bg-gray-400 rounded border-2 border-gray-700 px-2"
                  />
                </div>
              ),
            },
            {
              icon: <PersonIcon className="w-16 h-16" />, // Ícone da tab
              label: "Dados pessoais", // Descrição da tab
              // Conteúdo principal da tab
              content: (
                <div>
                  <input
                    type="text"
                    label="Dados pessoais"
                    className="bg-gray-400 rounded border-2 border-gray-700 px-2"
                  />
                  <input
                    type="text"
                    label="Dados do motorista"
                    className="bg-gray-400 rounded border-2 border-gray-700 px-2"
                  />
                  <input
                    type="text"
                    label="Dados do Agregado"
                    className="bg-gray-400 rounded border-2 border-gray-700 px-2"
                  />
                </div>
              ),
            },
            {
              icon: <PersonIcon className="w-16 h-16" />, // Ícone da tab
              label: "Dados pessoais", // Descrição da tab
              // Conteúdo principal da tab
              content: (
                <div className="flex flex-col gap-2 bg-gray-300 p-4">
                  <CheckboxInput color="text-green-800" size="4" />
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default TestPage;
