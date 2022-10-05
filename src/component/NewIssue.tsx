import Header from "./Header";
import Footer from "./Footer";
import Repo from "./Repo";
import Option from "./Option";
import EditSection from "./NewIssue/EditSection";

import Submit from "./NewIssue/Submit";
import NewIssueWrapper from "./NewIssue/NewIssueWrapper";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }`;

function NewIssue() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Repo />
      <Option />
      <NewIssueWrapper />
      <Footer />
    </>
  );
}

export default NewIssue;
