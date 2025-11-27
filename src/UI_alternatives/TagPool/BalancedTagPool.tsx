// BalancedTagPool.tsx (Actualizado)

import React, { useMemo } from "react";
import { TagData } from "./tagTypes"; // Importa la nueva TagData (id: number)
import Tag from "./Tag"; // Asumo que este componente existe
import { getRandomColor } from "./colors"; // Asumo que este helper existe
// ASUMO que tagSampler.ts está en la misma carpeta, si no, ajusta la ruta
import { sampleTags } from "./tagSampler"; 

interface BalancedTagPoolProps {
  allTags: TagData[]; // Cambiado de 'tags' a 'allTags' para mayor claridad
  selectedTagIds: number[]; // Nuevo prop para los IDs de los tags ya seleccionados
  onTagSelect: (tag: TagData) => void;
}

export const BalancedTagPool: React.FC<BalancedTagPoolProps> = ({
  allTags,
  selectedTagIds,
  onTagSelect,
}) => {
  const MAX_WIDTH = 450;
  const TAG_SIDE_PADDING = 16 * 2;
  const TAG_GAP = 16; 

  // --- Algoritmo de Muestreo Ponderado ---
  // Los tags a mostrar se recalculan cuando cambia la lista completa o los IDs seleccionados
  const tagsToDisplay = useMemo(() => {
    // Aquí se utiliza el algoritmo de muestreo
    return sampleTags(allTags, selectedTagIds);
  }, [allTags, selectedTagIds]);

  // Estima el ancho en px de un tag según caracteres + padding
  const estimateTagWidth = (label: string) => {
    const avgCharWidth = 8.5;
    return label.length * avgCharWidth + TAG_SIDE_PADDING;
  };

  // --- Lógica de Balanceo de Filas (Diamond Layout) ---
  const { balancedRows } = useMemo(() => {
    
    // Usamos tagsToDisplay en lugar de 'tags'
    const tagInfos = tagsToDisplay.map((t) => ({
      ...t,
      estWidth: estimateTagWidth(t.label),
    }));

    // El resto de la lógica de balanceo permanece igual, usando tagInfos
    const rows: { tags: TagData[]; totalWidth: number }[] = [];
    let currentRow: TagData[] = [];
    let currentWidth = 0;

    tagInfos.forEach((t) => {
      const nextWidth = currentWidth + t.estWidth + (currentRow.length > 0 ? TAG_GAP : 0);
      if (nextWidth <= MAX_WIDTH) {
        currentRow.push(t);
        currentWidth = nextWidth;
      } else {
        rows.push({ tags: currentRow, totalWidth: currentWidth });
        currentRow = [t];
        currentWidth = t.estWidth;
      }
    });
    if (currentRow.length > 0) rows.push({ tags: currentRow, totalWidth: currentWidth });

    const sorted = [...rows].sort((a, b) => b.totalWidth - a.totalWidth);

    const diamondOrder: typeof rows = [];
    sorted.forEach((row, idx) => {
      if (idx === 0) {
        diamondOrder.push(row);
      } else if (idx % 2 === 1) {
        diamondOrder.unshift(row);
      } else {
        diamondOrder.push(row);
      }
    });

    return { balancedRows: diamondOrder };
  }, [tagsToDisplay]); // Depende de los tags muestreados

  return (
    // Agregamos una visualización de los parámetros del muestreo
    <div className="flex flex-col w-full">
      
      <div className="h-[350px] p-4 rounded-xl overflow-y-auto border-0 flex flex-col items-center justify-start">
        {balancedRows.map((row, i) => (
          <div
            key={i}
            className="flex justify-center flex-wrap w-full"
            style={{ gap: "16px", marginBottom: "10px" }}
          >
            {row.tags.map((t) => (
              <Tag
                key={t.id}
                label={t.label}
                color={getRandomColor()}
                onClick={() => onTagSelect(t)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};