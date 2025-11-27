import React, { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface DishDetail {
  id: string;
  name: string;
  tags: string[];
  ingredients_text: string[];
  recipe: string[];
}

interface DishDetailModalProps {
  dish: DishDetail;
  dayNumber: number;
  onClose: () => void;
  onRate?: (value: "like" | "dislike" | null) => void;
}



const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
}) => {
  const [rating, setRating] = useState<"like" | "dislike" | null>(null);
  const userId = localStorage.getItem("user_id") || "unknown_user";


  const limitedTags = React.useMemo(() => {
  if (dish.tags.length <= 5) return dish.tags;

  return [...dish.tags]
    .sort(() => Math.random() - 0.5) // shuffle
    .slice(0, 5);
  }, [dish.tags]);

  const handleRate = async (type: "like" | "dislike") => {
    setRating(type); // esto ya lo usas tú

    const endpoint =
      type === "like"
        ? `${import.meta.env.VITE_API_URL}/preferences/add_positive`
        : `${import.meta.env.VITE_API_URL}/preferences/add_negative`;

    try {
      const url = `${endpoint}?user_id=${userId}&recipe_id=${dish.id}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (!response.ok) {
        throw new Error("Error al enviar preferencia");
      }

      console.log("Preferencia enviada");
    } catch (error) {
      console.error("Error:", error);
    }
};


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white w-[480px] max-h-[90vh] p-6 rounded-2xl shadow-2xl relative animate-fadeIn flex flex-col">

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
        >
          ×
        </button>

        {/* Título */}
        <h2 className="text-3xl font-bold text-green-700 mb-2 text-center">
          {dish.name}
        </h2>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-2 mb-4">
          {limitedTags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full border border-green-300 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="border-t border-green-200 my-3"></div>
        <div className="flex-1 overflow-y-auto px-1">

          {/* Ingredientes */}
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-green-800 mb-2">🧄 Ingredientes</h3>
            <ul className="list-disc list-inside text-green-900 space-y-1 text-sm">
              {dish.ingredients_text.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </div>

          {/* Preparación */}
          <div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">🍳 Preparación</h3>
            <ol className="list-decimal list-inside text-green-900 space-y-2 text-sm">
              {dish.recipe.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="border-t border-green-200 my-4"></div>

        {/* Rating en línea */}
        <div className="flex items-center justify-between">

          {/* LEFT: Pregunta o mensaje */}
          {rating === null && (
            <p className="text-green-800 font-medium">
              ¿Te gustó esta receta?
            </p>
          )}

          {rating === "like" && (
            <p className="text-green-700 font-medium">
              Intentaremos darte recomendaciones parecidas.
            </p>
          )}

          {rating === "dislike" && (
            <p className="text-green-700 font-medium">
              No te sugeriremos más esta receta.
            </p>
          )}

          {/* RIGHT: Botones */}
          <div className="flex items-center gap-4">

            <button
              onClick={() => handleRate("like")}
              className={`p-2 rounded-full transition ${
                rating === "like"
                  ? "bg-green-100 text-green-700"
                  : "text-green-700 hover:bg-green-100"
              }`}
            >
              <ThumbsUp size={22} />
            </button>

            <button
              onClick={() => handleRate("dislike")}
              className={`p-2 rounded-full transition ${
                rating === "dislike"
                  ? "bg-green-100 text-green-700"
                  : "text-green-700 hover:bg-green-100"
              }`}
            >
              <ThumbsDown size={22} />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DishDetailModal;
