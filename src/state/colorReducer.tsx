// let initState: string;

const colorReducer = (state = "#e99695", action: any) => {
  switch (action.type) {
    case "colorChange": {
      console.log(action.payload.color);
      return action.payload.color;
    }
    //這是專屬於改變顏色的reducer，當onchange的會呼叫colorChange時候就回傳到state裡面
    default:
      return "#e99695";
  }
};

export default colorReducer;
