// src/utils/tagSampler.ts

import { TagData } from "./tagData";

/**
 * ⚙️ Parámetros de Configuración para el Muestreo de Tags
 * Estos valores pueden ajustarse para modificar el comportamiento del algoritmo.
 */
export const SAMPLER_PARAMS = {
  // Rango para la cantidad de tags a muestrear (z entre [x, y])
  MIN_TAGS_TO_SAMPLE: 8,
  MAX_TAGS_TO_SAMPLE: 12,

  // Configuración de ponderación por rango de ID
  ID_RANGES: 
  [
    { maxId: 10, weight: 1.0 }, // IDs 1-10 (más alta prioridad)
    { maxId: 26, weight: 0.6 }, // IDs 11-26 (prioridad media)
    { maxId: Infinity, weight: 0.3 }, // IDs 27+ (prioridad baja)
  ],

  // Probabilidad de forzar la inclusión de tags relacionados
  RELATED_TAG_WEIGHT_MULTIPLIER: 3.5, // Multiplicador de peso si el tag está en related_ids de un tag ya seleccionado
  RELATED_TAG_MAX_INCLUSION: 3, // Máximo de tags relacionados a incluir (si son muestreados)
};


/**
 * Genera un número aleatorio de tags a muestrear (z) dentro del rango [x, y].
 */
const getSampleCount = (): number => {
  const { MIN_TAGS_TO_SAMPLE, MAX_TAGS_TO_SAMPLE } = SAMPLER_PARAMS;
  return Math.floor(
    Math.random() * (MAX_TAGS_TO_SAMPLE - MIN_TAGS_TO_SAMPLE + 1) + MIN_TAGS_TO_SAMPLE
  );
};

/**
 * Asigna un peso inicial a cada tag basado en su ID.
 */
const getWeightById = (tagId: number): number => {
  for (const range of SAMPLER_PARAMS.ID_RANGES) {
    if (tagId <= range.maxId) {
      return range.weight;
    }
  }
  return 0.1; // Peso base si no se encuentra en rangos (debería ser cubierto por Infinity)
};

/**
 * Selecciona una cantidad de tags con muestreo ponderado.
 * * @param allTags La lista completa de tags.
 * @param selectedTagIds Los IDs de los tags ya seleccionados/usados que no deben ser elegidos.
 * @returns Un array de objetos TagData muestreados.
 */
export const sampleTags = (allTags: TagData[], selectedTagIds: number[]): TagData[] => {
  const sampleCount = getSampleCount();
  const availableTags = allTags.filter((tag) => !selectedTagIds.includes(tag.id));
  
  if (availableTags.length === 0) return [];
  
  const sampledTags: TagData[] = [];
  const tagsToSampleFrom = [...availableTags];
  
  // IDs relacionados que ya han sido seleccionados en una ronda anterior del muestreo actual
  let relatedIdsIncluded: number[] = []; 
  
  // Realiza el muestreo hasta alcanzar la cantidad deseada o agotar los tags disponibles
  while (sampledTags.length < sampleCount && tagsToSampleFrom.length > 0) {
    
    let totalWeight = 0;
    const weightedTags: { tag: TagData; weight: number }[] = [];

    // 1. Calcular pesos
    for (const tag of tagsToSampleFrom) {
      let weight = getWeightById(tag.id);

      // 2. Aumentar probabilidad si está relacionado con un tag ya muestreado
      const isRelated = sampledTags.some(sampled => 
        sampled.related_ids.includes(tag.id) && 
        !relatedIdsIncluded.includes(tag.id) // Solo si aún no hemos alcanzado el límite de relacionados
      );
      
      if (isRelated && relatedIdsIncluded.length < SAMPLER_PARAMS.RELATED_TAG_MAX_INCLUSION) {
        weight *= SAMPLER_PARAMS.RELATED_TAG_WEIGHT_MULTIPLIER;
      }
      
      weightedTags.push({ tag, weight });
      totalWeight += weight;
    }
    
    if (totalWeight === 0) break; // Evita división por cero si todos los pesos son 0
    
    // 3. Selección Ponderada
    let randomWeight = Math.random() * totalWeight;
    let selectedTag: TagData | null = null;
    
    for (const { tag, weight } of weightedTags) {
      if (randomWeight < weight) {
        selectedTag = tag;
        break;
      }
      randomWeight -= weight;
    }
    
    if (selectedTag) {
      sampledTags.push(selectedTag);
      
      // Marcar como tag relacionado si aplica
      const wasRelated = sampledTags.slice(0, -1).some(sampled => 
        sampled.related_ids.includes(selectedTag!.id)
      );
      if (wasRelated) {
          relatedIdsIncluded.push(selectedTag.id);
      }
      
      // Eliminar el tag seleccionado de la lista para la próxima iteración
      const index = tagsToSampleFrom.findIndex(t => t.id === selectedTag!.id);
      tagsToSampleFrom.splice(index, 1);

    } else {
        // En caso de que el cálculo falle (ej. error de punto flotante), forzamos el fin
        break;
    }
  }

  return sampledTags;
};