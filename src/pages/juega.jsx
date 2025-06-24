// Juega.jsx
import React, { useState, useRef } from 'react';
import { useJuegoData } from '../database/Juego'; // ajusta path

const Juega = () => {
  const { entries, loading, error, validarCodigo, obtenerIndexAleatorio, obtenerPorcentajePorIndex } = useJuegoData();
  const [codigoInput, setCodigoInput] = useState('');
  const [tieneAcceso, setTieneAcceso] = useState(false);
  const [validando, setValidando] = useState(false);
  const [errorCodigo, setErrorCodigo] = useState('');
  
  const [girado, setGirado] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [rotacion, setRotacion] = useState(0);
  const ruedaRef = useRef(null);

  const handleSubmitCodigo = (e) => {
    e.preventDefault();
    setErrorCodigo('');
    if (!codigoInput.trim()) {
      setErrorCodigo('Ingresa un código válido.');
      return;
    }
    setValidando(true);
    setTimeout(() => {
      const ok = validarCodigo(codigoInput);
      if (ok) {
        setTieneAcceso(true);
      } else {
        setErrorCodigo('Código no válido o no autorizado.');
      }
      setValidando(false);
    }, 300);
  };

  const handleGirar = () => {
    if (girado) return;
    const idx = obtenerIndexAleatorio();
    if (idx == null) return;
    const porcentaje = obtenerPorcentajePorIndex(idx);
    const numEntradas = entries.length;
    const anguloPorSegmento = 360 / numEntradas;
    const vueltasCompletas = 5;
    const centroSegmento = idx * anguloPorSegmento + anguloPorSegmento / 2;
    const rotacionFinal = vueltasCompletas * 360 + (360 - centroSegmento);
    setRotacion(prev => prev + rotacionFinal);
    setGirado(true);
    setTimeout(() => {
      setResultado(porcentaje);
    }, 4500);
  };

  if (loading) {
    return <div className="text-center py-8">Cargando datos...</div>;
  }
  if (error) {
    return <div className="text-center py-8 text-red-600">Error al cargar datos del juego.</div>;
  }
  if (!entries.length) {
    return <div className="text-center py-8 text-gray-700">No hay configuraciones de juego disponibles.</div>;
  }

  return (
    // Este contenedor debe poder crecer para llenar el padre. No ponemos max-w o centrar aquí si queremos que ocupe todo.
    <div className="w-full h-full flex items-center justify-center">
      {/* Contenedor de la ruleta y overlay, relativo */}
      <div className="relative bg-white rounded-lg shadow-md p-4
                      w-11/12 h-11/12
                      flex flex-col items-center justify-center
                     ">
        {/* Modal de código: absolute inset-0 cubre todo este contenedor */}
        {!tieneAcceso && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white rounded-lg p-6 w-11/12 max-w-sm mx-auto">
              <h2 className="text-lg font-medium text-gray-700 mb-4 text-center">
                Ingresa tu código para jugar
              </h2>
              <form onSubmit={handleSubmitCodigo} className="flex flex-col space-y-4">
                <input
                  type="text"
                  value={codigoInput}
                  onChange={e => setCodigoInput(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Código aquí"
                />
                {errorCodigo && <p className="text-red-500 text-sm">{errorCodigo}</p>}
                <button
                  type="submit"
                  disabled={validando}
                  className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50"
                >
                  {validando ? 'Validando...' : 'Validar Código'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Contenido de la ruleta */}
        <div className={`${!tieneAcceso ? 'opacity-50' : ''} flex flex-col items-center space-y-6 z-10`}>
          {/* Flecha */}
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-4">
              <div className="w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-black"></div>
            </div>
            <div
              ref={ruedaRef}
              className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-gray-200"
              style={{
                transform: `rotate(${rotacion}deg)`,
                transition: girado ? 'transform 4s cubic-bezier(0.33, 1, 0.68, 1)' : 'none',
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 200 200" className="block">
                <g transform="translate(100,100)">
                  {entries.map((entry, i) => {
                    const num = entries.length;
                    const anguloPor = 360 / num;
                    const startAngle = i * anguloPor;
                    const endAngle = startAngle + anguloPor;
                    const startRad = (startAngle - 90) * (Math.PI / 180);
                    const endRad = (endAngle - 90) * (Math.PI / 180);
                    const x1 = Math.cos(startRad) * 100;
                    const y1 = Math.sin(startRad) * 100;
                    const x2 = Math.cos(endRad) * 100;
                    const y2 = Math.sin(endRad) * 100;
                    const largeArcFlag = anguloPor > 180 ? 1 : 0;
                    const pathData = [
                      `M 0 0`,
                      `L ${x1.toFixed(3)} ${y1.toFixed(3)}`,
                      `A 100 100 0 ${largeArcFlag} 1 ${x2.toFixed(3)} ${y2.toFixed(3)}`,
                      `Z`
                    ].join(' ');
                    const fillColor = i % 2 === 0 ? '#ffe4e6' : '#fed7e2';
                    const textAngle = startAngle + anguloPor / 2;
                    const textRad = (textAngle - 90) * (Math.PI / 180);
                    const textX = Math.cos(textRad) * 60;
                    const textY = Math.sin(textRad) * 60;
                    return (
                      <g key={i}>
                        <path d={pathData} fill={fillColor} stroke="#e5e7eb" strokeWidth="1" />
                        <text
                          x={textX}
                          y={textY}
                          fill="#000"
                          fontSize="12"
                          textAnchor="middle"
                          alignmentBaseline="middle"
                          transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                        >
                          {entry.porcentaje}%  
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>
          </div>
          <button
            onClick={handleGirar}
            disabled={girado || !tieneAcceso}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {girado ? 'Ya giraste' : 'Girar ruleta'}
          </button>
          {girado && resultado != null && (
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold text-gray-800">
                ¡Felicidades! Obtuviste <span className="text-pink-600">{resultado}%</span> de descuento.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Juega;



// // Juega.jsx
// import React, { useState, useRef } from 'react';
// import { useJuegoData } from '../database/Juego'; // ajusta path

// const Juega = () => {
//   const { entries, loading, error, validarCodigo, obtenerIndexAleatorio, obtenerPorcentajePorIndex } = useJuegoData();
//   const [codigoInput, setCodigoInput] = useState('');
//   const [tieneAcceso, setTieneAcceso] = useState(false);
//   const [validando, setValidando] = useState(false);
//   const [errorCodigo, setErrorCodigo] = useState('');
  
//   const [girado, setGirado] = useState(false);
//   const [resultado, setResultado] = useState(null);
//   const [rotacion, setRotacion] = useState(0);
//   const ruedaRef = useRef(null);

//   const handleSubmitCodigo = (e) => {
//     e.preventDefault();
//     setErrorCodigo('');
//     if (!codigoInput.trim()) {
//       setErrorCodigo('Ingresa un código válido.');
//       return;
//     }
//     setValidando(true);
//     setTimeout(() => {
//       const ok = validarCodigo(codigoInput);
//       if (ok) {
//         setTieneAcceso(true);
//       } else {
//         setErrorCodigo('Código no válido o no autorizado.');
//       }
//       setValidando(false);
//     }, 300);
//   };

//   const handleGirar = () => {
//     if (girado) return;
//     const idx = obtenerIndexAleatorio();
//     if (idx == null) return;
//     const porcentaje = obtenerPorcentajePorIndex(idx);
//     const numEntradas = entries.length;
//     const anguloPorSegmento = 360 / numEntradas;
//     const vueltasCompletas = 5;
//     const centroSegmento = idx * anguloPorSegmento + anguloPorSegmento / 2;
//     const rotacionFinal = vueltasCompletas * 360 + (360 - centroSegmento);
//     setRotacion(prev => prev + rotacionFinal);
//     setGirado(true);
//     setTimeout(() => {
//       setResultado(porcentaje);
//     }, 4500);
//   };

//   if (loading) {
//     return <div className="text-center py-8">Cargando datos...</div>;
//   }
//   if (error) {
//     return <div className="text-center py-8 text-red-600">Error al cargar datos del juego.</div>;
//   }
//   if (!entries.length) {
//     return <div className="text-center py-8 text-gray-700">No hay configuraciones de juego disponibles.</div>;
//   }

//   return (
//     <div className="w-full max-w-md mx-auto py-8 relative">
//       {/* Si no tiene acceso, mostramos el modal encima */}
//       {!tieneAcceso && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
//           <div className="bg-white rounded-lg p-6 w-11/12 max-w-sm mx-auto">
//             <h2 className="text-lg font-medium text-gray-700 mb-4 text-center">
//               Ingresa tu código para jugar
//             </h2>
//             <form onSubmit={handleSubmitCodigo} className="flex flex-col space-y-4">
//               <input
//                 type="text"
//                 value={codigoInput}
//                 onChange={e => setCodigoInput(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//                 placeholder="Código aquí"
//               />
//               {errorCodigo && <p className="text-red-500 text-sm">{errorCodigo}</p>}
//               <button
//                 type="submit"
//                 disabled={validando}
//                 className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50"
//               >
//                 {validando ? 'Validando...' : 'Validar Código'}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Ruleta y contenido queda debajo del modal; pero no se puede interactuar hasta que tenga acceso */}
//       <div className={`${!tieneAcceso ? 'opacity-50 pointer-events-none' : ''} flex flex-col items-center space-y-6`}>
//         {/* Flecha */}
//         <div className="relative">
//           <div className="absolute left-1/2 transform -translate-x-1/2 -top-4">
//             <div className="w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-black"></div>
//           </div>
//           <div
//             ref={ruedaRef}
//             className="w-64 h-64 rounded-full overflow-hidden border-4 border-gray-200"
//             style={{
//               transform: `rotate(${rotacion}deg)`,
//               transition: girado ? 'transform 4s cubic-bezier(0.33, 1, 0.68, 1)' : 'none',
//             }}
//           >
//             <svg width="100%" height="100%" viewBox="0 0 200 200" className="block">
//               <g transform="translate(100,100)">
//                 {entries.map((entry, i) => {
//                   const num = entries.length;
//                   const anguloPor = 360 / num;
//                   const startAngle = i * anguloPor;
//                   const endAngle = startAngle + anguloPor;
//                   const startRad = (startAngle - 90) * (Math.PI / 180);
//                   const endRad = (endAngle - 90) * (Math.PI / 180);
//                   const x1 = Math.cos(startRad) * 100;
//                   const y1 = Math.sin(startRad) * 100;
//                   const x2 = Math.cos(endRad) * 100;
//                   const y2 = Math.sin(endRad) * 100;
//                   const largeArcFlag = anguloPor > 180 ? 1 : 0;
//                   const pathData = [
//                     `M 0 0`,
//                     `L ${x1.toFixed(3)} ${y1.toFixed(3)}`,
//                     `A 100 100 0 ${largeArcFlag} 1 ${x2.toFixed(3)} ${y2.toFixed(3)}`,
//                     `Z`
//                   ].join(' ');
//                   const fillColor = i % 2 === 0 ? '#ffe4e6' : '#fed7e2';
//                   const textAngle = startAngle + anguloPor / 2;
//                   const textRad = (textAngle - 90) * (Math.PI / 180);
//                   const textX = Math.cos(textRad) * 60;
//                   const textY = Math.sin(textRad) * 60;
//                   return (
//                     <g key={i}>
//                       <path d={pathData} fill={fillColor} stroke="#e5e7eb" strokeWidth="1" />
//                       <text
//                         x={textX}
//                         y={textY}
//                         fill="#000"
//                         fontSize="12"
//                         textAnchor="middle"
//                         alignmentBaseline="middle"
//                         transform={`rotate(${textAngle}, ${textX}, ${textY})`}
//                       >
//                         {entry.porcentaje}%
//                       </text>
//                     </g>
//                   );
//                 })}
//               </g>
//             </svg>
//           </div>
//         </div>
//         <button
//           onClick={handleGirar}
//           disabled={girado || !tieneAcceso}
//           className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
//         >
//           {girado ? 'Ya giraste' : 'Girar ruleta'}
//         </button>
//         {girado && resultado != null && (
//           <div className="mt-4 text-center">
//             <p className="text-lg font-semibold text-gray-800">
//               ¡Felicidades! Obtuviste <span className="text-pink-600">{resultado}%</span> de descuento.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Juega;
