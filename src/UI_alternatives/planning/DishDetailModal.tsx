import React from "react";

interface DishDetail {
  name: string;
  tags: string[];
  ingredients: string[];
  recipe: string[];
}

interface DishDetailModalProps {
  dish: DishDetail;
  dayNumber: number;
  onClose: () => void;
}

const DishDetailModal: React.FC<DishDetailModalProps> = ({ dish, dayNumber, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white w-[480px] max-h-[90vh] p-6 rounded-2xl shadow-2xl relative animate-fadeIn overflow-y-auto">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
        >
          ×
        </button>

        {/* Título */}
        <h2 className="text-3xl font-bold text-green-700 mb-2 text-center">
          Día {dayNumber}: {dish.name}
        </h2>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-2 mb-4">
          {dish.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full border border-green-300 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="border-t border-green-200 my-3"></div>

        {/* Ingredientes */}
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-green-800 mb-2">🧄 Ingredientes</h3>
          <ul className="list-disc list-inside text-green-900 space-y-1 text-sm">
            {dish.ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
        </div>

        {/* Receta */}
        <div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">🍳 Preparación</h3>
          <ol className="list-decimal list-inside text-green-900 space-y-2 text-sm">
            {dish.recipe.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default DishDetailModal;
