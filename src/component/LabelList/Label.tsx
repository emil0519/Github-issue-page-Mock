import { Helmet } from "react-helmet";
import Option from "../Option";
import Repo from "../Repo";
import BoxHeader from "./BoxHeader";
import LabelButtons from "./LabelButtons";
import LabelList from "./LabelList";

function Label() {
  return (
    <>
      <Repo />
      <Option />
      <LabelButtons />
      <BoxHeader />
      <LabelList />
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
