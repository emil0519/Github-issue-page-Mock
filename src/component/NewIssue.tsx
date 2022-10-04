import Header from "./Header";
import Footer from "./Footer";
import Repo from "./Repo";
import Option from "./Option";
import { createGlobalStyle } from "styled-components";
import EditSection from "./NewIssue/EditSection";

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
      <EditSection />
      <Footer />
    </>
  );
}

export default NewIssue;
