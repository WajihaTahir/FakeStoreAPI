import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import SizeButton from "./SizeButton";


const Productsdetails = () => {
  const [counter, setCounter] = useState(0);
  const { state } = useLocation();
  console.log("location", state?.product);
  return (
    <>
  <div style={{display:"grid", gridTemplateRows:"2fr 0.2fr 0.2fr 0.2fr"}}>
    <div className="picbuttons">
  <img style={{width:"250px", height:"300px", marginBottom:"0", float:"left"}} src={state.product.image}></img>
  <h4 style={{color:"black"}}>Choose Size</h4>
  <SizeButton style={{marginRight:"10px", marginBottom:"10px"}}buttontext="XS (EU 32-34)"/>
  <SizeButton style={{marginBottom:"10px"}}buttontext="S (EU 36-38)"/><br></br>
  <SizeButton style={{marginRight:"10px", marginBottom:"10px"}}buttontext="M (EU 40-42)"/>
  <SizeButton style={{marginBottom:"10px"}}buttontext="L (EU 44-46)"/><br></br>
  <SizeButton style={{marginRight:"10px", marginBottom:"10px"}}buttontext="XL (EU 48-50)"/>
  <SizeButton buttontext="XXL (EU 52-54)"/><br></br>
  <button style={{width:"350px", height:"50px", fontSize:"20px", borderRadius:"30px", marginTop:"50px"}}>Add to Cart <FontAwesomeIcon icon={faCartShopping}/></button><br></br>
  <button style={{width:"350px", height:"50px", fontSize:"20px", borderRadius:"30px", marginTop:"30px", marginLeft:"250px",backgroundColor:"transparent", color:"black", borderColor:"black"}}>Favourite <FontAwesomeIcon icon={faHeart} /></button><br></br>
  <div style={{display:"flex", flexDirection:"row", justifyContent:"center", marginLeft:"230px", marginTop:"50px"}}>
  <button style={{width:"30px", height:"30px", alignItems:"center", padding:"10px"}} onClick={()=> setCounter(counter-1)}>-</button>
  <div>
  <h6 style={{display:"inline", color:"black", fontSize:"20px", padding:"10px"}}>{counter}</h6>
  </div>
  <button style={{width:"30px", height:"30px", alignItems:"center", padding:"10px"}} onClick={()=> setCounter(counter+1)}>+</button>
  </div>
  </div>
  <h1 style={{color:"black", fontSize:"16px", fontWeight:"bold", textAlign:"left"}}>{state.product.title}</h1>
  <h1 style={{color:"black", fontSize:"16px", fontWeight:"normal", textAlign:"left"}}><b>Price:</b> ${state.product.price}</h1>
  <h1 style={{color:"black", fontSize:"16px", fontWeight:"normal", textAlign:"left"}}><b>Description:</b> {state.product.description}</h1>
</div>
  </>
  )
};

export default Productsdetails;
