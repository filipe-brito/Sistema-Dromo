import { SearchButton } from "../atoms/SearchButton";

const FilterBar = ({ filters, values, setValues, onSearch }) => {
  // Criamos o componente FilterBar (barra de filtros para pasquisa)

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

    // Abaixo está uma 'Updater Function', função que recebe o estado atual e retorna o novo estado.
    // Sempre que passamos um função ao setState, o React atribui ao parâmetro o valor atual do estado antes de alterá-lo
    // Por convenção, o parâmetro é chamado de 'prev'
    setValues((prev) => ({
      // Atualizamos o valor de 'values'. As chaves nesse caso dizem que estamos retornando um object js
      ...prev, // As reticências são o operador spread. Ele define que esse object recebe os atributos de prev e adiciona mais

      // No atributo abaixo, os colchetes diz ao React para ele pagar o noma da chave recebida ao invés de
      // criar um novo atributo chamado 'name'
      [name]: value, // Atributo a mais que estamos adicionando.
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
            value={values[filter.name] || ""} //
            onChange={handleChange} // Executa handleChange a cada evento. React envia o próprio evento como argumento
            className="h-6 px-1 bg-stone-200 rounded border-2 border-stone-400 text-xs"
          />
        ))}
      </div>
      <div className="relative w-1/10 h-6">
        {/* Executa onSearch ao clicar no botão, passando o estado values como argumento */}
        <SearchButton onClick={() => onSearch(values)} />
      </div>
    </div>
  );
};

export default FilterBar;
