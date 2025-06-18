import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../api/api"; // Certifique-se que tem o seu api configurado

const TestPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setApiError(""); // Limpar erro anterior

    try {
      const response = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      const { user, token } = response.data;
      login(user, token);
      navigate("/home");
    } catch (error) {
      console.error("Erro no login:", error);
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        setApiError("E-mail ou senha inválidos");
      } else {
        setApiError("Ocorreu um erro inesperado. Tente novamente.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <div className="flex justify-center">
          <img src="/images/gamer-logo.png" alt="Login" className="w-30" />
        </div>

        <h2 className="text-center text-3xl font-bold text-gray-800 mt-4">
          Acesse o seu Dromo!
        </h2>

        {apiError && (
          <div className="mb-4 text-red-500 text-center font-semibold">
            <span>{apiError}</span>
          </div>
        )}

        <form id="login" className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                className={`w-full p-3 border text-gray-800 rounded-md focus:outline-none ${
                  errors.email
                    ? "border-red-500 focus:ring-0"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                }`}
                {...register("email", {
                  required: "Insira o email",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Digite um email válido",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Senha</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Senha"
                className={`w-full p-3 border text-gray-800 rounded-md focus:outline-none ${
                  errors.password
                    ? "border-red-500 focus:ring-0"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                }`}
                {...register("password", {
                  required: "Insira a senha",
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
          >
            {isSubmitting ? "Entrando..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestPage;
