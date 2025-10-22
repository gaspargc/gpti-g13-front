import React, { useState } from "react";
import { TagData } from "./tagTypes";
import { BalancedTagPool } from "./BalancedTagPool";
import { PromptBar } from "./PromptBar";
import { useNavigate } from "react-router-dom";

// Tipos de tag

// Selected tag
type SelectedTag = {
  color: string;
  label: string;
  secondaryIds: string[];
  conceptId?: string;
};

// Demo styled
const TagPoolDemoStyled: React.FC = () => {
  const navigate = useNavigate();
  const allTags: TagData[] = [
  // Conceptos principales
  { id: "cocina", label: "Tipo de cocina", type: "concept" },
  { id: "dieta", label: "Tipo de dieta", type: "concept" },
  { id: "ocasión", label: "Ocasión", type: "concept" },
  { id: "ingrediente", label: "Ingrediente principal", type: "concept" },

  // Secundarios - cocina
  { id: "mediterranea", label: "Mediterránea", type: "secondary", parentId: "cocina" },
  { id: "italiana", label: "Italiana", type: "secondary", parentId: "cocina" },
  { id: "francesa", label: "Francesa", type: "secondary", parentId: "cocina" },
  { id: "asiatica", label: "Asiática", type: "secondary", parentId: "cocina" },
  { id: "mexicana", label: "Mexicana", type: "secondary", parentId: "cocina" },
  { id: "india", label: "India", type: "secondary", parentId: "cocina" },

  // Secundarios - dieta
  { id: "bajoCalorias", label: "Bajo en calorías", type: "secondary", parentId: "dieta" },
  { id: "saludable", label: "Saludable", type: "secondary", parentId: "dieta" },
  { id: "keto", label: "Keto", type: "secondary", parentId: "dieta" },
  { id: "vegetariana", label: "Vegetariana", type: "secondary", parentId: "dieta" },
  { id: "vegana", label: "Vegana", type: "secondary", parentId: "dieta" },
  { id: "sinGluten", label: "Sin Gluten", type: "secondary", parentId: "dieta" },

  // Secundarios - ocasión
  { id: "navidad", label: "Navidad", type: "secondary", parentId: "ocasión" },
  { id: "verano", label: "Verano", type: "secondary", parentId: "ocasión" },
  { id: "invierno", label: "Invierno", type: "secondary", parentId: "ocasión" },
  { id: "cumpleaños", label: "Cumpleaños", type: "secondary", parentId: "ocasión" },
  { id: "aniversario", label: "Aniversario", type: "secondary", parentId: "ocasión" },

  // Secundarios - ingrediente
  { id: "pollo", label: "Pollo", type: "secondary", parentId: "ingrediente" },
  { id: "res", label: "Res", type: "secondary", parentId: "ingrediente" },
  { id: "pescado", label: "Pescado", type: "secondary", parentId: "ingrediente" },
  { id: "verduras", label: "Verduras", type: "secondary", parentId: "ingrediente" },
  { id: "frutas", label: "Frutas", type: "secondary", parentId: "ingrediente" },

  // Tags individuales
  { id: "rapido", label: "Rápido", type: "individual" },
  { id: "fresco", label: "Fresco", type: "individual" },
  { id: "casero", label: "Casero", type: "individual" },
  { id: "económico", label: "Económico", type: "individual" },
  { id: "gourmet", label: "Gourmet", type: "individual" },
  { id: "picante", label: "Picante", type: "individual" },
  { id: "cremoso", label: "Cremoso", type: "individual" },
  { id: "ligero", label: "Ligero", type: "individual" },
  { id: "dulce", label: "Dulce", type: "individual" },
];

  const [inputText, setInputText] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<SelectedTag[]>([]);

  const getRandomColor = () => {
    const colors = ["#f87171","#34d399","#60a5fa","#facc15","#a78bfa"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const enabledTags = allTags.filter((t) => {
    const inSelected = selectedTags.some((st) =>
      st.label === t.label || st.secondaryIds.includes(t.id)
    );
    if (inSelected) return false;

    if (t.type === "concept" || t.type === "individual") return true;

    return selectedTags.some((st) => st.conceptId === t.parentId);
  });

  const handleSubmit = () => {
    console.log("Enviar:", inputText, selectedTags);

    // Redirigir a la vista de carga, pasando estado opcional
    navigate("/loading", { state: { text: inputText, tags: selectedTags } });
  };

  const handleSelect = (tag: TagData) => {
    if (tag.type === "individual") {
      if (!selectedTags.find((t) => t.label === tag.label)) {
        setSelectedTags([...selectedTags, { label: tag.label, color: getRandomColor(), secondaryIds: [] }]);
      }
    } else if (tag.type === "concept") {
      if (!selectedTags.find((t) => t.label === tag.label)) {
        setSelectedTags([...selectedTags, { label: tag.label, color: getRandomColor(), secondaryIds: [], conceptId: tag.id }]);
      }
    } else if (tag.type === "secondary") {
      const concept = allTags.find((t) => t.id === tag.parentId);
      if (!concept) return;
      setSelectedTags((prev) =>
        prev.map((st) => {
          if (st.label === concept.label) {
            if (!st.secondaryIds.includes(tag.id)) {
              return { ...st, secondaryIds: [...st.secondaryIds, tag.id] };
            }
          }
          return st;
        })
      );
    }
  };

  const handleRemove = (st: SelectedTag) => {
    if (st.secondaryIds.length > 0) {
      setSelectedTags((prev) =>
        prev
          .map((t) => {
            if (t.label === st.label) {
              const newSec = [...t.secondaryIds];
              newSec.pop();
              return { ...t, secondaryIds: newSec };
            }
            return t;
          })
          .filter((t) => !(t.label === st.label && t.secondaryIds.length === 0 && t.conceptId))
      );
    } else {
      setSelectedTags((prev) => prev.filter((t) => t.label !== st.label));
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col gap-6 items-center">
      <h1 className="text-3xl font-bold text-teal-700">Menux</h1>

      {/* Contenedor principal con fondo único */}
      {/* <div className="relative w-[600px] p-6 rounded-3xl border-2 border-teal-300 bg-teal-50 flex flex-col gap-4"> */}
        <div className="relative w-[600px] p-6 rounded-3xl flex flex-col gap-4">
        

       <PromptBar
          value={inputText}
          tags={selectedTags}
          onChange={setInputText}
          onSubmit={handleSubmit} 
          onRemoveTag={handleRemove}
      />



        <BalancedTagPool tags={enabledTags} onTagSelect={handleSelect} />
      </div>
    </div>
  );
};

export { TagPoolDemoStyled };
