import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface PreferencesResponse {
  positive: string[];
  negative: string[];
}

interface PreferencesModalProps {
  userId: number;
  onClose: () => void;
}

export default function PreferencesModal({ userId, onClose }: PreferencesModalProps) {
  const [loading, setLoading] = useState(true);
  const [preferences, setPreferences] = useState<PreferencesResponse>({
    positive: [],
    negative: [],
  });

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/preferences/get?user_id=${userId}`
        );
        const data = await res.json();
        setPreferences(data);
      } catch (err) {
        console.error("Error al cargar preferencias:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, [userId]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">

        {/* Header */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Preferencias
        </h2>

        {loading ? (
          <p className="text-gray-600">Cargando...</p>
        ) : (
          <div className="space-y-6">

            {/* POSITIVAS */}
            <div>
              <h3 className="text-sm font-semibold text-emerald-600 mb-2">
                Recetas que te gustaron
              </h3>

              {preferences.positive.length === 0 ? (
                <p className="text-gray-500 text-sm">No hay recetas aún.</p>
              ) : (
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                  {preferences.positive.map((name, i) => (
                    <li key={i}>{name}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* NEGATIVAS */}
            <div>
              <h3 className="text-sm font-semibold text-red-600 mb-2">
                Recetas que no te gustaron
              </h3>

              {preferences.negative.length === 0 ? (
                <p className="text-gray-500 text-sm">No hay recetas aún.</p>
              ) : (
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                  {preferences.negative.map((name, i) => (
                    <li key={i}>{name}</li>
                  ))}
                </ul>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}


