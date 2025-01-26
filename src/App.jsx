import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { useCart } from "./hooks/useCart";
import { usePersistentData } from "./hooks/usePersistentData";

function App() {
  const { initialCart } = usePersistentData();
  const {
    data,
    cart,
    setCart,
    addToCart,
    clearCart,
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
    getTotalCart,
    isEmpty,
  } = useCart(initialCart);

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        getTotalCart={getTotalCart}
        isEmpty={isEmpty}
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
