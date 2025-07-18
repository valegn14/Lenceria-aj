import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import banner from "../assets/pinteres3.png";
import { cargarLenceriaDesdeSheets, cargarJuguetesDesdeSheets, cargarLubricantesDesdeSheets } from "../database/sheets";
import Lenceria from "./lenceria";
import Juguetes from "./juguetes";
import Lubricantes from "./lubricantes";

// Definición de categorías (no olvides esto)
const categories = [
  {
    name: "Lencería",
    route: "/lenceria",
    image: "https://i.pinimg.com/736x/3e/9a/21/3e9a213fba360f4fefbe8b85e4f1be24.jpg",
    description: "Elegancia que despierta los sentidos",
    color: "from-rose-900/60 to-pink-900/60",
  },
  {
    name: "Juguetes",
    route: "/juguetes",
    image: "https://i.pinimg.com/736x/b9/88/17/b98817646c69337a78d32d0634585379.jpg",
    description: "Placeres que sorprenden",
    color: "from-purple-900/60 to-indigo-900/60",
  },
  {
    name: "Lubricantes",
    route: "/lubricantes",
    image: "https://senintimo.com/cdn/shop/files/Oscuro_1.jpg?v=1744314819&width=500",
    description: "Suavidad que intensifica",
    color: "from-blue-900/60 to-teal-900/60",
  },
  {
    name: "Promociones",
    route: "/promociones",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Oportunidades que excitan",
    color: "from-amber-900/60 to-orange-900/60",
  },
];

