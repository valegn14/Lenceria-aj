import React from "react";
import { useEffect } from "react";

function Mapa() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyASPV_Kiudq4V1bk9GYZp6cALGZyPttIew&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    window.initMap = () => {
      new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 5.0693383156345755,  lng: -75.51413961785336 },
        zoom: 20,
      });
    };
  }, []);

  return (
    <div>
      <div id="map" style={{ height: "400px", width: "100%" }}></div>
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
                <Mapa/>
            </div>
        </div>
    );
};

export default Visitanos;
