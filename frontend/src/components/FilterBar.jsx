const FilterBar = ({ filters, onSearch }) => {
    return (
      <div className="bg-stone-100 p-4 rounded-lg shadow-md flex gap-4">
        {filters.map((filter) => (
          <input
            key={filter.name}
            type={filter.type || "text"}
            placeholder={filter.placeholder}
            className="border-2 border-neutral-900/50 px-3 py-2 rounded-md text-neutral-800"
            onChange={(e) => onSearch(filter.name, e.target.value)}
          />
        ))}
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Buscar
        </button>
      </div>
    );
  };
  
  export default FilterBar;
  