import FilterBar from "../molecules/FilterBar";
import ResultBar from "../molecules/ResultBar";
import { LoadingIcon } from "../icons/LoadingIcon";
import React from "react";

export const SearchSection = ({ filters, columns, data, loading }) => {
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
