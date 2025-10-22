import React, { useMemo } from "react";
import { TagData } from "./tagTypes";
import Tag from "./Tag";
import { getRandomColor } from "./colors";

interface BalancedTagPoolProps {
  tags: TagData[];
  onTagSelect: (tag: TagData) => void;
}

export const BalancedTagPool: React.FC<BalancedTagPoolProps> = ({
  tags,
  onTagSelect,
}) => {
  const MAX_WIDTH = 450;
  const TAG_SIDE_PADDING = 16 * 2; // padding horizontal (izq + der)
  const TAG_GAP = 16; // separación entre tags

  // Estima el ancho en px de un tag según caracteres + padding
  const estimateTagWidth = (label: string) => {
    const avgCharWidth = 8.5; // valor medio en px para fuentes normales
    return label.length * avgCharWidth + TAG_SIDE_PADDING;
  };

  const { balancedRows } = useMemo(() => {
    // --- 1. Calcular longitudes estimadas ---
    const tagInfos = tags.map((t) => ({
      ...t,
      estWidth: estimateTagWidth(t.label),
    }));

    // --- 2. Distribuir en filas ---
    const rows: { tags: TagData[]; totalWidth: number }[] = [];
    let currentRow: TagData[] = [];
    let currentWidth = 0;

    tagInfos.forEach((t, i) => {
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

    // --- 3. Ordenar filas por longitud (descendente) ---
    const sorted = [...rows].sort((a, b) => b.totalWidth - a.totalWidth);

    // --- 4. Reordenar para formar el diamante ---
    const diamondOrder: typeof rows = [];
    sorted.forEach((row, idx) => {
      if (idx === 0) {
        diamondOrder.push(row);
      } else if (idx % 2 === 1) {
        diamondOrder.unshift(row); // insertar arriba
      } else {
        diamondOrder.push(row); // insertar abajo
      }
    });

    return { balancedRows: diamondOrder };
  }, [tags]);

  return (
    <div className="flex flex-col w-full h-[500px] p-4 rounded-xl overflow-y-auto border-0 items-center justify-start">
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
  );
};
