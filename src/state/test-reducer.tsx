import api from "../utils/api";
let initState: any;
async function startResult() {
  initState = await api.getLabels("emil0519", "testing-issues");
}

startResult();
const reducer = async (state = initState, action: any) => {
  switch (action.type) {
    case "getList": {
      return action.payload.label;
    }
    case "createList": {
      console.log("creating list");

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
      console.log(newList);

      return newList;
    }
    case "deleteItem": {
      console.log("from delete");
      const newState = state;
      newState.splice(
        newState.findIndex((e: any) => e.name === action.payload.deleteName),
        1
      );
      console.log(newState);

      return state;
    }
    default:
      console.log(initState);

      return await initState;
  }
};

export default reducer;
