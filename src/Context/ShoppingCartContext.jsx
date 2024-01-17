import { createContext, useContext } from "react";
import { useState } from "react";

const ShoppingCartContext = createContext({});

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  console.log("cartitem", cartItems);
  const [isOpen, setIsOpen] = useState(false);
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );
  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  function getItemQuantity(id) {
    return cartItems.find((item) => item.product.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(product) {
    setCartItems((currItems) => {
      if (
        currItems.find((item) => {
          return item.product.id === product.id;
        }) === undefined
      ) {
        return [...currItems, { product, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.product.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(product) {
    console.log("productss", product);
    setCartItems((currItems) => {
      if (
        currItems.find((item) => item.product.id === product.id)?.quantity === 1
      ) {
        return currItems.filter((item) => item.product.id !== product.id);
      } else {
        return currItems.map((item) => {
          if (item.product.id === product.id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.product.id !== id);
    });
  }
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
