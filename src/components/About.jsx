import React from "react";
import "../styles.css";
import ShirtImage from "../assets/girlshirt.jpg";
import bagImage from "../assets/bag.jpg";
import jacketImage from "../assets/jacket.jpg";
// import "../About.css"

function About() {
  return (
    <>
      <h1 style={{ color: "black", paddingTop: "none" }}>About Us</h1>
      <h5 style={{ color: "black" }}>
        Welcome to Fake Store – your ultimate destination for style enthusiasts!{" "}
      </h5>
      <img
        style={{
          width: "200px",
          height: "300px",
          display: "flex",
          alignSelf: "flex-start",
        }}
        src={bagImage}
      ></img>
      <div className="jacket" style={{ textAlign: "right", display: "flex" }}>
        <div className="jackettext">
          <h5
            style={{
              color: "black",
              textAlign: "left",
              fontWeight: "normal",
              marginTop: "100px",
            }}
          >
            Discover the latest trends and timeless classics in our curated
            collection of fashion-forward pieces. From chic streetwear to
            elegant eveningwear, we have something for every style and occasion.
          </h5>
        </div>
        <img
          style={{ width: "350px", height: "400px" }}
          src={jacketImage}
        ></img>
      </div>
      <h3 style={{ color: "black", marginTop: "100px" }}>
        Elevate your wardrobe with our handpicked selection
      </h3>
      <div
        className="girlshirt"
        style={{
          display: "grid",
          alignItems: "center",
          gridTemplateColumns: "2fr 2fr",
          columnGap: "5px",
        }}
      >
        <div className="shirtimage">
          <img
            style={{ width: "330px", height: "350px", marginTop: "100px" }}
            src={ShirtImage}
          ></img>
        </div>
        <h5
          style={{ color: "black", paddingLeft: "30px", fontWeight: "normal" }}
        >
          Embrace the art of self-expression and redefine fashion on your terms
          with us
        </h5>
      </div>
      <h3 style={{ color: "black", fontWeight: "400", marginTop: "150px" }}>
        Stay in vogue with our regularly updated catalog, ensuring you're always
        steps ahead in the style game.
      </h3>
    </>
  );
}

export default About;
