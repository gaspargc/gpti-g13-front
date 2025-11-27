export type TagData = {
  id: number;
  label: string;
  related_ids: number[];
};

export const ALL_TAGS: TagData[] = 
[
  {
    "id": 1,
    "label": "Saludable",
    "related_ids": [5, 7, 8, 26]
  },
  {
    "id": 2,
    "label": "Vegano",
    "related_ids": [3, 9, 42, 96]
  },
  {
    "id": 3,
    "label": "Vegetariano",
    "related_ids": [2, 9, 42, 73]
  },
  {
    "id": 4,
    "label": "Sin gluten",
    "related_ids": [5, 45, 77, 92]
  },
  {
    "id": 5,
    "label": "Bajo en carbohidratos",
    "related_ids": [4, 7, 27, 78]
  },
  {
    "id": 6,
    "label": "Alto en proteínas",
    "related_ids": [28, 65, 95, 97]
  },
  {
    "id": 7,
    "label": "Bajo en calorías",
    "related_ids": [1, 5, 47, 92]
  },
  {
    "id": 8,
    "label": "Rico en fibra",
    "related_ids": [1, 11, 48, 77]
  },
  {
    "id": 9,
    "label": "Sin lácteos",
    "related_ids": [2, 3, 42, 73]
  },
  {
    "id": 10,
    "label": "Sin azúcar",
    "related_ids": [5, 7, 65, 78]
  },
  {
    "id": 11,
    "label": "Orgánico",
    "related_ids": [8, 12, 13, 48]
  },
  {
    "id": 12,
    "label": "Local",
    "related_ids": [11, 13, 56, 57]
  },
  {
    "id": 13,
    "label": "Sostenible",
    "related_ids": [11, 12, 71, 90]
  },
  {
    "id": 14,
    "label": "Rápido",
    "related_ids": [15, 16, 38, 61]
  },
  {
    "id": 15,
    "label": "Fácil de preparar",
    "related_ids": [14, 16, 18, 62]
  },
  {
    "id": 16,
    "label": "Económico",
    "related_ids": [14, 15, 18, 61]
  },
  {
    "id": 17,
    "label": "Gourmet",
    "related_ids": [30, 31, 32, 34]
  },
  {
    "id": 18,
    "label": "Familiar",
    "related_ids": [15, 16, 35, 37]
  },
  {
    "id": 19,
    "label": "Picante",
    "related_ids": [20, 32, 33, 36]
  },
  {
    "id": 20,
    "label": "Dulce",
    "related_ids": [19, 21, 39, 10]
  },
  {
    "id": 21,
    "label": "Salado",
    "related_ids": [20, 22, 25, 24]
  },
  {
    "id": 22,
    "label": "Ácido",
    "related_ids": [21, 23, 19, 84]
  },
  {
    "id": 23,
    "label": "Amargo",
    "related_ids": [22, 24, 88, 89]
  },
  {
    "id": 24,
    "label": "Umami",
    "related_ids": [21, 23, 30, 33]
  },
  {
    "id": 25,
    "label": "Bajo en sodio",
    "related_ids": [21, 66, 67, 79]
  },
  {
    "id": 26,
    "label": "Alto en vitaminas",
    "related_ids": [1, 8, 48, 83]
  },
  {
    "id": 27,
    "label": "Keto",
    "related_ids": [5, 6, 47, 95]
  },
  {
    "id": 28,
    "label": "Paleo",
    "related_ids": [6, 11, 48, 76]
  },
  {
    "id": 29,
    "label": "Mediterráneo",
    "related_ids": [1, 46, 48, 83]
  },
  {
    "id": 30,
    "label": "Asiático",
    "related_ids": [17, 24, 33, 74]
  },
  {
    "id": 31,
    "label": "Italiano",
    "related_ids": [17, 29, 77, 94]
  },
  {
    "id": 32,
    "label": "Mexicano",
    "related_ids": [17, 19, 90, 94]
  },
  {
    "id": 33,
    "label": "Indio",
    "related_ids": [17, 19, 24, 75]
  },
  {
    "id": 34,
    "label": "Francés",
    "related_ids": [17, 29, 60, 94]
  },
  {
    "id": 35,
    "label": "Desayuno",
    "related_ids": [14, 38, 81, 88]
  },
  {
    "id": 36,
    "label": "Almuerzo",
    "related_ids": [18, 37, 61, 94]
  },
  {
    "id": 37,
    "label": "Cena",
    "related_ids": [18, 36, 60, 94]
  },
  {
    "id": 38,
    "label": "Snack",
    "related_ids": [14, 35, 62, 81]
  },
  {
    "id": 39,
    "label": "Postre",
    "related_ids": [20, 10, 39, 62]
  },
  {
    "id": 40,
    "label": "Bebida",
    "related_ids": [80, 82, 86, 88]
  },
  {
    "id": 41,
    "label": "Sin nueces",
    "related_ids": [42, 43, 44, 92]
  },
  {
    "id": 42,
    "label": "Sin huevos",
    "related_ids": [2, 3, 9, 73]
  },
  {
    "id": 43,
    "label": "Sin mariscos",
    "related_ids": [2, 41, 44, 90]
  },
  {
    "id": 44,
    "label": "Sin soja",
    "related_ids": [41, 43, 45, 92]
  },
  {
    "id": 45,
    "label": "Sin trigo",
    "related_ids": [4, 44, 76, 77]
  },
  {
    "id": 46,
    "label": "Alto en omega-3",
    "related_ids": [29, 48, 83, 95]
  },
  {
    "id": 47,
    "label": "Bajo en grasas",
    "related_ids": [5, 7, 27, 67]
  },
  {
    "id": 48,
    "label": "Rico en antioxidantes",
    "related_ids": [1, 8, 11, 26]
  },
  {
    "id": 49,
    "label": "Probiótico",
    "related_ids": [50, 83, 84, 92]
  },
  {
    "id": 50,
    "label": "Fermentado",
    "related_ids": [49, 74, 75, 84]
  },
  {
    "id": 51,
    "label": "Crudo",
    "related_ids": [11, 28, 76, 84]
  },
  {
    "id": 52,
    "label": "Cocido al vapor",
    "related_ids": [1, 15, 29, 94]
  },
  {
    "id": 53,
    "label": "Asado",
    "related_ids": [17, 18, 28, 60]
  },
  {
    "id": 54,
    "label": "Frito",
    "related_ids": [19, 32, 54, 94]
  },
  {
    "id": 55,
    "label": "Horneado",
    "related_ids": [15, 31, 55, 77]
  },
  {
    "id": 56,
    "label": "Verano",
    "related_ids": [12, 57, 80, 84]
  },
  {
    "id": 57,
    "label": "Invierno",
    "related_ids": [12, 56, 60, 83]
  },
  {
    "id": 58,
    "label": "Otoño",
    "related_ids": [12, 59, 57, 60]
  },
  {
    "id": 59,
    "label": "Primavera",
    "related_ids": [12, 58, 56, 84]
  },
  {
    "id": 60,
    "label": "Festivo",
    "related_ids": [17, 34, 37, 53]
  },
  {
    "id": 61,
    "label": "Diario",
    "related_ids": [14, 16, 36, 37]
  },
  {
    "id": 62,
    "label": "Infantil",
    "related_ids": [15, 38, 39, 62]
  },
  {
    "id": 63,
    "label": "Para adultos",
    "related_ids": [63, 64, 66, 82]
  },
  {
    "id": 64,
    "label": "Para deportistas",
    "related_ids": [6, 81, 93, 95]
  },
  {
    "id": 65,
    "label": "Para diabéticos",
    "related_ids": [5, 10, 65, 78]
  },
  {
    "id": 66,
    "label": "Para hipertensos",
    "related_ids": [25, 66, 79, 92]
  },
  {
    "id": 67,
    "label": "Bajo en colesterol",
    "related_ids": [25, 47, 67, 29]
  },
  {
    "id": 68,
    "label": "Alto en calcio",
    "related_ids": [9, 68, 73, 95]
  },
  {
    "id": 69,
    "label": "Alto en hierro",
    "related_ids": [6, 69, 83, 95]
  },
  {
    "id": 70,
    "label": "Vegano estricto",
    "related_ids": [2, 76, 96, 70]
  },
  {
    "id": 71,
    "label": "Flexitariano",
    "related_ids": [3, 13, 71, 98]
  },
  {
    "id": 72,
    "label": "Pescetariano",
    "related_ids": [3, 29, 46, 72]
  },
  {
    "id": 73,
    "label": "Ovo-lacto vegetariano",
    "related_ids": [3, 9, 42, 73]
  },
  {
    "id": 74,
    "label": "Macrobiótico",
    "related_ids": [30, 50, 74, 76]
  },
  {
    "id": 75,
    "label": "Ayurveda",
    "related_ids": [33, 50, 75, 83]
  },
  {
    "id": 76,
    "label": "Sin procesados",
    "related_ids": [11, 28, 45, 51]
  },
  {
    "id": 77,
    "label": "Integral",
    "related_ids": [4, 8, 45, 77]
  },
  {
    "id": 78,
    "label": "Bajo índice glucémico",
    "related_ids": [5, 10, 65, 78]
  },
  {
    "id": 79,
    "label": "Alto en potasio",
    "related_ids": [25, 66, 79, 83]
  },
  {
    "id": 80,
    "label": "Hidratante",
    "related_ids": [40, 56, 80, 84]
  },
  {
    "id": 81,
    "label": "Energético",
    "related_ids": [35, 38, 64, 81]
  },
  {
    "id": 82,
    "label": "Relajante",
    "related_ids": [40, 63, 82, 88]
  },
  {
    "id": 83,
    "label": "Inmunoestimulante",
    "related_ids": [26, 46, 57, 69]
  },
  {
    "id": 84,
    "label": "Detox",
    "related_ids": [22, 49, 51, 56]
  },
  {
    "id": 85,
    "label": "Antiinflamatorio",
    "related_ids": [29, 48, 75, 83]
  },
  {
    "id": 86,
    "label": "Sin alcohol",
    "related_ids": [40, 86, 88, 92]
  },
  {
    "id": 87,
    "label": "Con alcohol",
    "related_ids": [40, 60, 87, 94]
  },
  {
    "id": 88,
    "label": "Sin cafeína",
    "related_ids": [35, 40, 82, 88]
  },
  {
    "id": 89,
    "label": "Con cafeína",
    "related_ids": [35, 81, 89, 94]
  },
  {
    "id": 90,
    "label": "Halal",
    "related_ids": [13, 32, 43, 90]
  },
  {
    "id": 91,
    "label": "Kosher",
    "related_ids": [13, 90, 91, 98]
  },
  {
    "id": 92,
    "label": "Bajo en FODMAP",
    "related_ids": [4, 7, 41, 49]
  },
  {
    "id": 93,
    "label": "Alto en carbohidratos",
    "related_ids": [64, 77, 93, 98]
  },
  {
    "id": 94,
    "label": "Equilibrado",
    "related_ids": [29, 31, 36, 37]
  },
  {
    "id": 95,
    "label": "Proteico",
    "related_ids": [6, 27, 64, 68]
  },
  {
    "id": 96,
    "label": "Vegetal",
    "related_ids": [2, 70, 96, 11]
  },
  {
    "id": 97,
    "label": "Carnívoro",
    "related_ids": [6, 97, 28, 95]
  },
  {
    "id": 98,
    "label": "Omnívoro",
    "related_ids": [71, 91, 93, 98]
  },
  {
    "id": 99,
    "label": "Bajo en purinas",
    "related_ids": [66, 92, 99, 25]
  },
  {
    "id": 100,
    "label": "Rico en colágeno",
    "related_ids": [6, 95, 100, 69]
  }
]