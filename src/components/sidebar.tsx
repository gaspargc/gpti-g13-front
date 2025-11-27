import { useState } from "react";
import { ChevronLeft, ChevronRight, Pencil, Settings } from "lucide-react";
import PreferencesModal from "./PreferencesModal";

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
    
interface SidebarProps {
  history: MenuHistoryItem[];
  onNewMenu: () => void;
  onSelectMenu: (menuId: number) => void;
}

export default function Sidebar({ history, onNewMenu, onSelectMenu }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const userId = localStorage.getItem("user_id") || "unknown_user";

  return (
    <div
      className={`h-screen bg-white text-black flex flex-col border-r border-gray-300 transition-all duration-300 ${
        expanded ? "w-64" : "w-18"
      } overflow-hidden`}
    >
        <div className="flex items-center p-4 border-b border-gray-300">
        {expanded ? (
            <>
            <h2 className="text-lg flex-1 font-semibold text-emerald-600">Menux</h2>

            <button
                onClick={() => setExpanded(!expanded)}
                className="p-1 hover:bg-gray-100 rounded-xl"
            >
                <ChevronLeft size={20} />
            </button>
            </>
        ) : (
            <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 hover:bg-gray-100 rounded-xl mx-auto"
            >
            <ChevronRight size={20} />
            </button>
        )}
        </div>

      <div className="p-4 border-b border-gray-300">
        <button
          onClick={onNewMenu}
          className={`flex items-center w-full p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-0 ${
            expanded ? "justify-start gap-3" : "justify-center"
          }`}
        >
          <Pencil size={20} />
          <span
            className={`inline-block transition-[max-width,opacity,margin] duration-300 overflow-hidden whitespace-nowrap ${
              expanded ? "max-w-[160px] opacity-100 ml-1" : "max-w-0 opacity-0 ml-0"
            }`}
          >
            Nuevo menú
          </span>
        </button>
      </div>



      <div
        className={`flex-1 p-4 space-y-3 transition-all duration-300 overflow-hidden ${
          expanded ? "opacity-100 max-h-[2000px]" : "opacity-0 max-h-0"
        }`}
      >
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Historial
        </h3>
        <ul className="space-y-2">
          {history.map((item) => (
            <li
              key={item.menu_id}
              onClick={() => onSelectMenu(item.menu_id)}
              className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 cursor-pointer"
            >
              {new Date(item.created_at).toLocaleString()} 
            </li>
          ))}
        </ul>
      </div>

  
      <div className="mt-auto">
        <div>

        
          <div
            className={`transition-opacity duration-200 ${
              expanded ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <button
              onClick={() => setPreferencesOpen(true)}
              className="flex items-center w-full p-2 hover:bg-gray-200 transition-all duration-200 gap-3 p-4 "
            >
              <Settings size={20} />
              <span className="text-sm">Preferencias</span>
            </button>
          </div>
          <div className="flex items-center gap-3  border-t p-4 border-gray-300">
            <div className="w-7 h-7 bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold">
              JA
            </div>
            <span
              className={`text-sm transition-opacity duration-300 whitespace-nowrap ${
                expanded ? "opacity-100" : "opacity-0"
              }`}
            >
              Sesión
            </span>
          </div>

        </div>
      </div>
      {preferencesOpen && (
        <PreferencesModal
          userId={Number(userId)}
          onClose={() => setPreferencesOpen(false)}
        />
      )}
    </div>
    
  );
}

