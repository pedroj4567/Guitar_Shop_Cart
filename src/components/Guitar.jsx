/* eslint-disable react/prop-types */
import { filePathImage } from "../data/constants.js";
export const Guitar = ({ guitar, addToCart }) => {
  const { id, name, description, price, image } = guitar;

  // const handlerClick = (guitar) => {
  //   setCart([...cart, guitar]);
  // };

  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-4">
        <img
          className="img-fluid"
          src={`${filePathImage}${image}.jpg`}
          alt="imagen guitarra"
        />
      </div>
      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
        <p>{description}</p>
        <p className="fw-black text-primary fs-3">${price}</p>
        <button
          type="button"
          className="btn btn-dark w-100"
          value={id}
          onClick={() => addToCart(guitar)}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default Guitar;
