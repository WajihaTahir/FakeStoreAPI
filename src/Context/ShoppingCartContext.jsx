import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { useUserAuth } from "./UserAuthContext";
import {
  doc,
  increment,
  setDoc,
  updateDoc,
  collection,
  query,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";



//creating context.

const ShoppingCartContext = createContext({});

//using context and returning it.

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}
//creating context provider function to create and manage context and share the data between the components

export function ShoppingCartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useUserAuth() ?? {};
  console.log("cartitem", cartItems);
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0      //iterates over and starts from 0 and returns a single number after reduce function.
  );
  console.log("cartquantity", cartQuantity);
  
  

  function getItemQuantity(id) {
    return cartItems.find((item) => item.product.id === id)?.quantity || 0; //if we have the condition true, we want to return the quantity otherwise a default of zero.
  }

  function increaseCartQuantity(product) {
    setCartItems((currItems) => {
      if (
        currItems.find((item) => {
          return item.product.id === product.id; //if we can find an item inside our cart, this means we have it.
        }) === undefined //by undefined we mean that to see if we don't have an item.
      ) {
        return [...currItems, { product, quantity: 1 }]; //return all of our new items, then it will add that product for the first time and have a quantity of one.
      } else {
        return currItems.map((item) => {
          if (item.product.id === product.id) {
            //if it is there, then add +1 to the quantity
            return { ...item, quantity: item.quantity + 1 }; //return that item spreaded out and add +1 to that already existing item.
          } else {
            return item;
          }
        });
      }
    });
    if (user.uid) {
      if (
        cartItems.find((item) => {
          return item.product.id === product.id;
        }) === undefined
      ) {
        setDoc(doc(db, "users", user.uid, "cart", product.id + ""), {
          product: product,
          quantity: 1,
        })
          .then(() => {
            console.log("document incremented");
          })
          .catch((e) => {
            console.log("error for incrementing", e);
          }); // doc takes references of database, collection name, and ID of a document as arguments
        console.log("test");
      } else {
        updateDoc(doc(db, "users", user.uid, "cart", product.id + ""), {
          quantity: increment(1),
        });
      }
    }
  }

  function decreaseCartQuantity(product) {
    console.log("productss", product);
    setCartItems((currItems) => {
      if (
        currItems.find((item) => item.product.id === product.id)?.quantity === 1
      ) {
        return currItems.filter((item) => item.product.id !== product.id); //we are removing that particular item of which id we will pass.
      } else {
        return currItems.map((item) => {
          if (item.product.id === product.id) {
            return { ...item, quantity: item.quantity - 1 }; //decrements the products.
          } else {
            return item;
          }
        });
      }
    });
    if (user.uid) {
      const currentCart = cartItems.find((item) => {
        return item.product.id === product.id;
      });
      if (!currentCart) {
        return console.log("product not in cart");
      }
      if (currentCart.quantity === 1) {
        deleteDoc(doc(db, "users", user.uid, "cart", product.id + ""))
          .then(() => {
            console.log("document deleted");
          })
          .catch((e) => {
            console.log("error it is for decreasing product", e);
          });
        // doc takes references of database, collection name, and ID of a document as arguments
      } else {
        updateDoc(doc(db, "users", user.uid, "cart", product.id + ""), {
          quantity: increment(-1),
        });
      }
    }
  }

  function removeFromCart(id) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.product.id !== id); //filter out the items where id is not equal to current id.
    });
    if (user.uid) {
      const currentCart = cartItems.find((item) => {
        return item.product.id === id;
      });
      if (!currentCart) {
        return console.log("product not in cart");
      }
      deleteDoc(doc(db, "users", user.uid, "cart", id + ""))
        .then(() => {
          console.log("document deleted");
        })
        .catch((e) => {
          console.log("error it is for removing product", e);
        });
    }
  }
  //using useEffect hook to get and keep the data after every render. 
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {    //on user auth state changed, the next condition is followed. 
      if (user) {
        //getDoc()
        const dbCartItems = [];
        const cartCollection = await collection(db, "users", user.uid, "cart");
        const cartQuery = await query(cartCollection); //query returns all the data of users and all data of one particularly logged in user.
        console.log("cartquery", cartQuery);
        const docs = await getDocs(cartQuery); //Executes the query and returns the results as a QuerySnapshot/gets the data of the specific document from collection. 
        console.log("document", docs);
        docs.forEach((doc) => {
          dbCartItems.push(doc.data());
          setCartItems(dbCartItems);
        });
      }
    });
  }, []);
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        // openCart,
        // closeCart,
        setCartItems,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
