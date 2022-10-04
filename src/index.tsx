import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./state/store";
import SignIn from "./component/SignIn";
import Label from "./component/Label";
import NewIssue from "./component/NewIssue";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        {/* <Route path="/" element={<SignIn />}></Route> */}
        <Route path="/App" element={<App />}></Route>
        <Route path="/Label" element={<Label />}></Route>
        <Route path="/" element={<NewIssue />}></Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);

reportWebVitals();
