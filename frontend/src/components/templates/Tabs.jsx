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
              type="button" // Necessário declarar para não submeter formulários indevidamente
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
        {/* Mapeamos todos os conteúdos */}
        {tabs.map((tab, index) => (
          <div
            key={index}
            // 💡 A mágica do Tailwind:
            // Aplica a classe 'block' se for a aba ativa
            // Aplica a classe 'hidden' se NÃO for a aba ativa
            className={index === activeTab ? "block" : "hidden"}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Tab2 = ({ tabs, activeTab, setActiveTab }) => {
  // Cria o componente e faz uma exportação nomeada.

  return (
    // Componente que será renderizado
    <div className="relative w-full">
      {/* 🔹 Aba sobreposta */}
      <div className="flex justify-center gap-1 relative mx-2">
        <div className="relative h-15 w-full">
          <div className="absolute w-full">
            <div className="h-30 flex items-center justify-center">
              {tabs.map(
                (
                  tab,
                  index // map é um método js para percorrer listas. tab é o item analisado e index é a posição do item no array
                ) => (
                  <button // Criamos um botão para selecionar a aba
                    type="button"
                    key={index} // key é uma propriedade nativa do React para rastrear elementos renderizados dinamicamente como no .map
                    onClick={() => setActiveTab(index)} // onClick é a ação a ser executada ao clicar no botão. No caso, altera o estado de activeTab para alternar a aba ativa
                    className={`p-2 border-2 rounded-full h-30 w-30 border-green-700 bg-stone-800 font-semibold cursor-pointer flex flex-col items-center justify-center transform duration-300 ease-in-out ${
                      index === activeTab // Enquando varre o array, verificamos se o index iterado é igual ao valor da aba ativa
                        ? "scale-100 text-neutral-100" // Caso 'true', aplicamos um estilo no botão
                        : "scale-60 text-neutral-100/50 hover:text-neutral-100" // Caso 'false', aplicamos outro estilo nesse botão
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      {/* 🔹 Conteúdo com borda total */}
      <div className="p-1 border-2 border-green-700 rounded-md">
        {/* Mapeamos todos os conteúdos */}
        {tabs.map((tab, index) => (
          <div
            key={index}
            // 💡 A mágica do Tailwind:
            // Aplica a classe 'block' se for a aba ativa
            // Aplica a classe 'hidden' se NÃO for a aba ativa
            className={index === activeTab ? "block" : "hidden"}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};
