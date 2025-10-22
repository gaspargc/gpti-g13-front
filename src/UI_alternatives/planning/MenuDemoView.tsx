import React, { useState } from "react";
import { DayCard3 } from "../daycards/DayCardPropuesta3";
import DishDetailModal from "./DishDetailModal";

interface DishDetail {
  name: string;
  tags: string[];
  ingredients: string[];
  recipe: string[];
}

const menuData: DishDetail[] = [
  {
    name: "Ensalada Mediterránea",
    tags: ["Saludable", "Rápido", "Fresco", "Mediterránea"],
    ingredients: [
      "2 tomates grandes",
      "1 pepino",
      "1/2 cebolla morada",
      "100 g de queso feta",
      "10 aceitunas negras",
      "Aceite de oliva virgen extra",
      "Sal, pimienta y orégano al gusto"
    ],
    recipe: [
      "Lava y corta los tomates y el pepino en cubos.",
      "Corta la cebolla en tiras finas.",
      "Mezcla todo en un bol grande.",
      "Agrega las aceitunas y el queso feta desmenuzado.",
      "Aliña con aceite, sal, pimienta y orégano.",
      "Sirve inmediatamente o enfría antes de servir."
    ]
  },
  {
    name: "Pasta Italiana con Tomate y Albahaca",
    tags: ["Casero", "Italiano", "Económico", "Vegetariano"],
    ingredients: [
      "200 g de pasta (spaghetti o penne)",
      "3 tomates maduros",
      "2 dientes de ajo",
      "Un puñado de hojas de albahaca fresca",
      "2 cucharadas de aceite de oliva",
      "Queso parmesano rallado",
      "Sal y pimienta"
    ],
    recipe: [
      "Cocina la pasta al dente según las instrucciones del paquete.",
      "Saltea el ajo picado en aceite de oliva hasta que esté dorado.",
      "Agrega los tomates pelados y troceados. Cocina 10 minutos.",
      "Incorpora la albahaca, sal y pimienta.",
      "Mezcla la pasta con la salsa y sirve con parmesano encima."
    ]
  },
  {
    name: "Curry de Garbanzos",
    tags: ["Vegano", "Asiático", "Proteico", "Exótico"],
    ingredients: [
      "1 lata de garbanzos cocidos (400 g)",
      "1 cebolla",
      "2 dientes de ajo",
      "1 trozo pequeño de jengibre fresco",
      "1 cucharada de curry en polvo",
      "200 ml de leche de coco",
      "1 tomate",
      "Aceite vegetal y sal"
    ],
    recipe: [
      "Sofríe la cebolla, ajo y jengibre picados.",
      "Añade el curry en polvo y mezcla bien.",
      "Incorpora el tomate troceado y los garbanzos.",
      "Agrega la leche de coco y cocina 15 minutos a fuego suave.",
      "Rectifica sal y sirve con arroz blanco o pan naan."
    ]
  },
  {
    name: "Pollo al Horno con Limón y Romero",
    tags: ["Clásico", "Saludable", "Casero", "Proteico"],
    ingredients: [
      "2 muslos de pollo",
      "1 limón",
      "2 ramas de romero fresco",
      "2 dientes de ajo",
      "Aceite de oliva",
      "Sal y pimienta"
    ],
    recipe: [
      "Precalienta el horno a 200 °C.",
      "Coloca los muslos en una fuente y añade el jugo del limón.",
      "Agrega el romero, los ajos enteros y un chorrito de aceite.",
      "Salpica con sal y pimienta.",
      "Hornea durante 40 minutos o hasta que la piel esté dorada.",
      "Acompaña con papas asadas o verduras."
    ]
  },
  {
    name: "Tacos de Pescado con Col y Salsa de Yogur",
    tags: ["Rápido", "Ligero", "Mexicano", "Veraniego"],
    ingredients: [
      "2 filetes de pescado blanco (merluza o lenguado)",
      "4 tortillas de maíz",
      "1 taza de repollo rallado",
      "1 yogur natural",
      "1 cucharadita de jugo de limón",
      "1/2 cucharadita de comino",
      "Sal y pimienta"
    ],
    recipe: [
      "Cocina el pescado a la plancha con sal, pimienta y comino.",
      "Mezcla el yogur con limón y una pizca de sal para hacer la salsa.",
      "Calienta las tortillas.",
      "Coloca el pescado en tiras dentro de las tortillas.",
      "Añade el repollo rallado y la salsa de yogur por encima.",
      "Sirve con unas gotas de limón extra."
    ]
  },
 {
    name: "Sopa de Verduras Casera",
    tags: ["Saludable", "Reconfortante", "Bajo en Calorías", "Invierno"],
    ingredients: [
      "1 zanahoria grande",
      "1 papa",
      "1 rama de apio",
      "1/2 cebolla",
      "1 tomate maduro",
      "1 litro de caldo de verduras",
      "Aceite de oliva, sal y pimienta"
    ],
    recipe: [
      "Pela y corta todas las verduras en cubos pequeños.",
      "En una olla, sofríe la cebolla y el apio en aceite de oliva.",
      "Agrega la zanahoria, papa y tomate.",
      "Incorpora el caldo y cocina 25-30 minutos a fuego medio.",
      "Rectifica sal y pimienta y sirve caliente con perejil fresco."
    ]
  },
  {
    name: "Arroz con Pollo al Estilo Criollo",
    tags: ["Casero", "Tradicional", "Completo", "Latino"],
    ingredients: [
      "1 taza de arroz",
      "200 g de pollo troceado",
      "1/2 pimiento rojo",
      "1/2 cebolla",
      "1 diente de ajo",
      "1 taza de caldo de pollo",
      "Aceite, sal, pimienta y cúrcuma"
    ],
    recipe: [
      "Sofríe el pollo hasta que esté dorado.",
      "Agrega cebolla, ajo y pimiento picados, cocina 5 minutos.",
      "Incorpora el arroz y mezcla bien con el sofrito.",
      "Añade el caldo caliente y la cúrcuma.",
      "Cocina a fuego bajo 15 minutos o hasta que el arroz esté tierno.",
      "Deja reposar 5 minutos antes de servir."
    ]
  },
  {
    name: "Hamburguesa Casera con Pan Integral",
    tags: ["Rápido", "Económico", "Casero", "Alta en Proteínas"],
    ingredients: [
      "200 g de carne molida de vacuno o pollo",
      "1 pan integral para hamburguesa",
      "1 rodaja de tomate",
      "1 hoja de lechuga",
      "1 rodaja de queso",
      "Mostaza y mayonesa",
      "Sal y pimienta"
    ],
    recipe: [
      "Forma la carne en una hamburguesa y condimenta con sal y pimienta.",
      "Cocina a la plancha 3-4 minutos por lado.",
      "Tuesta el pan ligeramente.",
      "Monta la hamburguesa con lechuga, tomate, queso y salsas.",
      "Sirve con papas al horno o ensalada."
    ]
  },
  {
    name: "Curry Verde de Pollo con Coco",
    tags: ["Exótico", "Asiático", "Aromático", "Medio Picante"],
    ingredients: [
      "250 g de pechuga de pollo",
      "1 cebolla",
      "1 pimiento verde",
      "200 ml de leche de coco",
      "2 cucharaditas de pasta de curry verde",
      "Aceite de coco",
      "Sal y cilantro fresco"
    ],
    recipe: [
      "Corta el pollo en cubos y dóralo en aceite de coco.",
      "Agrega la cebolla y el pimiento picados.",
      "Añade la pasta de curry y mezcla bien.",
      "Vierte la leche de coco y cocina a fuego bajo 15 minutos.",
      "Decora con cilantro fresco y sirve con arroz jazmín."
    ]
  },
  {
    name: "Quiche de Espinaca y Queso",
    tags: ["Vegetariano", "Francés", "Horneado", "Energético"],
    ingredients: [
      "1 masa quebrada o de tarta",
      "150 g de espinacas frescas",
      "2 huevos",
      "100 ml de nata o crema",
      "80 g de queso rallado",
      "Sal, pimienta y nuez moscada"
    ],
    recipe: [
      "Extiende la masa en un molde y pínchala con un tenedor.",
      "Saltea las espinacas hasta que reduzcan su tamaño.",
      "Mezcla huevos, nata, queso, sal y nuez moscada.",
      "Agrega las espinacas y vierte sobre la masa.",
      "Hornea a 180 °C durante 30-35 minutos hasta dorar.",
      "Sirve tibio o frío con una ensalada verde."
    ]
  },
  {
    name: "Sushi Variado",
    tags: ["Asiático", "Fresco", "Ligero", "Elegante"],
    ingredients: [
      "200 g de arroz para sushi",
      "100 g de salmón fresco",
      "100 g de atún fresco",
      "Alga nori",
      "Aguacate",
      "Pepino",
      "Vinagre de arroz, azúcar y sal"
    ],
    recipe: [
      "Cocina el arroz para sushi y mezcla con vinagre, azúcar y sal.",
      "Corta el pescado, aguacate y pepino en tiras finas.",
      "Coloca una hoja de nori y extiende una capa de arroz.",
      "Añade relleno y enrolla firmemente con una esterilla.",
      "Corta los rollos en piezas iguales y sirve con salsa de soja."
    ]
  },
  {
    name: "Ensalada César con Pollo",
    tags: ["Rápido", "Saludable", "Clásico", "Proteico"],
    ingredients: [
      "1 lechuga romana",
      "200 g de pechuga de pollo a la plancha",
      "Crutones",
      "Queso parmesano rallado",
      "Aderezo César"
    ],
    recipe: [
      "Lava y corta la lechuga en trozos medianos.",
      "Corta el pollo en tiras y dóralo a la plancha.",
      "Mezcla lechuga, crutones y queso.",
      "Añade el pollo y adereza al gusto.",
      "Sirve inmediatamente."
    ]
  },
  {
    name: "Fajitas de Ternera con Pimientos",
    tags: ["Mexicano", "Picante", "Rápido", "Proteico"],
    ingredients: [
      "200 g de carne de ternera",
      "1 pimiento rojo",
      "1 pimiento verde",
      "1 cebolla",
      "Tortillas de trigo",
      "Aceite, sal y especias mexicanas"
    ],
    recipe: [
      "Corta la ternera en tiras y condimenta con especias.",
      "Saltea la carne en aceite caliente hasta dorar.",
      "Agrega los pimientos y cebolla cortados en tiras y cocina 5 minutos.",
      "Calienta las tortillas y rellénalas con la mezcla.",
      "Sirve con salsa picante o guacamole."
    ]
  },
  {
    name: "Crema de Calabaza con Nata",
    tags: ["Vegetariano", "Reconfortante", "Suave", "Invierno"],
    ingredients: [
      "500 g de calabaza pelada y troceada",
      "1 cebolla",
      "500 ml de caldo de verduras",
      "100 ml de nata líquida",
      "Sal, pimienta y nuez moscada"
    ],
    recipe: [
      "Sofríe la cebolla picada en un poco de aceite.",
      "Añade la calabaza y el caldo, cocina hasta que la calabaza esté tierna.",
      "Tritura la mezcla hasta obtener una crema suave.",
      "Incorpora la nata y sazona con sal, pimienta y nuez moscada.",
      "Sirve caliente con un chorrito de aceite de oliva."
    ]
  },
  {
  name: "Tacos de Pollo al Pastor",
  tags: ["rápido", "mexicano", "gourmet"],
  ingredients: [
    "Tortillas de maíz",
    "Pollo",
    "Piña",
    "Cebolla morada",
    "Cilantro",
    "Salsa al pastor"
  ],
  recipe: [
    "Marinar el pollo con especias al pastor durante 30 minutos.",
    "Asar el pollo hasta que esté dorado y cocido.",
    "Calentar las tortillas y colocar una porción de pollo en cada una.",
    "Añadir piña, cebolla morada y cilantro al gusto.",
    "Servir con salsa al pastor."
  ]
}
];

