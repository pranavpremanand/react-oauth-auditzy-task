import { Box, Typography, Avatar } from "@mui/material";
import { UserAuth } from "../../context/AuthContext";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import { darken } from "@mui/material/styles";
import { IconButton, Tooltip  } from "@mui/material";

export const Navbar = ({ user }) => {
  const { logOut } = UserAuth();
  return (
    <Box
      sx={{
        width:'100%',
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 2,
      }}
    >
      <AdminPanelSettingsIcon sx={{ fontSize: 40, color: "text.primary" }} />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Tooltip
          title="Logout"
          sx={{
            borderRadius: 1,
            bgcolor: darken("#ecf4f7",0.1),
            color: "text.primary",
            mr: 3,
            "&:hover": { bgcolor: darken("#ecf4f7",0.2) },
          }}
          onClick={logOut}
        >
          <IconButton>
            <LogoutIcon sx={{fontSize:20}}/>
          </IconButton>
        </Tooltip>
        <Avatar alt={user.displayName} src={user.photoURL} />
        <Typography variant="span" component="span" color="text.primary" sx={{fontWeight:500}}>
          {user.displayName.split(" ")[0]}
        </Typography>
      </Box>
    </Box>
  );
};
