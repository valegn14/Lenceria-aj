import React, { useEffect } from "react";

const renderCards = (productos) => {
  const container = document.getElementById("content");
  if (!container) return;

  container.innerHTML = ''; // Limpia contenido previo

  productos.forEach(producto => {
    const card = document.createElement('div');
    card.style.border = '1px solid #ccc';
    card.style.padding = '10px';
    card.style.margin = '10px';
    card.style.width = '250px';
    card.style.display = 'inline-block';
    card.style.verticalAlign = 'top';
    card.style.borderRadius = '8px';
    card.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';

    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" style="width:100%; height:150px; object-fit:cover; border-radius:6px;">
      <h3>${producto.nombre}</h3>
      <p><strong>Precio:</strong> $${producto.precio}</p>
      <p>${producto.descripcion}</p>
    `;

    container.appendChild(card);
  });
};

const Card = () => {
  useEffect(() => {
    // Asignar la función al objeto global una vez que el componente se monta
    window.renderCards = renderCards;
  }, []);

  // Aquí se crea el div 'content' donde se renderizarán las tarjetas
  return <div id="content" className="p-4 flex flex-wrap justify-center" />;
};

export default Card;







// import React from "react";


// const Card = () => {
//     return (
       
//         window.renderCards = function (productos) {
//             const container = document.getElementById('content');
//             container.innerHTML = ''; // Limpia contenido previo
          
//             productos.forEach(producto => {
//               const card = document.createElement('div');
//               card.style.border = '1px solid #ccc';
//               card.style.padding = '10px';
//               card.style.margin = '10px';
//               card.style.width = '250px';
//               card.style.display = 'inline-block';
//               card.style.verticalAlign = 'top';
//               card.style.borderRadius = '8px';
//               card.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
          
//               card.innerHTML = `
//                 <img src="${producto.imagen}" alt="${producto.nombre}" style="width:100%; height:150px; object-fit:cover; border-radius:6px;">
//                 <h3>${producto.nombre}</h3>
//                 <p><strong>Precio:</strong> $${producto.precio}</p>
//                 <p>${producto.descripcion}</p>
//               `;
          
//               container.appendChild(card);
//             });
//           }
//     );
// };

// export default Card;



// window.renderCards = function (productos) {
//     const container = document.getElementById('content');
//     container.innerHTML = ''; // Limpia contenido previo
  
//     productos.forEach(producto => {
//       const card = document.createElement('div');
//       card.style.border = '1px solid #ccc';
//       card.style.padding = '10px';
//       card.style.margin = '10px';
//       card.style.width = '250px';
//       card.style.display = 'inline-block';
//       card.style.verticalAlign = 'top';
//       card.style.borderRadius = '8px';
//       card.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
  
//       card.innerHTML = `
//         <img src="${producto.imagen}" alt="${producto.nombre}" style="width:100%; height:150px; object-fit:cover; border-radius:6px;">
//         <h3>${producto.nombre}</h3>
//         <p><strong>Precio:</strong> $${producto.precio}</p>
//         <p>${producto.descripcion}</p>
//       `;
  
//       container.appendChild(card);
//     });
//   };
  