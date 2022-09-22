// function getStock(variants,colorCode, size ) {
//     return variants.find(
//       (variant) => variant.color_code === colorCode && variant.size === size
//     ).stock;
//   }

// import React, { useState } from "react";

import api from "../utils/api";
let initState: any;
// async function startResult() {
//   initState = await api.getLabels("emil0519", "testing-issues");
// }
// // 改進：payload 進去
// startResult();
initState = [];
const reducer = (state = initState, action: any) => {
  switch (action.type) {
    case "getList": {
      // action.payload.label && console.log(action.payload.label);
      // if (action.label === undefined) {
      //   console.log("undefined");
      //   console.log("action.payload.label");
      //   return;
      // } else {
      // console.log(action.payload.label);
      return action.payload.label;
      // }
      // return;
      // async function startResult() {
      //   initState = await api.getLabels("emil0519", "testing-issues");
      // }
      // startResult();
      // //thunk saga
      // //現在只存進去就好了
      // return state;
    }
    case "createList": {
      const newList = [
        ...state,
        {
          id: action.payload.data.id,
          node_id: action.payload.data.node_id,
          url: action.payload.data.url,
          name: action.payload.data.name,
          color: action.payload.data.color,
          default: action.payload.data.default,
          description: action.payload.data.description,
        },
      ];
      // console.log(newList);
      // console.log(action.payload.data);

      // async function startResult() {
      //   initState = await api.getLabels("emil0519", "testing-issues");
      // }
      // startResult();
      //thunk saga
      //現在只存進去就好了
      return newList;
    }
    default:
      return;
  }
};

export default reducer;

// const reducer =(state=initState,action)=>{
//   console.log(state)
//     switch (action.type) {
//         case "add":{
//           const newCartItems = [
//             ...state,
//             {
//               color: action.payload.product.colors.find(
//                 (color) => color.code === action.payload.selectedColorCode
//               ),
//               id: action.payload.product.id,
//               image: action.payload.product.main_image,
//               name: action.payload.product.title,
//               price: action.payload.product.price,
//               qty: action.payload.quantity,
//               size: action.payload.selectedSize,
//               stock: getStock(
//                 action.payload.product.variants,
//                 action.payload.selectedColorCode,
//                 action.payload.selectedSize
//               ),
//             },
//           ];
//           return newCartItems;
//         }
//         case "changeQuantity":{
//             const newCartItems = state.map((item, index) =>
//             index === action.payload.itemIndex
//               ? {
//                   ...item,
//                   qty: action.payload.itemQuantity,
//                 }
//               : item
//           );

//           return newCartItems;
//             }
//           case "delete":{
//             const newCartItems = state.filter((_, index) => index !== action.payload.itemIndex);

//             return newCartItems;
//           }
//           case "clear":{
//               const newCartItems=[];

//               return newCartItems;
//         }
//         default:
//         return initState;
//     }
// }

// export default reducer

export {};
