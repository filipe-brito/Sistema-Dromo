import { useState } from "react";

const ResultBar = ({ columns, data }) => {
  // Criamos um componente ResultBar
  const [currentPage, setCurrentPage] = useState(1); // Estado que controla a paginação dos dados que serão apresentados.
  const itemsPerPage = 20; // Variável que guarda a quantidade máxima de itens que devem ser exibidos em uma única página

  const startIndex = (currentPage - 1) * itemsPerPage; // Variável que guarda o index do primeiro item a ser exibido na tabela daquela página
  const endIndex = startIndex + itemsPerPage; // Variável que guarda o index do último item a ser exdibido na tabela daquela página
  // O método .slice() é nativo para ser usado em arrays
  // Passamos os parâmetros (posições inicial e final) e o método extrai do array somente os itens que estão no intervalo dos parâmetros
  // O parâmetro final é exclusivo
  const currentItems = data.slice(startIndex, endIndex);

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
            </tr>
          </thead>
          <tbody>
            {/* Define o corpo da tabela. Onde os dados reais serão apresentados */}
            {currentItems.map((item, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  // (table data cell) É uma célula de dados
                  <td
                    key={column.key}
                    className="px-2 border-2 border-stone-500"
                  >
                    {column.masked ? (column.formatter(item[column.key])) : (item[column.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex w-full justify-center mt-2 gap-4">
        {/* Botões que controlam a página exibida na paginação. Atualiza o estado que controla a página atual*/}
        <button
          className="px-3 py-1 bg-stone-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage == 1} // Propriedade HTML que desabilita o botão se a expressão em seu valor retornar 'true'
        >
          Anterior
        </button>
        {/* span é o elemento inline para aplicar estilo à uma parte isolada de um texto */}
        <span className="text-sm text-neutral-600 flex items-center">
          Página {currentPage} de {Math.ceil(data.length / itemsPerPage)}
        </span>
        <button
          className="px-3 py-1 bg-stone-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage >= Math.ceil(data.length / itemsPerPage)}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default ResultBar;
