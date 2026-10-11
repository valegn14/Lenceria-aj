// Ícono de lencería (body) en SVG. Toma el color del texto (currentColor).
// Se dibuja la mitad izquierda y su reflejo, sin <use>/ids para poder repetirlo en la página.
const Mitad = (props) => (
  <g {...props}>
    {/* tirante */}
    <path d="M166 67 V140" />
    {/* copa */}
    <path d="M166 140 C140 160 150 208 198 213 C228 216 245 204 252 192 C215 195 180 175 166 140 Z" strokeLinejoin="round" />
    {/* cuerpo con vuelo y borde inferior */}
    <path d="M166 213 V265 C166 320 135 365 93 392 C135 425 190 440 236 440 V213" />
  </g>
);

const IconoLenceria = ({ className = "h-7 w-7" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="70 55 370 405"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={22}
    strokeLinejoin="miter"
    strokeLinecap="butt"
    aria-hidden="true"
  >
    <Mitad />
    <Mitad transform="translate(510,0) scale(-1,1)" />
  </svg>
);

export default IconoLenceria;
