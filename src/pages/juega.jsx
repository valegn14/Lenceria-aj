import React, { useState, useRef, useEffect } from 'react';
import { useJuegoData } from '../database/Juego';
import { motion, AnimatePresence } from 'framer-motion';

const Juega = () => {
  const { entries, loading, error, validarCodigo, obtenerIndexAleatorio, obtenerPorcentajePorIndex } = useJuegoData();
  const [codigoInput, setCodigoInput] = useState('');
  const [tieneAcceso, setTieneAcceso] = useState(false);
  const [validando, setValidando] = useState(false);
  const [errorCodigo, setErrorCodigo] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const [girado, setGirado] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [rotacion, setRotacion] = useState(0);
  const [showResultPopup, setShowResultPopup] = useState(false);
  const ruedaRef = useRef(null);
  
  // Códigos usados (en producción esto sería una API o base de datos)
  const [codigosUsados, setCodigosUsados] = useState(() => {
    const saved = localStorage.getItem('codigosUsados');
    return saved ? JSON.parse(saved) : [];
  });

  // Guardar códigos usados en localStorage
  useEffect(() => {
    localStorage.setItem('codigosUsados', JSON.stringify(codigosUsados));
  }, [codigosUsados]);

  const handleSubmitCodigo = (e) => {
    e.preventDefault();
    setErrorCodigo('');
    setSuccessMessage('');
    
    if (!codigoInput.trim()) {
      setErrorCodigo('Ingresa un código válido.');
      return;
    }
    
    
    // Verificar si el código ya ha sido usado
    if (codigosUsados.includes(codigoInput)) {
      setErrorCodigo('Este código ya ha sido utilizado.');
      return;
    }
    
    setValidando(true);
    
    setTimeout(() => {
      const ok = validarCodigo(codigoInput);
      
      if (ok) {
        setTieneAcceso(true);
        setSuccessMessage('¡Código válido! Puedes girar la ruleta');
        // Guardar código como usado
        setCodigosUsados([...codigosUsados, codigoInput]);
      } else {
        setErrorCodigo('Código no válido o no autorizado.');
      }
      
      setValidando(false);
    }, 300);
  };

  const handleGirar = () => {
    if (girado || !tieneAcceso) return;
    
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
    // Revocar acceso tras girar (opcional)
    setTieneAcceso(false);
    
    setTimeout(() => {
      setResultado(porcentaje);
      setShowResultPopup(true);
    }, 4500);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-20">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-md mx-auto">
          <p className="font-bold">Error</p>
          <p>No se pudieron cargar los datos del juego. Por favor intenta más tarde.</p>
        </div>
      </div>
    );
  }
  
  if (!entries.length) {
    return (
      <div className="text-center py-20">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg max-w-md mx-auto">
          <p className="font-bold">Sin configuraciones</p>
          <p>No hay configuraciones de juego disponibles en este momento.</p>
        </div>
      </div>
    );
  }

  // Colores vibrantes para la ruleta
  const coloresRuleta = [
    '#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', 
    '#C7CEEA', '#F8B195', '#F67280', '#C06C84', '#6C5B7B'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
            Gira la Ruleta y Gana Descuentos
          </h1>
          <p className="mt-2 text-gray-600 max-w-xl mx-auto">
            Cada compra te da derecho a un giro en nuestra ruleta de descuentos.
            ¡Gira y descubre tu premio!
          </p>
        </div>

        {/* Sección de entrada de código */}
        <div className="w-full max-w-2xl mx-auto mb-10">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <div className="flex items-center justify-center mb-4">
              {/* <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4" /> */}
              <h2 className="text-xl font-bold text-gray-800">
                Ingresa tu código para jugar
              </h2>
            </div>
            
            <form onSubmit={handleSubmitCodigo} className="flex flex-col space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={codigoInput}
                  onChange={e => setCodigoInput(e.target.value)}
                  className="flex-grow px-5 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-center text-lg font-medium"
                  placeholder="Código aquí"
                />
                <button
                  type="submit"
                  disabled={validando}
                  className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl hover:from-pink-700 hover:to-purple-700 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl font-bold"
                >
                  {validando ? (
                    <span className="flex items-center justify-center">


                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Validando...
                    </span>
                  ) : 'Validar Código'}
                </button>
              </div>
              
              {errorCodigo && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <p className="text-red-700 font-medium">{errorCodigo}</p>
                </div>
              )}
              
              {successMessage && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-green-700 font-medium">{successMessage}</p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Contenedor de la ruleta */}
        <div className="relative bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl shadow-2xl p-6 sm:p-8 border-4 border-white">
          <div className="flex flex-col items-center space-y-8">
            {/* Flecha indicadora */}
            <div className="relative w-full max-w-md">
              <div className="absolute left-1/2 transform -translate-x-1/2 -top-6 z-10">
                <svg width="60" height="60" viewBox="0 0 60 60" className="text-pink-600 drop-shadow-lg">
                  <polygon points="30,0 45,60 15,60" fill="currentColor" />
                </svg>
              </div>
              
              {/* Ruleta */}
              <div className="relative mx-auto">
                <div
                  ref={ruedaRef}
                  className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white shadow-xl mx-auto"
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
                        
                        // Usar colores vibrantes de la paleta
                        const fillColor = coloresRuleta[i % coloresRuleta.length];
                        
                        const textAngle = startAngle + anguloPor / 2;
                        const textRad = (textAngle - 90) * (Math.PI / 180);
                        const textX = Math.cos(textRad) * 60;
                        const textY = Math.sin(textRad) * 60;
                        
                        return (
                          <g key={i}>
                            <path 
                              d={pathData} 
                              fill={fillColor} 
                              stroke="#fff" 
                              strokeWidth="2" 
                              className="transition-all duration-300 hover:opacity-90"
                            />
                            <text
                              x={textX}
                              y={textY}
                              fill="#fff"
                              fontSize="16"
                              fontWeight="bold"
                              textAnchor="middle"
                              alignmentBaseline="middle"
                              transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                              className="drop-shadow-md"
                            >
                              {entry.porcentaje}%  
                            </text>
                          </g>
                        );
                      })}
                    </g>
                  </svg>
                </div>
                
                {/* Centro de la ruleta */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-4 border-white shadow-xl"></div>
              </div>
            </div>
            
            {/* Botón de girar */}
            <button
              onClick={handleGirar}
              disabled={girado || !tieneAcceso}
              className={`px-10 py-4 rounded-2xl text-xl font-bold transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300 ${
                girado || !tieneAcceso 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {girado ? '¡YA GIRASTE!' : 'GIRAR RULETA'}
            </button>
          </div>
        </div>
        
        {/* Información adicional */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center bg-blue-50 border border-blue-200 rounded-full px-6 py-2">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-blue-700 font-medium">
              Cada compra te da derecho a un giro en la ruleta para tu proxima compra
            </p>
          </div>
        </div>
      </div>
      
      {/* Popup de resultado */}
      <AnimatePresence>
        {showResultPopup && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-gradient-to-br from-yellow-100 via-pink-50 to-purple-100 rounded-3xl shadow-2xl border-8 border-white p-8 max-w-md w-full text-center"
              initial={{ scale: 0.7, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0 }}
            >
              <div className="mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
                ¡FELICIDADES!
              </h2>
              
              <p className="text-2xl font-bold text-gray-800 mb-6">
                Ganaste <span className="text-4xl text-pink-600">{resultado}%</span> de descuento
              </p>
              
              <p className="text-gray-600 mb-8">
                 
                ¡Aprovecha esta oferta especial!
              </p>
              
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setShowResultPopup(false);
                    setGirado(false);
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  ¡ENTENDIDO!
                </button>
              </div>
              
              {/* <div className="mt-6"> */}
                {/* <div className="flex items-center justify-center space-x-4"> */}
                  {/* <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" /> */}
                  {/* <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" /> */}
                  {/* <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" /> */}
                {/* </div> */}
                {/* <p className="text-sm text-gray-500 mt-4">
                  Comparte tu premio en redes sociales
                </p>
              </div> */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Juega;