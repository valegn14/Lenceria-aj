const API_KEY = 'AIzaSyDzg3YXJpvDjXJWuMAz2yJN9_E-ZFT3UTY';
const SHEET_ID = '1vgHmgT1wNeUSK_hFaPJgDE19Vnwl2Tk9Czcv3WRR37Q';

// Pestañas de productos de la hoja. Todas usan las columnas:
// Id | Nombre | Precio | rebaja | Descripción | Imagen | Stock | Imagen2
const HOJAS_PRODUCTOS = [
  'Lubricantes',
  'Juguetes',
  'Lenceria',
  'LenceriaH',
  'SetBasicos',
  'Corsets',
  'Bodys',
  'Pijamas',
  'Conjuntos',
  'Medias',
  'Pantys',
  'Babydolls',
  'Disfraces',
  'Mallas',
  'Tejidos',
  'Suplementos',
  'Higiene',
  'Bronceadores',
];

const TTL_POR_DEFECTO = 5 * 60 * 1000;
const TTL_COMBOS = 10 * 60 * 1000;

// ========== CACHÉ ==========
// Guarda cada resultado unos minutos y comparte la misma petición si llegan varias a la vez
const cache = new Map();
const cargasEnCurso = new Map();

async function conCache(clave, cargar, { forceRefresh = false, ttl = TTL_POR_DEFECTO } = {}) {
  const guardado = cache.get(clave);
  if (!forceRefresh && guardado && Date.now() - guardado.timestamp < ttl) {
    return guardado.data;
  }

  if (cargasEnCurso.has(clave)) return cargasEnCurso.get(clave);

  const promesa = (async () => {
    try {
      const data = await cargar();
      cache.set(clave, { data, timestamp: Date.now() });
      return data;
    } finally {
      cargasEnCurso.delete(clave);
    }
  })();

  cargasEnCurso.set(clave, promesa);
  return promesa;
}

// Función para limpiar caché (útil para forzar actualizaciones)
export function limpiarCache(clave = null) {
  if (clave) cache.delete(clave);
  else cache.clear();
}

// ========== CONEXIÓN CON GOOGLE SHEETS ==========
async function injectGapiScript() {
  if (typeof window.gapi !== 'undefined' && typeof window.gapi.load === 'function') {
    return;
  }

  return new Promise((resolve, reject) => {
    const MAX_RETRIES = 25;
    let retries = 0;

    const checkGapi = () => {
      if (typeof window.gapi !== 'undefined' && typeof window.gapi.load === 'function') {
        resolve();
      } else if (retries < MAX_RETRIES) {
        retries++;
        setTimeout(checkGapi, 300);
      } else {
        reject(new Error('gapi.load no está disponible tras reintentos'));
      }
    };

    const existingScript = document.querySelector('script[src*="apis.google.com/js/api.js"]');

    if (existingScript) {
      checkGapi();
    } else {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.async = true;
      script.defer = true;
      script.onload = () => checkGapi();
      script.onerror = () => reject(new Error('Error de red al cargar gapi'));
      document.head.appendChild(script);
    }
  });
}

async function initGapiClient() {
  await injectGapiScript();

  await new Promise((resolve, reject) => {
    window.gapi.load('client', {
      callback: resolve,
      onerror: () => reject(new Error('gapi.client no pudo inicializarse')),
    });
  });

  await window.gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  });
}

// El cliente se inicializa una sola vez; si falla, se reintenta en la siguiente lectura
let gapiListo = null;
function ensureGapiLoaded() {
  if (!gapiListo) {
    gapiListo = initGapiClient().catch((error) => {
      gapiListo = null;
      throw error;
    });
  }
  return gapiListo;
}

async function leerRango(range) {
  await ensureGapiLoaded();
  const response = await window.gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range,
  });
  return response.result.values || [];
}

