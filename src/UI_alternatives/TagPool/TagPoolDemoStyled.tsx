import React, { useState, useMemo, useEffect } from "react";
import { ALL_TAGS, TagData } from "./tagData"; 
import { BalancedTagPool } from "./BalancedTagPool";
import { PromptBar } from "./PromptBar";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";



type SelectedTag = {
  id: number; 
  color: string;
  label: string;
  secondaryIds: string[]; 
  conceptId?: string;
};





const TagPoolDemoStyled: React.FC = () => {

  const navigate = useNavigate();
  const allTags: TagData[] = ALL_TAGS; 
  const [inputText, setInputText] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<SelectedTag[]>([]);

  const getRandomColor = () => {
    const colors = ["#f87171","#34d399","#60a5fa","#facc15","#a78bfa"];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  const selectedTagIds = useMemo(() => {
    return selectedTags.map(tag => tag.id);
  }, [selectedTags]);

  const enabledTags = allTags;

  const handleSubmit = () => {
    const tagIdsToSend = selectedTags.map(tag => tag.id);
    
    console.log("Enviar Tags (IDs):", tagIdsToSend);

    navigate("/loading", { 
      state: { 
        text: inputText, 
        tagIds: tagIdsToSend 
      } 
    });
  };


  const handleSelect = (tag: TagData) => {
    if (!selectedTags.find((t) => t.id === tag.id)) {
      setSelectedTags([
        ...selectedTags, 
        { 
          id: tag.id, 
          label: tag.label, 
          color: getRandomColor(),
          secondaryIds: [], 
          conceptId: undefined
        }
      ]);
    }
  };

  
  const handleRemove = (st: SelectedTag) => {
    setSelectedTags((prev) => prev.filter((t) => t.id !== st.id));
  };

  return (
      <div className="flex-1 flex items-center justify-center overflow-auto mt-[200px] mr-10">
        <div className="sdp-6 flex flex-col gap-6 items-center">
          <h1 className="text-3xl font-semibold text-emerald-600">¿Listo para tu semana saludable?</h1>

          <div className="relative w-[600px] p-6 rounded-3xl flex flex-col gap-4">
            
            <PromptBar
              value={inputText}
              tags={selectedTags}
              onChange={setInputText}
              onSubmit={handleSubmit} 
              onRemoveTag={handleRemove}
            />

            <BalancedTagPool 
              allTags={enabledTags} 
              selectedTagIds={selectedTagIds}
              onTagSelect={handleSelect} 
            />
          </div>
        </div>
      </div>
  );
};

export { TagPoolDemoStyled };