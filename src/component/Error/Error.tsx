import errorIMG from "../../img/404.png";
import Footer from "../Footer";

function Error() {
  return (
    <>
      <img src={errorIMG} alt="" className="h-[425px] w-[100%]"></img>
      <Footer />
    </>
  );
}

export default Error;
