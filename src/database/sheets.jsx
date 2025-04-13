// sheets.jsx
const API_KEY = 'AIzaSyCo51QnHOkeax1-tMGcmIS4Ygo2-qr1qd8';
const SHEET_ID = '1amL7XhJcrlQSg9nvwWuOGlYY9G1pfJuXTsTEezHUCRw';
const RANGE = 'Hoja 1!A:E';

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
      descripcion: row[3] || '',
      imagen: convertirLinkDrive(row[4] || ''),
    }));
    

    return productos;

  } catch (error) {
    console.error('Error al cargar productos:', error);
    throw error;
  }
}





// const API_KEY = 'AIzaSyCo51QnHOkeax1-tMGcmIS4Ygo2-qr1qd8';
// const SHEET_ID = '1amL7XhJcrlQSg9nvwWuOGlYY9G1pfJuXTsTEezHUCRw';
// const RANGE = 'Hoja 1!A:D';

// window.onload = () => {
//   gapi.load('client', async () => {
//     await gapi.client.init({
//       apiKey: API_KEY,
//       discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
//     });
//     getProductos();
//   });
// };

// async function getProductos() {
//   try {
//     const response = await gapi.client.sheets.spreadsheets.values.get({
//       spreadsheetId: SHEET_ID,
//       range: RANGE,
//     });

//     const values = response.result.values;

//     if (!values || values.length === 0) {
//       document.getElementById('content').innerText = 'No se encontraron productos.';
//       return;
//     }

//     const headers = values[0];
//     const rows = values.slice(1);
    
//     const productos = rows.map(row => ({
//       nombre: row[0] || '',
//       precio: row[1] || '',
//       descripcion: row[2] || '',
//       imagen: row[3] || '',
//     }));

//     // Envía los productos a cards.jsx
//     if (window.renderCards) {
//       window.renderCards(productos);
//     }

//   } catch (err) {
//     document.getElementById('content').innerText = 'Error al cargar los productos: ' + err.message;
//   }
// }