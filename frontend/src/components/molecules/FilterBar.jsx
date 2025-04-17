import { SearchButton } from "../atoms/SearchButton";

const FilterBar = ({ filters, values, setValues, onSearch }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    onSearch(values); // envia os filtros para o componente pai
  };

  return (
    <div className="flex w-full">
      <div className="flex w-9/10 gap-1">
        {filters.map((filter) => (
          <input
            key={filter.name}
            type={filter.type}
            name={filter.name}
            placeholder={filter.placeholder}
            value={values[filter.name] || ""}
            onChange={handleChange}
            className="h-6 px-1 bg-stone-200 rounded border-2 border-stone-400 text-xs"
          />
        ))}
      </div>
      <div className="relative w-1/10 h-6">
        <SearchButton onClick={handleSearch} />
      </div>
    </div>
  );
};

export default FilterBar;
