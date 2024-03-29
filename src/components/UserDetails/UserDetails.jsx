import React from "react";
import { Box, Typography, Avatar, useMediaQuery } from "@mui/material";

const UserDetails = ({ user }) => {
  const isLargeScreen = useMediaQuery("(min-width: 800px)");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        borderRadius: 1,
        py: 5,
        pl: 5,
        pr: isLargeScreen ? 20 : 0,
        color: "text.primary",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
      }}
    >
      <Typography
        component="span"
        variant="h5"
        sx={{ fontWeight: 500, textDecoration: "underline" }}
      >
        User Details
      </Typography>
      <Avatar
        alt={user.displayName}
        src={user.photoURL}
        sx={{ width: 90, height: 90 }}
      />
      <Typography component="h3" variant="span" sx={{ fontWeight: 500 }}>
        {user.displayName}
      </Typography>
      <Typography component="h4" variant="span" sx={{ fontWeight: 500 }}>
        {user.email}
      </Typography>
    </Box>
  );
};

export default UserDetails;
