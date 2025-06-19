export default function Footer2() {
    return (
        <>
            <footer className="bg-gradient-to-l bg-pink-900/40 text-white shadow-lg w-full">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-sm">
                        {/* Información */}
                        <div className="text-center sm:text-left">
                            <h2 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">Sobre Nosotros</h2>
                            <p className="text-white/90 text-sm lg:text-base leading-relaxed">
                                Somos una tienda de ropa apasionada por la moda, ofreciendo prendas únicas con estilo y calidad.
                            </p>
                        </div>

                        {/* Ayuda */}
                        <div className="text-center sm:text-left">
                            <h2 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">Ayuda</h2>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:underline text-sm lg:text-base transition-colors">Preguntas Frecuentes</a></li>
                                <li><a href="#" className="hover:underline text-sm lg:text-base transition-colors">Política de Devoluciones</a></li>
                                <li><a href="#" className="hover:underline text-sm lg:text-base transition-colors">Términos y Condiciones</a></li>
                                <li><a href="#" className="hover:underline text-sm lg:text-base transition-colors">Privacidad</a></li>
                            </ul>
                        </div>

                        {/* Contacto */}
                        <div className="text-center sm:text-left">
                            <h2 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">Contáctanos</h2>
                            <ul className="space-y-2">
                                <li className="text-sm lg:text-base">Email: contacto@tiendaropa.com</li>
                                <li className="text-sm lg:text-base">Tel: +57 300 123 4567</li>
                                <li className="text-sm lg:text-base">Dirección: Calle 123, Bogotá, Colombia</li>
                            </ul>
                        </div>

                        {/* Redes Sociales */}
                        <div className="text-center sm:text-left">
                            <h2 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">Síguenos</h2>
                            <div className="flex justify-center sm:justify-start space-x-4">
                                <a href="#" className="text-white/80 hover:text-white transition-colors">
                                    <span className="sr-only">Facebook</span>
                                    <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </a>
                                <a href="#" className="text-white/80 hover:text-white transition-colors">
                                    <span className="sr-only">Instagram</span>
                                    <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-pink-300/20 mt-6 lg:mt-8 pt-4 lg:pt-6 text-center text-black/80 text-xs lg:text-sm">
                    © 2024 Tienda de Ropa. Todos los derechos reservados.
                </div>
            </footer>
        </>
    );
}