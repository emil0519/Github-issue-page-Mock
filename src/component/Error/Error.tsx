import errorIMG from "../../img/404.png";
import Footer from "../Footer";
import Header from "../Header";

function Error() {
  return (
    <>
      <Header />
      <img src={errorIMG} alt="" className="h-[425px] w-[100%]"></img>
      <Footer />
    </>
  );
}

export default Error;
