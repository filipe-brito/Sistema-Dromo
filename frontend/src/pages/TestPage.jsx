import React from "react";
import { Tab } from "../components/templates/Tabs";
import { PersonIcon } from "../components/atoms/icons/PersonIcon";

const TestPage = () => {
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
              label: "Dados principais",
              content: <section></section>,
            },
          ]}
        />
      </div>
    </React.Fragment>
  );
};

export default TestPage;
