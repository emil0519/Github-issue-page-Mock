import Header from "../component/Header";
import Footer from "../component/Footer";
import Repo from "../component/Repo";
import Option from "../component/Option";
import { createGlobalStyle } from "styled-components";
import { UserContext } from "../utils/useContext";
import { useState } from "react";
import IssuePageWrap from "./IssuePageWrap";
import State from "./State";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }`;

function IssuePage() {
  const [value, setValue] = useState({
    filter: "",
    label: [],
    assignees: "",
    sort: "",
    closed: "",
    paging: "",
    search: "",
    dataLength: 0,
  });
  return (
    <>
      <GlobalStyle />
      <UserContext.Provider value={{ value, setValue }}>
        <Header />
        <Repo />
        <Option />
        <IssuePageWrap />
        {/* <State /> */}
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default IssuePage;
