import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { useState, useEffect } from "react";
import { db } from "./data/guitars";

function App() {
  const initialCart = () => {
    const localstorageCart = localStorage.getItem("cart");
    return localStorage.getItem("cart") ? JSON.parse(localstorageCart) : [];
  };

  const [cart, setCart] = useState(initialCart);
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

  // // Forma recomendada
  // useEffect(() => {
  //   setDate(db);
  // }, []);

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => {
            return (
              <Guitar
                key={guitar.id}
                guitar={guitar}
                setCart={setCart}
                addToCart={addToCart}
              />
            );
          })}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
