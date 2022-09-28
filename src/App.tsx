import Header from "./component/Header";
import Footer from "./component/Footer";
import Repo from "./component/Repo";
import Option from "./component/Option";

import { createGlobalStyle } from "styled-components";

import IssueHeader from "./component/IssueHeader";
import IssueContent from "./component/IssueContent";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Repo />
      <Option />
      <IssueHeader />
      <IssueContent />

      {/* <BoxHeader /> */}
      <Footer />
    </>
  );
}

export default App;
