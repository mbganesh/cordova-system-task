import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import usePurchaseStore from "store/productStore";
import usePurchase from "store/products";

export default function Header({ formDatafromApp }) {
  const navigate = useNavigate();
  const { formDataArray, setForm, addFormItem, updateFormItem } =
    usePurchaseStore();

  const { loadData, addFormData } = usePurchase();

  const { getValues } = useForm();
  const path = window.location.pathname.split("/");
  console.log("path: ", path);
  console.log('path.includes("add-order"): ', path.includes("add-order"));

  // const handleSave = () => {
  //   console.log("getValuesdsd(): ", JSON.stringify(getValues()));

  // };
  const handleSave = () => {
    const formData = formDatafromApp;

    // Assuming you have a function to save data to a JSON file
    saveDataToJsonFile(formData);
  };

  // Function to save data to a JSON file (modify this based on your needs)
  const saveDataToJsonFile = (data) => {
    // Perform logic to save the data to a JSON file or send it to a server
    // For demonstration purposes, logging the data to the console
    console.log("Saving data to JSON file: ", data);
    addFormData(data);
  };

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
