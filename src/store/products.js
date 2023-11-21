/**
 * 
 * import create from "zustand";

const usePurchaseStore = create((set) => ({
  formData: {
    vendor: "",
    purchaseOrderNumber: `PO_${Math.floor(Math.random() * 1000)}`,
    purchaseDate: "",
    inventoryLocation: "",
    items: [],
  },
  setFormData: (newFormData) =>
  set((state) => ({ formData: { ...state.formData, ...newFormData } })),
  addFormItem: () =>
  set((state) => ({
    formData: {
      ...state.formData,
      items: [
        ...state.formData.items,
        { productName: "", quantity: 0, amount: 0, discount: 0 },
      ],
    },
  })),
  updateFormItem: (index, field, value) =>
  set((state) => {
    const updatedItems = [...state.formData.items];
    updatedItems[index][field] = value;
    return { formData: { ...state.formData, items: updatedItems } };
  }),
  productList:[]
}));

export default usePurchaseStore;



*/
// import { create } from "zustand";

import create from "zustand";
const vendor = ["Ganesh", "Anitha", "Umar", "Abi", "Keerthi"];

const dummyList = [
  {
    vendor: "Ganesh",
    purchaseOrderNumber: "PO_001",
    purchaseDate: "15-09-2023",
    inventoryLocation: "Delhi",
    uid: "some-uid-1",
    products: [
      {
        name: "Apple",
        quantity: 1,
        amount: 10,
        discount: 0,
        tax: 5,
        total: 11.5,
      },
      {
        name: "Orange",
        quantity: 1,
        amount: 20,
        discount: 0,
        tax: 5,
        total: 22.5,
      },
    ],
  },
  {
    vendor: "Umar",
    purchaseOrderNumber: "PO_002",
    purchaseDate: "17-09-2023",
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
  },
];

const usePurchaseStore = create((set) => ({
  formDataArray: [],
  vendor,
  getOrderId: `PO_${Math.floor(Math.random() * 10000)}`,
  loadData: () =>
    // test
    set(() => ({
      formDataArray: dummyList,
    })),

  addProductToVendor: (
    newProduct // new product
  ) =>
    set((state) => {
      const updatedOrders = [...state.formDataArray, newProduct];
      return { formDataArray: updatedOrders };
    }),

  addFormData: (
    newFormData // use later
  ) =>
    set((state) => ({
      formDataArray: [
        ...state.formDataArray,
        {
          ...newFormData,
          purchaseOrderNumber: `PO_${Math.floor(Math.random() * 10000)}`,
        },
      ],
    })),
  getSingleData: (purchaseOrderNumber) =>
    set((state) => {
      const foundOrder = state.formDataArray.find(
        (order) => order.purchaseOrderNumber === purchaseOrderNumber
      );
      console.log("foundOrder: ", foundOrder);
      return { foundOrder };
    }),
}));

export default usePurchaseStore;
