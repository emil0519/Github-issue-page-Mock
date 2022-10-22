import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Error from "./component/Error/Error";
import Label from "./component/Label";
import NewIssue from "./component/NewIssue";
import RepoWrapper from "./component/RepoList/RepoWrapper";
import SignIn from "./component/SignIn";
import "./index.css";
import IssuePage from "./IssuePage/IssuePage";
import reportWebVitals from "./reportWebVitals";
import { store } from "./state/store";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/Repo" element={<RepoWrapper />}></Route>
        <Route path="/App" element={<App />}></Route>
        <Route path="/Label" element={<Label />}></Route>
        <Route path="/NewIssue" element={<NewIssue />}></Route>
        <Route path="/IssuePage" element={<IssuePage />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);

reportWebVitals();
