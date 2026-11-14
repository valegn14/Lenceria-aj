import { cargarHoja } from "../database/sheets";

// El slug de una opción es la última parte de su ruta ("/lenceria/mujer" -> "mujer")
export const slugDeRuta = (ruta) => ruta.split("/").filter(Boolean).pop();

// Convierte una lista { nombre, hoja, ruta } de data/categorias.js en opciones de PaginaSubcategorias.
// Se debe llamar a nivel de módulo para que fetchFn no cambie en cada render.
// Las siglas (nombres todo en mayúsculas, como "BDSM") se dejan tal cual en los textos
const enTexto = (nombre) => (nombre === nombre.toUpperCase() ? nombre : nombre.toLowerCase());

export const opcionesDesdeHojas = (subcategorias) =>
  subcategorias.map(({ nombre, hoja, ruta }) => ({
    nombre,
    ruta,
    titulo: nombre,
    descripcion: `Explora nuestra colección de ${enTexto(nombre)}.`,
    fetchFn: () => cargarHoja(hoja),
    loadingMessage: `Cargando ${enTexto(nombre)}...`,
  }));
