import React from "react";

export interface TagProps {
  label: string;
  selected?: boolean;
  color?: string;
  onClick: () => void;
}

const Tag: React.FC<TagProps> = ({ label, selected, color, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        borderColor: color,
        backgroundColor: selected ? color : "white",
        color: selected ? "white" : color,
      }}
      className="
        px-4 py-2      /* más grande que antes */
        rounded-full
        border
        font-medium
        text-base       /* tamaño de texto más grande */
        transition-all
        duration-200    /* transición suave */
        transform       /* habilita transform para hover */
        hover:scale-110 /* aumenta tamaño al hacer hover */
        hover:shadow-lg /* sombra ligera al hover */
        truncate
      "
    >
      {label}
    </button>
  );
};

export default Tag;