// Componente para embeds de Instagram
const InstagramEmbed = ({ html }) => {
  const reloadScript = useCallback(() => {
    if (window.instgrm && window.instgrm.Embeds) {
      window.instgrm.Embeds.process();
    }
  }, []);

  useEffect(() => {
    reloadScript();
  }, [html, reloadScript]);

  return (
    <div
      className="instagram-embed bg-white rounded-xl shadow-md overflow-hidden"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

const Inicio = ({ searchTerm }) => {
  const [productosLenceria, setProductosLenceria]   = useState([]);
  const [productosJuguetes, setProductosJuguetes]   = useState([]);
  const [productosLubricantes, setProductosLubricantes] = useState([]);
  const [loadingProductos, setLoadingProductos]     = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const [lice, juguetes, lubricantes] = await Promise.all([
          cargarLenceriaDesdeSheets(),
          cargarJuguetesDesdeSheets(),
          cargarLubricantesDesdeSheets(),
        ]);
        setProductosLenceria(lice.slice(0, 4));
        setProductosJuguetes(juguetes.slice(0, 4));
        setProductosLubricantes(lubricantes.slice(0, 4));
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoadingProductos(false);
      }
    };
    cargar();
  }, []);

  // Bloques embed de Instagram
  const instagramEmbeds = [
    `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DL3VTZWuop5/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/DL3VTZWuop5/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">Ver esta publicación en Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/DL3VTZWuop5/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">Una publicación compartida por lencería aj | pijamas | ropa interior | lencería | Manizales (@lenceria_aj)</a></p></div></blockquote>
<script async src="//www.instagram.com/embed.js"></script>`,
   
    `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DMHMhRAuacB/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/DMHMhRAuacB/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">Ver esta publicación en Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/DMHMhRAuacB/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">Una publicación compartida por lencería aj | pijamas | ropa interior | lencería | Manizales (@lenceria_aj)</a></p></div></blockquote>
<script async src="//www.instagram.com/embed.js"></script>`,
    
    
    
    `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DMOelrKuKMW/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/DMOelrKuKMW/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">Ver esta publicación en Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/DMOelrKuKMW/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">Una publicación compartida por lencería aj | pijamas | ropa interior | lencería | Manizales (@lenceria_aj)</a></p></div></blockquote>
<script async src="//www.instagram.com/embed.js"></script>`,
  ];

  return (
    <div className="w-full bg-gradient-to-b from-pink-50 to-purple-50 min-h-screen">
      {/* Hero Banner */}
      <div className="w-full sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden shadow-xl">
            <img
              src={banner}
              alt="Banner de inicio"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 drop-shadow-lg">
                Bienvenidos al Placer
              </h1>
              <p className="text-sm sm:text-base md:text-lg opacity-90 drop-shadow-md">
                Descubre una experiencia única de sensualidad y elegancia
              </p>
            </div>
          </div>
        </div>
      </div>

       {/* Categorías */}
     <div className="px-4 sm:px-6 lg:px-8 mb-12">
       <div className="max-w-7xl mx-auto">
           <div className="text-center mb-8">
             <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-gray-800 mb-4">
              Explora nuestras categorías
             </h2>
             <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-500 mx-auto"></div>
           </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat, idx) => (
              <Link
                to={cat.route}
                key={cat.name}
                className="group relative overflow-hidden rounded-2xl shadow-lg transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                onMouseEnter={() => setHoveredCategory(idx)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="relative h-40 sm:h-56 lg:h-56 w-full">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-b ${cat.color} opacity-70 group-hover:opacity-80 transition-opacity duration-500`}></div>
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center transform transition-transform duration-700 group-hover:rotate-45">
                    <div className="w-6 h-6 rounded-full border border-white/40"></div>
                  </div>
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-lg sm:text-xl font-serif font-light mb-2 transform transition-transform duration-500 group-hover:translate-y-0">
                    {cat.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-light opacity-0 max-h-0 overflow-hidden transition-all duration-500 group-hover:opacity-100 group-hover:max-h-20">
                    {cat.description}
                  </p>
                  <div className="mt-3 flex items-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                    <span className="text-sm mr-2">Explorar</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
       </div>
      {/* Productos destacados */}
      <div className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-gray-800 mb-4">
              DESTACADOS
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-500 mx-auto" />
          </div>
          {loadingProductos ? (
            <div className="min-h-[50vh] flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-fuchsia-500 mb-6" />
                <p className="text-lg sm:text-xl text-gray-900">Descubriendo tus placeres...</p>
              </div>
            </div>
          ) : (
            <>
              <Juguetes productos={productosJuguetes} mostrarBotonVolver={false} searchTerm="" />
              <div className="mt-6 text-center mb-10">
                <Link to="/juguetes" className="inline-block bg-purple-600 text-white px-6 py-2 rounded-full text-sm sm:text-base font-medium shadow-md hover:bg-purple-700 transition">
                  Ver más juguetes
                </Link>
              </div>
              <Lenceria productos={productosLenceria} mostrarBotonVolver={false} searchTerm="" />
              <div className="mt-6 text-center mb-10">
                <Link to="/lenceria" className="inline-block bg-pink-600 text-white px-6 py-2 rounded-full text-sm sm:text-base font-medium shadow-md hover:bg-pink-700 transition">
                  Ver más lencería
                </Link>
              </div>
              <Lubricantes productos={productosLubricantes} mostrarBotonVolver={false} searchTerm="" />
              <div className="mt-6 text-center">
                <Link to="/lubricantes" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full text-sm sm:text-base font-medium shadow-md hover:bg-blue-700 transition">
                  Ver más lubricantes
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Sección Instagram Embeds */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* <h4 className="text-center text-2xl font-medium text-gray-800 mb-8">También en Instagram</h4> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {instagramEmbeds.map((html, idx) => (
              <InstagramEmbed key={idx} html={html} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import banner from "../assets/pinteres3.png";
// import { cargarLenceriaDesdeSheets } from "../database/sheets";
// import Lenceria from "./lenceria"; // ajusta la ruta si es diferente
// import Juguetes from "./juguetes"; // ajusta la ruta si es diferente
// import { cargarJuguetesDesdeSheets, cargarLubricantesDesdeSheets } from "../database/sheets";
// import Lubricantes from "./lubricantes"; // ajusta la ruta si es diferente

// // Imágenes sensuales para categorías
// const lenceriaImg = "https://i.pinimg.com/736x/3e/9a/21/3e9a213fba360f4fefbe8b85e4f1be24.jpg";
// const juguetesImg = "https://i.pinimg.com/736x/b9/88/17/b98817646c69337a78d32d0634585379.jpg";
// const lubricantesImg = "https://senintimo.com/cdn/shop/files/Oscuro_1.jpg?v=1744314819&width=500";
// const promocionesImg = "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

// const categories = [
//   {
//     name: "Lencería",
//     route: "/lenceria",
//     image: lenceriaImg,
//     description: "Elegancia que despierta los sentidos",
//     color: "from-rose-900/60 to-pink-900/60"
//   },
//   {
//     name: "Juguetes",
//     route: "/juguetes",
//     image: juguetesImg,
//     description: "Placeres que sorprenden",
//     color: "from-purple-900/60 to-indigo-900/60"
//   },
//   {
//     name: "Lubricantes",
//     route: "/lubricantes",
//     image: lubricantesImg,
//     description: "Suavidad que intensifica",
//     color: "from-blue-900/60 to-teal-900/60"
//   },
//   {
//     name: "Promociones",
//     route: "/promociones",
//     image: promocionesImg,
//     description: "Oportunidades que excitan",
//     color: "from-amber-900/60 to-orange-900/60"
//   },
// ];

// const Inicio = ({ searchTerm }) => {
//   const [hoveredCategory, setHoveredCategory] = useState(null);
//  const [productosLenceria, setProductosLenceria] = useState([]);
//   const [productosJuguetes, setProductosJuguetes] = useState([]);
//   const [productosLubricantes, setProductosLubricantes] = useState([]);
//   useEffect(() => {
//     const cargar = async () => {
//       try {
//         const data = await cargarLenceriaDesdeSheets();
//           const juguetes = await cargarJuguetesDesdeSheets();
//         const lubricantes = await cargarLubricantesDesdeSheets();
//         setProductosLenceria(data.slice(0, 4)); // Solo los primeros 4 productos
//         setProductosJuguetes(juguetes.slice(0, 4));
//         setProductosLubricantes(lubricantes.slice(0, 4));
//       } catch (error) {
//         console.error("Error al cargar productos de lencería:", error);
//       }
//     };
//     cargar();
//   }, []);

//   return (
//     <div className="w-full bg-gradient-to-b from-pink-50 to-purple-50 min-h-screen">
//       {/* Hero Banner */}
//       <div className="w-full sm:px-6 lg:px-8 mb-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden  shadow-xl">
//             <img
//               src={banner}
//               alt="Banner de inicio"
//               className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
//             <div className="absolute bottom-6 left-6 right-6 text-white">
//               <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 drop-shadow-lg">
//                 Bienvenidos al Placer
//               </h1>
//               <p className="text-sm sm:text-base md:text-lg opacity-90 drop-shadow-md">
//                 Descubre una experiencia única de sensualidad y elegancia
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Categorías */}
//       <div className="px-4 sm:px-6 lg:px-8 mb-12">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-8">
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-gray-800 mb-4">
//               Explora nuestras categorías
//             </h2>
//             <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-500 mx-auto"></div>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//             {categories.map((cat, idx) => (
//               <Link
//                 to={cat.route}
//                 key={cat.name}
//                 className="group relative overflow-hidden rounded-2xl shadow-lg transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
//                 onMouseEnter={() => setHoveredCategory(idx)}
//                 onMouseLeave={() => setHoveredCategory(null)}
//               >
//                 <div className="relative h-40 sm:h-56 lg:h-56 w-full">
//                   <img
//                     src={cat.image}
//                     alt={cat.name}
//                     className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
//                   />
//                   <div className={`absolute inset-0 bg-gradient-to-b ${cat.color} opacity-70 group-hover:opacity-80 transition-opacity duration-500`}></div>
//                   <div className="absolute top-4 right-4 w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center transform transition-transform duration-700 group-hover:rotate-45">
//                     <div className="w-6 h-6 rounded-full border border-white/40"></div>
//                   </div>
//                 </div>

//                 <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
//                   <h3 className="text-lg sm:text-xl font-serif font-light mb-2 transform transition-transform duration-500 group-hover:translate-y-0">
//                     {cat.name}
//                   </h3>
//                   <p className="text-xs sm:text-sm font-light opacity-0 max-h-0 overflow-hidden transition-all duration-500 group-hover:opacity-100 group-hover:max-h-20">
//                     {cat.description}
//                   </p>
//                   <div className="mt-3 flex items-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
//                     <span className="text-sm mr-2">Explorar</span>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>

//      {/* Sección Productos destacados */}
//       <div className="px-4 sm:px-6 lg:px-8 mb-16">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-8">
//             <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-gray-800 mb-4">
//               DESTACADOS 
//             </h3>
//             <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-500 mx-auto"></div>
//           </div>

        

//           {/* Juguetes */}
// <Juguetes productos={productosJuguetes} mostrarBotonVolver={false} searchTerm="" />
//           <div className="mt-6 text-center mb-10">
//             <Link
//               to="/juguetes"
//               className="inline-block bg-purple-600 text-white px-6 py-2 rounded-full text-sm sm:text-base font-medium shadow-md hover:bg-purple-700 transition"
//             >
//               Ver más juguetes
//             </Link>
//           </div>
//             {/* Lencería */}
// <Lenceria productos={productosLenceria} mostrarBotonVolver={false} searchTerm="" />
//           <div className="mt-6 text-center mb-10">
//             <Link
//               to="/lenceria"
//               className="inline-block bg-pink-600 text-white px-6 py-2 rounded-full text-sm sm:text-base font-medium shadow-md hover:bg-pink-700 transition"
//             >
//               Ver más lencería
//             </Link>
//           </div>

//           {/* Lubricantes */}
// <Lubricantes productos={productosLubricantes} mostrarBotonVolver={false} searchTerm="" />

//           <div className="mt-6 text-center">
//             <Link
//               to="/lubricantes"
//               className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full text-sm sm:text-base font-medium shadow-md hover:bg-blue-700 transition"
//             >
//               Ver más lubricantes
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Inicio;