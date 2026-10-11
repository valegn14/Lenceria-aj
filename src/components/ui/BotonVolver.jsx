import { useNavigate } from "react-router-dom";

// Botón "Volver" único: sin `to` regresa a la página anterior
const BotonVolver = ({ to, texto = "Volver", className = "mb-6" }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => (to ? navigate(to) : navigate(-1))}
      className={`group inline-flex items-center text-pink-600 hover:text-pink-800 font-medium transition-colors ${className}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      {texto}
    </button>
  );
};

export default BotonVolver;
