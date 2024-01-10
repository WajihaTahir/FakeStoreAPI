import { useState, useEffect } from "react";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Favorites from "./components/Favorites";
import Productmodal from "./components/Productmodal";
import Productsdetails from "./components/Productsdetails";
import Footer from "./components/Footer";
// import Mens from "./components/Mens";
// import Womens from "./components/Womens";
// import Electronics from "./components/Electronics";
import { UserAuthContextProvider } from "./Context/UserAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./components/Logout";

function App() {
  // let [search, setSearch] = useState("");
  let [fetchedData, updateFetchedData] = useState([]);
  let [currentProduct, setCurrentProduct] = useState({});
  let [isModalOpen, setIsModalOpen] = useState(false);
  //let [isModalClose] = useState(true);

  async function fetchData() {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    // console.log(data);
    updateFetchedData(data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* <Router> */}

      <UserAuthContextProvider>
        <Navbar />
        <div style={{ marginBottom: "150px" }}></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route
            path="/allproducts"
            element={
              <Products
                results={fetchedData}
                onProductSelected={setCurrentProduct}
                onButtonPressed={setIsModalOpen}
              />
            }
          />
          {/* <Route path="menscollection" element={<Mens/>} />
          <Route path="womenscollection" element={<Womens/>}/>
          <Route path="electronics" element={<Electronics/>} />
          </Route> */}

          <Route path="/favorite" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout/>}/>
          <Route
            path="/product-detail"
            element={
              <ProtectedRoute>
                <Productsdetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserAuthContextProvider>
      {/* </Router> */}
      {isModalOpen && (
        <Productmodal
          currentProduct={currentProduct}
          onbtnclicked={setIsModalOpen}
        />
      )}
      <Footer />
    </>
  );
}

export default App;
