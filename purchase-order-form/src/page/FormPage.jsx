import React, { useEffect } from "react";

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
import usePurchaseStore from "store/products";

import { Controller, useForm } from "react-hook-form";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useLocation } from "react-router-dom";

const defaultValues = {
  vendor: "",
  purchaseOrderNumber: "",
  orderDate: "",
  inventoryLocation: "Chennai",
  uid: "some-uid-2",
  products: [
    {
      name: "Banana",
      quantity: 1,
      amount: 10,
      discount: 0,
      tax: 5,
      total: 11.5,
    },
  ],
};

export default function FormPage({ index,onSubmitApp }) {
  const { register, handleSubmit, errors, control, getValues } = useForm({
    mode: "onChange",
    defaultValues,
  });
  const location = useLocation()

  console.log("location", location)
  const id = location?.state?.data;


  console.log("id", id);

  const {
    formDataArray,
    setForm,
    addFormItem,
    updateFormItem,
    vendor,
    getOrderId,
    getSingleData, currentData 
  } = usePurchaseStore();
  console.log("vendor: ", getOrderId);

  const formData = formDataArray[index] ? formDataArray[index] : {};

  //   setForm(index ? index : 0, { purchaseOrderNumber: getOrderId });

  console.log("currentData: ", currentData);

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

  const onSubmit = (data) => {
    console.log(" form data in Form Page", data);
    onSubmitApp(data);
  };

  useEffect(() => {
    // Load data for the specified id when the component mounts
    getSingleData(id);
  }, [getSingleData, id]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>vendor:</label>
          <Controller
            name="vendor"
            control={control}
            defaultValue={currentData?.vendor}
            render={({ field }) => <input type="text" {...field} />}
          />
        </div>
        <div>
          <label>orderNumber:</label>
          <Controller
            name="orderNumber"
            control={control}
            defaultValue={currentData?.orderNumber}
            render={({ field }) => <input type="email" {...field} />}
          />
        </div>
        <div>
          <label>Phone:</label>
          <Controller
            name="phone"
            control={control}
            defaultValue={currentData?.phone}
            render={({ field }) => <input type="tel" {...field} />}
          />
        </div>
        <div>
          <label>Address:</label>
          <Controller
            name="address"
            control={control}
            defaultValue={currentData?.address}
            render={({ field }) => <input type="text" {...field} />}
          />
        </div>
        <div>
          <label>Age:</label>
          <Controller
            name="age"
            control={control}
            defaultValue={currentData?.age}
            render={({ field }) => <input type="number" {...field} />}
          />
        </div>
        <button type="submit">Submit</button>
      </form>





      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Grid container spacing={3} style={{ flexWrap: 'nowrap'}} >
            <Grid item xs={8}>
              <Controller
                name="vendor"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Vendor</InputLabel>
                    <Select
                      {...field}
                    >
                      {vendor?.map((el) => (
                        <MenuItem value={el}>{el}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={4}>
              <Controller
                name="orderNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Order Number"
                    value={getValues("orderNumber")}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={4}>
              <Controller
                name="orderDate"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker {...field} format="DD-MM-YYYY" />
                  </LocalizationProvider>
                )}
              />
            </Grid>

            <Grid item xs={8}>
            <Controller
                name="inventoryLocation"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Inventory Location"
                    value={getValues("inventoryLocation")}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </Grid>
          </Grid>
        </div>




        {/* 
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="location">Inventory Location</label>
          <Controller
            name="location"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} />}
          />
        </div> */}

      {/* <Controller
          name="role"
          control={control}
          defaultValue=""
          // rules={registerOptions.role}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel>Vendor</InputLabel>
              <Select
                name="vendor"
                {...register("vendor")}
                value={formData?.vendor}
                onChange={handleInputChange}
              >
                {vendor?.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            </FormControl>
            // <Select options={selectOptions} {...field} label="Text field" />
          )}
        /> 
      </form> */}



      {/* 
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
          */}
    </>
  );
}
