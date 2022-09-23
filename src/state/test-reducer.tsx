import api from "../utils/api";
let initState: any;
async function startResult() {
  initState = await api.getLabels("emil0519", "testing-issues");
}
startResult();
const reducer = (state = initState, action: any) => {
  console.log(initState);

  switch (action.type) {
    case "getList": {
      return action.payload.label;
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
      return newList;
    }
    case "deleteItem": {
      console.log("from delete");

      state.splice(
        state.findIndex((e: any) => e.name === action.payload.deleteName),
        1
      );
      console.log(state);

      return state;
    }
    default:
      return;
  }
};

export default reducer;
