import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


interface LoadingViewProps {
  minDuration?: number;
}




const LoadingView: React.FC<LoadingViewProps> = ({ minDuration = 3000 }) => {
  console.log("🔄 LoadingView renderizado");
  const hasFetchedRef = React.useRef(false);

  const navigate = useNavigate();
  const location = useLocation(); 
  const state = location.state as { tagIds: number[]; text: string } | null;
  const user_id = localStorage.getItem("user_id") || "unknown_user";
  const tagIds = state?.tagIds || [];
  const text = state?.text || "";

  const messages = [
    "Buscando el mejor chef...",
    "Analizando preferencias y tags...",
    "Generando plan nutricional...",
    "Seleccionando 15 recetas perfectas...",
    "Menú generado 🎉",
  ];

  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  
  useEffect(() => {
    let messageIndex = 0;
    const intervalTime = minDuration / (messages.length - 1); 

    const interval = setInterval(() => {
      messageIndex++;
      if (messageIndex < messages.length) {
        setCurrentMessage(messages[messageIndex]);
      } else {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [minDuration, messages.length]);

  useEffect(() => {

    if (hasFetchedRef.current) {
    console.log("⛔ fetchRecipes bloqueado (ya se ejecutó)");
    return;
    }

    hasFetchedRef.current = true; 
    console.log("🚀 Ejecutando fetchRecipes por primera vez");

    if (!tagIds || tagIds.length === 0) {
      console.error("Error: No se han proporcionado IDs de tags.");
      navigate("/new_menu", { replace: true });
      return;
    }

    const fetchRecipes = async () => {
      const startTime = Date.now();

      try {
        const url = new URL(`${import.meta.env.VITE_API_URL}/menus/create`);
        url.searchParams.append("user_id", user_id.toString());
        tagIds.forEach(t => url.searchParams.append("tag_ids", t.toString()));

        const response = await fetch(url.toString(), {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status} al generar el menú.`);
        }

        const data = await response.json();
        const elapsed = Date.now() - startTime;
        const delay = Math.max(0, minDuration - elapsed);

        setTimeout(() => {
          navigate("/menu-final", {
            state: {
              menuId: data.menu_id,
              userId: data.user_id,
              recipes: data.recipes,           
              shoppingList: data.shopping_list,
              queryText: text,                  
              tagsUsed: tagIds                  
            },
            replace: true,
          });
        }, delay);

      } catch (error) {
        console.error("Error grave al generar menú:", error);
        navigate("/new_menu", {
          state: {
            fetchError:
              "No se pudo generar el menú. Verifica la conexión con la API."
          },
          replace: true
        });
      }
    };


    fetchRecipes();

  }, [tagIds, text, navigate, minDuration]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 gap-8">
      <div className="relative">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-green-400"></div>
      </div>
      <p className="text-xl text-white font-semibold transition-opacity duration-1000">
        {currentMessage}
      </p>
      <p className="text-sm text-gray-400">
        Esto puede tardar unos segundos mientras ajustamos las recetas a tus tags.
      </p>
    </div>
  );
};

export default LoadingView;