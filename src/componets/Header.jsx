import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import usePurchase from "store/products";

export default function Header() {
  const navigate = useNavigate();

  const { loadData, addFormData } = usePurchase();
  const path = window.location.pathname.split("/");

  const handleLoad = () => {
    loadData();
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Purchase Order
          </Typography>
          {path.every((el) => el === "") ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleLoad()}
            >
              Load Data
            </Button>
          ) : null}

          {path.includes("add-order") ? (
            <Button color="inherit" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          ) : null}

          {path.includes("add-order") ? null : (
            <Button color="inherit" onClick={() => navigate("/add-order")}>
              Add Order
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
