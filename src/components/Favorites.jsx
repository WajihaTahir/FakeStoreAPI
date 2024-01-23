import React, { useEffect } from "react";
import { useFavourites } from "../Context/FavoritesContext";
import { useProducts } from "../Context/ProductsContext";
import "../Favorite.css";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavourites();
  const { getProduct } = useProducts();

  const navigate = useNavigate();

  const takeBack = () => {
    navigate("/allproducts");
  };

  return (
    <div>
      <h4 style={{ color: "black", fontWeight: "normal", fontSize: "24px" }}>
        Your Favorite Items:
      </h4>
      {favorites?.map((item) => {
        const product = getProduct(item);
        return (
          <div className="favoriteContainer"
            key={product?.id}
          >
            <p>{product?.title}</p>
            <img src={product.image}></img>
            <p>$ {product?.price}</p>
            <div className="favoriteButtons">
            <button className="gotoproduct" onClick={takeBack}>
              Go to Item
            </button>
            <button
              className="removeFavorite"
              onClick={() => removeFromFavorites(product.id)}
            >
              Remove From Favorites
            </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Favorites;
