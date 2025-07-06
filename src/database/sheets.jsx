// sheets.jsx
const API_KEY = 'AIzaSyCo51QnHOkeax1-tMGcmIS4Ygo2-qr1qd8';
const SHEET_ID = '1amL7XhJcrlQSg9nvwWuOGlYY9G1pfJuXTsTEezHUCRw';

/**
 * Inyecta dinámicamente el script de gapi y espera a que `gapi.load` esté disponible.
 * Si la librería gapi ya está cargada y su función load() existe, no hace nada.
 */
async function injectGapiScript() {
  if (typeof window.gapi !== 'undefined' && typeof window.gapi.load === 'function') {
    return; // ya está cargado y tiene load
  }
  await new Promise((resolve, reject) => { //Busca si el script de Google ya fue inyectado. Si sí, espera un rato a que se active.
    const existing = document.querySelector('script[src*="apis.google.com/js/api.js"]');
    if (existing) {
      // si ya existe, esperar un poco a que defina load
      return setTimeout(() => {
        if (window.gapi && typeof window.gapi.load === 'function') resolve();
        else reject(new Error('gapi.load no está disponible'));
      }, 100);
    }
    //Si no encuentra el script, lo crea y lo agrega al DOM para cargar la librería de Google.
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => { //Cuando termina de cargar, espera 50ms y verifica que gapi.load() exista. Si no, error.
      // dar un breve margen para inicialización interna
      setTimeout(() => {
        if (window.gapi && typeof window.gapi.load === 'function') resolve();
        else reject(new Error('gapi.load no está disponible tras carga'));
      }, 50);
    };
    script.onerror = () => reject(new Error('No se pudo cargar gapi'));
    document.body.appendChild(script);
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
    const values = await leerRango('Juguetes!A:F');
    if (values.length <= 1) return [];
    return values.slice(1).map(row => ({
      id: row[0] || '',
      nombre: row[1] || '',
      precio: row[2] || '',
      rebaja: row[3] || '',
      descripcion: row[4] || '',
      imagen: convertirLinkDrive(row[5] || ''),
    }));
  } catch (error) {
    console.error('Error al cargar Juguetes:', error);
    throw error;
  }
}

export async function cargarLenceriaDesdeSheets() {
  try {
    const values = await leerRango('Lenceria!A:F');
    if (values.length <= 1) return [];
    return values.slice(1).map(row => ({
      id: row[0] || '',
      nombre: row[1] || '',
      precio: row[2] || '',
      rebaja: row[3] || '',
      descripcion: row[4] || '',
      imagen: convertirLinkDrive(row[5] || ''),
    }));
  } catch (error) {
    console.error('Error al cargar Lencería:', error);
    throw error;
  }
}

export async function cargarLubricantesDesdeSheets() {
  try {
    const values = await leerRango('Lubricantes!A:F');
    if (values.length <= 1) return [];
    return values.slice(1).map(row => ({
      id: row[0] || '',
      nombre: row[1] || '',
      precio: row[2] || '',
      rebaja: row[3] || '',
      descripcion: row[4] || '',
      imagen: convertirLinkDrive(row[5] || ''),
    }));
  } catch (error) {
    console.error('Error al cargar Lubricantes:', error);
    throw error;
  }
}

// // Función que asegura que gapi esté listo
// async function ensureGapiLoaded() {
//   if (!window.gapi || !gapi.load) {
//     throw new Error("gapi no está definido o no se ha cargado correctamente");
//   }

//   await new Promise((resolve, reject) => {
//     gapi.load('client', async () => {
//       try {
//         await gapi.client.init({
//           apiKey: API_KEY,
//           discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
//         });
//         resolve();
//       } catch (err) {
//         reject(err);
//       }
//     });
//   });
// }

// function convertirLinkDrive(url) {
//   const match = url.match(/\/file\/d\/(.*?)\//);
//   if (match && match[1]) {
//     return `https://drive.google.com/uc?export=view&id=${match[1]}`;
//   }
//   return url;
// }

// export async function cargarProductosDesdeSheets() {
//   try {
//     await ensureGapiLoaded();
//     const response = await gapi.client.sheets.spreadsheets.values.get({
//       spreadsheetId: SHEET_ID,
//       range: 'Hoja 1!A:F',
//     });

//     const values = response.result.values;
//     if (!values || values.length === 0) return [];

//     const rows = values.slice(1);
//     return rows.map(row => ({
//       id: row[0] || '',
//       nombre: row[1] || '',
//       precio: row[2] || '',
//       rebaja: row[3] || '',
//       descripcion: row[4] || '',
//       imagen: convertirLinkDrive(row[5] || ''),
//     }));
//   } catch (error) {
//     console.error('Error al cargar productos:', error);
//     throw error;
//   }
// }

// export async function cargarDatosJuegoDesdeSheets() {
//   try {
//     await ensureGapiLoaded();
//     const response = await gapi.client.sheets.spreadsheets.values.get({
//       spreadsheetId: SHEET_ID,
//       range: 'Hoja 3!A:B',
//     });

//     const values = response.result.values;
//     if (!values || values.length <= 1) return [];

//     return values.slice(1).map(row => {
//       const porcentaje = Number(row[0] || '');
//       return {
//         porcentaje: isNaN(porcentaje) ? 0 : porcentaje,
//         codigo: (row[1] || '').toString().trim(),
//       };
//     }).filter(entry => entry.codigo !== '');
//   } catch (error) {
//     console.error('Error al cargar datos de juego:', error);
//     throw error;
//   }
// }

// export async function cargarCombosDesdeSheets() {
//   try {
//     await ensureGapiLoaded();
//     const response = await gapi.client.sheets.spreadsheets.values.get({
//       spreadsheetId: SHEET_ID,
//       range: 'Combos!A:E',
//     });

//     const values = response.result.values;
//     if (!values || values.length <= 1) return [];

//     const rows = values.slice(1);
//     const combosMap = {};

//     rows.forEach(row => {
//       const id = row[0];
//       const nombre = row[1];
//       const precio = row[2];
//       const descripcion = row[3];
//       const imagen = row[4];

//       if (!combosMap[id]) {
//         combosMap[id] = {
//           id,
//           productos: [],
//           precio: precio || '',
//           descripcion: descripcion || '',
//           imagenes: [],
//         };
//       }

//       if (nombre) combosMap[id].productos.push(nombre);
//       if (imagen) combosMap[id].imagenes.push(imagen);
//     });

//     return Object.values(combosMap);
//   } catch (error) {
//     console.error('Error al cargar combos:', error);
//     throw error;
//   }
// }

// export async function cargarJuguetesDesdeSheets() {
//   try {
//     await ensureGapiLoaded();
//     const response = await gapi.client.sheets.spreadsheets.values.get({
//       spreadsheetId: SHEET_ID,
//       range: 'Juguetes!A:F',
//     });

//     const values = response.result.values;
//     if (!values || values.length === 0) return [];

//     const rows = values.slice(1);
//     return rows.map(row => ({
//       id: row[0] || '',
//       nombre: row[1] || '',
//       precio: row[2] || '',
//       rebaja: row[3] || '',
//       descripcion: row[4] || '',
//       imagen: convertirLinkDrive(row[5] || ''),
//     }));
//   } catch (error) {
//     console.error('Error al cargar Juguetes:', error);
//     throw error;
//   }
// }

// export async function cargarLenceriaDesdeSheets() {
//   try {
//     await ensureGapiLoaded();
//     const response = await gapi.client.sheets.spreadsheets.values.get({
//       spreadsheetId: SHEET_ID,
//       range: 'Lenceria!A:F',
//     });

//     const values = response.result.values;
//     if (!values || values.length === 0) return [];

//     const rows = values.slice(1);
//     return rows.map(row => ({
//       id: row[0] || '',
//       nombre: row[1] || '',
//       precio: row[2] || '',
//       rebaja: row[3] || '',
//       descripcion: row[4] || '',
//       imagen: convertirLinkDrive(row[5] || ''),
//     }));
//   } catch (error) {
//     console.error('Error al cargar Lencería:', error);
//     throw error;
//   }
// }

// export async function cargarLubricantesDesdeSheets() {
//   try {
//     await ensureGapiLoaded();
//     const response = await gapi.client.sheets.spreadsheets.values.get({
//       spreadsheetId: SHEET_ID,
//       range: 'Lubricantes!A:F',
//     });

//     const values = response.result.values;
//     if (!values || values.length === 0) return [];

//     const rows = values.slice(1);
//     return rows.map(row => ({
//       id: row[0] || '',
//       nombre: row[1] || '',
//       precio: row[2] || '',
//       rebaja: row[3] || '',
//       descripcion: row[4] || '',
//       imagen: convertirLinkDrive(row[5] || ''),
//     }));
//   } catch (error) {
//     console.error('Error al cargar Lubricantes:', error);
//     throw error;
//   }
// }