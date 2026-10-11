// Ícono de combos (llama) en SVG. Toma el color del texto (currentColor).
const IconoCombos = ({ className = "h-7 w-7" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="55 40 310 405"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={16}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* llama exterior */}
    <path d="M248 58 C215 78 172 125 170 205 C170 228 170 242 168 250 C150 246 128 224 112 183 C88 205 72 250 72 285 C72 365 130 425 208 425 C285 425 343 365 343 285 C343 215 295 160 262 112 C250 94 244 74 248 58 Z" />
    {/* llama interior */}
    <path d="M225 266 C215 290 200 305 193 318 C186 330 182 323 180 316 C165 328 152 345 152 368 C152 395 175 413 208 413 C241 413 265 395 265 365 C265 325 240 295 225 266 Z" />
  </svg>
);

export default IconoCombos;
