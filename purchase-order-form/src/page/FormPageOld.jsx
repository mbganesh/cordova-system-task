import React from "react";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import usePurchaseStore from "store/productStore";

export default function FormPage({ index }) {
  const {
    formDataArray,
    setForm,
    addFormItem,
    updateFormItem,
    vendor,
    getOrderId,
  } = usePurchaseStore();
  console.log("vendor: ", getOrderId);

  const formData = formDataArray[index] ? formDataArray[index] : {};

//   setForm(index ? index : 0, { purchaseOrderNumber: getOrderId });

  console.log("formData: ", formData);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setForm(index, { [name]: value });
  };

  const handleAddItem = () => {
    addFormItem(index);
  };

  const handleItemChange = (itemIndex, field, value) => {
    updateFormItem(index, itemIndex, field, value);
  };

  const handleRemoveItem = (itemIndex) => {
    // Implement logic to remove item
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Select Vendor</InputLabel>
          <Select
            name={`vendor${index}`}
            value={formData?.vendor}
            onChange={handleInputChange}
          >
            {vendor?.map((el) => (
              <MenuItem value={el}>{el}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Purchase Order Number"
          name={`purchaseOrderNumber${index}`}
          value={formData?.purchaseOrderNumber}
          readOnly
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          type="date"
          label="Purchase Date"
          name={`purchaseDate${index}`}
          value={formData?.purchaseDate}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Inventory Location"
          name={`inventoryLocation${index}`}
          value={formData?.inventoryLocation}
          onChange={handleInputChange}
        />
      </Grid>

      {formData?.items?.map((item, itemIndex) => (
        <Grid container item key={itemIndex} spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Product Name"
              value={item?.productName}
              onChange={(e) =>
                handleItemChange(itemIndex, "productName", e?.target?.value)
              }
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              type="number"
              label="Quantity"
              value={item?.quantity}
              onChange={(e) =>
                handleItemChange(
                  itemIndex,
                  "quantity",
                  parseInt(e?.target?.value, 10)
                )
              }
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              type="number"
              label="Amount"
              value={item?.amount}
              onChange={(e) =>
                handleItemChange(
                  itemIndex,
                  "amount",
                  parseFloat(e?.target?.value)
                )
              }
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              type="number"
              label="Discount (%)"
              value={item?.discount}
              onChange={(e) =>
                handleItemChange(
                  itemIndex,
                  "discount",
                  parseInt(e?.target?.value, 10)
                )
              }
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Tax"
              value={(item?.amount * item?.quantity * 0.05) / item?.discount}
              readOnly
            />
          </Grid>

          <Grid item xs={12} sm={1}>
            <TextField
              fullWidth
              label="Total"
              value={
                item?.amount * item?.quantity -
                (item?.amount * item?.quantity * item?.discount) / 100
              }
              readOnly
            />
          </Grid>

          <Grid item xs={12}>
            <IconButton
              aria-label="delete"
              onClick={() => handleRemoveItem(itemIndex)}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      <Grid item xs={12}>
        <Button variant="contained" onClick={handleAddItem}>
          + Add More
        </Button>
      </Grid>
    </Grid>
  );
}
