import React from "react";
import { TIENDA, urlWhatsApp } from "../data/tienda";

const DatoContacto = ({ icono, titulo, children }) => (
  <div className="flex items-center space-x-3">
    <div className="flex-shrink-0">
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {icono}
      </svg>
    </div>
    <div>
      <h3 className="text-sm sm:text-base font-semibold text-gray-800">{titulo}</h3>
      <p className="text-sm sm:text-base text-gray-600">{children}</p>
    </div>
  </div>
);

const Contacto = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-transparent px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
            <div className="text-center mb-8 lg:mb-12">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                Información de Contacto
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Escríbenos, llámanos o visítanos. Estamos para asesorarte con total discreción.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Información de contacto */}
              <div className="space-y-4 lg:space-y-6">
                <DatoContacto
                  titulo="Teléfono"
                  icono={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />}
                >
                  <a href={TIENDA.telefonoLink} className="hover:text-pink-600 transition-colors">{TIENDA.telefono}</a>
                </DatoContacto>

                <DatoContacto
                  titulo="Ubicación"
                  icono={
                    <>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </>
                  }
                >
                  {TIENDA.direccion}, {TIENDA.ciudad}
                </DatoContacto>

                <DatoContacto
                  titulo="Horario de atención"
                  icono={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
                >
                  {TIENDA.horario}
                </DatoContacto>
              </div>

              {/* Redes sociales */}
              <div className="space-y-4 lg:space-y-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">Síguenos en redes sociales</h3>
                <div className="flex flex-wrap gap-4">
                  <a href={TIENDA.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="text-sm">Facebook</span>
                  </a>

                  <a href={TIENDA.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 30 30">
                      <path d="M 9.998 3C 6.139 3 3 6.142 3 10.002V20.002C3 23.861 6.142 27 10.002 27H20.002C23.861 27 27 23.858 27 19.998V9.998C27 6.139 23.858 3 19.998 3H9.998zM22 7c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-7 2c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6zm0 2a4 4 0 100 8 4 4 0 000-8z" />
                    </svg>
                    <span className="text-sm">Instagram</span>
                  </a>

                  <a href={urlWhatsApp()} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <span className="text-sm">WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
