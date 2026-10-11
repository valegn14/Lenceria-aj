// Ícono de lubricantes (frasco dispensador) en SVG. Toma el color del texto (currentColor).
const IconoLubricantes = ({ className = "h-7 w-7" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="105 45 160 405"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={14}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* boquilla del dispensador */}
    <path d="M165 108 V84 C165 72 172 66 184 66 H224 C232 66 232 82 224 82 H202 C198 82 196 85 196 90 V108" />
    {/* cuello */}
    <rect x="152" y="108" width="68" height="76" rx="4" />
    {/* cuerpo: hombros y lado izquierdo (con hueco inferior) */}
    <path d="M152 184 C132 192 126 205 126 225 V305" />
    <path d="M126 345 V415 C126 428 134 436 148 436" />
    {/* cuerpo: hombros y lado derecho (con hueco inferior) */}
    <path d="M220 184 C240 192 246 205 246 225 V345" />
    <path d="M246 375 V415 C246 428 238 436 224 436" />
    {/* base inferior */}
    <path d="M148 436 H224" />
    <path d="M126 385 H246" />
    {/* raya de la etiqueta */}
    <path d="M165 252 H206" />
    {/* gota */}
    <path d="M186 285 C186 285 160 312 160 330 C160 345 171 354 186 354 C201 354 212 345 212 330 C212 312 186 285 186 285 Z" />
  </svg>
);

export default IconoLubricantes;
