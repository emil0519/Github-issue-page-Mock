import Header from "./component/Header";
import Footer from "./component/Footer";
import Repo from "./component/Repo";
import Option from "./component/Option";

import { createGlobalStyle } from "styled-components";

import IssueHeader from "./component/IssueHeader";
import IssueContent from "./component/IssueContent";
import { UserContext } from "./utils/useContext";
import { useState } from "react";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }`;

function App() {
  const [value, setValue] = useState({
    filter: "",
    label: [],
    assignees: "",
    sort: "",
    closed: "",
    paging: "",
    search: "",
  });
  return (
    <>
      <GlobalStyle />
      <UserContext.Provider value={{ value, setValue }}>
        <Header />
        <Repo />
        <Option />
        <IssueHeader />
        <IssueContent />

        {/* <BoxHeader /> */}
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default App;
