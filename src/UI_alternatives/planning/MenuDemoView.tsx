import React, { useState } from "react";
import { DayCard3 } from "../daycards/DayCardPropuesta3";
import DishDetailModal from "./DishDetailModal";
import { useLocation, Link } from 'react-router-dom';
import { Pencil } from "lucide-react";

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

interface ShoppingListProps {
  items: ShoppingItem[];
  quotation: Quotation;
}

const places = ["Lider", "Jumbo", "Tottus"];
const mean = 200000;
const stdDev = 5000; // baja varianza (~±5k)

function randomNormal(mean: number, stdDev: number): number {
  // Box-Muller transform
  let u = 0, v = 0;
  while (u === 0) u = Math.random(); // evitar log(0)
  while (v === 0) v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return Math.round(z * stdDev + mean);
}

type Quotation = [string, number][];

const ShoppingList: React.FC<ShoppingListProps> = ({ items, quotation }) => {
  const formatQuantity = (q: string) => {
    const num = Number(q);
    if (isNaN(num)) return q;
    return num.toFixed(2).replace(/\.00$/, "");
  };

  return (
    <div className="bg-white p-6 rounded-xl w-120 shadow-md flex flex-col">
      <h2 className="text-2xl font-semibold mb-4 text-green-700 text-center">
        Lista de Compras
      </h2>

      {/* Lista */}
      <div className="overflow-y-auto flex-1" style={{ maxHeight: "370px" }}>
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={i} className="px-3 py-2 border-b border-gray-200">
              <div className="flex justify-between font-medium text-gray-800">
                <span>{item.name}</span>
                <span>
                  {formatQuantity(item.quantity)} {item.unit}
                </span>
              </div>
              {item.recomendation && (
                <p className="text-sm text-gray-600 mt-1">
                  {item.recomendation}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer de cotización */}
      <div className="mt-4 pt-4 border-t border-gray-300">
        <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center">
          Cotización
        </h3>

        <div className="flex justify-between text-gray-800 font-medium text-sm">
          {quotation.map(([place, value], i) => (
            <div key={i} className="flex flex-col text-center flex-1">
              <span>{place}</span>
              <span>${value.toLocaleString("es-CL")}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};




export const MenuDemoView: React.FC = () => {
  const location = useLocation();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const { recipes: incomingRecipes } = location.state || {};
  const { shoppingList: incomingShoppingList } = location.state || {};

  console.log("incoming shopping list:", incomingShoppingList);

  

  const menuData: DishDetail[] = incomingRecipes || [];

  const shoppingDemo: ShoppingItem[] = incomingShoppingList || [];

  const quotation: Quotation = places.map(place => [place, randomNormal(mean, stdDev)]);





  // Dividir en 3 filas de 5
  const rows = [
    menuData.slice(0, 5),
    menuData.slice(5, 10),
    menuData.slice(10, 15),
  ];

  return (
    <div className="fixed inset-0 bg-gray-100 flex flex-col gap-6 p-6 overflow-y-auto">

      <nav className="w-full fixed top-0 left-0 bg-white shadow-sm z-50">
        <div className="flex items-center justify-between py-4">
          {/* Título con margen izquierdo de 188px */}
          <h1 className="text-2xl font-semibold text-emerald-600 ml-[250px]">
            Menux
          </h1>

          {/* Botón con margen derecho de 20px */}
          <div className="flex items-center gap-4 mr-[20px]">
            <Link to="/new_menu">
              <button className="flex items-center p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-0 justify-start gap-3">
                <Pencil size={24} />
                <span className="inline-block transition-[max-width,opacity,margin] duration-300 overflow-hidden whitespace-nowrap max-w-[160px] opacity-100 ml-2">
                  Nuevo menú
                </span>
              </button>
            </Link>
          </div>
        </div>
      </nav>


      

      {/* Contenedor principal: calendario + lista de compras */}
      <div className="mt-20 flex flex-row gap-8">

        {/* Columna izquierda: Menú de 15 días */}
        <div className="flex flex-col gap-6 w-4/5">
          {rows.map((week, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-6">
              {week.map((dish, i) => {
                const dayIndex = rowIndex * 5 + i;
                return (
                  <div
                    key={dayIndex}
                    className={selectedDay === dayIndex ? "ring-2 ring-green-500 rounded-xl" : ""}
                    onClick={() => setSelectedDay(dayIndex)}
                  >
                    <DayCard3 dayNumber={dayIndex + 1} dishes={[dish.name]} />
                  </div>
                );
              })}
            </div>
          ))}

          {/* Popup modal */}
          {selectedDay !== null && (
            <DishDetailModal
              dayNumber={selectedDay + 1}
              dish={menuData[selectedDay]}
              onClose={() => setSelectedDay(null)}
            />
          )}
        </div>

        {/* Columna derecha: Lista de compras */}
        <div className="w-2/5 flex justify-center items-start">
          <ShoppingList items={shoppingDemo} quotation={quotation} />
        </div>
      </div>
    </div>
  );
};
