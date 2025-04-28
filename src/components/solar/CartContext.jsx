import React, { createContext, useState, useContext } from 'react';



const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

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
            ? { ...item, quantity: item.quantity + 1 }
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

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (parseFloat(item.precio) * item.quantity),
      0
    ).toFixed(2);
  };

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