export const usePersistentData = () => {
  const initialCart = () => {
    const localstorageCart = localStorage.getItem("cart");
    return localStorage.getItem("cart") ? JSON.parse(localstorageCart) : [];
  };

  return {
    initialCart,
  };
};
