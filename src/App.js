import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Sidebar } from "./components/Sidebar/Sidbar";
import Products from "./pages/Products/Products";
import { ProtectRoute, PublicRoute } from "./components/ProtectRoutes";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { LoadingSpinner } from "./components/LoadingSpinner";

function App() {
  const { isLoading } = useSelector((state) => state.store);
  const theme = createTheme({
    palette: {
      text: {
        primary: "#0b3448",
        secondary: "#666",
        disabled: "#999",
      },
      background: {
        primary: "#ecf4f7", // Set your default background color here
      },
    },
    typography: {
      fontFamily: "Poppins, sans-serif",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      {isLoading && <LoadingSpinner />}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectRoute>
              <Sidebar />
            </ProtectRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
