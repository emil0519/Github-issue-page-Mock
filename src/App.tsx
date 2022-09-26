import Header from "./component/Header";
import Footer from "./component/Footer";
import Repo from "./component/Repo";
import Option from "./component/Option";
import LabelButtons from "./component/LabelButtons";
import BoxHeader from "./component/BoxHeader";
import { createGlobalStyle } from "styled-components";

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
      <LabelButtons />
      <BoxHeader />
      <Footer />
    </>
  );
}

export default App;
