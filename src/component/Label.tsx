import Header from "./Header";
import LabelList from "./LabelList";
import Repo from "./Repo";
import Option from "./Option";
import BoxHeader from "./BoxHeader";
import Footer from "./Footer";
import LabelButtons from "./LabelButtons";

function Label() {
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
