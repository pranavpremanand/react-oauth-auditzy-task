import React from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../../context/AuthContext";
import { Box } from "@mui/material";

function Login() {
  const { googleSignIn } = UserAuth();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pt:15,
      }}
    >
      <GoogleButton onClick={googleSignIn} />
    </Box>
  );
}

export default Login;
