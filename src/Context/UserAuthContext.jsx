import { createContext, useEffect, useState, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  deleteUser,
} from "firebase/auth";

import { auth, db } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

const userAuthContext = createContext();

// eslint-disable-next-line react/prop-types
export function UserAuthContextProvider({ children }) { //children are those which are under it in the routes
  const [user, setUser] = useState({});

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => { //function returns a promise
        console.log(userCredential.user);
        setDoc(doc(db, "users", userCredential.user.uid), { // to set a document under the "users" collection 
          //with the user's UID as the document ID.
          favorites: [], //The document contains a field named "favorites" initialized as an empty array.
        }).catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  }

  //Login function

  function logIn(email, password) {  //remains login even on refresh
    return signInWithEmailAndPassword(auth, email, password);
  }

  //Log out function

  function logOut() {
    return signOut(auth);  //logsout even on refresh
  }

  //Function for google sign-in

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  //Function to delete a user.

  function deleteAUser() {
    if (window.confirm("Are you SURE you want to delete your account?")) { //if true then delete user.
      deleteUser(user).then(() => {
        console.log("User deleted");
        const cartRef = collection(db, "users", user.uid, "cart"); //getting access or creating a reference to the collection
        getDocs(cartRef) //getDocs creates a snapshot of the data of that data in user's cart.
        .then((querySnapshot) => {
          querySnapshot.forEach((foundDoc) => { //iterating over each document.
            const docRef = doc(db, "users", user.uid, "cart", foundDoc.id);
            //Creates a reference (docRef) to a specific document in the "cart" collection using document id.
            deleteDoc(docRef) //deletes the document referenced in the docRef
            .catch((e) => console.log(e));
          });
        });
      });
      const userDocRef = doc(db, "users", user.uid);
      deleteDoc(userDocRef)
        .then(() => {
          console.log("deleted user data");
        })
        .catch((e) => {
          console.log("error deleting user data", e);
        })
        .catch((error) => {
          alert(error);
        });
    }
  }

  //Creating a listener here so it unsubscribes when we unmount our app, helps in preventing memory leaks.
  //also for the data to be automatically updated when there are changes in the firebase. 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe(); //unsubscribe on unmount to save memory.
    };
  }, []); //empty dependency array

  return (
    <userAuthContext.Provider
      value={{ user, signUp, logIn, logOut, googleSignIn, deleteAUser }}
    >
      {children} 
    </userAuthContext.Provider>  //everything under the routes wrap will be children
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
