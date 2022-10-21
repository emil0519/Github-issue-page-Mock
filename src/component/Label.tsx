import { useEffect, useRef } from "react";
import BoxHeader from "./BoxHeader";
import Footer from "./Footer";
import Header from "./Header";
import LabelButtons from "./LabelButtons";
import LabelList from "./LabelList";
import Option from "./Option";
import Repo from "./Repo";

function Label() {
  const inputRef = useRef(null);
  useEffect(() => console.log(inputRef.current), [inputRef]);

  return (
    <>
      <Header />
      <Repo />
      <Option />
      <LabelButtons />
      <BoxHeader />
      <LabelList />
      <Footer />
    </>
  );
}
export default Label;
