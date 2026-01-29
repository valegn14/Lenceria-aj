// sheets.jsx
//const API_KEY = 'AIzaSyBa9Ux9aaq9vUgjJ3Lf6THUxmTj-f5JWR4';
//const SHEET_ID = '1amL7XhJcrlQSg9nvwWuOGlYY9G1pfJuXTsTEezHUCRw';



const API_KEY = 'AIzaSyDzg3YXJpvDjXJWuMAz2yJN9_E-ZFT3UTY';
const SHEET_ID = '1vgHmgT1wNeUSK_hFaPJgDE19Vnwl2Tk9Czcv3WRR37Q';


// ========== SISTEMA DE CACHÉ Y OPTIMIZACIÓN ==========
const cache = {
  productos: { data: null, timestamp: 0, ttl: 5 * 60 * 1000 }, // 5 minutos
  combos: { data: null, timestamp: 0, ttl: 10 * 60 * 1000 }, // 10 minutos
  promociones: { data: null, timestamp: 0, ttl: 5 * 60 * 1000 },
  datosJuego: { data: null, timestamp: 0, ttl: 30 * 60 * 1000 }, // 30 minutos
  juguetes: { data: null, timestamp: 0, ttl: 5 * 60 * 1000 },
  lenceria: { data: null, timestamp: 0, ttl: 5 * 60 * 1000 },
  lubricantes: { data: null, timestamp: 0, ttl: 5 * 60 * 1000 }
};

const loadingStates = new Map();
const imageCache = new Map();

// Funciones de caché
function getFromCache(key) {
  const item = cache[key];
  if (item && item.data && (Date.now() - item.timestamp) < item.ttl) {
    return item.data;
  }
  return null;
}

function setToCache(key, data) {
  cache[key] = {
    data,
    timestamp: Date.now(),
    ttl: cache[key]?.ttl || 5 * 60 * 1000
  };
}

// Función para limpiar caché (útil para forzar actualizaciones)
export function limpiarCache(key = null) {
  if (key) {
    cache[key] = { data: null, timestamp: 0, ttl: cache[key]?.ttl };
  } else {
    Object.keys(cache).forEach(k => {
      cache[k] = { data: null, timestamp: 0, ttl: cache[k].ttl };
    });
    imageCache.clear();
  }
}

// ========== FUNCIONES BASE (SIN CAMBIOS) ==========
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

async function ensureGapiLoaded() {
  await initGapiClient();
}

async function leerRango(range) {
  await ensureGapiLoaded();
  const response = await window.gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range,
  });
  return response.result.values || [];
}

