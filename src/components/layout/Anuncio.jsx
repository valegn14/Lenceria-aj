import React, { useEffect, useState } from "react";

const frases = [
  "Descuentos imperdibles",
  "Envíos gratis después de 120mil pesos",
  "¡Somos mayoristas!",
  "Pide tu asesoria"
];

const Anuncio = () => {
  const [indice, setIndice] = useState(0);
  const [fase, setFase] = useState("entrada");

  useEffect(() => {
    let timeouts = [];

    const animar = () => {
      setFase("entrada");

      timeouts.push(
        setTimeout(() => setFase("centro"), 800),
        setTimeout(() => setFase("salida"), 3500),
        setTimeout(() => {
          setIndice((prev) => (prev + 1) % frases.length);
          animar();
        }, 4000)
      );
    };

    animar();
    return () => timeouts.forEach((t) => clearTimeout(t));
  }, []);

  const getTranslateClass = () => {
    switch (fase) {
      case "entrada":
        return "translate-x-full opacity-0";
      case "centro":
        return "translate-x-0 opacity-100";
      case "salida":
        return "-translate-x-full opacity-0";
      default:
        return "";
    }
  };

  return (
    <div className="w-full bg-pink-200 text-pink-900 overflow-hidden relative h-10 flex items-center justify-center">
<div
  className={`absolute transition-all duration-1000 ease-in-out whitespace-nowrap text-sm sm:text-base font-poppins font-semibold ${getTranslateClass()}`}
  key={indice}
>
  {frases[indice]}
</div>
    </div>
  );
};

export default Anuncio;

