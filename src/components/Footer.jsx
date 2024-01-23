import React from "react";

function Footer() {
  return (
    <div
      style={{
        backgroundColor: "black",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        position: "absolute",
        left: 0,
        right: 0,
        marginTop: "380px",
        padding:"none",
        maxHeight: "300px",
      }}
    >
      <div className="list1" style={{ textAlign: "center" }}>
        <h4 style={{ color: "white", fontSize: "14px", fontWeight: "normal" }}>
          Contact Us
        </h4>
        <h4 style={{ color: "white", fontSize: "14px", fontWeight: "normal" }}>
          Find A Store
        </h4>
        <h4 style={{ color: "white", fontSize: "14px", fontWeight: "normal" }}>
          Become A Member
        </h4>
        <h4 style={{ color: "white", fontSize: "14px", fontWeight: "normal" }}>
          Student Discount
        </h4>
      </div>
    </div>
  );
}

export default Footer;
