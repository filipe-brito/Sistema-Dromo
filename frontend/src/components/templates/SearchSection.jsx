import FilterBar from "../molecules/FilterBar";
import ResultBar from "../molecules/ResultBar";
import { LoadingIcon } from "../icons/LoadingIcon";
import React, { useState } from "react";

export const SearchSection = ({
  filters,
  columns,
  data,
  loading,
  onSearch,
}) => {
  const [filterValues, setFilterValues] = useState({});

  return (
    <React.Fragment>
      <div className="flex p-2 rounded shadow-sm bg-stone-100">
        <FilterBar
          filters={filters}
          values={filterValues}
          setValues={setFilterValues}
          onSearch={() => onSearch(filterValues)}
        />
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
