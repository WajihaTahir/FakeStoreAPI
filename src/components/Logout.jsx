import React from "react";
import { useEffect } from "react";
import { useUserAuth } from "../Context/UserAuthContext";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();
  const { user, logOut } = useUserAuth() ?? {};
  console.log("abc...", user);
  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/")
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    handleLogOut();
  }, []);
  return <div>Logout</div>;
};

export default Logout;
