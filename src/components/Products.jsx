/* eslint-disable react/prop-types */
import React from "react";
import { useState, useEffect } from "react";
import "../styles.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Search from "./Search";
import { useProducts } from "../Context/ProductsContext";

function Products({ onButtonPressed, onProductSelected }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { products } = useProducts();  //to get from productscontext. 
  const [productsToShow, setProductsToShow] = useState([]);
  // console.log("location", location);

  function onimageclicked(product) {
    onButtonPressed(true);
    onProductSelected(product);
  }

  useEffect(() => {
    setProductsToShow(products);
  }, [products]);

  if (products) {
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Search results={products} setProducts={setProductsToShow} />
        {productsToShow?.map((each) => {
          const { id, title, price, image } = each; //destructured here.
          return (
            <div
              key={id}
              className="productcardimage"
              style={{
                padding: "1em",
                flexDirection: "column",
                width: "300px",
                height: "500px",
                display: "flex",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "1 em",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>
                  <img
                    className="productImage"
                    src={image}
                    alt="#"
                    style={{
                      width: "210px",
                      height: "250px",
                      padding: "20px",
                      boxShadow: "10px 10px 10px #ccc",
                      borderRadius: "10px",
                    }}
                    onClick={() => {
                      onimageclicked(each);
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h6 style={{ color: "black", fontSize: "14px" }}>{title}</h6>
                  <h6
                    style={{
                      color: "black",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                  >{`Price: $ ${price}`}</h6>
                  <button
                    onClick={() => {
                      navigate("/product-detail", { state: { product: each } }); //sets the state here in this way
                      //with the property as product for 'each' which was already in the loop. 
                     
                    }}
                    className="findmore"
                    style={{
                      display: "flex",
                      borderRadius: "20px",
                      width: "120px",
                      color: "white",
                    }}
                  >
                    Find More
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return <></>;
}

export default Products;
