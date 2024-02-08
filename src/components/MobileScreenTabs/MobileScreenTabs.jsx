import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useNavigate, useLocation } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useEffect } from "react";

export const MobileScreenTabs = () => {
  const { pathname } = useLocation();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (pathname === "/") return setValue(0);
    else return setValue(1);
  }, [pathname]);
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="icon label tabs example"
      sx={{
        color: "text.primary",
        position: "fixed",
        width: "100%",
        bottom: 0,
        display: "flex",
        gridTemplateColumns: "1fr 1fr auto",
        justifyContent: "space-between",
        bgcolor: "white",
        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.4)",
      }}
    >
      <Tab
        icon={<PersonIcon />}
        label="PROFILE"
        onClick={() => navigate("/")}
      />
      <Tab
        icon={<InventoryIcon />}
        label="PRODUCTS"
        onClick={() => navigate("/products")}
      />
    </Tabs>
  );
};
