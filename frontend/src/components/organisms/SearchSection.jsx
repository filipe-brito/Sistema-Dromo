import FilterBar from "../molecules/FilterBar";
import ResultBar from "../molecules/ResultBar";
import { LoadingIcon } from "../atoms/icons/LoadingIcon";
import React, { useState } from "react";

export const SearchSection = ({
  // Criamos o componente SearchSection e usamos exportação nomeada
  // Seguem props
  filters, // Array de objects com as informações dos campos da barra de filtro
  columns, // Array de objects com as informações das colunas da barra de resultados
  data, // Dados que serão apresentados na barra de resultados
  loading, // Estado para exibir o ícone de loading enquanto os dados carregam
  onSearch, // Ação do botão de pesquisar da barra de filtros
}) => {
  // Arrow function que esse componente irá executar

  return (
    <React.Fragment>
      {" "}
      {/* Em React, todo componente precisa retornar um único elemento pai. 
      React.Fragment é uma forma de agrupar múltiplos elementos sem adicionar uma div extra no DOM. */}
      <div className="flex p-2 rounded shadow-sm bg-stone-100">
        <FilterBar
          filters={filters} // Passamos a prop recebida com pai para FilterBar
          onSearch={onSearch} // onSearch recebido do pai que será passado como prop ao FilterBar
        />
      </div>
      <div className="flex p-2 mt-1 rounded border-stone-700 shadow-sm bg-stone-100">
        {loading ? ( // Lógica do operador ternário verifica se o valor de loading é 'true' ou 'false'
          // Caso 'true', exibe o ícone de loading
          <div className="flex w-full justify-center">
            <LoadingIcon />
            <p>Carregando...</p>
          </div>
        ) : (
          // caso 'false', carrega a barra de resultados
          <ResultBar columns={columns} data={data} /> // Passamos as colunas e os dados que serão exibidos nessas colunas
        )}
      </div>
    </React.Fragment>
  );
};
