import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoadingViewProps {
  duration?: number; // Duración total simulada en ms
}

const LoadingView: React.FC<LoadingViewProps> = ({ duration = 10000 }) => {
  const navigate = useNavigate();
  const messages = [
    "Buscando recetas caseras...",
    "Buscando recetas económicas...",
    "Generando menú quincenal...",
    "Generando lista de compras...",
    "Menú generado 🎉",
  ];

  const [currentMessage, setCurrentMessage] = useState(messages[0]);

  useEffect(() => {
    const intervalTime = duration / messages.length;
    let index = 0;

    const interval = setInterval(() => {
      index++;
      if (index < messages.length) {
        setCurrentMessage(messages[index]);
      }
    }, intervalTime);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      // Redirigir a la vista de menú final
      navigate("/menu-final"); 
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [duration, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-6">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-b-4 border-gray-200"></div>
      <p className="text-lg text-gray-700 font-medium">{currentMessage}</p>
    </div>
  );
};

export default LoadingView;
