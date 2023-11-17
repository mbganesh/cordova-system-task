import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import usePurchaseStore from "store/productStore";

export default function PurchaseList() {
  const { formDataArray } = usePurchaseStore();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Vendor</TableCell>
            <TableCell>Purchase Order Number</TableCell>
            <TableCell>Purchase Date</TableCell>
            <TableCell>Inventory Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formDataArray.map((formData, index) => (
            <TableRow key={index}>
              <TableCell>{formData.vendor}</TableCell>
              <TableCell>{formData.purchaseOrderNumber}</TableCell>
              <TableCell>{formData.purchaseOrderNumber}</TableCell>
              <TableCell>{formData.inventoryLocation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
