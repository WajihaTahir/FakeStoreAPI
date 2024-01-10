import "../styles.css";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
// import Authentication from "./Authentication";
import { useUserAuth } from "../Context/UserAuthContext";

const Navbar = () => {
  const { user } = useUserAuth() ?? {};

  const location = useLocation();
  const activeStyle = {
    color: "orange",
  };
  return (
    <nav className="nav">
      <Link to={"/"} className="site-title">
        Fake Store
      </Link>
      <ul>
        <li className="inlinetabs">
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link
            to={"/about"}
            style={location.pathname === "/about" ? activeStyle : {}}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to={"/allproducts"}
            style={location.pathname === "/allproducts" ? activeStyle : {}}
          >
            All Products
          </Link>
          {/* <ul>
            <li>
              <Link to={"/allproducts/menscollection"}> Mens Collection</Link>
            </li>
            <li>
              <Link to={"/allproducts/womenscollection"}> Womens Collection</Link>
            </li>
            <li>
              <Link to={"/allproducts/electronics"}>Electronics</Link>
            </li>
          </ul> */}
        </li>
        <li>
          <Link
            to={"/favorite"}
            style={location.pathname === "/favorite" ? activeStyle : {}}
          >
            <FontAwesomeIcon icon={faHeart} />
          </Link>
        </li>
        <li>
          <Link
            to={"/cart"}
            style={location.pathname === "/cart" ? activeStyle : {}}
          >
            Cart
            <span className="cartQuantity">0</span>
          </Link>
        </li>
        {Boolean(!user) && <Link to="/login">Login</Link>}
        {Boolean(!user) && <Link to="/register">Sign Up</Link>}
        {Boolean(user) && <Link to="/logout">Log Out</Link>}
      </ul>
    </nav>
  );
};

export default Navbar;

// function CustomLink({ to, children, ...props }) {
//   const resolvedPath = useResolvedPath(to); //allows to take the relevant path
//   const isActive = useMatch({ path: resolvedPath.pathname, end: true }); //we want to pass our path and we are saying that entire url must match.

//   return (
//     <li className={isActive ? "active" : ""}>
//       <Link to={to} {...props}>
//         {children}
//       </Link>
//     </li>
//   );
// }