import React, { useEffect } from "react";
import { useFavourites } from "../Context/FavoritesContext";
import { useProducts } from "../Context/ProductsContext";

function Favorites() {
  const { favorites } = useFavourites();
  const { getProduct } = useProducts();

  return (
    <div>
      <h4 style={{ color: "black", fontWeight: "normal", fontSize: "24px" }}>
        Your Favorite Items:
      </h4>
      {favorites?.map((item) => {
        const product = getProduct(item);
        return (
          <div
            style={{
              padding: "10px",
              borderWidth: "2px",
              borderColor: "black",
              borderStyle: "solid",
              marginBottom: "10px",
              borderRadius: "10px",
              width: "700px",
            }}
            key={product?.id}
          >
            <p style={{ color: "black" }}>{product?.title}</p>
            <img
              src={product.image}
              style={{ height: "100px", width: "100px" }}
            ></img>
            <p style={{ color: "black" }}>$ {product?.price}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Favorites;
