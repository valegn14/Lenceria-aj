// Ícono de bronceadores (vestido de baño) en SVG. Toma el color del texto (currentColor).
// Se dibuja la mitad izquierda y su reflejo, sin <use>/ids para poder repetirlo en la página.
const Mitad = (props) => (
  <g {...props}>
    {/* lazo: argolla */}
    <path d="M58 154 V140 A18 18 0 1 1 94 140 V154" />
    {/* cola del lazo */}
    <path d="M58 154 V184" />
    {/* curva lateral que baja hacia la parte trasera */}
    <path d="M76 154 C150 165 205 215 222 296" />
  </g>
);

const IconoBronceadores = ({ className = "h-7 w-7" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="25 105 400 210"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={20}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* banda superior */}
    <path d="M42 154 H408" />
    <Mitad />
    <Mitad transform="translate(450,0) scale(-1,1)" />
  </svg>
);

export default IconoBronceadores;
