import { SearchButton } from "../atoms/SearchButton";

const FilterBar = ({ filters }) => {
  return (
    <div className="flex w-full">
      <div className="flex w-9/10 gap-1">
        {filters.map((filter) => (
          <input
            key={filter.name}
            type={filter.type}
            placeholder={filter.placeholder}
            className="h-6 px-1 bg-stone-200 rounded border-2 border-stone-400 text-xs"
          />
        ))}
      </div>
      <div className="relative w-1/10 h-6">
        <SearchButton />
      </div>
    </div>
  );
};

export default FilterBar;
