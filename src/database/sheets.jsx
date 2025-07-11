// sheets.jsx
const API_KEY = 'AIzaSyCo51QnHOkeax1-tMGcmIS4Ygo2-qr1qd8';
const SHEET_ID = '1amL7XhJcrlQSg9nvwWuOGlYY9G1pfJuXTsTEezHUCRw';

/**
 * Inyecta dinámicamente el script de gapi y espera a que `gapi.load` esté disponible.
 * Si la librería gapi ya está cargada y su función load() existe, no hace nada.
 */
async function injectGapiScript() {
  // Si ya está completamente cargado
  if (typeof window.gapi !== 'undefined' && typeof window.gapi.load === 'function') {
    return;
  }

  return new Promise((resolve, reject) => {
    const MAX_RETRIES = 5;
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
      // Script ya existe: verificar periódicamente
      checkGapi();
    } else {
      // Crear nuevo script
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


/**
 * Inicializa el cliente gapi con Sheets API.
 */
async function initGapiClient() {
  await new Promise((resolve, reject) => {
    window.gapi.load('client', { //cargar el módulo del cliente (Sheets API, etc).
      callback: resolve,
      onerror: () => reject(new Error('gapi.client no pudo inicializarse')),
    });
  });
  await window.gapi.client.init({ //Inicializa el cliente con tu API Key
    apiKey: API_KEY,
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  });
}

/**
 * Asegura que gapi y su cliente estén listos.
 */
async function ensureGapiLoaded() {
  await injectGapiScript();
  await initGapiClient();
}

/**
 * Lee un rango genérico de Google Sheets.
 */
async function leerRango(range) {
  await ensureGapiLoaded();
  const response = await window.gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range,
  });
  return response.result.values || [];
}

/**
 * Convierte URLs de Drive a links embed.
 */
function convertirLinkDrive(url) {
  const match = url.match(/\/file\/d\/(.*?)\//);
  return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : url;
}

const HOJAS = [
  { nombre: 'Hoja1', rango: 'Lubricantes!A:F' },
  { nombre: 'Hoja2', rango: 'Juguetes!A:F' },
  { nombre: 'Hoja3', rango: 'Lenceria!A:F' }
];

export async function cargarProductosDesdeSheets() { //Exporta una función asíncrona que obtendrá datos desde Google Sheets.
  try {
    let todosLosDatos = [];

    for (const rango of HOJAS) {
      const values = await leerRango(rango.rango);
      if (values.length <= 1) continue;
//slice ignorael encabezado de la hoja de datos
      const datos = values.slice(1).map(row => ({
        id: row[0] || '',
        nombre: row[1] || '',
        precio: row[2] || '',
        rebaja: row[3] || '',
        descripcion: row[4] || '',
        imagen: convertirLinkDrive(row[5] || ''),
      }));
      todosLosDatos.push(...datos);
    }
    todosLosDatos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    return todosLosDatos;
  } catch (error) { //si hay error, mostrar en consola
    console.error("Error al cargar datos:", error);
    return [];
  }
}

// Funciones específicas de carga:
export async function cargarDatosJuegoDesdeSheets() {
  try {
    const values = await leerRango('Hoja 3!A:B');
    if (values.length <= 1) return [];
    return values.slice(1)
      .map(row => ({ porcentaje: Number(row[0]) || 0, codigo: (row[1] || '').trim() }))
      .filter(e => e.codigo !== '');
  } catch (error) {
    console.error('Error al cargar datos de juego:', error);
    throw error;
  }
}

export async function cargarCombosDesdeSheets() {
  try {
    const values = await leerRango('Combos!A:E');
    if (values.length <= 1) return [];
    const map = {};
    values.slice(1).forEach(row => {
      const [id, nombre, precio, descr, img] = row;
      if (!map[id]) map[id] = { id, productos: [], precio: precio || '', descripcion: descr || '', imagenes: [] };
      if (nombre) map[id].productos.push(nombre);
      if (img) map[id].imagenes.push(img);
    });
    return Object.values(map);
  } catch (error) {
    console.error('Error al cargar combos:', error);
    throw error;
  }
}

export async function cargarJuguetesDesdeSheets() {
  try {
    const values = await leerRango('Juguetes!A:G');
    if (values.length <= 1) return [];
    return values.slice(1).map(row => ({
      id: row[0] || '',
      nombre: row[1] || '',
      precio: row[2] || '',
      rebaja: row[3] || '',
      descripcion: row[4] || '',
      imagen: convertirLinkDrive(row[5] || ''),
            stock: Number(row[6]) || 0 // Nueva columna Stock convertida a número

    }));
  } catch (error) {
    console.error('Error al cargar Juguetes:', error);
    throw error;
  }
}

export async function cargarLenceriaDesdeSheets() {
  try {
    const values = await leerRango('Lenceria!A:G');
    if (values.length <= 1) return [];
    return values.slice(1).map(row => ({
      id: row[0] || '',
      nombre: row[1] || '',
      precio: row[2] || '',
      rebaja: row[3] || '',
      descripcion: row[4] || '',
      imagen: convertirLinkDrive(row[5] || ''),
      stock: Number(row[6]) || 0 // Nueva columna Stock convertida a número

    }));
  } catch (error) {
    console.error('Error al cargar Lencería:', error);
    throw error;
  }
}

export async function cargarLubricantesDesdeSheets() {
  try {
    const values = await leerRango('Lubricantes!A:G'); // Cambiado a A:G para incluir la columna Stock
    if (values.length <= 1) return [];
    return values.slice(1).map(row => ({
      id: row[0] || '',
      nombre: row[1] || '',
      precio: row[2] || '',
      rebaja: row[3] || '',
      descripcion: row[4] || '',
      imagen: convertirLinkDrive(row[5] || ''),
      stock: Number(row[6]) || 0 // Nueva columna Stock convertida a número
    }));
  } catch (error) {
    console.error('Error al cargar Lubricantes:', error);
    throw error;
  }
}
export async function cargarPromocionesDesdeSheets() {
  try {
    const [lenceria, juguetes, lubricantes] = await Promise.all([
      cargarLenceriaDesdeSheets(),
      cargarJuguetesDesdeSheets(),
      cargarLubricantesDesdeSheets()
    ]);

    // Filtrar productos con rebaja > 0
    const conRebaja = (producto) => Number(producto.rebaja) > 0;

    // Etiquetar la categoría si deseas mostrarla luego
    const marcarCategoria = (productos, categoria) =>
      productos.filter(conRebaja).map(p => ({ ...p, categoria }));

    const promociones = [
      ...marcarCategoria(lenceria, 'Lencería'),
      ...marcarCategoria(juguetes, 'Juguetes'),
      ...marcarCategoria(lubricantes, 'Lubricantes')
    ];

    return promociones;
  } catch (error) {
    console.error('Error al cargar promociones:', error);
    throw error;
  }
}
