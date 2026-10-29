import React, { useState } from 'react';
import axios from 'axios';

interface LoginProps {
  onLoginSuccess?: (token: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Petición al endpoint authRoutes de tu Express backend
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      });

      const { token } = response.data;
      
      // Guardar token JWT en localStorage
      localStorage.setItem('token', token);

      if (onLoginSuccess) {
        onLoginSuccess(token);
      } else {
        alert('¡Inicio de sesión exitoso!');
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Error al iniciar sesión. Inténtalo de nuevo.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        {/* Encabezado */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Planningo
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Ingresa para descubrir un mundo de actividades 
          </p>
        </div>

        {/* Alerta de Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@gmail.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-600 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2" />
              Recordarme
            </label>
            <a href="#" className="text-blue-600 hover:underline font-medium">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        {/* Pie del Formulario */}
        <div className="mt-6 text-center text-sm text-gray-500">
          ¿No tienes una cuenta?{' '}
          <a href="#" className="text-blue-600 font-semibold hover:underline">
            Regístrate aquí
          </a>
        </div>
      </div>
    </div>
  );
};