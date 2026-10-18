import { useId } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "./ProductGrid";

const Chevron = ({ className = "h-4 w-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
);

/*
  Sección de una categoría en el inicio: recuadro con el nombre de la categoría y
  "Ver todo" arriba de sus productos. Cuadrícula vertical (2 columnas en celular y tablet,
  4 en escritorio), sin desplazamiento horizontal.
*/
export default function SeccionDestacada({ titulo, ruta, textoVerTodos, productos }) {
  const idTitulo = useId();

  if (!productos?.length) return null;

  return (
    <section aria-labelledby={idTitulo} className="border border-white/70 bg-white/20 p-4 shadow-sm backdrop-blur-[2px] sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 id={idTitulo} className="text-lg font-semibold text-gray-900 sm:text-xl">
          <Link
            to={ruta}
            className="rounded-sm transition-colors hover:text-pink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
          >
            {titulo}
          </Link>
        </h3>
        <Link
          to={ruta}
          aria-label={textoVerTodos}
          className="inline-flex min-h-11 shrink-0 items-center gap-0.5 rounded-lg text-sm font-semibold text-pink-700 transition-colors hover:text-pink-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
        >
          Ver todo
          <Chevron />
        </Link>
      </div>

      <ul className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
        {productos.map((producto) => (
          <li key={producto.id} className="[&>div]:h-full">
            <ProductCard producto={producto} sinBorde />
          </li>
        ))}
      </ul>
    </section>
  );
}
