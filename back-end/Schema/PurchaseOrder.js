import mongoose from "mongoose";

let productSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  quantity: { type: Number, default: 0 },
  amount: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
});

var schema = new mongoose.Schema(
  {
    vendor: { type: String, default: "" },
    OrderNumber: { type: String, default: "" },  // , unique: true
    OrderDate: { type: Date, default: new Date() },
    InventoryLocation: { type: String, default: "" },
    Products: [productSchema],
  },
  { timestamps: true }
);

var model = mongoose.model("PurchaseOrder", schema, "PurchaseOrder");

export default model;
