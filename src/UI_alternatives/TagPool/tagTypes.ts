// Tipos de tag
export type TagType = "concept" | "secondary" | "individual";

export interface TagData {
  id: string;
  label: string;
  type: TagType;
  parentId?: string; // solo para secundarios
}