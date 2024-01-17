import React, { useEffect, useState } from "react";
import { useShoppingCart } from "../Context/ShoppingCartContext";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Cart() {
  const {
    getItemQuantity,
    cartItems,
    removeFromCart,
    increaseCartQuantity,
    decreaseCartQuantity,
  } = useShoppingCart();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.product.price * getItemQuantity(item.product.id);
    });
    setTotal(totalPrice);
  }, [cartItems]);

  // console.log("cartcomponentitem", cartItems);

  return (
    <div className="cartTab">
      <h2 style={{textAlign:"left", color:"black", fontWeight:"normal"}}>Your cart has the following items:</h2>
      {cartItems.map((item) => {
        const quantity = getItemQuantity(item.product.id);

        return (
          <div
            style={{
              padding: "10px",
              borderWidth: "2px",
              borderColor: "black",
              borderStyle: "solid",
              marginBottom: "10px",
              borderRadius: "10px",
              width:"800px"
            }}
            key={item.id}
          >
            <h5 style={{ color: "black" }}>{item.product.title}</h5>
            <img
              src={item.product.image}
              style={{ height: "100px", width: "100px" }}
            ></img>
            <h5 style={{ color: "black" }}>${item.product.price * quantity}</h5>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "45%",
                padding: "10px",
              }}
            >
              <button
                style={{
                  width: "20px",
                  height: "25px",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  padding: "10px",
                  marginTop: "5px",
                }}
                onClick={() => {
                  console.log("test");
                  decreaseCartQuantity(item.product);
                }}
              >
                -
              </button>
              <div>
                <h5
                  style={{
                    display: "inline",
                    color: "black",
                    fontSize: "20px",
                    padding: "10px",
                  }}
                >
                  {quantity}
                </h5>
              </div>
              <button
                style={{
                  width: "20px",
                  height: "25px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px",
                  marginRight: "20px",
                  marginTop: "5px",
                }}
                onClick={() => increaseCartQuantity(item.product)}
              >
                +
              </button>
              <FontAwesomeIcon
                style={{ color: "black", marginTop: "7px", height: "20px" }}
                onClick={() => removeFromCart(item.product.id)}
                icon={faTrashCan}
              />
            </div>
          </div>
        );
      })}
      <h5 style={{ color: "black" }}>Total = ${total.toFixed(2)}</h5>

      <div className="btn">
        <button className="checkOut">Check Out</button>
      </div>
    </div>
  );
}

export default Cart;
