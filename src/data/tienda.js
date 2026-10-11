// Datos de contacto de la tienda, usados en todo el sitio

export const TIENDA = {
  telefono: "+57 324 5859853",
  telefonoLink: "tel:+573245859853",
  whatsappNumero: "573245859853",
  direccion: "Carrera 20 #27-33",
  ciudad: "Manizales, Colombia",
  horario: "Lunes a Sábado, 9:30 a.m. - 7:00 p.m.",
  facebook: "https://www.facebook.com/profile.php?id=100063722252677&mibextid=ZbWKwL",
  instagram: "https://www.instagram.com/lenceria_aj/",
};

export const urlWhatsApp = (mensaje) =>
  `https://wa.me/${TIENDA.whatsappNumero}${mensaje ? `?text=${encodeURIComponent(mensaje)}` : ""}`;
