import { DoneIcon2 } from "../components/atoms/icons/DoneIcon";
import {
  Calendar,
  Maintenance,
  Star,
} from "../components/atoms/icons/MiscellaneousIcons";

const Dashboard = () => {
  return (
    <div className="w-8/10 min-h-[92dvh] mx-auto px-4 py-2 bg-stone-800 rounded-b border-x-2 border-b-2 border-stone-700">
      {/* Conteúdo da tela */}
      <h2 className="text-center text-2xl font-bold text-neutral-50 my-4">
        Bem-vindo ao sistema Dromo!
      </h2>

      <section className="bg-stone-200 p-4 rounded-md shadow mb-2">
        <h3 className="text-xl font-semibold mb-2">
          <Star className="inline text-yellow-500" /> Visão Geral do Projeto
        </h3>
        <p>
          Este sistema tem como objetivo ser um projeto de estudo de
          desenvolvimento FullStack.
        </p>
      </section>

      <section className="bg-stone-200 p-4 rounded-md shadow mb-2">
        <h3 className="text-xl font-semibold mb-2">
          <DoneIcon2 className="inline text-green-700" /> Funcionalidades já
          implementadas
        </h3>
        <ul className="list-disc list-inside space-y-1 pl-8">
          <li>
            Cadastro de pessoas físicas (somente informações básicas)
            <span className="italic font-semibold"> - Em melhoria</span>
          </li>
          <li>
            Cadastro de empresas (somente informações básicas)
            <span className="italic font-semibold"> - Em melhoria</span>
          </li>
          <li>Sistema de autenticação e login de usuários</li>
        </ul>
      </section>

      <section className="bg-stone-200 p-4 rounded-md shadow mb-2">
        <h3 className="text-xl font-semibold mb-2">
          <Maintenance className="inline h-7 w-7 text-gray-700" /> Últimas
          atualizações
        </h3>
        <ul className="list-disc list-inside space-y-1 px-8">
          <li>Seção de endereço no cadastro de pessoas e empresas.</li>
          <li>Busca de endereço na API do ViaCEP ao digitar o CEP:</li>
          <img
            src="/demo-fetch-address.gif"
            alt=""
            className="w-3/4 h-auto rounded-md"
          />
          <li>Imagem de perfil no cadastro de pessoas e empresas.</li>
          <li>
            Tratamento de erros ao cadastrar pessoa e empresa: modal agora vai
            exibir qual campo violou a constraint <code>UNIQUE</code> do Postgre
          </li>
          <li>
            Criado um <code>autocomplete input</code> que busca as opções em uma
            api.
          </li>
          <li>Campo "cidade de nacimento" no cadastro de pessoas físicas.</li>
        </ul>
      </section>

      <section className="bg-stone-200 p-4 rounded-md shadow mb-2">
        <h3 className="text-xl font-semibold mb-2">
          <Calendar className="inline h-6 w-6 text-red-700" /> Próximas
          melhorias
        </h3>
        <ul className="list-disc list-inside space-y-1 pl-8">
          <li>Tratamento de erros ao submeter arquivo de imagem inválida</li>
          <li>Ampliar os formulários de cadastro</li>
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
