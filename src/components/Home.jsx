import { useUserAuth } from "../Context/UserAuthContext";
import Image1 from "../assets/I1.jpeg";
import Image2 from "../assets/I2.webp";
import Image3 from "../assets/I3.jpeg";

const Home = () => {
  const { user } = useUserAuth();
  return (
    <>
      <div
        style={{
          color: "black",
          fontSize: "38px",
          marginTop: "75px",
          textAlign: "center",
        }}
      >
        Welcome to Fake Store<br></br> {user && user.email?.split("@")[0]}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <div>
          <img
            src={Image1}
            style={{ width: "450px", height: "600px", display: "flex" }}
          ></img>
        </div>
        <div>
          <img src={Image2} style={{ width: "450px", height: "600px" }}></img>
        </div>
        <div>
          <img src={Image3} style={{ width: "450px", height: "600px" }}></img>
        </div>
      </div>
    </>
  );
};

export default Home;
