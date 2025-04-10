import { useState } from "react";

const ResultBar = ({ columns, data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  return (
    <div className="w-full">
      <div className="w-full">
        <table className="w-full border-collapse rounded overflow-hidden">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-2 border-2 border-stone-500">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-2 border-2 border-stone-500"
                  >
                    {item[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex w-full justify-center mt-2 gap-4">
        <button
          className="px-3 py-1 bg-stone-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage == 1}
        >
          Anterior
        </button>
        <span className="text-sm text-neutral-600">
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
