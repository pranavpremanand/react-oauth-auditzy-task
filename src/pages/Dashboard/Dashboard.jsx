import React from "react";
import UserDetails from "../../components/UserDetails/UserDetails";
import { Box, useMediaQuery } from "@mui/material";

function Dashboard() {
  const isLargeScreen = useMediaQuery("(min-width: 800px)");
  const user = JSON.parse(sessionStorage.getItem("user_details"));
  return (
    <Box
      sx={{
        width: isLargeScreen ? "fit-content" : "100%",
        px: 5,
        py: 8,
      }}
    >
      <UserDetails user={user} />
    </Box>
  );
}

export default Dashboard;
