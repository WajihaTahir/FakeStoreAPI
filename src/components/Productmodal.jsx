import React from "react";
import { hide } from "@popperjs/core";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css"


const Productmodal = ({ currentProduct, onbtnclicked }) => {
  function onbuttonclicked(currentProduct) {
    onbtnclicked(false);
  }
  console.log(currentProduct);

  return (
    <div
      className="modalcontainer"
      style={{
        position: "fixed",
        top: '30%',
        background: "white",
        border: "solid 1px black",
        width: "400px",
        height:"450px",
        alignSelf: "center",
        right: '35%'
      }}
    >
      <h4 style={{ color: "black" }}>
        <b>Name:</b> <i>{currentProduct?.title}</i>
      </h4>
      <h4 style={{color:"black"}}>
        <b>Price:</b> <i>{currentProduct?.price}</i>
      </h4>
      <h4 style={{color:"black"}}>
        <b>Category:</b> <i>{currentProduct?.category}</i>
      </h4>
      <img
        src={currentProduct?.image}
        alt=""
        style={{ width: "200px", height: "200px" }}
      ></img>
      <br></br>
      <button
        onClick={() => {
          onbuttonclicked();
        }}
        type="button"
        className="btn btn-dark mt-4"
        id="closebutton"
        data-bs-dismiss="modal"
      >
        Close
      </button>
      <button style={{backgroundColor:"transparent", color:"black"}}><FontAwesomeIcon icon={faHeart} /></button>
    </div>
  );
};

export default Productmodal;