const shoppingDemo: ShoppingItem[] = [
  { name: "Arroz integral", quantity: "1 kg", notes: "Si no hay integral, puedes usar blanco" },
  { name: "Pollo (pechuga)", quantity: "1.5 kg", notes: "Sin piel para menor grasa" },
  { name: "Carne molida 5% grasa", quantity: "500 g × 4 unidades", notes: "Si no encuentras 5%, usar 10%" },
  { name: "Lechuga romana", quantity: "2 unidades", notes: "Lavar bien antes de usar" },
  { name: "Tomate cherry", quantity: "400 g", notes: "Si no hay cherry, usar tomates normales cortados en cubos" },
  { name: "Cebolla morada", quantity: "4 unidades", notes: "Opcional según receta" },
  { name: "Pasta integral", quantity: "500 g", notes: "Cocer al dente" },
  { name: "Queso feta", quantity: "300 g", notes: "Se puede reemplazar con queso fresco" },
  { name: "Aceite de oliva extra virgen", quantity: "500 ml", notes: "Usar para aliñar y cocinar" },
  { name: "Salmón fresco", quantity: "400 g", notes: "Si no hay fresco, usar congelado" },
  { name: "Aguacate", quantity: "3 unidades", notes: "Maduro pero firme" },
  { name: "Garbanzos cocidos", quantity: "500 g", notes: "Enlatados o cocidos caseros" },
  { name: "Limón", quantity: "4 unidades", notes: "Para aderezo y marinar" },
  { name: "Albahaca fresca", quantity: "50 g", notes: "Si no hay fresca, usar seca, 1 cucharadita" },
  { name: "Pan integral", quantity: "1 unidad", notes: "Para acompañar ensaladas o sándwiches" },
];



