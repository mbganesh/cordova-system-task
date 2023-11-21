import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import EyeIcon from "@mui/icons-material/RemoveRedEye";
import usePurchase from "store/products";
import { useNavigate } from "react-router-dom";
export default function PurchaseList() {
  const navigate = useNavigate();
  // const { formDataArray } = usePurchaseStore();
  const { formDataArray } = usePurchase();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Vendor</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>
              Purchase Order Number
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Purchase Date</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>
              Inventory Location
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formDataArray.map((formData, index) => (
            <TableRow key={index}>
              <TableCell>{formData.vendor ?? "-"}</TableCell>
              <TableCell>{formData.purchaseOrderNumber}</TableCell>
              <TableCell>{formData.orderDate ?? "-"}</TableCell>
              <TableCell>{formData.inventoryLocation ?? "-"}</TableCell>
              <TableCell>
                <Button
                  endIcon={<EyeIcon />}
                  onClick={() =>
                    navigate(`/add-order`, {
                      state: { data: formData.purchaseOrderNumber },
                    })
                  }
                >
                  View Order
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
