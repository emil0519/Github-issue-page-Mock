import { Helmet } from "react-helmet";
import { createGlobalStyle } from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import NewIssueWrapper from "./NewIssue/NewIssueWrapper";
import Option from "./Option";
import Repo from "./Repo";

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
      <Helmet>
        <meta charSet="utf-8" />
        <title>New Issue</title>
        <link rel="canonical" href="/App" />
        <meta name="keywords" content="github,new issue,github issue" />
        <meta name="author" content="Emil Lau" />
      </Helmet>
    </>
  );
}

export default NewIssue;