// ========== FUNCIONES OPTIMIZADAS ==========
function convertirLinkDrive(url) {
  if (!url) return '';
  if (imageCache.has(url)) {
    return imageCache.get(url);
  }

  const match = url.match(/\/file\/d\/(.*?)\//);
  const converted = match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : url;
  imageCache.set(url, converted);
  return converted;
}

// Función auxiliar para procesar datos de productos CON soporte para imagen2
function procesarDatosProducto(values) {
  return values.slice(1).map(row => ({
    id: row[0] || '',
    nombre: row[1] || '',
    precio: row[2] || '',
    rebaja: row[3] || '',
    descripcion: row[4] || '',
    imagen: convertirLinkDrive(row[5] || ''),
    stock: Number(row[6]) || 0,
    imagen2: convertirLinkDrive(row[7] || '') // Nueva columna Imagen2
  }));
}

// ========== FUNCIONES DE CARGA OPTIMIZADAS ==========
export async function cargarDatosJuegoDesdeSheets(forceRefresh = false) {
  const cacheKey = 'datosJuego';
  
  if (!forceRefresh) {
    const cached = getFromCache(cacheKey);
    if (cached) return cached;
  }

  if (loadingStates.has(cacheKey)) {
    return loadingStates.get(cacheKey);
  }

  try {
    const loadPromise = (async () => {
      const values = await leerRango('Hoja 3!A:B');
      if (values.length <= 1) return [];
      
      const datos = values.slice(1)
        .map(row => ({ porcentaje: Number(row[0]) || 0, codigo: (row[1] || '').trim() }))
        .filter(e => e.codigo !== '');
      
      setToCache(cacheKey, datos);
      return datos;
    })();

    loadingStates.set(cacheKey, loadPromise);
    const result = await loadPromise;
    loadingStates.delete(cacheKey);
    return result;
  } catch (error) {
    loadingStates.delete(cacheKey);
    console.error('Error al cargar datos de juego:', error);
    throw error;
  }
}

export async function cargarCombosDesdeSheets(forceRefresh = false) {
  const cacheKey = 'combos';
  
  if (!forceRefresh) {
    const cached = getFromCache(cacheKey);
    if (cached) return cached;
  }

  if (loadingStates.has(cacheKey)) {
    return loadingStates.get(cacheKey);
  }

  try {
    const loadPromise = (async () => {
      const values = await leerRango('Combos!A:E');
      if (values.length <= 1) return [];
      
      const map = {};
      values.slice(1).forEach(row => {
        const [id, nombre, precio, descr, img] = row;
        if (!map[id]) map[id] = { id, productos: [], precio: precio || '', descripcion: descr || '', imagenes: [] };
        if (nombre) map[id].productos.push(nombre);
        if (img) map[id].imagenes.push(img);
      });
      
      const combos = Object.values(map);
      setToCache(cacheKey, combos);
      return combos;
    })();

    loadingStates.set(cacheKey, loadPromise);
    const result = await loadPromise;
    loadingStates.delete(cacheKey);
    return result;
  } catch (error) {
    loadingStates.delete(cacheKey);
    console.error('Error al cargar combos:', error);
    throw error;
  }
}

export async function cargarProductosDesdeSheets(forceRefresh = false) {
  const cacheKey = 'productos';
  
  if (!forceRefresh) {
    const cached = getFromCache(cacheKey);
    if (cached) return cached;
  }

  if (loadingStates.has(cacheKey)) {
    return loadingStates.get(cacheKey);
  }

  const loadPromise = (async () => {
    try {
      const [lubricantes, juguetes, lenceria] = await Promise.all([
        leerRango('Lubricantes!A:H'), // Cambiado a A:H para incluir Imagen2
        leerRango('Juguetes!A:H'),    // Cambiado a A:H para incluir Imagen2
        leerRango('Lenceria!A:H')     // Cambiado a A:H para incluir Imagen2
      ]);

      const todosLosDatos = [
        ...procesarDatosProducto(lubricantes),
        ...procesarDatosProducto(juguetes),
        ...procesarDatosProducto(lenceria)
      ];

      todosLosDatos.sort((a, b) => a.nombre.localeCompare(b.nombre));
      setToCache(cacheKey, todosLosDatos);
      return todosLosDatos;
    } catch (error) {
      console.error("Error al cargar productos:", error);
      return [];
    }
  })();

  loadingStates.set(cacheKey, loadPromise);
  const result = await loadPromise;
  loadingStates.delete(cacheKey);
  return result;
}

// Funciones individuales optimizadas con caché
export async function cargarJuguetesDesdeSheets(forceRefresh = false) {
  const cacheKey = 'juguetes';
  
  if (!forceRefresh) {
    const cached = getFromCache(cacheKey);
    if (cached) return cached;
  }

  if (loadingStates.has(cacheKey)) {
    return loadingStates.get(cacheKey);
  }

  try {
    const loadPromise = (async () => {
      const values = await leerRango('Juguetes!A:H'); // Cambiado a A:H
      if (values.length <= 1) return [];
      
      const datos = procesarDatosProducto(values);
      setToCache(cacheKey, datos);
      return datos;
    })();

    loadingStates.set(cacheKey, loadPromise);
    const result = await loadPromise;
    loadingStates.delete(cacheKey);
    return result;
  } catch (error) {
    loadingStates.delete(cacheKey);
    console.error('Error al cargar Juguetes:', error);
    throw error;
  }
}

export async function cargarLenceriaDesdeSheets(forceRefresh = false) {
  const cacheKey = 'lenceria';
  
  if (!forceRefresh) {
    const cached = getFromCache(cacheKey);
    if (cached) return cached;
  }

  if (loadingStates.has(cacheKey)) {
    return loadingStates.get(cacheKey);
  }

  try {
    const loadPromise = (async () => {
      const values = await leerRango('Lenceria!A:H'); // Cambiado a A:H
      if (values.length <= 1) return [];
      
      const datos = procesarDatosProducto(values);
      setToCache(cacheKey, datos);
      return datos;
    })();

    loadingStates.set(cacheKey, loadPromise);
    const result = await loadPromise;
    loadingStates.delete(cacheKey);
    return result;
  } catch (error) {
    loadingStates.delete(cacheKey);
    console.error('Error al cargar Lencería:', error);
    throw error;
  }
}

export async function cargarLubricantesDesdeSheets(forceRefresh = false) {
  const cacheKey = 'lubricantes';
  
  if (!forceRefresh) {
    const cached = getFromCache(cacheKey);
    if (cached) return cached;
  }

  if (loadingStates.has(cacheKey)) {
    return loadingStates.get(cacheKey);
  }

  try {
    const loadPromise = (async () => {
      const values = await leerRango('Lubricantes!A:H'); // Cambiado a A:H
      if (values.length <= 1) return [];
      
      const datos = procesarDatosProducto(values);
      setToCache(cacheKey, datos);
      return datos;
    })();

    loadingStates.set(cacheKey, loadPromise);
    const result = await loadPromise;
    loadingStates.delete(cacheKey);
    return result;
  } catch (error) {
    loadingStates.delete(cacheKey);
    console.error('Error al cargar Lubricantes:', error);
    throw error;
  }
}

export async function cargarPromocionesDesdeSheets(forceRefresh = false) {
  const cacheKey = 'promociones';
  
  if (!forceRefresh) {
    const cached = getFromCache(cacheKey);
    if (cached) return cached;
  }

  if (loadingStates.has(cacheKey)) {
    return loadingStates.get(cacheKey);
  }

  try {
    const loadPromise = (async () => {
      // Usar la función principal de productos que ya está optimizada
      const productos = await cargarProductosDesdeSheets(forceRefresh);
      
      // Filtrar productos con rebaja > 0
      const promociones = productos.filter(producto => Number(producto.rebaja) > 0);
      
      setToCache(cacheKey, promociones);
      return promociones;
    })();

    loadingStates.set(cacheKey, loadPromise);
    const result = await loadPromise;
    loadingStates.delete(cacheKey);
    return result;
  } catch (error) {
    loadingStates.delete(cacheKey);
    console.error('Error al cargar promociones:', error);
    throw error;
  }
}




// ========== FUNCIONES ADICIONALES PARA MEJOR EXPERIENCIA ==========

/**
 * Precarga los datos esenciales para mejor performance
 */
export async function precargarDatosEsenciales() {
  try {
    await Promise.allSettled([
      cargarProductosDesdeSheets(),
      cargarCombosDesdeSheets()
    ]);
  } catch (error) {
    console.log('Precarga de datos completada con errores menores:', error);
  }
}

/**
 * Función para verificar si hay datos en caché
 */
export function tieneDatosEnCache() {
  return Object.keys(cache).some(key => cache[key].data !== null);
}

/**
 * Función específica para cargar productos con múltiples imágenes
 * Útil para componentes que necesitan específicamente productos con galería
 */
export async function cargarProductosConGaleria(forceRefresh = false) {
  const productos = await cargarProductosDesdeSheets(forceRefresh);
  return productos.filter(producto => 
    producto.imagen2 && producto.imagen2.trim() !== ''
  );
}











// // sheets.jsx
// const API_KEY = 'AIzaSyBa9Ux9aaq9vUgjJ3Lf6THUxmTj-f5JWR4';
// const SHEET_ID = '1amL7XhJcrlQSg9nvwWuOGlYY9G1pfJuXTsTEezHUCRw';

// // ========== SISTEMA DE CACHÉ Y OPTIMIZACIÓN ==========
// const cache = {
//   productos: { data: null, timestamp: 0, ttl: 5 * 60 * 1000 }, // 5 minutos
//   combos: { data: null, timestamp: 0, ttl: 10 * 60 * 1000 }, // 10 minutos
//   promociones: { data: null, timestamp: 0, ttl: 5 * 60 * 1000 },
//   datosJuego: { data: null, timestamp: 0, ttl: 30 * 60 * 1000 }, // 30 minutos
//   juguetes: { data: null, timestamp: 0, ttl: 5 * 60 * 1000 },
//   lenceria: { data: null, timestamp: 0, ttl: 5 * 60 * 1000 },
//   lubricantes: { data: null, timestamp: 0, ttl: 5 * 60 * 1000 }
// };

// const loadingStates = new Map();
// const imageCache = new Map();

// // Funciones de caché
// function getFromCache(key) {
//   const item = cache[key];
//   if (item && item.data && (Date.now() - item.timestamp) < item.ttl) {
//     return item.data;
//   }
//   return null;
// }

// function setToCache(key, data) {
//   cache[key] = {
//     data,
//     timestamp: Date.now(),
//     ttl: cache[key]?.ttl || 5 * 60 * 1000
//   };
// }

// // Función para limpiar caché (útil para forzar actualizaciones)
// export function limpiarCache(key = null) {
//   if (key) {
//     cache[key] = { data: null, timestamp: 0, ttl: cache[key]?.ttl };
//   } else {
//     Object.keys(cache).forEach(k => {
//       cache[k] = { data: null, timestamp: 0, ttl: cache[k].ttl };
//     });
//     imageCache.clear();
//   }
// }

// // ========== FUNCIONES BASE (SIN CAMBIOS) ==========
// async function injectGapiScript() {
//   if (typeof window.gapi !== 'undefined' && typeof window.gapi.load === 'function') {
//     return;
//   }

//   return new Promise((resolve, reject) => {
//     const MAX_RETRIES = 25;
//     let retries = 0;

//     const checkGapi = () => {
//       if (typeof window.gapi !== 'undefined' && typeof window.gapi.load === 'function') {
//         resolve();
//       } else if (retries < MAX_RETRIES) {
//         retries++;
//         setTimeout(checkGapi, 300);
//       } else {
//         reject(new Error('gapi.load no está disponible tras reintentos'));
//       }
//     };

//     const existingScript = document.querySelector('script[src*="apis.google.com/js/api.js"]');

//     if (existingScript) {
//       checkGapi();
//     } else {
//       const script = document.createElement('script');
//       script.src = 'https://apis.google.com/js/api.js';
//       script.async = true;
//       script.defer = true;
//       script.onload = () => checkGapi();
//       script.onerror = () => reject(new Error('Error de red al cargar gapi'));
//       document.head.appendChild(script);
//     }
//   });
// }

// async function initGapiClient() {
//   await injectGapiScript();

//   await new Promise((resolve, reject) => {
//     window.gapi.load('client', {
//       callback: resolve,
//       onerror: () => reject(new Error('gapi.client no pudo inicializarse')),
//     });
//   });

//   await window.gapi.client.init({
//     apiKey: API_KEY,
//     discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
//   });
// }

// async function ensureGapiLoaded() {
//   await initGapiClient();
// }

// async function leerRango(range) {
//   await ensureGapiLoaded();
//   const response = await window.gapi.client.sheets.spreadsheets.values.get({
//     spreadsheetId: SHEET_ID,
//     range,
//   });
//   return response.result.values || [];
// }

// // ========== FUNCIONES OPTIMIZADAS ==========
// function convertirLinkDrive(url) {
//   if (!url) return '';
//   if (imageCache.has(url)) {
//     return imageCache.get(url);
//   }

//   const match = url.match(/\/file\/d\/(.*?)\//);
//   const converted = match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : url;
//   imageCache.set(url, converted);
//   return converted;
// }

// // Función auxiliar para procesar datos de productos
// function procesarDatosProducto(values) {
//   return values.slice(1).map(row => ({
//     id: row[0] || '',
//     nombre: row[1] || '',
//     precio: row[2] || '',
//     rebaja: row[3] || '',
//     descripcion: row[4] || '',
//     imagen: convertirLinkDrive(row[5] || ''),
//     stock: Number(row[6]) || 0
//   }));
// }

// // ========== FUNCIONES DE CARGA OPTIMIZADAS ==========
// export async function cargarDatosJuegoDesdeSheets(forceRefresh = false) {
//   const cacheKey = 'datosJuego';
  
//   if (!forceRefresh) {
//     const cached = getFromCache(cacheKey);
//     if (cached) return cached;
//   }

//   if (loadingStates.has(cacheKey)) {
//     return loadingStates.get(cacheKey);
//   }

//   try {
//     const loadPromise = (async () => {
//       const values = await leerRango('Hoja 3!A:B');
//       if (values.length <= 1) return [];
      
//       const datos = values.slice(1)
//         .map(row => ({ porcentaje: Number(row[0]) || 0, codigo: (row[1] || '').trim() }))
//         .filter(e => e.codigo !== '');
      
//       setToCache(cacheKey, datos);
//       return datos;
//     })();

//     loadingStates.set(cacheKey, loadPromise);
//     const result = await loadPromise;
//     loadingStates.delete(cacheKey);
//     return result;
//   } catch (error) {
//     loadingStates.delete(cacheKey);
//     console.error('Error al cargar datos de juego:', error);
//     throw error;
//   }
// }

// export async function cargarCombosDesdeSheets(forceRefresh = false) {
//   const cacheKey = 'combos';
  
//   if (!forceRefresh) {
//     const cached = getFromCache(cacheKey);
//     if (cached) return cached;
//   }

//   if (loadingStates.has(cacheKey)) {
//     return loadingStates.get(cacheKey);
//   }

//   try {
//     const loadPromise = (async () => {
//       const values = await leerRango('Combos!A:E');
//       if (values.length <= 1) return [];
      
//       const map = {};
//       values.slice(1).forEach(row => {
//         const [id, nombre, precio, descr, img] = row;
//         if (!map[id]) map[id] = { id, productos: [], precio: precio || '', descripcion: descr || '', imagenes: [] };
//         if (nombre) map[id].productos.push(nombre);
//         if (img) map[id].imagenes.push(img);
//       });
      
//       const combos = Object.values(map);
//       setToCache(cacheKey, combos);
//       return combos;
//     })();

//     loadingStates.set(cacheKey, loadPromise);
//     const result = await loadPromise;
//     loadingStates.delete(cacheKey);
//     return result;
//   } catch (error) {
//     loadingStates.delete(cacheKey);
//     console.error('Error al cargar combos:', error);
//     throw error;
//   }
// }

// export async function cargarProductosDesdeSheets(forceRefresh = false) {
//   const cacheKey = 'productos';
  
//   if (!forceRefresh) {
//     const cached = getFromCache(cacheKey);
//     if (cached) return cached;
//   }

//   if (loadingStates.has(cacheKey)) {
//     return loadingStates.get(cacheKey);
//   }

//   const loadPromise = (async () => {
//     try {
//       const [lubricantes, juguetes, lenceria] = await Promise.all([
//         leerRango('Lubricantes!A:G'),
//         leerRango('Juguetes!A:G'),
//         leerRango('Lenceria!A:G')
//       ]);

//       const todosLosDatos = [
//         ...procesarDatosProducto(lubricantes),
//         ...procesarDatosProducto(juguetes),
//         ...procesarDatosProducto(lenceria)
//       ];

//       todosLosDatos.sort((a, b) => a.nombre.localeCompare(b.nombre));
//       setToCache(cacheKey, todosLosDatos);
//       return todosLosDatos;
//     } catch (error) {
//       console.error("Error al cargar productos:", error);
//       return [];
//     }
//   })();

//   loadingStates.set(cacheKey, loadPromise);
//   const result = await loadPromise;
//   loadingStates.delete(cacheKey);
//   return result;
// }

// // Funciones individuales optimizadas con caché
// export async function cargarJuguetesDesdeSheets(forceRefresh = false) {
//   const cacheKey = 'juguetes';
  
//   if (!forceRefresh) {
//     const cached = getFromCache(cacheKey);
//     if (cached) return cached;
//   }

//   if (loadingStates.has(cacheKey)) {
//     return loadingStates.get(cacheKey);
//   }

//   try {
//     const loadPromise = (async () => {
//       const values = await leerRango('Juguetes!A:G');
//       if (values.length <= 1) return [];
      
//       const datos = procesarDatosProducto(values);
//       setToCache(cacheKey, datos);
//       return datos;
//     })();

//     loadingStates.set(cacheKey, loadPromise);
//     const result = await loadPromise;
//     loadingStates.delete(cacheKey);
//     return result;
//   } catch (error) {
//     loadingStates.delete(cacheKey);
//     console.error('Error al cargar Juguetes:', error);
//     throw error;
//   }
// }

// export async function cargarLenceriaDesdeSheets(forceRefresh = false) {
//   const cacheKey = 'lenceria';
  
//   if (!forceRefresh) {
//     const cached = getFromCache(cacheKey);
//     if (cached) return cached;
//   }

//   if (loadingStates.has(cacheKey)) {
//     return loadingStates.get(cacheKey);
//   }

//   try {
//     const loadPromise = (async () => {
//       const values = await leerRango('Lenceria!A:G');
//       if (values.length <= 1) return [];
      
//       const datos = procesarDatosProducto(values);
//       setToCache(cacheKey, datos);
//       return datos;
//     })();

//     loadingStates.set(cacheKey, loadPromise);
//     const result = await loadPromise;
//     loadingStates.delete(cacheKey);
//     return result;
//   } catch (error) {
//     loadingStates.delete(cacheKey);
//     console.error('Error al cargar Lencería:', error);
//     throw error;
//   }
// }

// export async function cargarLubricantesDesdeSheets(forceRefresh = false) {
//   const cacheKey = 'lubricantes';
  
//   if (!forceRefresh) {
//     const cached = getFromCache(cacheKey);
//     if (cached) return cached;
//   }

//   if (loadingStates.has(cacheKey)) {
//     return loadingStates.get(cacheKey);
//   }

//   try {
//     const loadPromise = (async () => {
//       const values = await leerRango('Lubricantes!A:G');
//       if (values.length <= 1) return [];
      
//       const datos = procesarDatosProducto(values);
//       setToCache(cacheKey, datos);
//       return datos;
//     })();

//     loadingStates.set(cacheKey, loadPromise);
//     const result = await loadPromise;
//     loadingStates.delete(cacheKey);
//     return result;
//   } catch (error) {
//     loadingStates.delete(cacheKey);
//     console.error('Error al cargar Lubricantes:', error);
//     throw error;
//   }
// }

// export async function cargarPromocionesDesdeSheets(forceRefresh = false) {
//   const cacheKey = 'promociones';
  
//   if (!forceRefresh) {
//     const cached = getFromCache(cacheKey);
//     if (cached) return cached;
//   }

//   if (loadingStates.has(cacheKey)) {
//     return loadingStates.get(cacheKey);
//   }

//   try {
//     const loadPromise = (async () => {
//       // Usar la función principal de productos que ya está optimizada
//       const productos = await cargarProductosDesdeSheets(forceRefresh);
      
//       // Filtrar productos con rebaja > 0
//       const promociones = productos.filter(producto => Number(producto.rebaja) > 0);
      
//       setToCache(cacheKey, promociones);
//       return promociones;
//     })();

//     loadingStates.set(cacheKey, loadPromise);
//     const result = await loadPromise;
//     loadingStates.delete(cacheKey);
//     return result;
//   } catch (error) {
//     loadingStates.delete(cacheKey);
//     console.error('Error al cargar promociones:', error);
//     throw error;
//   }
// }

// // ========== FUNCIONES ADICIONALES PARA MEJOR EXPERIENCIA ==========

// /**
//  * Precarga los datos esenciales para mejor performance
//  */
// export async function precargarDatosEsenciales() {
//   try {
//     await Promise.allSettled([
//       cargarProductosDesdeSheets(),
//       cargarCombosDesdeSheets()
//     ]);
//   } catch (error) {
//     console.log('Precarga de datos completada con errores menores:', error);
//   }
// }

// /**
//  * Función para verificar si hay datos en caché
//  */
// export function tieneDatosEnCache() {
//   return Object.keys(cache).some(key => cache[key].data !== null);
// }
