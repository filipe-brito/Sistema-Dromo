import FilterBar from "../molecules/FilterBar";
import ResultBar from "../molecules/ResultBar";
import { LoadingIcon } from "../icons/LoadingIcon";
import React, { useEffect, useState } from "react";

export const SearchSection = ({ filters, columns, fetch }) => {
  const [data, setData] = useState([]); // Estado para armazenar os dados de pessoas
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento de pessoas

  useEffect(() => {
    // Função assíncrona para buscar os dados
    const loadData = async () => {
      try {
        const data = await fetch(); // Chama a função que busca dados da API
        setData(data); // Atualiza o estado com os dados recebidos
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false); // Indica que o carregamento terminou (sucesso ou erro)
      }
    };

    loadData();
  }, []); // Array de dependências vazio: executa só uma vez quando o componente é montado

  return (
    <React.Fragment>
      <div className="flex p-2 rounded shadow-sm bg-stone-100">
        <FilterBar filters={filters} />
      </div>
      <div className="flex p-2 mt-1 rounded border-stone-700 shadow-sm bg-stone-100">
        {loading ? (
          <div className="flex w-full justify-center">
            <LoadingIcon />
            <p>Carregando...</p>
          </div>
        ) : (
          <ResultBar columns={columns} data={data} />
        )}
      </div>
    </React.Fragment>
  );
};
