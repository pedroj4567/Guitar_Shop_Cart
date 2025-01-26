import { useState, useEffect, useMemo } from "react";
import { db } from "../data/guitars";

export const useCart = (initialState) => {
  const [cart, setCart] = useState(initialState);
  const [data] = useState(db);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //creamos funciones en el padre que permitan el flujo y proceso de los datos,
  // sun encapsular logica en los componenetes
  function addToCart(item) {
    const itemExists = cart.findIndex((cartItem) => {
      return cartItem.id === item.id;
    });

    //solo modificamos el item que exista en su cantidad
    // su no existe se agrega.
    if (itemExists >= 0) {
      const cartUpdated = [...cart];
      cartUpdated[itemExists].quantity++;
      setCart(cartUpdated);
      return;
    }
    item.quantity = 1;
    setCart([...cart, item]);
  }

  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    setCart(updatedCart);
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });

    setCart(updatedCart);
  }

  function clearCart() {
    setCart([]);
  }

  // Cachea los resultados entre renders, es bueno, pero no abusar de el con mucha data
  const isEmpty = useMemo(() => cart.length === 0, [cart]);

  const getTotalCart = useMemo(() => {
    const total = cart.reduce((acc, item) => {
      acc += item.price * item.quantity;
      return acc;
    }, 0);
    return total;
  }, [cart]);

  return {
    data,
    cart,
    setCart,
    addToCart,
    clearCart,
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
    isEmpty,
    getTotalCart,
  };
};
