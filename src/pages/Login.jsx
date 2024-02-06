import React from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import { Button } from "@mui/material";

function Login() {
  const { googleSignIn, user, logOut } = UserAuth();

  return (
    <div>
      {/* {!user ? (
        <GoogleButton onClick={googleSignIn} />
      ) : (
        <button onClick={logOut}>Signout</button>
      )} */}
      <Button  variant="contained">Hello world</Button>
    </div>
  );
}

export default Login;
