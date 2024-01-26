import { Helmet } from "react-helmet";
import { createGlobalStyle } from "styled-components";
import { UserContext } from "../../utils/useContext";
import Footer from "../Footer";
import Header from "../Header";
import Option from "../Option";
import Repo from "../Repo";
import IssueWrapper from "./IssueWrapper";

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
    dataLength: 0,
  });
  return (
    <>
      <GlobalStyle />
      <UserContext.Provider value={{ value, setValue }}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Issues</title>
          <link rel="canonical" href="/App" />
          <meta name="keywords" content="github,issue page" />
          <meta name="author" content="Emil Lau" />
        </Helmet>
        <Header />
        <Repo />
        <Option />
        <IssueWrapper />
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default App;
