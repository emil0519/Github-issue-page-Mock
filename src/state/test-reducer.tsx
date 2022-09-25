import api from "../utils/api";
let initState: any;
async function startResult() {
  initState = await api.getLabels("emil0519", "testing-issues");
  // 要多加一個new_name =name 給inisital state?
  // if (initState !== undefined) {
  //   initState.map((item: any) => {
  //     let element: any = {};
  //     element["new_name"] = item.name;
  //     item.push(element);
  //   });
  // console.log(initState);
  // }
}
startResult();
const reducer = (state = initState, action: any) => {
  // console.log(initState);

  switch (action.type) {
    case "getList": {
      return action.payload.label;
    }
    case "createList": {
      state.map((item: any) => (item.new_name = item.name));

      console.log("create in test reducer");

      const newList = [
        ...state,
        {
          new_name: action.payload.data.name,
          id: action.payload.data.id,
          node_id: action.payload.data.node_id,
          url: action.payload.data.url,
          name: action.payload.data.name,
          color: action.payload.data.color,
          default: action.payload.data.default,
          description: action.payload.data.description,
        },
      ];
      console.log(newList);

      return newList;
    }
    case "deleteItem": {
      console.log("from delete");
      console.log("typeof state");

      console.log(typeof state);

      // if (typeof state === "string") {
      //   state = JSON.parse(state);
      // }

      console.log(state); //json

      state.splice(
        state.findIndex((e: any) => e.name === action.payload.deleteName),
        1
      );

      const newState = [...state];

      // console.log(JSON.stringify(state));

      return newState;
    }
    default:
      return initState;
  }
};

export default reducer;
