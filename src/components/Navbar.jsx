import "../styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useUserAuth } from "../Context/UserAuthContext";
import { useShoppingCart } from "../Context/ShoppingCartContext";

const Navbar = () => {
  const { cartQuantity, setCartItems } = useShoppingCart();
  // console.log("cartquantity", cartQuantity);
  const { user, logOut, deleteAUser } = useUserAuth() ?? {};

  const location = useLocation();

  const navigate = useNavigate();

  //logout function

  const handleLogOut = async () => {
    try {
      await logOut();
      console.log("loggedout");
      setCartItems([]);
      console.log("cart items reset");
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  //delete user function

  const deleteYourUser = async () => {
    try {
      await deleteAUser();
      setCartItems([]);
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  const activeStyle = {
    color: "orange",
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
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
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
              />

              <span
                style={{ position: "absolute" }}
                className="material-symbols-outlined"
              >
                shopping_cart
              </span>
              {cartQuantity > 0 && (
                <span
                  style={{
                    backgroundColor: "red",
                    position: "relative",
                    borderRadius: "100px",
                  }}
                >
                  {cartQuantity}
                </span>
              )}
            </Link>
          </li>
          {Boolean(!user) && (
            <Link
              style={{
                marginLeft: "30px",
                backgroundColor: "lightblue",
                borderRadius: "5px",
              }}
              to="/login"
            >
              Login
            </Link>
          )}
          {Boolean(!user) && (
            <Link
              style={{
                marginLeft: "12px",
                backgroundColor: "lightblue",
                borderRadius: "5px",
              }}
              to="/register"
            >
              Sign Up
            </Link>
          )}

          {Boolean(user) && (
            <Link
              style={{
                marginLeft: "28px",
                backgroundColor: "lightblue",
                borderRadius: "5px",
              }}
              onClick={handleLogOut}
            >
              Log Out
            </Link>
          )}
          {Boolean(user) && (
            <Link
              style={{
                marginLeft: "14px",
                backgroundColor: "pink",
                borderRadius: "5px",
              }}
              onClick={deleteYourUser}
            >
              Delete Account
            </Link>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
