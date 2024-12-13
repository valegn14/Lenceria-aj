export default function Footer() {
  // Función para determinar si una ruta está activa

  return (
    <>
      {/* <!-- Footer --> */}
      <footer className="bg-white shadow-md mt-8">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <p className="text-gray-700 text-sm">
            © 2024 Mi Sitio Web. Todos los derechos reservados.
          </p>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-gray-700 hover:text-teal-600 text-sm">
                Política de privacidad
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-teal-600 text-sm">
                Términos de uso
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
