import { useUserAuth } from "../Context/UserAuthContext";
import Image1 from "../assets/I1.jpeg";
import Image2 from "../assets/I2.webp";
import Image3 from "../assets/I3.jpeg";
import { Link } from "react-router-dom";
import "../Home.css"

const Home = () => {
  const { user } = useUserAuth();
  return (
    <>
      <div
        className="title"
        style={{
          color: "black",
          fontSize: "34px",
          fontWeight:"bold", 
          textAlign: "center",
        }}
      >
        Welcome to Fake Store<br></br>
      </div>{" "}
      <h3 style={{ color: "black"}}>
        {user && user.email?.split("@")[0]}
      </h3>
      <br></br>
      <Link
        style={{
          color: "white",
          backgroundColor: "black",
          borderRadius: "7px",
          fontSize: "20px",
          textAlign: "center",
          padding: "5px",
        }}
        to={"/allproducts"}
        className="site-title"
      >
        Shop Now
      </Link>{" "}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <div style={{display:"flex", flexDirection:"row"}}>
          <img
            src={Image1}
            style={{ width: "450px", height: "500px", display: "flex" }}
          ></img>
        </div >
        <div style={{display:"flex", flexDirection:"row"}}>
          <img src={Image2} style={{ width: "450px", height: "500px" }}></img>
        </div>
        <div style={{display:"flex", flexDirection:"row"}}>
          <img src={Image3} style={{ width: "450px", height: "500px" }}></img>
        </div>
      </div>
    </>
  );
};

export default Home;
