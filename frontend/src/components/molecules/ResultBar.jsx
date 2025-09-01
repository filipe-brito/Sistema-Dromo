const ResultBar = ({ columns, data, actions, page, setPage }) => {
  // Criamos um componente ResultBar
  return (
    // Retorna o componente
    <div className="w-full">
      <div className="w-full">
        <table className="w-full border-collapse rounded overflow-hidden">
          {/* table é a tag HTML para criar e estruturar tabelas */}
          <thead>
            {/* É o cabeçalho da tabela onde podemos definir o título de cada coluna */}
            <tr>
              {/* (table row) cria uma linha inteira */}
              {columns.map((column) => (
                // (table header cell) representa uma célula do cabeçalho de uma tabela
                // Fica dentro de uma thead por padrão
                <th key={column.key} className="px-2 border-2 border-stone-500">
                  {column.label}
                </th>
              ))}
              {actions ? <th className="border-2 border-stone-500"></th> : null}
            </tr>
          </thead>
          <tbody>
            {/* Define o corpo da tabela. Onde os dados reais serão apresentados */}
            {data?.content?.map((item, index) => (
              <tr key={index} className="hover:bg-black/15">
                {columns.map((column) => (
                  // (table data cell) É uma célula de dados
                  <td
                    key={column.key}
                    className="px-2 border-2 border-stone-500"
                  >
                    {column.masked
                      ? column.formatter(item[column.key])
                      : item[column.key]}
                  </td>
                ))}
                {actions ? (
                  <td className="border-2 border-stone-500">
                    {actions(item.id)}
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex w-full justify-center mt-2 gap-4">
        {/* Botões que controlam a página exibida na paginação. Atualiza o estado que controla a página atual*/}
        <button
          className="px-3 py-1 bg-stone-300 rounded disabled:opacity-50"
          onClick={() => setPage(page - 1)}
          disabled={data.first} // Propriedade HTML que desabilita o botão se a expressão em seu valor retornar 'true'
        >
          Anterior
        </button>
        {/* span é o elemento inline para aplicar estilo à uma parte isolada de um texto */}
        <span className="text-sm text-neutral-600 flex items-center">
          Página {page + 1} de {data.totalPages}
        </span>
        <button
          className="px-3 py-1 bg-stone-300 rounded disabled:opacity-50"
          onClick={() => setPage(page + 1)}
          disabled={data.last}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default ResultBar;
