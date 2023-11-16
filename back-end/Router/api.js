import express from "express";
// import PurchaseOrder from '../Schema/PurchaseOrder';
import PurchaseOrder from "../Schema/PurchaseOrder.js";

const router = express.Router();

router.use(express.json());

router.get("/", async (req, res) => {
  let allData = await PurchaseOrder.find({});
  res.json(allData);
});

router.post("/create", async (req, res) => {
  try {
    const { vendor, OrderDate, InventoryLocation, Product } = req.body;
    let insertData = {}

    insertData['vendor'] = vendor
    insertData['OrderDate'] = OrderDate
    insertData['InventoryLocation'] = InventoryLocation
    insertData['products'] = Product
    let productData = await PurchaseOrder.create(req.body)

    return res.json({
        status: true,
        message: "Created Successfully"
      });

  } catch (error) {
    console.log("error: ", error);
    return res.json({
      status: false,
      message: error.message,
    });
  }
});

export default router;
