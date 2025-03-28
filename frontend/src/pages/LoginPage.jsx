import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Senha:", password);
    // Aqui futuramente chamamos a API de autenticação
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <div className="flex justify-center">
          <img src="/images/img-01.png" alt="Login" className="w-32" />
        </div>

        <h2 className="text-center text-2xl font-bold text-gray-800 mt-4">Member Login</h2>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <div className="relative">
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="absolute right-3 top-3 text-gray-500">
                <i className="fa fa-envelope"></i>
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="absolute right-3 top-3 text-gray-500">
                <i className="fa fa-lock"></i>
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="#" className="text-sm text-gray-600 hover:text-blue-500">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
