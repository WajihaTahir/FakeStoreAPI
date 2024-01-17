import React from "react";

const Alternate = () => {
  return (
    <h2 style={{ color: "black", marginBottom: "50%" }}>
      Please{" "}
      <a href="/login" className="alternate-login">
        sign in here
      </a>{" "}
      Or{" "}
      <a href="/register" className="alternate-login">
        create an account
      </a>{" "}
      to
      <ul style={{ display: "flex", flexDirection: "column" }}>
        <li>See product details</li>
        <li>Add products to your favorites</li>
        <li>Enjoy exclusive benefits</li>
      </ul>
    </h2>
  );
};

export default Alternate;
