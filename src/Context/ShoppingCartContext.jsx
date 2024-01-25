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
  getDoc,
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
//creating context provider function to create and
//manage context and share the data between the components

export function ShoppingCartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useUserAuth();
  console.log("cartitem", cartItems);

  const cartQuantity = cartItems.reduce(
    //cartQuantity to be used for total navbar cart number
    (quantity, item) => item.quantity + quantity,
    0 //iterates over and starts from 0 or sets 0 as an initial quantity
    //and returns a single number after reduce function.
    //checks against each item of cartItems and then adds them up.
  );

  // Function to check the particular item quantity and used around + - buttons

  function getItemQuantity(id) {
    return cartItems.find((item) => item.product.id === id)?.quantity || 0;
    //if we have the condition true
    // means we have that can access this product's quantity and return it.
    // we want to return the quantity otherwise a default of zero.
  }

  //Function to increase item 1.if it is not in the cart, and if it is in the cart, then increment by 1.

  function increaseCartQuantity(product) {
    setCartItems((currItems) => {   //taking the current state as curritems and return the updated state. 
      if (
        currItems.find((item) => {
          return item.product.id === product.id; 
          //if we can find an item inside our cart, this means we have it and return that
        }) === undefined 
        //by undefined we mean that to see if we don't have an item so in the next line, we add one
      ) {
        return [...currItems, { product, quantity: 1 }]; //return all of our new items, then it will add that product for the first time and have a quantity of one.
      } else {
        return currItems.map((item) => {   //for if the item is already in the curritems
          if (item.product.id === product.id) {
            //if it is there, then add +1 to the quantity
            return { ...item, quantity: item.quantity + 1 }; //return that item spreaded out and 
            //add +1 to that already existing item.
          } else {
            return item;  //if the current item is not the one we're looking for, it remains unchanged. 
          }
        });
      }
    });
    if (user.uid) {  //to check for a valid user before performing
      if (
        cartItems.find((item) => {
          return item.product.id === product.id;
        }) === undefined  //returning undefined means the product is not in the cart 
        //so execute the following line. 
      ) {
        setDoc(doc(db, "users", user.uid, "cart", product.id + ""), {
          product: product,  //sending the whole product details
          quantity: 1,  //setting the quantity to be 1.
        })
          .then(() => {
            console.log("document incremented");
          })
          .catch((e) => {
            console.log("error for incrementing", e);
          }); // doc takes references of database, collection name, and ID of a document as arguments
        console.log("test");
      } else {
        updateDoc(doc(db, "users", user.uid, "cart", product.id + ""), { //firestore pathnoften consists of strings so converted it. 
          quantity: increment(1),
        });
      }
    }
  }

  //Function to decrease quantity from users cart.

  function decreaseCartQuantity(product) {
    console.log("productss", product);
    setCartItems((currItems) => {
      if (
        currItems.find((item) => item.product.id === product.id)?.quantity === 1 //if the condition is false, it will return item
        //if the product is there, set quantity to one and follow the next step. 
      ) {
        return currItems.filter((item) => item.product.id !== product.id); //we are removing that particular 
        //item of which id we will pass or create a new array containing all 
        //items from currItems except the one with the specified product.id
      } else {
        return currItems.map((item) => {
          if (item.product.id === product.id) {
            return { ...item, quantity: item.quantity - 1 }; //decrements the products.
          } else {
            return item;  //if the current item is not the one being updated, it remains unchanged.
          }
        });
      }
    });
    if (user.uid) {
      const currentCart = cartItems.find((item) => {
        return item.product.id === product.id;
      });
      if (!currentCart) {   //if item is not in cart
        return console.log("product not in cart");
      }
      if (currentCart.quantity === 1) {   //if its quantity is one. 
        deleteDoc(doc(db, "users", user.uid, "cart", product.id + ""))
          .then(() => {
            console.log("document deleted");   //deletedoc returns a promise so used then block
          })
          .catch((e) => {
            console.log("error for decreasing product", e);
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
      return currItems.filter((item) => item.product.id !== id); //filter out the items where id is not
      // equal to current id and created a filtered array. 
    });
    if (user.uid) {
      const currentCart = cartItems.find((item) => {
        return item.product.id === id; //result is stored in currentCart
      });
      if (!currentCart) {
        //if the item is not in the cart.
        return console.log("product not in cart");
      }
      deleteDoc(doc(db, "users", user.uid, "cart", id + ""))  //removes the cart document. 
        .then(() => {
          console.log("document deleted");
        })
        .catch((e) => {
          console.log("error for removing product", e);
        });
    }
  }
  //using useEffect hook to get and keep the data after every render.
  //Doing these steps so the cart item info is stored in the database of the user 
  //in firebase and is not effected if the page is refreshed or user logsout.
  //fetching and updating the user's shopping cart items from a 
  //Firestore database when the authentication state changes.

  useEffect(() => {   //saving data even on refresh or user state changes. 
    onAuthStateChanged(auth, async (user) => {
      //on user auth state changed, the next condition is followed.
      if (user) {
        //getDoc()
        const dbCartItems = [];
        const cartCollection = await collection(db, "users", user.uid, "cart"); //getting access to that collection
        const cartQuery = await query(cartCollection); //creates a query to return 
        //all the data of users and all data of one particularly logged in user.
        // console.log("cartquery", cartQuery);
        const docs = await getDocs(cartQuery); //Executes the query and 
        //returns the results as a QuerySnapshot/gets the data of the specific document from collection.
        // console.log("document", docs);
        docs.forEach((doc) => {
          dbCartItems.push(doc.data());  //Pushes the data of each document into the dbCartItems array.
          setCartItems(dbCartItems);
        });
      }
    });
  }, []);  //indicates that it should only run 
  //once when the component is mounted and not re-run on subsequent re-renders.
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
