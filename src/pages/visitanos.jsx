import React from "react";
import { useEffect } from "react";

function Mapa() {
  useEffect(() => {
    // creas un <script> para cargar la API de Google Maps.
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyASPV_Kiudq4V1bk9GYZp6cALGZyPttIew&callback=initMap`;
    script.async = true;
    script.defer = true;
    // el navegador descarga la librería de Google Maps.
    document.body.appendChild(script);

    window.initMap = () => {
      const myLocation = { lat: 5.06933831563457, lng: -75.5141396 };
      // Crea un nuevo mapa dentro del div con id "map".
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: myLocation,
        zoom: 20,
      });
      // MARCADOR ROJO
      new window.google.maps.Marker({
        position: myLocation,
        map: map,
        title: "Aquí estamos",
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        }
      });
    };
  }, []);

  return (
    <div>
      {/* Este div es donde Google Maps pintará el mapa. */}
      <div id="map" style={{ height: "400px", width: "100%", borderRadius: "8px" }}></div>
    </div>
  );
}

const Visitanos = () => {
  return (
    <div className='p-10 min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className='bg-white p-10 rounded-2xl shadow-2xl max-w-xl w-full text-center'>
        <h1 className='text-3xl font-bold text-gray-800 mb-6'>Información de Contacto</h1>
        <p className='text-lg text-gray-700 mb-4'>
          <span className="font-semibold">Ubicación:</span> Manizales, Colombia
        </p>
        <p className='text-lg text-gray-700 mb-4'>
          <span className="font-semibold">Horario de atención:</span> Lunes a Viernes, 8:00 a.m. - 6:00 p.m.
        </p>
        <p className='text-lg text-gray-700 mb-4'>
          <span className="font-semibold">Teléfono:</span> +57 300 123 4567
        </p>
        <p className='text-lg text-gray-700 mb-4'>
          <span className="font-semibold">Correo:</span> contacto@ejemplo.com
        </p>
        <p className='text-lg text-gray-700'>
          ¡Estamos para ayudarte! No dudes en comunicarte con nosotros.
        </p>
        <Mapa />
        <a
          href="https://www.google.com/maps/search/?api=1&query=5.0693383156345755,-75.51413961785336"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-pink-600 text-white px-4 py-2 rounded-lg"
        >
          Ver ubicación en Google Maps
        </a>
      </div>
    </div>
  );
};

export default Visitanos;
