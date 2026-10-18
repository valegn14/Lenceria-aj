// Única fuente de las categorías: el header, el inicio y el footer usan este orden y estas rutas

export const LENCERIA_SUBCATEGORIAS = [
  { nombre: "SetBasicos", hoja: "SetBasicos", ruta: "/lenceria/setbasicos" },
  { nombre: "Corsets", hoja: "Corsets", ruta: "/lenceria/corsets" },
  { nombre: "Bodys", hoja: "Bodys", ruta: "/lenceria/bodys" },
  { nombre: "Pijamas", hoja: "Pijamas", ruta: "/lenceria/pijamas" },
  { nombre: "Conjuntos", hoja: "Conjuntos", ruta: "/lenceria/conjuntos" },
  { nombre: "Medias", hoja: "Medias", ruta: "/lenceria/medias" },
  { nombre: "Pantys", hoja: "Pantys", ruta: "/lenceria/pantys" },
  { nombre: "Babydolls", hoja: "Babydolls", ruta: "/lenceria/babydolls" },
  { nombre: "Disfraces", hoja: "Disfraces", ruta: "/lenceria/disfraces" },
  { nombre: "Mallas", hoja: "Mallas", ruta: "/lenceria/mallas" },
  { nombre: "Tejidos", hoja: "Tejidos", ruta: "/lenceria/tejidos" },
];

export const CATEGORIAS = [
  {
    key: "lenceria",
    nombre: "Lencería",
    ruta: "/lenceria",
    // Las subcategorías aparecen con chevron/desplegable en el header y en el menú lateral
    subcategorias: [
      { nombre: "Lencería mujer", ruta: "/lenceria/mujer" },
      { nombre: "Lencería hombre", ruta: "/lenceria/hombre" },
      ...LENCERIA_SUBCATEGORIAS.map(({ nombre, ruta }) => ({ nombre, ruta })),
    ],
    imagen: "https://i.pinimg.com/736x/3e/9a/21/3e9a213fba360f4fefbe8b85e4f1be24.jpg",
    descripcion: "Elegancia que despierta los sentidos",
    color: "from-rose-900/60 to-pink-900/60",
  },
  {
    key: "juguetes",
    nombre: "Juguetes",
    ruta: "/juguetes",
    imagen: "https://i.pinimg.com/736x/b9/88/17/b98817646c69337a78d32d0634585379.jpg",
    descripcion: "Placeres que sorprenden",
    color: "from-purple-900/60 to-indigo-900/60",
  },
  {
    key: "lubricantes",
    nombre: "Lubricantes",
    ruta: "/lubricantes",
    imagen: "/lubric.png",
    descripcion: "Suavidad que intensifica",
    color: "from-blue-900/60 to-teal-900/60",
  },
  {
    key: "suplementos",
    nombre: "Suplementos",
    ruta: "/suplementos",
    imagen: "https://res.cloudinary.com/dpsgtzlst/image/upload/v1782994786/suplementos_fnvplp.png",
    descripcion: "Bienestar que potencia",
    color: "from-green-900/60 to-emerald-900/60",
  },
  {
    key: "higiene",
    nombre: "Higiene",
    ruta: "/higiene",
    imagen: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800",
    descripcion: "Cuidado personal esencial",
    color: "from-cyan-900/60 to-blue-900/60",
  },
  {
    key: "bronceadores",
    nombre: "Bronceadores",
    ruta: "/bronceadores",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4d--vr_MZ9h1eFb2afJhM5_QVdKfChEotT0eGqgrZ3IgDl-71k1mS28dg&s=10",
    descripcion: "Estilo que seduce",
    color: "from-sky-900/60 to-teal-900/60",
  },
  {
    key: "combos",
    nombre: "Combos",
    ruta: "/combos",
    imagen: "https://res.cloudinary.com/dycxpw4ax/image/upload/v1783814356/WhatsApp_Image_2026-07-11_at_6.28.15_PM_1_etgrzv.jpg",
    descripcion: "Combinaciones irresistibles",
    color: "from-fuchsia-900/60 to-rose-900/60",
  },
  {
    key: "promociones",
    nombre: "Promociones",
    ruta: "/promociones",
    imagen: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    descripcion: "Oportunidades que excitan",
    color: "from-amber-900/60 to-orange-900/60",
  },
];

export const RUTA_VISITANOS = "/visitanos";
