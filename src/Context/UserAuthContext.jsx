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
import { doc, setDoc } from "firebase/firestore";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        setDoc(doc(db, "users", userCredential.user.uid), {
          favorites: [],
        }).catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  }

  //Login function 

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  //Log out function

  function logOut() {
    return signOut(auth);
  }

  //Function for google sign-in

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }


  //Function to delete a user. 

  function deleteAUser ()
  {
  if (window.confirm("Are you SURE you want to delete your account?")) {
    deleteUser(user)
      .then(() => {
        console.log("User deleted");
      })
      .catch((error) => {
        alert(error);
      });
    }
  }

  //Creating a listener here so it unsubscribes when we unmount our app.  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe(); //unsubscribe on unmount to save memory.
    };
  }, []);


  
  return (
    <userAuthContext.Provider
      value={{ user, signUp, logIn, logOut, googleSignIn, deleteAUser }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
