import React, {useEffect, useState} from "react";
import {auth, app} from "../firebase"
import { Link} from "react-router-dom";
import { PropsWithChildren, createContext } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";



const Authentication = () => {
const [authenticateduser, setAuthenticateduser] = useState ("");
useEffect(()=>{
    const listenAuth= onAuthStateChanged(auth, (user)=>{
        if(user){
            setAuthenticateduser(user)
        } else {
            setAuthenticateduser(null)

        }
        console.log("userrrr", authenticateduser);
    }
    )
    return() => {
        listenAuth();
    }

    
},[])
const userSignOut = () => {
    signOut(auth).then(()=>{
        console.log("user signed out");
    }).catch(error => console.log("error", error))
}

return(
    <>
    {authenticateduser === null ?
    <>
    <Link to="/login">Login</Link>
    <Link to="/register">Sign Up</Link>
    </>:
     <>
     <Link to="/" onClick={userSignOut}>Sign Out</Link>
     </>
    }
    
    </>
);
}


// function CustomLink({ to, children, ...props }) {
//     const resolvedPath = useResolvedPath(to); //allows to take the relevant path
//     const isActive = useMatch({ path: resolvedPath.pathname, end: true }); //we want to pass our path and we are saying that entire url must match.
  
//     return (
//       <li className={isActive ? "active" : ""}>
//         <Link to={to} {...props}>
//           {children}
//         </Link>
//       </li>
//     );
//   }

export default Authentication;