// ========== CONVERSIÓN DE FILAS ==========
function convertirLinkDrive(url) {
  if (!url) return '';
  const match = url.match(/\/file\/d\/(.*?)\//);
  return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : url;
}

function procesarFilaProducto(row) {
  return {
    id: row[0] || '',
    nombre: row[1] || '',
    precio: row[2] || '',
    rebaja: row[3] || '',
    descripcion: row[4] || '',
    imagen: convertirLinkDrive(row[5] || ''),
    stock: Number(row[6]) || 0,
    imagen2: convertirLinkDrive(row[7] || ''),
  };
}

// ========== CARGA DE PRODUCTOS ==========
// Lee una pestaña completa de productos (sin la fila de encabezados)
export function cargarHoja(nombreHoja, forceRefresh = false) {
  return conCache(
    `hoja:${nombreHoja}`,
    async () => {
      const values = await leerRango(`${nombreHoja}!A:H`);
      return values.slice(1).filter((row) => row[0] || row[1]).map(procesarFilaProducto);
    },
    { forceRefresh }
  );
}

export const cargarLubricantesDesdeSheets = (forceRefresh) => cargarHoja('Lubricantes', forceRefresh);
export const cargarJuguetesDesdeSheets = (forceRefresh) => cargarHoja('Juguetes', forceRefresh);
export const cargarLenceriaDesdeSheets = (forceRefresh) => cargarHoja('Lenceria', forceRefresh);
export const cargarLenceriaHombreDesdeSheets = (forceRefresh) => cargarHoja('LenceriaH', forceRefresh);
export const cargarSuplementosDesdeSheets = (forceRefresh) => cargarHoja('Suplementos', forceRefresh);
export const cargarHigieneDesdeSheets = (forceRefresh) => cargarHoja('Higiene', forceRefresh);
export const cargarBronceadoresDesdeSheets = (forceRefresh) => cargarHoja('Bronceadores', forceRefresh);

// Todos los productos de todas las pestañas, ordenados por nombre (búsqueda y detalle)
export async function cargarProductosDesdeSheets(forceRefresh = false) {
  try {
    const hojas = await Promise.all(HOJAS_PRODUCTOS.map((hoja) => cargarHoja(hoja, forceRefresh)));
    return hojas.flat().sort((a, b) => a.nombre.localeCompare(b.nombre));
  } catch (error) {
    console.error('Error al cargar productos:', error);
    return [];
  }
}

// Las promociones son los productos con rebaja mayor a 0
export async function cargarPromocionesDesdeSheets(forceRefresh = false) {
  const productos = await cargarProductosDesdeSheets(forceRefresh);
  return productos.filter((producto) => Number(producto.rebaja) > 0);
}

// Solo las primeras filas de una pestaña, para la sección de destacados del inicio
export function cargarPrimerosProductos(nombreHoja, limit = 4) {
  return conCache(`primeros:${nombreHoja}:${limit}`, async () => {
    const values = await leerRango(`${nombreHoja}!A2:H${limit + 1}`);
    return values.map(procesarFilaProducto);
  });
}

// ========== COMBOS ==========
// Columnas: Numero_combo | Producto_nombre | Precio_total | Descripcion | Imagen
// Cada fila es un producto del combo; las filas con el mismo número forman un combo
export function cargarCombosDesdeSheets(forceRefresh = false) {
  return conCache(
    'combos',
    async () => {
      const values = await leerRango('Combos!A:E');
      const map = {};
      values.slice(1).forEach(([id, nombre, precio, descr, img]) => {
        if (!id) return;
        if (!map[id]) map[id] = { id, productos: [], precio: '', descripcion: '', imagenes: [] };
        // El precio y la descripción pueden venir en cualquier fila del combo
        if (!map[id].precio && precio) map[id].precio = precio;
        if (!map[id].descripcion && descr) map[id].descripcion = descr;
        if (nombre) map[id].productos.push(nombre);
        if (img) map[id].imagenes.push(convertirLinkDrive(img));
      });
      return Object.values(map);
    },
    { forceRefresh, ttl: TTL_COMBOS }
  );
}
