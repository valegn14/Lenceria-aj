import React, { useEffect, useState } from "react";
import { cargarCombosDesdeSheets } from "../database/sheets";

const Combos = () => {
  const [combos, setCombos] = useState([]);

  useEffect(() => {
    async function cargarCombos() {
      try {
        const datos = await cargarCombosDesdeSheets();
        setCombos(datos);
      } catch (error) {
        console.error("Error al cargar combos:", error);
      }
    }
    cargarCombos();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-6">Combos Especiales</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {combos.map((combo, comboIndex) => (
          <div
            key={`combo-${comboIndex}`}
            className="bg-white rounded-xl shadow-md p-6 border border-pink-100"
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {combo.imagenes.map((imgUrl, imgIndex) => (
                <img
                  key={`combo-${comboIndex}-img-${imgIndex}`}
                  src={imgUrl}
                  alt={`Imagen ${imgIndex + 1}`}
                  className="h-24 sm:h-32 w-auto rounded-md object-cover"
                />
              ))}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Combo #{combo.id || comboIndex + 1}</h3>
            {combo.descripcion && (
              <p className="text-sm text-gray-600 italic mb-3">{combo.descripcion}</p>
            )}
            <ul className="list-disc list-inside mb-3 text-gray-700">
              {combo.productos.map((p, i) => (
                <li key={`combo-${comboIndex}-prod-${i}`}>{p}</li>
              ))}
            </ul>
            <div className="text-right font-bold text-pink-600 text-lg">
              ${combo.precio}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Combos;

