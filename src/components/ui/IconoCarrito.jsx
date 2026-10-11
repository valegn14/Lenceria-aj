// Ícono de carrito único del sitio. Toma el color del texto (currentColor),
// así que se pinta con clases como text-pink-600 y cambia con hover.
// Solo se le da ancho (ej: w-7); el alto se ajusta solo a la proporción del dibujo.
const IconoCarrito = ({ className = "w-7 text-pink-600", strokeWidth = 9 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="36 32 140 106"
    className={`h-auto ${className}`}
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinejoin="miter"
    strokeLinecap="butt"
    aria-hidden="true"
  >
    {/* manija y canasta */}
    <path d="M45 42 H66 L80 95 H150 L166 52 H66" />
    {/* ruedas */}
    <circle cx="95" cy="119" r="11" />
    <circle cx="143" cy="119" r="11" />
  </svg>
);

export default IconoCarrito;
