import { combineReducers, createStore } from "redux";
import reducer from "./test-reducer";
import reduceReducers from "reduce-reducers";
import colorReducer from "./colorReducer";
import { configureStore } from "@reduxjs/toolkit";
// import { configureStore } from '@reduxjs/toolkit'
// type Reduce={
//     labelReducer: (state: any, action: any) => any;
// }
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: combineReducers({ reducer, colorReducer }),
});
// export const store = createStore(reducer);

// //可以直接呼叫store.dispatch,store.getState, store.subscribe
// //react中透過react redux取得dispatch或useSelector
// // const store= createStore(reducer) 決定讓哪些component能取得store的資料 --> index.js

// //就算有兩個reducer，都可以用const store=createStore({
//     //number: numberReducer,
//     //user: userReducer
// // })
// //這樣state就是一個object，當需要用useSelector的時候，可以寫成
// //useSelector (state=> state.number)，不需要combine reducer

// console.log('hello  ')

// export{};
// import reducer from "./test-reducer";

// import { configureStore } from "@reduxjs/toolkit";

// export const store = configureStore({
//   reducer: { labelReducer: reducer },
// });
