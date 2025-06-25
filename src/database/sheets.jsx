// sheets.jsx
const API_KEY = 'AIzaSyCo51QnHOkeax1-tMGcmIS4Ygo2-qr1qd8';
const SHEET_ID = '1amL7XhJcrlQSg9nvwWuOGlYY9G1pfJuXTsTEezHUCRw';
const RANGE = 'Hoja 1!A:F';

export async function cargarProductosDesdeSheets() {
  try {
    // Asegúrate de que el cliente esté cargado antes de usarlo
    await new Promise((resolve, reject) => {
      gapi.load('client', async () => {
        try {
          await gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
          });
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    });

    const response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
    });

    const values = response.result.values;
    function convertirLinkDrive(url) {
      const match = url.match(/\/file\/d\/(.*?)\//);
      if (match && match[1]) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
      }
      return url;
    }
    
    if (!values || values.length === 0) return [];

    const rows = values.slice(1); // Saltamos encabezados

    const productos = rows.map(row => ({
      id: row[0] || '',
      nombre: row[1] || '',
      precio: row[2] || '',
      rebaja: row[3] || '',

      descripcion: row[4] || '',
      imagen: convertirLinkDrive(row[5] || ''),
    }));
    

    return productos;

  } catch (error) {
    console.error('Error al cargar productos:', error);
    throw error;
  }
}


// Rango apuntando a Hoja 2, columnas A y B.
const RANGO_JUEGO = 'Hoja 3!A:B';

export async function cargarDatosJuegoDesdeSheets() {
  try {
    // Cargar cliente gapi si no está cargado
    await new Promise((resolve, reject) => {
      gapi.load('client', async () => {
        try {
          await gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
          });
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    });

    const response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGO_JUEGO,
    });

    const values = response.result.values;
    if (!values || values.length <= 1) {
      // Sin datos o solo encabezado
      return [];
    }
    // Saltamos fila de encabezados
    const rows = values.slice(1);
    // Mapear a objetos { porcentaje: number, codigo: string }
    const datos = rows.map(row => {
      const porcentajeRaw = row[0] || '';
      const codigoRaw = row[1] || '';
      const porcentaje = Number(porcentajeRaw);
      return {
        porcentaje: isNaN(porcentaje) ? 0 : porcentaje,
        codigo: codigoRaw.toString().trim(),
      };
    }).filter(entry => entry.codigo !== ''); // opcional: descartar filas sin código
    return datos;
  } catch (error) {
    console.error('Error al cargar datos de juego:', error);
    throw error;
  }
}

// sheets.jsx

const RANGO_COMBOS = 'Combos!A:E'; // Ajusta si tus combos están en Hoja 2 o diferente

export async function cargarCombosDesdeSheets() {
  try {
    await new Promise((resolve, reject) => {
      gapi.load('client', async () => {
        try {
          await gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
          });
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    });

    const response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGO_COMBOS,
    });

    const values = response.result.values;
    if (!values || values.length <= 1) return [];

    const rows = values.slice(1); // sin encabezado

    // Agrupar combos por ID
    const combosMap = {};
    rows.forEach(row => {
      const id = row[0]; // Número_combo
      const nombre = row[1];
      const precio = row[2];
      const descripcion = row[3];
      const imagen = row[4];

      if (!combosMap[id]) {
        combosMap[id] = {
          id,
          productos: [],
          precio: precio || '',
          descripcion: descripcion || '',
          imagenes: [],
        };
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

const RANGEJUGUETES = 'Hoja 2!A:F';

export async function cargarJuguetesDesdeSheets() {
  try {
    // Asegúrate de que el cliente esté cargado antes de usarlo
    await new Promise((resolve, reject) => {
      gapi.load('client', async () => {
        try {
          await gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
          });
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    });

    const response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGEJUGUETES,
    });

    const values = response.result.values;
    function convertirLinkDrive(url) {
      const match = url.match(/\/file\/d\/(.*?)\//);
      if (match && match[1]) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
      }
      return url;
    }
    
    if (!values || values.length === 0) return [];

    const rows = values.slice(1); // Saltamos encabezados

    const Juguetes = rows.map(row => ({
      id: row[0] || '',
      nombre: row[1] || '',
      precio: row[2] || '',
      rebaja: row[3] || '',

      descripcion: row[4] || '',
      imagen: convertirLinkDrive(row[5] || ''),
    }));
    

    return Juguetes;

  } catch (error) {
    console.error('Error al cargar Juguetes:', error);
    throw error;
  }
}

const RANGELENCERIA = 'Hoja 5!A:F';

export async function cargarLenceriaDesdeSheets() {
  try {
    // Asegúrate de que el cliente esté cargado antes de usarlo
    await new Promise((resolve, reject) => {
      gapi.load('client', async () => {
        try {
          await gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
          });
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    });

    const response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGELENCERIA,
    });

    const values = response.result.values;
    function convertirLinkDrive(url) {
      const match = url.match(/\/file\/d\/(.*?)\//);
      if (match && match[1]) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
      }
      return url;
    }
    
    if (!values || values.length === 0) return [];

    const rows = values.slice(1); // Saltamos encabezados

    const Juguetes = rows.map(row => ({
      id: row[0] || '',
      nombre: row[1] || '',
      precio: row[2] || '',
      rebaja: row[3] || '',

      descripcion: row[4] || '',
      imagen: convertirLinkDrive(row[5] || ''),
    }));
    

    return Juguetes;

  } catch (error) {
    console.error('Error al cargar Juguetes:', error);
    throw error;
  }
}

const RANGELubricantes = 'Hoja 6!A:F';

export async function cargarLubricantesDesdeSheets() {
  try {
    // Asegúrate de que el cliente esté cargado antes de usarlo
    await new Promise((resolve, reject) => {
      gapi.load('client', async () => {
        try {
          await gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
          });
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    });

    const response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGELubricantes,
    });

    const values = response.result.values;
    function convertirLinkDrive(url) {
      const match = url.match(/\/file\/d\/(.*?)\//);
      if (match && match[1]) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
      }
      return url;
    }
    
    if (!values || values.length === 0) return [];

    const rows = values.slice(1); // Saltamos encabezados

    const Lubricantes = rows.map(row => ({
      id: row[0] || '',
      nombre: row[1] || '',
      precio: row[2] || '',
      rebaja: row[3] || '',

      descripcion: row[4] || '',
      imagen: convertirLinkDrive(row[5] || ''),
    }));
    

    return Lubricantes;

  } catch (error) {
    console.error('Error al cargar Lubricantes:', error);
    throw error;
  }
}
