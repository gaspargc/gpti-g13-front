import React, { useState } from "react";
import { DayCard3 } from "../UI_alternatives/daycards/DayCardPropuesta3";
import DishDetailModal from "../UI_alternatives/planning/DishDetailModal";

interface DishDetail {
  id: string 
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


interface MenuHistoryViewProps {
  dishes: DishDetail[];
  shoppingList: ShoppingItem[];
}

const ShoppingList: React.FC<{ items: ShoppingItem[] }> = ({ items }) => {

  return (
    <div className="bg-white p-6 rounded-xl w-120 shadow-md flex flex-col">
      <h2 className="text-2xl font-semibold mb-4 text-green-700 text-center">
        Lista de Compras
      </h2>
      <div className="overflow-y-auto flex-1" style={{ maxHeight: "480px" }}>
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={i} className="px-3 py-2 border-b border-gray-200">
              <div className="flex justify-between font-medium text-gray-800">
                <span>{item.name}</span>
                <span>{item.quantity} {item.unit}</span>
              </div>
              {item.recomendation && (
                <p className="text-sm text-gray-600 mt-1">{item.recomendation}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const MenuHistoryView: React.FC<MenuHistoryViewProps> = ({
    dishes,
    shoppingList
}) => {

    
  const [selectedDay, setSelectedDay] = useState<number | null>(null);


  

  const menuData: DishDetail[] = dishes || [];

  const shoppingDemo: ShoppingItem[] = shoppingList || [];




  // Dividir en 3 filas de 5
  const rows = [
    menuData.slice(0, 5),
    menuData.slice(5, 10),
    menuData.slice(10, 15),
  ];

  return (
     <div className="w-full h-full bg-gray-100 flex flex-col gap-6 p-6 overflow-y-auto">     

      <div className="mt-20 flex flex-row gap-8">

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

          {selectedDay !== null && (
            <DishDetailModal
              dayNumber={selectedDay + 1}
              dish={menuData[selectedDay]}
              onClose={() => setSelectedDay(null)}
            />
          )}
        </div>
        <div className="w-2/5 flex justify-center items-start">
          <ShoppingList items={shoppingDemo} />
        </div>
      </div>
    </div>
  );
};

export default MenuHistoryView;