// Tipo actualizado
interface ShoppingItem {
  name: string;
  quantity: string;
  notes?: string;
}

// Componente actualizado
const ShoppingList: React.FC<{ items: ShoppingItem[] }> = ({ items }) => {
  return (
    <div className="bg-white p-6 rounded-xl w-120 shadow-md flex flex-col">
      <h2 className="text-2xl font-semibold mb-4 text-green-700 text-center">
        Lista de Compras
      </h2>
      <div className="overflow-y-auto flex-1" style={{ maxHeight: "480px" }}>
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={i} className="px-3 py-2 border-b border-gray-200">
              <div className="flex justify-between font-medium text-gray-800">
                <span>{item.name}</span>
                <span>{item.quantity}</span>
              </div>
              {item.notes && (
                <p className="text-sm text-gray-600 mt-1">{item.notes}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};



export const MenuDemoView: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Dividir en 3 filas de 5
  const rows = [
    menuData.slice(0, 5),
    menuData.slice(5, 10),
    menuData.slice(10, 15),
  ];

  return (
    <div className="fixed inset-0 bg-gray-100 flex flex-col gap-6 p-6 overflow-y-auto">

      {/* Título centrado respecto a todo el ancho */}
      <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
        Menú de 2 Semanas + 1 Día
      </h1>

      {/* Contenedor principal: calendario + lista de compras */}
      <div className="flex flex-row gap-8">

        {/* Columna izquierda: Menú de 15 días */}
        <div className="flex flex-col gap-6 w-4/5">
          {rows.map((week, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-6">
              {week.map((dish, i) => {
                const dayIndex = rowIndex * 5 + i;
                return (
                  <div
                    key={dayIndex}
                    className={selectedDay === dayIndex ? "ring-2 ring-green-500 rounded-xl" : ""}
                    onClick={() => setSelectedDay(dayIndex)}
                  >
                    <DayCard3 dayNumber={dayIndex + 1} dishes={[dish.name]} />
                  </div>
                );
              })}
            </div>
          ))}

          {/* Popup modal */}
          {selectedDay !== null && (
            <DishDetailModal
              dayNumber={selectedDay + 1}
              dish={menuData[selectedDay]}
              onClose={() => setSelectedDay(null)}
            />
          )}
        </div>

        {/* Columna derecha: Lista de compras */}
        <div className="w-2/5 flex justify-center items-start">
          <ShoppingList items={shoppingDemo} />
        </div>
      </div>
    </div>
  );
};
