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
        ...style,
      }}
    >
      {buttontext}
    </button>
  );
}

export default SizeButton;
