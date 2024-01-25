import { useState } from "react";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import { Route, Routes } from "react-router-dom";
import Favorites from "./components/Favorites";
import Productmodal from "./components/Productmodal";
import Productsdetails from "./components/Productsdetails";
import Footer from "./components/Footer";
// import Mens from "./components/Mens";
// import Womens from "./components/Womens";
// import Electronics from "./components/Electronics";
import { UserAuthContextProvider } from "./Context/UserAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Alternate from "./components/Alternate";
import { ShoppingCartProvider } from "./Context/ShoppingCartContext";
import { ProductsProvider } from "./Context/ProductsContext";
import { FavoritesProvider } from "./Context/FavoritesContext";

function App() {
  // let [search, setSearch] = useState("");
  let [currentProduct, setCurrentProduct] = useState({});
  let [isModalOpen, setIsModalOpen] = useState(false);
  //let [isModalClose] = useState(true);

  return (
    <>
      <UserAuthContextProvider>
        <ProductsProvider>
          <ShoppingCartProvider>
            <FavoritesProvider>
              <Navbar />
              <div style={{ marginBottom: "150px" }}></div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route
                  path="/allproducts"
                  element={
                    <Products
                      onProductSelected={setCurrentProduct}
                      onButtonPressed={setIsModalOpen}
                    />
                  }
                />
                <Route
                  path="/favorite"
                  element={
                    <ProtectedRoute>
                      <Favorites />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/product-detail"
                  element={
                    <ProtectedRoute>
                      <Productsdetails />
                    </ProtectedRoute>
                  }
                />
                <Route path="/alternate" element={<Alternate />} />
              </Routes>
            </FavoritesProvider>
          </ShoppingCartProvider>
        </ProductsProvider>
      </UserAuthContextProvider>

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
