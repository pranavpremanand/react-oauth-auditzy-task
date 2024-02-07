import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

const UserDetails = ({ user }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        width: "fit-content",
        borderRadius: 1,
        py: 2,
        pl: 2,
        pr: 10,
        m: 5,
        color: "text.primary",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
      }}
    >
      <Typography
        component="h3"
        variant="span"
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
      <Typography component="h5" variant="span" sx={{ fontWeight: 500 }}>
        {user.email}
      </Typography>
    </Box>
  );
};

export default UserDetails;
