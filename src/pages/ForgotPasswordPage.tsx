import React, { useState } from 'react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage('Por favor, insira seu endereço de email.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage('Por favor, insira um endereço de email válido.');
      return;
    }

    setIsLoading(true);
    setMessage(''); // Clear previous messages

    // Simulate sending a reset link (replace with your actual logic)
    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds delay
      console.log('Reset link sent to:', email);
      setMessage('Um link de redefinição de senha foi enviado para o seu endereço de email.');
    } catch (error) {
      setMessage('Ocorreu um erro ao enviar o link de redefinição. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Esqueceu sua senha?</h2>
        <p className="text-gray-700 text-sm mb-4 text-center">
          Insira o endereço de email associado à sua conta e enviaremos um link para redefinir sua senha.
        </p>
        {message && <div className={`text-center mb-4 ${message.startsWith('Ocorreu') ? 'text-red-500' : 'text-green-500'}`}>{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Endereço de email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Insira seu endereço de email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Enviando...' : 'Enviar link de redefinição'}
            </button>
          </div>
          <div className="mt-4 text-center">
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/login">
              Voltar para o login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
