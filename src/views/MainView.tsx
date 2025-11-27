import React, { useState, useEffect } from "react";
import { TagPoolDemoStyled } from "../UI_alternatives/TagPool/TagPoolDemoStyled";
import Sidebar from "../components/sidebar";
import MenuHistoryView from "../components/MenuHistoryView";

interface MenuHistoryItem {
  menu_id: number;
  created_at: string;
  recipes: {
    id: number;
    name: string;
    tags: string[];
    ingredients_text: string[];
    ingredients_ids: { id: number; quantity: number }[];
    recipe: string[];
  }[];
  shopping_list: {
    name: string;
    unit: string;
    quantity: number;
    recomendation: string;
  }[];
}

interface DishDetail {
  id: string;
  name: string;
  tags: string[];
  ingredients_text: string[];
  recipe: string[];
}

// Tipo actualizado
interface ShoppingItem {
  name: string;
  unit: string;
  quantity: string;
  recomendation: string;
}




const fetchMenuHistory = async (userId: number): Promise<MenuHistoryItem[]> => {
  const API = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(`${API}/menus/menu_history?user_id=${userId}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status} al obtener historial`);
    }

    const data = await response.json();
    console.log("➡️ Datos del backend:", data);
    return data

  } catch (error) {
    console.error("Error al obtener el historial de menús:", error);
    return [];
  }
};




const MainView: React.FC = () => {

    const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);
    const [history, setHistory] = useState<MenuHistoryItem[]>([]);
    const selectedMenu = history.find(m => m.menu_id === selectedMenuId);
    const user_id = localStorage.getItem("user_id") || "unknown_user";

    useEffect(() => {
      fetchMenuHistory(Number(user_id)).then(setHistory);
      }, [user_id]);

    const dishes: DishDetail[] = selectedMenu
      ? selectedMenu.recipes.map(r => ({
          id: String(r.id),
          name: r.name,
          tags: r.tags,
          ingredients_text: r.ingredients_text,
          recipe: r.recipe
        }))
      : [];

    const shoppingList: ShoppingItem[] = selectedMenu
      ? selectedMenu.shopping_list.map(item => ({
          name: item.name,
          unit: item.unit,
          quantity: String(item.quantity),
          recomendation: item.recomendation
        }))
      : [];


    return (
      <div className="flex h-screen">
        <Sidebar 
          history={history} 
          onSelectMenu={(id) => setSelectedMenuId(id)}
          onNewMenu={() => setSelectedMenuId(null)}
        />

        <div className="flex-1 overflow-auto">
          {selectedMenuId === null ? (
            <TagPoolDemoStyled />
          ) : (
             <MenuHistoryView
                dishes={dishes}
                shoppingList={shoppingList}
              />
          )}
        </div>
      </div>
);

};

export default MainView;
