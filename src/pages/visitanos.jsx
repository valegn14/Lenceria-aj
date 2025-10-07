import React, { useEffect } from "react";

function Mapa() {
  useEffect(() => {
    const script = document.createElement("script");
    //script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyASPV_Kiudq4V1bk9GYZp6cALGZyPttIew&callback=initMap`;
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC3-bzN7sKRvsT0f_xiBODLOx8jNBsGtEE&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    window.initMap = () => {
      const myLocation = { lat: 5.06933831563457, lng: -75.5141396 };
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: myLocation,
        zoom: 18,
        styles: [
          {
            featureType: "poi",
            stylers: [{ visibility: "off" }]
          }
        ]
      });
      
      new window.google.maps.Marker({
        position: myLocation,
        map: map,
        title: "Aquí estamos",
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        }
      });
    };
    
    return () => {
      // Limpiar el script al desmontar el componente
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-lg">
      <div id="map" style={{ height: "100%", width: "100%" }}></div>
    </div>
  );
}

const ContactInfoItem = ({ icon, label, value }) => (
  <div className="flex items-start mb-4">
    <div className="text-pink-600 mr-3 mt-1">
      {icon}
    </div>
    <div>
      <p className="font-medium text-gray-700">{label}</p>
      <p className="text-gray-600">{value}</p>
    </div>
  </div>
);

const Visitanos = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Visítanos</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {/* Estamos para ayudarte. Ven a conocernos o contáctanos para cualquier consulta. */}
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Información de contacto */}
          <div className="lg:w-2/5">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 h-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                Información de Contacto
              </h2>
              
              <div className="space-y-5">
                <ContactInfoItem
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>}
                  label="Ubicación"
                  value="Manizales, Colombia"
                />
                
                <ContactInfoItem
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>}
                  label="Horario de atención"
                  value="Lunes a Sábado, 9:30 a.m. - 7:00 p.m."
                />
                
                <ContactInfoItem
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>}
                  label="Teléfono"
                  value="+57 324 5859853"
                />
                
                {/* <ContactInfoItem
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>}
                  label="Correo"
                  value="contacto@ejemplo.com"
                /> */}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-lg text-gray-700 mb-6">
                  ¡Estamos para ayudarte! No dudes en comunicarte con nosotros.
                </p>
                
                <a
                  href="https://www.google.com/maps/search/?api=1&query=5.0693383156345755,-75.51413961785336"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full sm:w-auto bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Ver ubicación en Google Maps
                </a>
              </div>
            </div>
          </div>
          
          {/* Mapa */}
          <div className="lg:w-3/5">
            <div className="bg-white rounded-2xl shadow-xl p-6 h-full">
              <div className="h-[500px]">
                <Mapa />
              </div>
              
              <div className="mt-6 bg-pink-50 rounded-lg p-4 border border-pink-100">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-pink-700">
                      Nuestro local se encuentra en el centro de Manizales.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visitanos;// import React from "react";
// import { useEffect } from "react";

// function Mapa() {
//   useEffect(() => {
//     // creas un <script> para cargar la API de Google Maps.
//     const script = document.createElement("script");
//     script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyASPV_Kiudq4V1bk9GYZp6cALGZyPttIew&callback=initMap`;
//     script.async = true;
//     script.defer = true;
//     // el navegador descarga la librería de Google Maps.
//     document.body.appendChild(script);

//     window.initMap = () => {
//       const myLocation = { lat: 5.06933831563457, lng: -75.5141396 };
//       // Crea un nuevo mapa dentro del div con id "map".
//       const map = new window.google.maps.Map(document.getElementById("map"), {
//         center: myLocation,
//         zoom: 20,
//       });
//       // MARCADOR ROJO
//       new window.google.maps.Marker({
//         position: myLocation,
//         map: map,
//         title: "Aquí estamos",
//         icon: {
//           url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
//         }
//       });
//     };
//   }, []);

//   return (
//     <div className="p-5">
//       {/* Este div es donde Google Maps pintará el mapa. */}
//       <div id="map" style={{ height: "400px", width: "100%", borderRadius: "8px" }}></div>
//     </div>
//   );
// }

// const Visitanos = () => {
//   return (
//     <div className='mt-2 p-5 min-h-screen bg-gray-100 justify-center'>
//       <div className='bg-white p-5 rounded-2xl shadow-2xl w-full text-center'>
//         <h1 className='text-3xl font-bold text-gray-800 mb-6'>Información de Contacto</h1>
//         <p className='text-lg text-gray-700 mb-4'>
//           <span className="font-semibold">Ubicación:</span> Manizales, Colombia
//         </p>
//         <p className='text-lg text-gray-700 mb-4'>
//           <span className="font-semibold">Horario de atención:</span> Lunes a Viernes, 8:00 a.m. - 6:00 p.m.
//         </p>
//         <p className='text-lg text-gray-700 mb-4'>
//           <span className="font-semibold">Teléfono:</span> +57 300 123 4567
//         </p>
//         <p className='text-lg text-gray-700 mb-4'>
//           <span className="font-semibold">Correo:</span> contacto@ejemplo.com
//         </p>
//         <p className='text-lg text-gray-700'>
//           ¡Estamos para ayudarte! No dudes en comunicarte con nosotros.
//         </p>
//         <Mapa />
//         <a
//           href="https://www.google.com/maps/search/?api=1&query=5.0693383156345755,-75.51413961785336"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="bg-pink-600 text-white px-4 py-2 rounded-lg"
//         >
//           Ver ubicación en Google Maps
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Visitanos;
