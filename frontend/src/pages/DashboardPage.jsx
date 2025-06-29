import React from "react";
import { Link } from "react-router-dom"; // Usado para navegação entre telas
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
          implementações
        </h3>
        <ul className="list-disc list-inside space-y-1 pl-8">
          <li>
            Correção do comportamento do dropdown: agora fecha ao clicar fora.
          </li>
          <li>
            Redirecionamento automático da raiz para <code>/home</code>.
          </li>
        </ul>
      </section>

      <section className="bg-stone-200 p-4 rounded-md shadow mb-2">
        <h3 className="text-xl font-semibold mb-2">
          <Calendar className="inline h-6 w-6 text-red-700" /> Próximas
          melhorias
        </h3>
        <ul className="list-disc list-inside space-y-1 pl-8">
          <li>Inserção de foto nos cadastros de pessoas</li>
          <li>
            Redirecionar para a página de login quando retorno 401/403 do
            backend
          </li>
          <li>Tratamento de erros nas requisições de cadastros</li>
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
