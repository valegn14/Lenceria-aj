const API_KEY = 'AIzaSyCo51QnHOkeax1-tMGcmIS4Ygo2-qr1qd8';
const SHEET_ID = '1amL7XhJcrlQSg9nvwWuOGlYY9G1pfJuXTsTEezHUCRw';
const RANGE = 'Hoja 1!A:D';

window.onload = () => {
  gapi.load('client', async () => {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    });
    getProductos();
  });
};

async function getProductos() {
  try {
    const response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
    });

    const values = response.result.values;

    if (!values || values.length === 0) {
      document.getElementById('content').innerText = 'No se encontraron productos.';
      return;
    }

    const headers = values[0];
    const rows = values.slice(1);
    
    const productos = rows.map(row => ({
      nombre: row[0] || '',
      precio: row[1] || '',
      descripcion: row[2] || '',
      imagen: row[3] || '',
    }));

    // Envía los productos a cards.jsx
    if (window.renderCards) {
      window.renderCards(productos);
    }

  } catch (err) {
    document.getElementById('content').innerText = 'Error al cargar los productos: ' + err.message;
  }
}





// let productos;

// async function getProductos() {
    
//     let response;
//     try {
//         // Fetch first 10 files
//         response = await gapi.client.sheets.spreadsheets.values.get({

//             spreadsheetId: '1amL7XhJcrlQSg9nvwWuOGlYY9G1pfJuXTsTEezHUCRw',

//             // spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
//             // range: 'Class Data!A2:E',
//             range: 'Hoja 1!A:D',

//         });
//     } catch (err) {
//         document.getElementById('content').innerText = err.message;
//         return;
//     }
//     const range = response.result;
//     if (!range || !range.values || range.values.length == 0) {
//         document.getElementById('content').innerText = 'No values found.';
//         return;
//     }
//     // Flatten to string to display
//     const output = range.values.reduce(
//         (str, row) => `${str}${row[0]}, ${row[2]}\n`, // row[0] = Nombre, row[2] = Descripción
//         'Nombre, Descripción:\n');

//     document.getElementById('content').innerText = output;
// }