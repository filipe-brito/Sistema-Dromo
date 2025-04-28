import FilterBar from "../molecules/FilterBar";
import ResultBar from "../molecules/ResultBar";
import { LoadingIcon } from "../icons/LoadingIcon";
import React, { useState } from "react";

export const SearchSection = ({ // Criamos o componente SearchSection e usamos exportação nomeada
  // Seguem props
  filters, // Array de objects com as informações dos campos da barra de filtro
  columns, // Array de objects com as informações das colunas da barra de resultados
  data, // Dados que serão apresentados na barra de resultados
  loading, // Estado para exibir o ícone de loading enquanto os dados carregam
  onSearch, // Ação do botão de pesquisar da barra de filtros
}) => { // Arrow function que esse componente irá executar
  const [filterValues, setFilterValues] = useState({}); // Estado que controla os valores dos campos de filtros que serão digitados

  return (
    <React.Fragment> {/* Em React, todo componente precisa retornar um único elemento pai. 
      React.Fragment é uma forma de agrupar múltiplos elementos sem adicionar uma div extra no DOM. */}
      <div className="flex p-2 rounded shadow-sm bg-stone-100">
        <FilterBar
          filters={filters} // Passamos a prop recebida com pai para FilterBar
          values={filterValues} // passamos a variável do estado para o FilterBar exibir
          setValues={setFilterValues} // passamos a função do estado para FilterBar alterar

          // OnSearch recebido do pai deverá ser uma função de consulta ao backend e deverá aceitar argumentos,
          // pois os argumentos serão parâmetros de busca no banco de dados
          // O componente atual recebe uma função do pai e passará para seu filho, então usamos um função anônima e passamos o argumento necessário
          onSearch={() => onSearch(filterValues)}
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
