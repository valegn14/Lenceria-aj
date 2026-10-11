// Ícono de juguetes en SVG. Toma el color del texto (currentColor).
const IconoJuguetes = ({ className = "h-7 w-7" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="90 36 200 384"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={16}
    strokeLinecap="butt"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* cuerpo ovalado */}
    <path d="M190 48 C150 48 108 120 108 185 C108 235 145 268 190 268 C235 268 272 235 272 185 C272 120 230 48 190 48 Z" />
    {/* brillo izquierdo */}
    <path d="M182 74 C152 102 134 150 136 195" />
    {/* brillo inferior derecho */}
    <path d="M243 205 C241 230 220 246 192 247" />
    {/* tallo */}
    <path d="M172 264 V358" />
    <path d="M208 264 V358" />
    {/* base */}
    <ellipse cx="190" cy="366" rx="70" ry="16" />
    <path d="M120 366 V386 C120 400 155 408 190 408 C225 408 260 400 260 386 V366" />
  </svg>
);

export default IconoJuguetes;
