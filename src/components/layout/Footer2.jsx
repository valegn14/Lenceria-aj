export default function Footer2() {
    return (
        <>
            <footer className="bg-gradient-to-t from-[#B76E79] to-[#E8A0B6] text-white shadow-lg w-full">
                <div className="container mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
                        {/* Información */}
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Sobre Nosotros</h2>
                            <p className="text-white/90">
                                Somos una tienda de ropa apasionada por la moda, ofreciendo prendas únicas con estilo y calidad.
                            </p>
                        </div>

                        {/* Ayuda */}
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Ayuda</h2>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:underline">Preguntas Frecuentes</a></li>
                                <li><a href="#" className="hover:underline">Política de Devoluciones</a></li>
                                <li><a href="#" className="hover:underline">Términos y Condiciones</a></li>
                                <li><a href="#" className="hover:underline">Privacidad</a></li>
                            </ul>
                        </div>

                        {/* Contacto */}
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Contáctanos</h2>
                            <ul className="space-y-2">
                                <li>Email: contacto@tiendaropa.com</li>
                                <li>Tel: +57 300 123 4567</li>
                                <li>Dirección: Calle 123, Bogotá, Colombia</li>
                            </ul>
                        </div>

                        {/* Redes Sociales */}
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Síguenos</h2>
                            {/* <div className="flex space-x-4">
                                <a href="#" className="hover:scale-110 transition"><img src="/icons/facebook.png" alt="Facebook" className="w-6 h-6" /></a>
                                <a href="#" className="hover:scale-110 transition"><img src="/icons/instagram.png" alt="Instagram" className="w-6 h-6" /></a>
                                <a href="#" className="hover:scale-110 transition"><img src="/icons/tiktok.png" alt="TikTok" className="w-6 h-6" /></a>
                            </div> */}
                        </div>
                    </div>

                    <div className="mt-12 text-center text-white/80 text-sm">
                        © 2024 Tienda de Ropa. Todos los derechos reservados.
                    </div>
                </div>
            </footer>
        </>
    );
}
