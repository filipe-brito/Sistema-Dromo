import { SearchButton } from "../atoms/SearchButton";
import React, { useState } from "react";

const FilterBar = ({ filters, onSearch }) => {
  const [filterValues, setFilterValues] = useState([]);

  // Criamos o componente FilterBar (barra de filtros para pesquisa)

  // Variável que recebe uma função que vai criar um objeto do tipo 'object'.
  // Como será chamado no onChange de um input, o argumento será o 'evento' do usuário digitando nos campos
  const handleChange = (e) => {
    // A variável abaixo é uma desestruturação de um objeto 'object'
    // 'e' é o evento (usuário digita) e target é o próprio input que foi digitado
    // O input digitado terá duas propriedade HTML: name e value
    // Essa desestruturação criará duas variáveis honônimas às propriedades HTML e cada uma
    // recebe o valor armazenado nessas propriedades. No caso,
    // 'name' receberá o nome do campo e 'value' receberá o valor do campo (o que o usuário digitou)
    const { name, value } = e.target;

    // Abaixo está uma 'Updater Function', função que recebe o estado atual e retorna o novo estado.
    // Sempre que passamos um função ao setState, o React atribui ao parâmetro o valor atual do estado antes de alterá-lo
    // Por convenção, o parâmetro é chamado de 'prev'
    setFilterValues((prev) => ({
      // Atualizamos o valor de 'filterValues'. As chaves nesse caso dizem que estamos retornando um object js
      ...prev, // As reticências são o operador spread. Ele define que esse object recebe os atributos de prev e adiciona mais

      // No atributo abaixo, os colchetes diz ao React para ele pagar o noma da chave recebida ao invés de
      // criar um novo atributo chamado 'name'
      [name]: value, // Atributo a mais que estamos adicionando. Os colchetes diz ao React para pegar o valor da chave daquele object
      // No final, o estado vai receber 'prev' + name: value
    }));
  };

  return (
    <div className="flex w-full">
      <div className="flex w-9/10 gap-1">
        {/* .map itera todos os itens do array filters. A cada iteração, é
        criado um input */}
        {filters.map((filter) => (
          <input
            // Cada object interado tem seus atributos. Vamos atribuir esses atributos adequadamente ao input
            key={filter.name} // Atribui o valor da chave 'name' à key do input
            type={filter.type} // Atribui o valor da chave 'type' ao tipo do input
            name={filter.name} // Atribui o valor da chave 'name' ao nome do input
            placeholder={filter.placeholder} // O texto exibido no campo será o valor da chave 'placeholder'
            value={filterValues[filter.name] || ""} // controla o que está digitado no campo. Os colchetes diz ao React para pegar o valor da chave daquele object
            onChange={handleChange} // Executa handleChange a cada evento. React envia o próprio evento como argumento
            className="h-6 px-1 bg-stone-200 rounded border-2 border-stone-400 text-xs"
          />
        ))}
      </div>
      <div className="relative w-1/10 h-6">
        {/* OnSearch recebido do pai deverá ser uma função de consulta ao backend e deverá aceitar argumentos,
           pois os argumentos serão parâmetros de busca no banco de dados
           O componente atual recebe uma função do pai e passará para seu filho, então usamos um função anônima e passamos o argumento necessário */}
        <SearchButton onClick={() => onSearch(filterValues)} />
      </div>
    </div>
  );
};

export default FilterBar;
