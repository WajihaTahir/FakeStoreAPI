import { createContext, useContext, useEffect } from "react";
import { useState } from "react";

const ProductsContext = createContext({});  //creating context for fetching so we can centralize and manage data easily. 

export function useProducts() {
  return useContext(ProductsContext);
}

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);

  function getProduct(id) {  //will be used in fav component.
    return products.find((item) => item.id === id);
  }

  async function fetchProducts() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      console.log("api data",data);
      setProducts(data); //setting the state of the products to the data obtained from API call.
    } catch (e) {
      console.log("Error fetching data", e);
    }
  }
  //let's fetch data once when the component renders.
  useEffect(() => {
    fetchProducts();
  }, []); //with empty dependency array so it loads only on first render.

  return (
    <ProductsContext.Provider
      value={{
        products,
        getProduct,
        fetchProducts,   //passing these functions so that we can access the data when wrapped in routes. 
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
