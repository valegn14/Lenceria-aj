'use client'
import React, { useState } from "react";
import { useCart } from "../components/solar/CartContext";
const Domicilio = () => {
//   const router = useRouter();

  const { cartItems, cartTotal } = useCart();
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    barrio: "",
    ciudad: "Manizales",
    indicaciones: "",
    metodoPago: "efectivo",
    horaEntrega: "inmediata",
    fechaEntrega: "",
    horaEspecifica: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar errores cuando se modifica un campo
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) newErrors.nombre = "Nombre es requerido";
    if (!formData.telefono.trim()) newErrors.telefono = "Teléfono es requerido";
    if (!formData.direccion.trim()) newErrors.direccion = "Dirección es requerida";
    if (!formData.barrio.trim()) newErrors.barrio = "Barrio es requerido";
    
    // Validación adicional para entrega programada
    if (formData.horaEntrega === "programada") {
      if (!formData.fechaEntrega) newErrors.fechaEntrega = "Fecha es requerida";
      if (!formData.horaEspecifica) newErrors.horaEspecifica = "Hora es requerida";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generarMensajeWhatsApp = () => {
    let mensaje = '🛒 *PEDIDO A DOMICILIO*\n\n';
    
    // Información del cliente
    mensaje += '*Información del cliente:*\n';
    mensaje += `👤 Nombre: ${formData.nombre}\n`;
    mensaje += `📱 Teléfono: ${formData.telefono}\n\n`;
    
    // Dirección de entrega
    mensaje += '*Dirección de entrega:*\n';
    mensaje += `📍 Dirección: ${formData.direccion}\n`;
    mensaje += `🏘️ Barrio: ${formData.barrio}\n`;
    mensaje += `🏙️ Ciudad: ${formData.ciudad}\n`;
    if (formData.indicaciones) {
      mensaje += `📝 Indicaciones: ${formData.indicaciones}\n`;
    }
    mensaje += '\n';
    
    // Detalles del pedido
    mensaje += '*Detalles del pedido:*\n';
    mensaje += `💳 Método de pago: ${formData.metodoPago === "efectivo" ? "Efectivo" : "Transferencia bancaria"}\n\n`;

    // Productos
    mensaje += '*Productos solicitados:*\n';
    cartItems.forEach((item, index) => {
      mensaje += `\n${index + 1}. ${item.nombre}`;
      if (item.selectedSize) mensaje += ` (Talla: ${item.selectedSize})`;
      mensaje += `\n   Cantidad: ${item.quantity}`;
      mensaje += `\n   Precio unitario: $${item.precio}`;
      mensaje += `\n   Subtotal: $${item.precio * item.quantity}\n`;
    });
    
    // Total
    mensaje += `\n*Total a pagar:* $${cartTotal}`;

    return `https://wa.me/573113630754?text=${encodeURIComponent(mensaje)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const whatsappUrl = generarMensajeWhatsApp();
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <button 
            onClick={() => router.back()} 
            className="flex items-center text-pink-600 hover:text-pink-700 mb-4"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al carrito
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Solicitar Domicilio</h1>
          <p className="text-gray-600">Completa la información para recibir tu pedido</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Información del cliente */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  Información del cliente
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.nombre ? 'border-red-500' : 'border-gray-300'} focus:ring-pink-500 focus:border-pink-500`}
                      placeholder="Tu nombre completo"
                    />
                    {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.telefono ? 'border-red-500' : 'border-gray-300'} focus:ring-pink-500 focus:border-pink-500`}
                      placeholder="Tu número de teléfono"
                    />
                    {errors.telefono && <p className="mt-1 text-sm text-red-600">{errors.telefono}</p>}
                  </div>
                </div>
              </div>
              
              {/* Dirección de entrega */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  Dirección de entrega
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-1">
                      Dirección completa *
                    </label>
                    <input
                      type="text"
                      id="direccion"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.direccion ? 'border-red-500' : 'border-gray-300'} focus:ring-pink-500 focus:border-pink-500`}
                      placeholder="Calle, número, apartamento, etc."
                    />
                    {errors.direccion && <p className="mt-1 text-sm text-red-600">{errors.direccion}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="barrio" className="block text-sm font-medium text-gray-700 mb-1">
                        Barrio *
                      </label>
                      <input
                        type="text"
                        id="barrio"
                        name="barrio"
                        value={formData.barrio}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.barrio ? 'border-red-500' : 'border-gray-300'} focus:ring-pink-500 focus:border-pink-500`}
                        placeholder="Nombre de tu barrio"
                      />
                      {errors.barrio && <p className="mt-1 text-sm text-red-600">{errors.barrio}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700 mb-1">
                        Ciudad *
                      </label>
                      <select
                        id="ciudad"
                        name="ciudad"
                        value={formData.ciudad}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                      >
                                                <option value="Manizales">Manizales</option>                    

                        <option value="Medellín">Medellín</option>
                        <option value="Envigado">Envigado</option>
                        <option value="Sabaneta">Sabaneta</option>
                        <option value="Itagüí">Itagüí</option>
                        <option value="Bello">Bello</option>
                        <option value="La Estrella">La Estrella</option>
                        <option value="Otro">Otra ciudad</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="indicaciones" className="block text-sm font-medium text-gray-700 mb-1">
                      Indicaciones adicionales
                    </label>
                    <textarea
                      id="indicaciones"
                      name="indicaciones"
                      value={formData.indicaciones}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                      placeholder="Puntos de referencia, instrucciones de acceso, etc."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              {/* Detalles del pedido */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  Detalles del pedido
                </h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* <div> */}
                      {/* <label className="block text-sm font-medium text-gray-700 mb-2">
                        ¿Cuándo deseas recibir tu pedido? *
                      </label> */}
                      
                      {/* <div className="space-y-3"> */}
                        {/* <div className="flex items-center"> */}
                          {/* <input
                            type="radio"
                            id="inmediata"
                            name="horaEntrega"
                            value="inmediata"
                            checked={formData.horaEntrega === "inmediata"}
                            onChange={handleChange}
                            className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                          /> */}
                          {/* <label htmlFor="inmediata" className="ml-3 block text-sm font-medium text-gray-700">
                            Lo antes posible
                          </label> */}
                        {/* </div> */}
                        
                        {/* <div className="flex items-center"> */}
                          {/* <input
                            type="radio"
                            id="programada"
                            name="horaEntrega"
                            value="programada"
                            checked={formData.horaEntrega === "programada"}
                            onChange={handleChange}
                            className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                          />
                          <label htmlFor="programada" className="ml-3 block text-sm font-medium text-gray-700">
                            Programar entrega
                          </label> */}
                        {/* </div>
                      </div> */}
                      
                      {/* {formData.horaEntrega === "programada" && ( */}
                        {/* // <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4"> */}
                          {/* <div> */}
                            {/* <label htmlFor="fechaEntrega" className="block text-sm font-medium text-gray-700 mb-1">
                              Fecha *
                            </label>
                            <input
                              type="date"
                              id="fechaEntrega"
                              name="fechaEntrega"
                              value={formData.fechaEntrega}
                              onChange={handleChange}
                              min={new Date().toISOString().split('T')[0]}
                              className={`w-full px-4 py-3 rounded-lg border ${errors.fechaEntrega ? 'border-red-500' : 'border-gray-300'} focus:ring-pink-500 focus:border-pink-500`}
                            /> */}
                            {/* {errors.fechaEntrega && <p className="mt-1 text-sm text-red-600">{errors.fechaEntrega}</p>}
                          </div> */}
                          
                          {/* <div> */}
                            {/* <label htmlFor="horaEspecifica" className="block text-sm font-medium text-gray-700 mb-1">
                              Hora *
                            </label>
                            <input
                              type="time"
                              id="horaEspecifica"
                              name="horaEspecifica"
                              value={formData.horaEspecifica}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 rounded-lg border ${errors.horaEspecifica ? 'border-red-500' : 'border-gray-300'} focus:ring-pink-500 focus:border-pink-500`}
                            /> */}
                            {/* {errors.horaEspecifica && <p className="mt-1 text-sm text-red-600">{errors.horaEspecifica}</p>}
                          </div> */}
                        {/* </div> */}
                      {/* // )} */}
                    {/* </div> */}
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Método de pago *
                      </label>
                      
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="efectivo"
                            name="metodoPago"
                            value="efectivo"
                            checked={formData.metodoPago === "efectivo"}
                            onChange={handleChange}
                            className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                          />
                          <label htmlFor="efectivo" className="ml-3 block text-sm font-medium text-gray-700">
                            Efectivo
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="transferencia"
                            name="metodoPago"
                            value="transferencia"
                            checked={formData.metodoPago === "transferencia"}
                            onChange={handleChange}
                            className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                          />
                          <label htmlFor="transferencia" className="ml-3 block text-sm font-medium text-gray-700">
                            Transferencia bancaria
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Resumen del pedido */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen de tu pedido</h3>
                
                <div className="space-y-3">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div>
                        <p className="font-medium text-gray-900">
                          {item.quantity} x {item.nombre}
                          {item.selectedSize && ` (Talla: ${item.selectedSize})`}
                        </p>
                        <p className="text-sm text-gray-600">${item.precio} c/u</p>
                      </div>
                      <p className="font-medium text-gray-900">${(item.precio * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <p className="text-lg font-bold text-gray-900">Total</p>
                    <p className="text-xl font-bold text-pink-600">${cartTotal}</p>
                  </div>
                </div>
              </div>
              
              {/* Botón de envío */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-6 rounded-xl transition duration-300 flex items-center justify-center"
                >
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Solicitar domicilio por WhatsApp
                </button>
                
                <p className="mt-3 text-sm text-gray-500 text-center">
                  Al hacer clic, se abrirá WhatsApp para confirmar tu pedido
                </p>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>¿Necesitas ayuda? Llámanos al <a href="tel:+573113630754" className="text-pink-600 hover:underline">+57 311 363 0754</a></p>
          <p className="mt-1">Horario de atención: Lunes a Sábado 9am - 7pm</p>
        </div>
      </div>
    </div>
  );
};

export default Domicilio;