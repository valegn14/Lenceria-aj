export default function Footer2() {
    return (
        <footer className="bg-gradient-to-r from-pink-900/90 to-purple-900/90 text-white shadow-2xl w-full">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
                    {/* Información */}
                    <div className="text-center sm:text-left">
                        <h2 className="text-lg lg:text-xl font-semibold mb-4 lg:mb-6">Sobre Nosotros</h2>
                        <p className="text-white/90 text-sm lg:text-base leading-relaxed">
                            Somos una tienda especializada en productos íntimos, ofreciendo calidad, discreción y satisfacción garantizada.
                        </p>
                    </div>

                    {/* Enlaces rápidos */}
                    <div className="text-center sm:text-left">
                        <h2 className="text-lg lg:text-xl font-semibold mb-4 lg:mb-6">Enlaces Rápidos</h2>
                        <ul className="space-y-3">
                            <li><a href="/lenceria" className="hover:text-pink-300 text-sm lg:text-base transition-colors">Lencería</a></li>
                            <li><a href="/juguetes" className="hover:text-pink-300 text-sm lg:text-base transition-colors">Juguetes</a></li>
                            <li><a href="/lubricantes" className="hover:text-pink-300 text-sm lg:text-base transition-colors">Lubricantes</a></li>
                            <li><a href="/promociones" className="hover:text-pink-300 text-sm lg:text-base transition-colors">Promociones</a></li>
                        </ul>
                    </div>

                    {/* Ayuda */}
                    <div className="text-center sm:text-left">
                        <h2 className="text-lg lg:text-xl font-semibold mb-4 lg:mb-6">Ayuda</h2>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-pink-300 text-sm lg:text-base transition-colors">Preguntas Frecuentes</a></li>
                            <li><a href="#" className="hover:text-pink-300 text-sm lg:text-base transition-colors">Política de Devoluciones</a></li>
                            <li><a href="#" className="hover:text-pink-300 text-sm lg:text-base transition-colors">Términos y Condiciones</a></li>
                            <li><a href="#" className="hover:text-pink-300 text-sm lg:text-base transition-colors">Privacidad</a></li>
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div className="text-center sm:text-left">
                        <h2 className="text-lg lg:text-xl font-semibold mb-4 lg:mb-6">Contáctanos</h2>
                        <ul className="space-y-3">
                            <li className="text-sm lg:text-base">Email: contacto@lenceriaaj.com</li>
                            <li className="text-sm lg:text-base">Tel: +57 311 363 0754</li>
                            <li className="text-sm lg:text-base">Horario: Lun-Sáb 9AM-8PM</li>
                        </ul>
                        
                        {/* Redes Sociales */}
                        <div className="mt-6">
                            <h3 className="text-base font-semibold mb-3">Síguenos</h3>
                            <div className="flex justify-center sm:justify-start space-x-4">
                                <a href="#" className="text-white/80 hover:text-pink-300 transition-colors transform hover:scale-110">
                                    <span className="sr-only">Facebook</span>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </a>
                                <a href="#" className="text-white/80 hover:text-pink-300 transition-colors transform hover:scale-110">
                                    <span className="sr-only">Instagram</span>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297z"/>
                                    </svg>
                                </a>
                                <a href="https://wa.me/573113630754" className="text-white/80 hover:text-green-400 transition-colors transform hover:scale-110">
                                    <span className="sr-only">WhatsApp</span>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="border-t border-pink-300/20 mt-8 pt-6 text-center text-white/80 text-sm">
                <div className="container mx-auto px-4">
                    <p>© 2024 Lencería AJ. Todos los derechos reservados.</p>
                    <p className="mt-2 text-xs">Productos para adultos. Venta prohibida a menores de edad.</p>
                </div>
            </div>
        </footer>
    );
}