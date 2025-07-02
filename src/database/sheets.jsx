// sheets.jsx
const API_KEY = 'AIzaSyCo51QnHOkeax1-tMGcmIS4Ygo2-qr1qd8';
const SHEET_ID = '1amL7XhJcrlQSg9nvwWuOGlYY9G1pfJuXTsTEezHUCRw';

// 1) Asegura que gapi esté cargado e inicializado (inyección dinámica)
async function ensureGapiLoaded() {
  // Si window.gapi no existe, inyectamos el script y esperamos su carga
  if (typeof window.gapi === 'undefined') {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('No se pudo cargar gapi'));
      document.body.appendChild(script);
    });
  }

  // Carga del módulo 'client'
  await new Promise((resolve, reject) => {
    window.gapi.load('client', {
      callback: resolve,
      onerror: () => reject(new Error('gapi.client no pudo inicializarse')),
    });
  });

  // Inicialización del cliente con API Key y discoveryDocs
  await window.gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  });
}

// 2) Función genérica para leer cualquier rango de la hoja
async function leerRango(range) {
  await ensureGapiLoaded();
  const response = await window.gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range,
  });
  return response.result.values || [];
}

// 3) Utilidad para convertir links de Drive a preview
function convertirLinkDrive(url) {
  const match = url.match(/\/file\/d\/(.*?)\//);
  return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : url;
}

// 4) Funciones específicas de carga para cada hoja
export async function cargarProductosDesdeSheets() {
  try {
    const values = await leerRango('Hoja 1!A:F');
    if (values.length <= 1) return [];
    return values.slice(1).map(row => ({
      id:          row[0] || '',
      nombre:      row[1] || '',
      precio:      row[2] || '',
      rebaja:      row[3] || '',
      descripcion: row[4] || '',
      imagen:      convertirLinkDrive(row[5] || ''),
    }));
  } catch (error) {
    console.error('Error al cargar productos:', error);
    throw error;
  }
}

export async function cargarDatosJuegoDesdeSheets() {
  try {
    const values = await leerRango('Hoja 3!A:B');
    if (values.length <= 1) return [];
    return values.slice(1)
      .map(row => {
        const porcentaje = Number(row[0] || '');
        return {
          porcentaje: isNaN(porcentaje) ? 0 : porcentaje,
          codigo:     (row[1] || '').toString().trim(),
        };
      })
      .filter(entry => entry.codigo !== '');
  } catch (error) {
    console.error('Error al cargar datos de juego:', error);
    throw error;
  }
}

export async function cargarCombosDesdeSheets() {
  try {
    const values = await leerRango('Combos!A:E');
    if (values.length <= 1) return [];
    const rows = values.slice(1);
    const combosMap = {};

    rows.forEach(row => {
      const id          = row[0];
      const nombre      = row[1];
      const precio      = row[2];
      const descripcion = row[3];
      const imagen      = row[4];

      if (!combosMap[id]) {
        combosMap[id] = { id, productos: [], precio: precio || '', descripcion: descripcion || '', imagenes: [] };
      }
      if (nombre) combosMap[id].productos.push(nombre);
      if (imagen) combosMap[id].imagenes.push(imagen);
    });

    return Object.values(combosMap);
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
      id:          row[0] || '',
      nombre:      row[1] || '',
      precio:      row[2] || '',
      rebaja:      row[3] || '',
      descripcion: row[4] || '',
      imagen:      convertirLinkDrive(row[5] || ''),
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
      id:          row[0] || '',
      nombre:      row[1] || '',
      precio:      row[2] || '',
      rebaja:      row[3] || '',
      descripcion: row[4] || '',
      imagen:      convertirLinkDrive(row[5] || ''),
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
      id:          row[0] || '',
      nombre:      row[1] || '',
      precio:      row[2] || '',
      rebaja:      row[3] || '',
      descripcion: row[4] || '',
      imagen:      convertirLinkDrive(row[5] || ''),
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
