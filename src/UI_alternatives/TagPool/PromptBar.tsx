import React, { useRef, useEffect } from "react";
import { X, Send } from "lucide-react";

interface SelectedTag {
  id: number; 
  label: string;
  color: string;
  secondaryIds: string[];
  conceptId?: string;
}

interface PromptBarProps {
  value: string;
  tags: SelectedTag[];
  onChange: (value: string) => void;
  onSubmit: () => void;
  onRemoveTag: (tag: SelectedTag) => void;
}



export const PromptBar: React.FC<PromptBarProps> = ({
  value,
  tags,
  onChange,
  onSubmit,
  onRemoveTag,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Ajustar altura automáticamente como ChatGPT
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value, tags]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };



  return (
    <div className="w-full bg-white border border-gray-300 rounded-2xl p-3 flex flex-col shadow-sm transition-all max-h-[300px] overflow-y-auto">
      <div className="flex flex-wrap gap-2 items-start">
        {tags.map((tag) => (
          <div
            key={tag.label}
            className="flex items-center px-2 py-1 rounded-lg text-sm text-white"
            style={{ backgroundColor: tag.color }}
          >
            <span>{tag.label}</span>
            <button
              onClick={() => onRemoveTag(tag)}
              className="ml-2 hover:opacity-70 transition"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu mensaje..."
          rows={1}
          className="flex-1 resize-none overflow-hidden bg-transparent outline-none text-gray-800 text-base min-w-[200px] py-1"
        />
      </div>
      <div className="flex justify-end mt-2">
  <div className="flex justify-end mt-2">
  <div className="flex justify-end mt-2">
  <div className="flex justify-end mt-2">
  <button
    onClick={onSubmit}
    className="group relative flex items-center justify-center bg-green-500 text-white rounded-full transition-all duration-300 overflow-hidden hover:bg-green-600 h-12 px-4"
  >
    <div className="flex items-center justify-center transition-all duration-300 group-hover:px-6">
      <Send
        size={20}
        className="transition-all duration-300 group-hover:mr-2"
      />
      <span
        className="max-w-0 opacity-0 group-hover:max-w-[140px] group-hover:opacity-100 transition-all duration-300 whitespace-nowrap"
      >
        Generar menú
      </span>
    </div>
  </button>
</div>

</div>

</div>

</div>

    </div>
  );
};
