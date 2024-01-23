import React from "react";

function SizeButton({ buttontext, style }) {
  return (
    <button
      style={{
        width: "180px",
        height: "50px",
        backgroundColor: "transparent",
        color: "black",
        borderColor: "black",
        margin:"10px"
      }}
    >
      {buttontext}
    </button>
  );
}

export default SizeButton;
