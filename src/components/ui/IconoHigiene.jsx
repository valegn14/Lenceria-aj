// Ícono de higiene en SVG. Toma el color del texto (currentColor).
const IconoHigiene = ({ className = "h-7 w-7" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="70 40 180 375"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={14}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* cuerpo con punta (depósito) */}
    <path d="M109 366 V120 C109 92 130 74 148 72 C141 70 140 58 146 54 C153 48 167 48 174 54 C180 58 179 70 172 72 C190 74 212 92 212 120 V366" />
    {/* anillo de la base */}
    <rect x="88" y="366" width="144" height="34" rx="17" />
  </svg>
);

export default IconoHigiene;
