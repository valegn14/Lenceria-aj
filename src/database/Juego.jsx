// Juego.jsx
import { useState, useEffect } from 'react';
import { cargarDatosJuegoDesdeSheets } from './sheets'; // ajusta path según tu estructura

export function useJuegoData() {
  const [entries, setEntries] = useState([]); // cada entry: { porcentaje, codigo }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    cargarDatosJuegoDesdeSheets()
      .then(data => {
        if (mounted) {
          setEntries(data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error(err);
        if (mounted) {
          setError(err);
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Validar código (no distingue mayúsc/minúsc)
  const validarCodigo = (code) => {
    if (!code) return false;
    return entries.some(entry => entry.codigo.toUpperCase() === code.trim().toUpperCase());
  };

  // Obtener un índice aleatorio dentro de entries
  const obtenerIndexAleatorio = () => {
    if (!entries.length) return null;
    return Math.floor(Math.random() * entries.length);
  };

  // (Opcional) obtener porcentaje de un índice
  const obtenerPorcentajePorIndex = (index) => {
    if (index == null || index < 0 || index >= entries.length) return null;
    return entries[index].porcentaje;
  };

  return {
    entries,
    loading,
    error,
    validarCodigo,
    obtenerIndexAleatorio,
    obtenerPorcentajePorIndex,
  };
}
