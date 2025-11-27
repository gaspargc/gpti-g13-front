import React from "react";
import { Link } from "react-router-dom";
import mockImage from "./assets/imagen_mock.jpg";


const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* NAVBAR */}
      <nav className="w-full fixed top-0 left-0 bg-white shadow-sm z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
          <h1 className="text-2xl font-semibold text-emerald-600">Menux</h1>

          <div className="flex items-center gap-4">
            <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900 transition"
            >
                Iniciar sesión
            </Link>


            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-sm transition">
              Registrarse
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Planifica tus comidas sin esfuerzo
            </h2>
            <p className="text-gray-600 mt-4 text-lg">
              Organiza tus recetas y crea menús semanales en segundos.
            </p>

            <button className="mt-8 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-md transition text-lg">
              Comenzar gratis
            </button>
          </div>

          {/* Mockup / Ilustración simple */}
          <div className="hidden md:flex justify-center">
            <div className="w-80 h-96 bg-gray-100 rounded-3xl shadow-inner flex items-center justify-center">
                <img 
                src={mockImage} 
                alt="Mockup" 
                className="w-full h-full object-cover rounded-3xl"
                />
            </div>
            </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-emerald-500 text-4xl mb-2">⏱️</div>
              <h3 className="font-semibold text-xl">Ahorra tiempo</h3>
              <p className="text-gray-600 mt-2">
                Planifica tu semana en minutos.
              </p>
            </div>

            <div>
              <div className="text-emerald-500 text-4xl mb-2">📚</div>
              <h3 className="font-semibold text-xl">Organiza tus recetas</h3>
              <p className="text-gray-600 mt-2">
                Guarda tus platos favoritos en un solo lugar.
              </p>
            </div>

            <div>
              <div className="text-emerald-500 text-4xl mb-2">📅</div>
              <h3 className="font-semibold text-xl">Menú automático</h3>
              <p className="text-gray-600 mt-2">
                Generamos combinaciones basadas en tus recetas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-12">¿Cómo funciona?</h3>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-6 rounded-xl shadow-sm border border-gray-100">
              <h4 className="font-semibold text-xl">1. Agrega tus recetas</h4>
              <p className="text-gray-600 mt-2">Sube tus platos favoritos.</p>
            </div>

            <div className="p-6 rounded-xl shadow-sm border border-gray-100">
              <h4 className="font-semibold text-xl">2. Define tus gustos</h4>
              <p className="text-gray-600 mt-2">
                Elige preferencias y restricciones.
              </p>
            </div>

            <div className="p-6 rounded-xl shadow-sm border border-gray-100">
              <h4 className="font-semibold text-xl">3. Genera un menú</h4>
              <p className="text-gray-600 mt-2">
                Obtén un plan semanal automáticamente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-8 mt-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Menux</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-900">Contacto</a>
            <a href="#" className="hover:text-gray-900">Privacidad</a>
            <a href="#" className="hover:text-gray-900">Términos</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
