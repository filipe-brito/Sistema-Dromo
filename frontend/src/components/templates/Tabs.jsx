import { useState } from "react";

export const Tab = ({ tabs, activeTab, setActiveTab }) => {
  // Cria o componente e faz uma exportação nomeada.

  return (
    // Componente que será renderizado
    <div className="relative w-full">
      {/* 🔹 Aba sobreposta */}
      <div className="flex gap-1 relative mx-2">
        {tabs.map(
          (
            tab,
            index // map é um método js para percorrer listas. tab é o item analisado e index é a posição do item no array
          ) => (
            //Dentro da arrow function, está a função que deverá ser executada a cada iteração
            <button // Criamos um botão para selecionar a aba
              key={index} // key é uma propriedade nativa do React para rastrear elementos renderizados dinamicamente como no .map
              onClick={() => setActiveTab(index)} // onClick é a ação a ser executada ao clicar no botão. No caso, altera o estado de activeTab para alternar a aba ativa
              className={`px-1 rounded-t-md font-semibold border cursor-pointer flex gap-2 items-center ${
                index === activeTab // Enquando varre o array, verificamos se o index iterado é igual ao valor da aba ativa
                  ? "text-neutral-100 bg-green-700 border-transparent" // Caso 'true', aplicamos um estilo no botão
                  : "text-neutral-100/50 bg-transparent border-green-400/60 rounded transition-colors duration-300 hover:text-neutral-100" // Caso 'false', aplicamos outro estilo nesse botão
              }`}
            >
              {tab.icon}{" "}
              {/* Exibimos no botão o icone recebido em um dos objects da prop tabs */}
              {tab.label}{" "}
              {/* Exibimos no botão o rótulo recebido em um dos objects da prop tabs */}
            </button>
          )
        )}
      </div>
      {/* 🔹 Conteúdo com borda total */}
      <div className="p-1 border-2 border-green-700 rounded-md">
        {tabs[activeTab].content}{" "}
        {/* Exibimos o object content da prop tabs. Como tabs é um array, selecionamos o elemento na posição do estado activeTab */}
      </div>
    </div>
  );
};
