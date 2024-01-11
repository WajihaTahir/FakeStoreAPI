import React from "react";

const Alternate = () => {
  return (
    <h2 style={{ color: "black", marginBottom: "50%" }}>
      Please{" "}
      <a href="/login" className="alternate-login">
        sign in here
      </a>{" "}
      to see the product details.{" "}
    </h2>
  );
};

export default Alternate;
