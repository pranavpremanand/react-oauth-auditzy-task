import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Box, Divider } from "@mui/material";
import UserDetails from "../../components/UserDetails/UserDetails";

function Dashboard() {
  const user = JSON.parse(sessionStorage.getItem("user_details"));
  return (
    <>
      <UserDetails user={user} />
    </>
  );
}

export default Dashboard;
