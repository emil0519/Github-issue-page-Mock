// function getStock(variants,colorCode, size ) {
//     return variants.find(
//       (variant) => variant.color_code === colorCode && variant.size === size
//     ).stock;
//   }

//   const initState = JSON.parse((window.localStorage.getItem("cartItems") as string )) ||  [] as null;


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

console.log('hello  ')


export{};