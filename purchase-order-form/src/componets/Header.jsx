import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import usePurchaseStore from "store/productStore";

export default function Header() {
  const navigate = useNavigate();
  const { formDataArray, setForm, addFormItem, updateFormItem } = usePurchaseStore();

  const path = window.location.pathname.split("/");
  console.log("path: ", path);
  console.log('path.includes("add-order"): ', path.includes("add-order"));

  const handleSave = () => {
    // navigate(-1)
  }

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Purchase Order
          </Typography>

          {path.includes("add-order") ? (
            <Button color="inherit" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          ) : null}

          {path.includes("add-order") ? (
            <Button color="inherit" onClick={() => handleSave()}>
              Conform Order
            </Button>
          ) : (
            <Button color="inherit" onClick={() => navigate("/add-order")}>
              Add Order
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
