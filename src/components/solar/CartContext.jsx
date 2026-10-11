import React, { createContext, useState, useContext, useEffect } from 'react';
import { formatearPrecio, precioANumero } from '../../utils/productos';

const CartContext = createContext();
const CART_STORAGE_KEY = 'carrito';

// Recupera el carrito guardado para que no se pierda al recargar la página
const cargarCarritoGuardado = () => {
  try {
    const guardado = localStorage.getItem(CART_STORAGE_KEY);
    const items = guardado ? JSON.parse(guardado) : [];
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(cargarCarritoGuardado);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Sin almacenamiento disponible (modo privado, etc.): el carrito sigue en memoria
    }
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Verificar si el producto ya está en el carrito
      const existingItem = prevItems.find(
        item => item.id === product.id && item.selectedSize === product.selectedSize
      );
      
      if (existingItem) {
        // Si existe, incrementar la cantidad
        return prevItems.map(item =>
          item.id === product.id && item.selectedSize === product.selectedSize
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      } else {
        // Si no existe, agregar nuevo item
        return [...prevItems, product];
      }
    });
  };

  const removeFromCart = (productId, size) => {
    setCartItems(prevItems => 
      prevItems.filter(item => !(item.id === productId && item.selectedSize === size))
    );
  };

  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId && item.selectedSize === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };
  // Total ya formateado con separador de miles, ej: "$35.000"
  const calculateTotal = () =>
    formatearPrecio(
      cartItems.reduce((sum, item) => sum + precioANumero(item.precio) * item.quantity, 0)
    );


  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity,
        cartTotal: calculateTotal(),
        cartCount: cartItems.reduce((count, item) => count + item.quantity, 0)
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

export default CartContext;