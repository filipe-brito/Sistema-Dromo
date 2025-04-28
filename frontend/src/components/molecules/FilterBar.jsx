import { SearchButton } from "../atoms/SearchButton";

const FilterBar = ({ filters, values, setValues, onSearch }) => { // Criamos o componente FilterBar (barra de filtros para pasquisa)
  // Variável que recebe uma função que vai criar um objeto do tipo 'object'. 
  // Como será chamado no onChande de um input, o argumento será o 'evento' do usuário digitando nos campos
  const handleChange = (e) => {
    // A variável abaixo é uma desestruturação de um objeto 'object'
    // 'e' é o evento (usuário digita) e target é o próprio input que foi digitado
    // O input digitado terá duas propriedade HTML: name e value
    // Essa desestruturação criará duas variáveis honônimas às propriedades HTML e cada uma
    // recebe o valor armazenado nessas propriedades. No caso,
    // 'name' receberá o nome do campo e 'value' receberá o valor do campo (o que o usuário digitou)
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
