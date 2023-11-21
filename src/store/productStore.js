import create from "zustand";
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

const vendor = [
    "Ganesh",
    "Anitha",
    "Umar",
    "Abi",
    "Keerthi"
]

// const initalValue = {}

// const demoData =
// {
//     "vendor":"Ganesh",
//     "orderNo":"PO_001",
//     "orderDate":new Date(),
//     "location":"Delhi",
//     "uid": new Date.now().toString(),
//     "products":[
//         {
//             "name":"Apple",
//             "quantity":1,
//             "amount":10,
//             "discount":0,
//             "tax":5,
//             "total":11.5
//         },
//         {
//             "name":"Orange",
//             "quantity":1,
//             "amount":20,
//             "discount":0,
//             "tax":5,
//             "total":22.5
//         }
//     ]

// }

const dummyList = [
    {
        "vendor":"Ganesh",
        "purchaseOrderNumber":"PO_001",
        "purchaseDate":'15-09-2023',
        "inventoryLocation":"Delhi",
        "uid": "some-uid-1",
        "products":[
            {
                "name":"Apple",
                "quantity":1,
                "amount":10,
                "discount":0,
                "tax":5,
                "total":11.5
            },
            {
                "name":"Orange",
                "quantity":1,
                "amount":20,
                "discount":0,
                "tax":5,
                "total":22.5
            }
        ]
    },
    {
        "vendor":"Umar",
        "purchaseOrderNumber":"PO_002",
        "purchaseDate":'17-09-2023',
        "inventoryLocation":"Chennai",
        "uid": "some-uid-2",
        "products":[
            {
                "name":"Banana",
                "quantity":1,
                "amount":10,
                "discount":0,
                "tax":5,
                "total":11.5
            }
        ]
    }
]
// const useProductStore = create((set) => {
//     initalValue,

// })

// export default useProductStore;


const usePurchaseStore = create((set) => ({
  formDataArray:dummyList,
  itemData : {},
  vendor,
  currentData: {},
  getOrderId: `PO_${Math.floor(Math.random() * 10000)}`,
  addForm: () =>
    set((state) => ({
      formDataArray: [
        ...state.formDataArray,
        {
          vendor: "",
          purchaseOrderNumber: `PO_${Math.floor(Math.random() * 1000)}`,
          purchaseDate: "",
          inventoryLocation: "",
          items: [],
        },
      ],
    })),
  setForm: (index, newFormData) =>
    set((state) => {
      const updatedFormDataArray = [...state.formDataArray];
      updatedFormDataArray[index] = {
        ...state.formDataArray[index],
        ...newFormData,
      };
      return { formDataArray: updatedFormDataArray };
    }),
  addFormItem: (index) =>
    set((state) => {
      const updatedFormDataArray = [...state.formDataArray];
      updatedFormDataArray[index].items.push({
        productName: "",
        quantity: 0,
        amount: 0,
        discount: 0,
      });
      return { formDataArray: updatedFormDataArray };
    }),
  updateFormItem: (index, itemIndex, field, value) =>
    set((state) => {
      const updatedFormDataArray = [...state.formDataArray];
      updatedFormDataArray[index].items[itemIndex][field] = value;
      return { formDataArray: updatedFormDataArray };
    }),
    setCurrentForm:(object) => {
      set((state)=> {
          
      })
    }
}));

export default usePurchaseStore;
