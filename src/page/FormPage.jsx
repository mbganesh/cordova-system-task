import React, { useEffect, useState } from "react";

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
import AddIcon from "@mui/icons-material/Add";
import usePurchaseStore from "store/products";

import { Controller, useForm } from "react-hook-form";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useLocation, useNavigate } from "react-router-dom";
import { NumberFormatBase } from "react-number-format";

var defaultValues = {
  vendor: "",
  orderDate: "",
  inventoryLocation: "",
  purchaseOrderNumber: `PO_${Math.floor(Math.random() * 10000)}`,
  products: [
    {
      name: "",
      quantity: 0,
      amount: 0,
      discount: 0,
      tax: 5,
      total: 0,
    },
  ],
};

export default function FormPage() {
  const navigate = useNavigate();
  const [product, setProduct] = useState(defaultValues);
  const { register, handleSubmit, formState, errors, control, getValues } =
    useForm({
      mode: "onChange",
      defaultValues: product,
    });
  const location = useLocation();

  const id = location?.state?.data;
  console.log("id: ", id);

  console.log("product: ", product);
  const handleAddItemBtn = () => {
    let obj = {
      name: "",
      quantity: 0,
      amount: 0,
      discount: 0,
      tax: 5,
      total: 0,
    };

    setProduct((prevState) => {
      let arr = [...prevState.products, obj];
      return { ...prevState, products: arr };
    });
  };

  const handleDeleteItemBtn = (index) => {
    setProduct((prevState) => {
      let arr = prevState.products.filter((_, i) => i !== index);
      return { ...prevState, products: arr };
    });
  };

  const handleEditProductData = (e) => {
    var { name, value } = e.target;

    setProduct((prevState) => {
      const data = { ...prevState, [name]: value };
      return data;
    });
  };

  const handleEditProduct = (index, e) => {
    var { name, value } = e.target;

    setProduct((prevState) => {
      const updatedProducts = prevState.products.map((product, i) => {
        if (i === index) {
          return {
            ...product,
            [name]: value,
            // total: calculateTotal(
            //   Number(product.amount),
            //   Number(product.quantity),
            //   Number(product.discount)
            // ),
          };
        }
        return product;
      });

      return {
        ...prevState,
        products: updatedProducts,
      };
    });
  };

  const { vendor, getSingleData, addProductToVendor } = usePurchaseStore();

  const handleSaveBtn = () => {
    addProductToVendor(product);
    navigate(-1);
  };

  useEffect(() => {
    // getSingleData(id)
    if (!id) {
      return;
    }
    // FIXME: this should probably updated
    // setProduct(getSingleData(id))
    console.log("getSingleData(id): ", getSingleData(id));
  }, [id]);

  return (
    <>
      <div style={{ display: "flex", flexWrap: "nowrap", padding: "0px 10px" }}>
        <Typography
          variant="h4"
          style={{ fontWeight: "bold", textTransform: "uppercase", flex: 1 }}
        >
          Create Purchase Order
        </Typography>
        {/* <Button variant="contained" color="warning">Save</Button> */}
        <Button
          variant="contained"
          color="success"
          type="submit"
          onClick={() => handleSaveBtn()}
        >
          Confirm Order
        </Button>
      </div>

      <div>
        <Grid container spacing={3} style={{ flexWrap: "nowrap" }}>
          <Grid item xs={8}>
            <FormControl fullWidth>
              <InputLabel>Vendor</InputLabel>
              <Select onChange={(e) => handleEditProductData(e)} name="vendor">
                {vendor?.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="purchaseOrderNumber"
              label="Order Number"
              value={product.purchaseOrderNumber}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="orderDate"
                label="Order Date"
                value={product?.orderDate}
                format="DD-MM-YYYY"
                onChange={(date) =>
                  handleEditProductData({
                    target: { value: date, name: "orderDate" },
                  })
                }
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={8}>
            <TextField
              label="Inventory Location"
              name="inventoryLocation"
              value={product?.inventoryLocation}
              onChange={(e) => handleEditProductData(e)}
            />
          </Grid>
        </Grid>
      </div>

      <div>
        <Typography
          variant="h5"
          style={{
            fontWeight: "bold",
            padding: "10px",
            textTransform: "uppercase",
          }}
        >
          Item Details
        </Typography>
        {product?.products?.map((data, index) => {
          return (
            <div style={{ padding: "10px", margin: "10px 0" }}>
              <Grid container spacing={3} style={{ flexWrap: "nowrap" }}>
                <Grid item xs={4}>
                  <TextField
                    value={data[index]?.name}
                    name="name"
                    label="Product Name"
                    onChange={(e) => handleEditProduct(index, e)}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    value={data[index]?.quantity?.replace(/[^0-9.]/g, "")}
                    name="quantity"
                    label="Quantity"
                    inputProps={{
                      pattern: "[0-9]*",
                    }}
                    onChange={(e) => handleEditProduct(index, e)}
                  />
                </Grid>

                <Grid item xs={4}>
                  <NumberFormatBase
                    customInput={TextField}
                    thousandSeparator={true}
                    value={data[index]?.amount}
                    name="amount"
                    label="Amount"
                    onChange={(e) => handleEditProduct(index, e)}
                  />
                </Grid>

                <Grid item xs={4}>
                  <NumberFormatBase
                    customInput={TextField}
                    thousandSeparator={true}
                    value={data[index]?.discount}
                    name="discount"
                    label="Discount[%]"
                    onChange={(e) => handleEditProduct(index, e)}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    name="tax"
                    value={5}
                    label="Tax[%]"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid item xs={4}>
                  <NumberFormatBase
                    customInput={TextField}
                    thousandSeparator={true}
                    // value={data[index]?.discount}
                    value={
                      data[index]?.amount * data[index]?.quantity -
                      data[index]?.amount * data[index]?.discount +
                      data[index]?.amount * 5
                    }
                    name="total"
                    onChange={(e) => handleEditProduct(index, e)}
                    label="Total"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  {/* <TextField
                      value={
                        data[index]?.amount * data[index]?.quantity -
                        (data[index]?.amount *
                          data[index]?.quantity *
                          data[index]?.discount) /
                          100
                      }
                    /> */}
                </Grid>

                <Grid item xs={4}>
                  {index === 0 ? (
                    <Button
                      startIcon={<AddIcon />}
                      onClick={() => handleAddItemBtn()}
                    >
                      Add
                    </Button>
                  ) : (
                    <Button
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteItemBtn(index)}
                    >
                      Delete
                    </Button>
                  )}
                </Grid>
              </Grid>
            </div>
          );
        })}
      </div>
    </>
  );
}
