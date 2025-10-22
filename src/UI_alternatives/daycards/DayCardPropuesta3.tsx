import React from "react";

interface DayCardProps {
  dayNumber: number;
  dishes: string[];
}

/* ===========================================================
   🟢 TARJETA 3 – Línea superior verde, fondo sutil y elegante
=========================================================== */
const DayCard3: React.FC<DayCardProps> = ({ dayNumber, dishes }) => (
  <div className="w-44 h-44 bg-green-50 border border-green-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
    <div className="h-1 bg-green-500"></div>
    <div className="text-center text-green-700 font-semibold mt-2">
      Día {dayNumber}
    </div>
    <div className="mx-4 border-t border-green-200 my-2"></div>
    <div className="flex flex-col justify-center items-center flex-1 space-y-1">
      {dishes.map((d, i) => (
        <p key={i} className="text-green-900 text-sm text-center font-medium">
          {d}
        </p>
      ))}
    </div>
  </div>
);

export { DayCard3 };
