import { useRef } from "react";
import { Helmet } from "react-helmet";
import BoxHeader from "./BoxHeader";
import Footer from "./Footer";
import Header from "./Header";
import LabelButtons from "./LabelButtons";
import LabelList from "./LabelList";
import Option from "./Option";
import Repo from "./Repo";

function Label() {
  const inputRef = useRef(null);

  return (
    <>
      <Header />
      <Repo />
      <Option />
      <LabelButtons />
      <BoxHeader />
      <LabelList />
      <Footer />
      <Helmet>
        <meta charSet="utf-8" />
        <title>Labels</title>
        <link rel="canonical" href="/App" />
        <meta name="keywords" content="github,label,github label" />
        <meta name="author" content="Emil Lau" />
      </Helmet>
    </>
  );
}
export default Label;
