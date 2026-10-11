// Ícono de suplementos (cápsulas) en SVG. Toma el color del texto (currentColor).
const IconoSuplementos = ({ className = "h-7 w-7" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="50 35 385 395"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={16}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* cápsula de atrás (arriba, casi vertical) */}
    <path d="M203 190 V108 A56 56 0 0 1 315 108 V225" />
    {/* línea punteada: raya, punto, raya */}
    <path d="M214 172 H234" />
    <path d="M286 174 H304" />
    <circle cx="258" cy="172" r="2" fill="currentColor" />

    {/* cápsula izquierda (inclinada) */}
    <g transform="translate(140 215) rotate(52)">
      <rect x="-95" y="-33" width="190" height="66" rx="33" />
      <path d="M-5 -33 V33" />
    </g>

    {/* unión pequeña entre cápsula izquierda y derecha */}
    <path d="M206 292 L222 304" />

    {/* cápsula derecha (grande, inclinada) */}
    <g transform="translate(312 306) rotate(-42)">
      <rect x="-135" y="-45" width="270" height="90" rx="45" />
      <path d="M0 -45 V45" />
    </g>
  </svg>
);

export default IconoSuplementos;
