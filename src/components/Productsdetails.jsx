import { useLocation } from "react-router-dom";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import SizeButton from "./SizeButton";
import { useShoppingCart } from "../Context/ShoppingCartContext";
import "../Productdetails.css";
import { useFavourites } from "../Context/FavoritesContext";

const Productsdetails = () => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const { isItemInFavorites, toggleFavorite } = useFavourites();
  const { state } = useLocation();
  // console.log("location", state?.product);
  const quantity = getItemQuantity(state.product.id);
  console.log("Quantity of item", quantity);

  const isFavorite = isItemInFavorites(state.product.id); //means that isItemInFavorites will be true when the item is already in the favs.
  return (
    <>
      <div
        style={{ display: "grid", gridTemplateRows: "2fr 0.2fr 0.2fr 0.2fr" }}
      >
        <div className="picbuttons">
          <img
            style={{
              width: "250px",
              height: "300px",
              marginBottom: "0",
              float: "left",
            }}
            src={state.product.image}
          ></img>
          <h4 style={{ color: "black" }}>Choose Size</h4>
          <SizeButton
            style={{ marginRight: "10px", marginBottom: "10px" }}
            buttontext="XS (EU 32-34)"
          />
          <SizeButton
            style={{ marginBottom: "10px" }}
            buttontext="S (EU 36-38)"
          />
          <br></br>
          <SizeButton
            style={{ marginRight: "10px", marginBottom: "10px" }}
            buttontext="M (EU 40-42)"
          />
          <SizeButton
            style={{ marginBottom: "10px" }}
            buttontext="L (EU 44-46)"
          />
          <br></br>
          <SizeButton
            style={{ marginRight: "10px", marginBottom: "10px" }}
            buttontext="XL (EU 48-50)"
          />
          <SizeButton buttontext="XXL (EU 52-54)" />
          <br></br>
          <div>
            <button
              className="addtocart"
              onClick={() => increaseCartQuantity(state.product)}
              style={{
                width: "350px",
                height: "50px",
                fontSize: "20px",
                borderRadius: "30px",
                marginTop: "50px",
              }}
            >
              Add to Cart <FontAwesomeIcon icon={faCartShopping} />
            </button>
            <br></br>
            <button
              className="removefromcart"
              onClick={() => removeFromCart(state.product.id)}
              style={{
                width: "350px",
                height: "50px",
                fontSize: "20px",
                borderRadius: "30px",
                marginTop: "50px",
                marginLeft: "250px",
              }}
            >
              Remove From Cart
            </button>

            <br></br>
            <button
              className="addtofavorites"
              style={{
                width: "350px",
                height: "50px",
                fontSize: "20px",
                borderRadius: "30px",
                marginTop: "40px",
                marginLeft: "250px",
                backgroundColor: "transparent",
                color: "black",
                borderColor: "black",
              }}
              onClick={() => {
                toggleFavorite(state.product.id);
              }}
            >
              Favourite{" "}
              <FontAwesomeIcon icon={isFavorite ? faHeartSolid : faHeart} />
            </button>
          </div>
          <br></br>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginLeft: "240px",
              marginTop: "50px",
            }}
          >
            <button
              style={{
                width: "30px",
                height: "30px",
                alignItems: "center",
                padding: "10px",
              }}
              onClick={() => {
                console.log("test");
                decreaseCartQuantity(state.product);
              }}
            >
              -
            </button>
            <div>
              <h6
                style={{
                  display: "inline",
                  color: "black",
                  fontSize: "20px",
                  padding: "10px",
                }}
              >
                {quantity}
              </h6>
            </div>
            <button
              style={{
                width: "30px",
                height: "30px",
                alignItems: "center",
                padding: "10px",
              }}
              onClick={() => increaseCartQuantity(state.product)}
            >
              +
            </button>
          </div>
        </div>
        <h1
          style={{
            color: "black",
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "left",
          }}
        >
          {state.product.title}
        </h1>
        <h1
          style={{
            color: "black",
            fontSize: "16px",
            fontWeight: "normal",
            textAlign: "left",
          }}
        >
          <b>Price:</b> ${state.product.price}
        </h1>
        <h1
          style={{
            color: "black",
            fontSize: "16px",
            fontWeight: "normal",
            textAlign: "left",
          }}
        >
          <b>Description:</b> {state.product.description}
        </h1>
      </div>
    </>
  );
};

export default Productsdetails;
